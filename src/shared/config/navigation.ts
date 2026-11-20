export type SectionNavItem = {
  id: string;
  label: string;
  /** Chapter number shared by the section eyebrow and the menu. */
  index: string;
  /** Shown in the desktop header; the mobile menu lists every section. */
  primary?: boolean;
};

export const sectionNav = [
  { id: "architecture", label: "Архитектура", index: "01", primary: true },
  { id: "brain-model", label: "Модель мозга", index: "02", primary: true },
  { id: "roadmap", label: "Дорожная карта", index: "03", primary: true },
  { id: "features", label: "Возможности", index: "04" },
  { id: "tech-stack", label: "Технологии", index: "05", primary: true },
  { id: "character-customization", label: "Профиль", index: "06", primary: true },
  { id: "launcher", label: "Лаунчер", index: "07", primary: true },
  { id: "contact", label: "Путь разработки", index: "08" },
] as const satisfies readonly SectionNavItem[];

export type SectionId = (typeof sectionNav)[number]["id"];

export const sectionIds: readonly SectionId[] = sectionNav.map((item) => item.id);

export function sectionNumber(id: SectionId) {
  return sectionNav.find((item) => item.id === id)?.index;
}
