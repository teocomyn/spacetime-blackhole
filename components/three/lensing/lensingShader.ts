// Lancer de rayons dans la métrique de Schwarzschild, en unités où le rayon de l'horizon vaut 1.
// Chaque pixel suit un rayon de lumière en remontant le temps : l'accélération -3/2 h² r / |r|^5
// reproduit exactement la courbure des géodésiques lumineuses (méthode de R. Antonelli, « Starless »).

export const lensingVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const lensingFragmentShader = /* glsl */ `
varying vec2 vUv;

uniform vec3 uCamPos;
uniform mat4 uCamWorld;
uniform mat4 uProjInv;
uniform float uRs;
uniform float uTime;
uniform vec3 uDiskNormal;
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskIntensity;
uniform int uMaxSteps;
uniform vec2 uMouse;
uniform float uMouseLens;
uniform float uAspect;

const int MAX_STEPS = 220;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i + vec3(0, 0, 0)), hash(i + vec3(1, 0, 0)), f.x),
        mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
        mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

vec3 background(vec3 dir) {
  dir = normalize(dir);
  vec3 col = vec3(0.0);

  // Nébulosité très discrète, pour que la déformation du ciel reste lisible.
  float neb = fbm(dir * 2.2 + 3.1);
  col += vec3(0.02, 0.05, 0.11) * smoothstep(0.45, 0.9, neb);

  // Étoiles : une étoile au plus par cellule d'une grille projetée sur la sphère.
  for (int layer = 0; layer < 2; layer++) {
    float scale = layer == 0 ? 90.0 : 190.0;
    vec3 g = dir * scale;
    vec3 cell = floor(g);
    float h = hash(cell + float(layer) * 17.0);
    if (h > 0.965) {
      vec3 starPos = cell + 0.5 + 0.35 * (vec3(hash(cell + 1.7), hash(cell + 3.1), hash(cell + 5.3)) - 0.5);
      float d = length(g - starPos);
      float brightness = (h - 0.965) / 0.035;
      float star = smoothstep(0.32, 0.0, d) * brightness;
      vec3 tint = mix(vec3(0.75, 0.85, 1.0), vec3(1.0, 0.95, 0.88), hash(cell + 9.0));
      col += tint * star * (layer == 0 ? 1.6 : 0.9);
    }
  }
  return col;
}

vec3 diskColor(vec3 hit, vec3 rayDir, out float alpha) {
  float r = length(hit);
  float x = clamp((r - uDiskInner) / (uDiskOuter - uDiskInner), 0.0, 1.0);

  // Profil de température d'un disque mince : T ∝ r^(-3/4).
  float temperature = pow(uDiskInner / r, 0.75);

  // Vitesse orbitale (observateur statique) : β = sqrt(1 / (2 (r - 1))) quand r_s = 1.
  vec3 n = normalize(uDiskNormal);
  vec3 orbitDir = normalize(cross(n, hit));
  float beta = clamp(sqrt(0.5 / max(r - 1.0, 0.05)), 0.0, 0.75);
  float gamma = inversesqrt(1.0 - beta * beta);
  float cosTheta = dot(orbitDir, -normalize(rayDir));
  float doppler = 1.0 / (gamma * (1.0 - beta * cosTheta));
  float gravShift = sqrt(max(1.0 - 1.0 / r, 0.0));
  float shift = doppler * gravShift;

  // Turbulence qui tourne avec le disque (rotation différentielle).
  vec3 b = normalize(cross(n, vec3(0.31, 0.0, 1.0)));
  vec3 c = cross(n, b);
  float angle = atan(dot(hit, c), dot(hit, b));
  float omega = 0.35 * pow(r, -1.5);
  float swirl = fbm(vec3(r * 1.6, cos(angle - uTime * omega * 6.0) * 2.0, sin(angle - uTime * omega * 6.0) * 2.0));

  float density = smoothstep(0.0, 0.08, x) * smoothstep(1.0, 0.55, x);
  density *= 0.55 + 0.9 * swirl;

  float intensity = temperature * pow(shift, 3.0) * uDiskIntensity;
  vec3 hot = vec3(0.92, 0.97, 1.0);
  vec3 warm = vec3(0.35, 0.62, 1.0);
  vec3 cool = vec3(0.12, 0.25, 0.62);
  vec3 col = mix(cool, warm, smoothstep(0.15, 0.6, temperature * shift));
  col = mix(col, hot, smoothstep(0.55, 1.15, temperature * shift));

  alpha = clamp(density * 0.9, 0.0, 0.95);
  return col * intensity * density * 1.6;
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;

  // Le curseur agit comme une petite lentille gravitationnelle ponctuelle : chaque pixel voit le ciel
  // dévié selon β = θ - θE² θ / |θ|², ce qui dessine un anneau d'Einstein autour du pointeur.
  vec3 cursorGlow = vec3(0.0);
  if (uMouseLens > 0.0) {
    vec2 d = (ndc - uMouse) * vec2(uAspect, 1.0);
    float r = max(length(d), 1e-4);
    float thetaE = uMouseLens;
    float shadow = thetaE * 0.34;
    cursorGlow = vec3(0.45, 0.8, 1.0) * exp(-pow((r - shadow * 1.08) / (thetaE * 0.05), 2.0)) * 0.9;
    if (r < shadow) {
      gl_FragColor = vec4(cursorGlow * 0.6, 1.0);
      return;
    }
    vec2 beta = d - (thetaE * thetaE / (r * r)) * d;
    ndc = uMouse + beta / vec2(uAspect, 1.0);
  }

  vec4 view = uProjInv * vec4(ndc, 1.0, 1.0);
  view /= view.w;
  vec3 dir = normalize((uCamWorld * vec4(view.xyz, 0.0)).xyz);

  vec3 p = uCamPos / uRs;

  // Un observateur immobile mesure les angles dans son repère local. Pour retrouver la direction
  // de départ du rayon dans les coordonnées de Schwarzschild : tan ψ = tan α / sqrt(1 - r_s / r).
  float r0 = length(p);
  vec3 radial = p / r0;
  float cosA = dot(dir, radial);
  vec3 tangential = dir - cosA * radial;
  float sinA = length(tangential);
  if (sinA > 1e-5 && r0 > 1.0) {
    tangential /= sinA;
    float factor = sqrt(max(1.0 - 1.0 / r0, 1e-4));
    float psi = atan(sinA, cosA * factor);
    dir = cos(psi) * radial + sin(psi) * tangential;
  }

  vec3 v = dir;
  vec3 hv = cross(p, v);
  float h2 = dot(hv, hv);
  vec3 n = normalize(uDiskNormal);

  vec3 col = vec3(0.0);
  float transmittance = 1.0;
  bool captured = length(p) < 1.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    if (i >= uMaxSteps || captured) break;
    float r2 = dot(p, p);
    float r = sqrt(r2);
    float dt = clamp(0.055 * r, 0.015, 2.0);

    vec3 prev = p;
    v += -1.5 * h2 * p / (r2 * r2 * r) * dt;
    p += v * dt;

    float dPrev = dot(prev, n);
    float dNow = dot(p, n);
    if (dPrev * dNow < 0.0) {
      vec3 hit = mix(prev, p, dPrev / (dPrev - dNow));
      float rh = length(hit);
      if (rh > uDiskInner && rh < uDiskOuter) {
        float a;
        vec3 dc = diskColor(hit, v, a);
        col += transmittance * dc;
        transmittance *= 1.0 - a;
      }
    }

    if (dot(p, p) < 1.0) {
      captured = true;
    } else if (r > 60.0 && dot(p, v) > 0.0) {
      break;
    }
  }

  if (!captured) {
    col += transmittance * background(v);
  }

  col += cursorGlow;

  // Tonalité douce pour garder les noirs profonds et éviter la saturation.
  col = col / (1.0 + col);
  col = pow(col, vec3(0.9));
  gl_FragColor = vec4(col, 1.0);
}
`;
