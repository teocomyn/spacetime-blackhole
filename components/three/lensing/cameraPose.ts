import * as THREE from "three";

const n = new THREE.Vector3();
const u = new THREE.Vector3();
const dir = new THREE.Vector3();

/**
 * Place la caméra autour du trou noir (unités : rayon de l'horizon) et la fait regarder le centre.
 * Près de l'horizon, l'ombre couvre presque tout le ciel : la caméra se retourne vers l'extérieur
 * et élargit son champ pour montrer l'Univers qui se contracte en un disque lumineux.
 */
export function applyCameraPose(
  camera: THREE.Camera,
  {
    distance,
    azimuth,
    elevation,
    baseFov = 50,
    viewShift = 0,
    turnStart = 4,
    turnEnd = 1.5,
  }: {
    distance: number;
    azimuth: number;
    elevation: number;
    baseFov?: number;
    viewShift?: number;
    turnStart?: number;
    turnEnd?: number;
  }
) {
  const flat = Math.cos(elevation) * distance;
  camera.position.set(Math.sin(azimuth) * flat, Math.sin(elevation) * distance, Math.cos(azimuth) * flat);

  const x = Math.min(Math.max((turnStart - distance) / (turnStart - turnEnd), 0), 1);
  const turn = x * x * (3 - 2 * x);
  n.copy(camera.position).normalize();
  u.set(0, 1, 0).addScaledVector(n, -n.y).normalize();
  const theta = Math.PI * turn;
  dir.copy(n).multiplyScalar(-Math.cos(theta)).addScaledVector(u, Math.sin(theta));
  camera.lookAt(camera.position.x + dir.x, camera.position.y + dir.y, camera.position.z + dir.z);

  const perspective = camera as THREE.PerspectiveCamera;
  const fov = baseFov + 45 * turn;
  if (Math.abs(perspective.fov - fov) > 0.01) {
    perspective.fov = fov;
    perspective.updateProjectionMatrix();
  }

  // Décalage de cadrage (fraction de la hauteur) : le trou noir descend à l'écran sans changer la perspective.
  const shift = Math.round(viewShift * 1000) / 1000;
  const current = perspective.view?.enabled ? -perspective.view.offsetY / perspective.view.fullHeight : 0;
  if (Math.abs(current - shift) > 0.0005) {
    if (shift === 0) {
      perspective.clearViewOffset();
    } else {
      const h = 1000;
      const w = h * perspective.aspect;
      perspective.setViewOffset(w, h, 0, -shift * h, w, h);
    }
  }
}
