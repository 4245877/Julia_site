export const siteConfig = {
  name: "Julia — нейрокогнитивная AI-архитектура на x86",
  shortName: "Julia AI",
  description:
    "Julia — экспериментальная нейрокогнитивная AI-система для x86-платформы: память, внимание, восприятие, планирование, мультимодальность и обучение на опыте.",
  url: "https://4245877.github.io/Julia_site",
  discussionsUrl: "https://github.com/4245877/Julia/discussions",
  launcherSourceUrl: "https://github.com/4245877/Julia-Launcher",
  keywords: [
    "Julia AI",
    "нейрокогнитивная архитектура",
    "искусственный интеллект",
    "cognitive architecture",
    "x86 AI",
    "AGI research",
    "computational neuroscience",
    "AI memory",
    "multimodal AI",
    "AI companion",
  ],
} as const;

export function publicAssetPath(path: `/${string}`) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
