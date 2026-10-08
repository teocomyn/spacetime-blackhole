import TopicLayout from "@/components/topic/TopicLayout";
import Quiz from "@/components/tools/Quiz";
import type { Locale } from "@/context/AppContext";

export default function QuizPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <TopicLayout
      pageKey="quiz"
      locale={locale}
      kicker={fr ? "[ jeu ]" : "[ game ]"}
      intro={
        fr
          ? "Dix questions, de l'horizon aux ondes gravitationnelles. Chaque réponse est expliquée : même en vous trompant, vous apprenez quelque chose."
          : "Ten questions, from the horizon to gravitational waves. Every answer is explained: even when you are wrong, you learn something."
      }
      related={["blackHoles", "fallingIn", "hawking", "teachers"]}
    >
      <Quiz />
    </TopicLayout>
  );
}
