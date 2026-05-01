import { Container } from "@/shared/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-10">
      <Container className="flex flex-col gap-4 text-center text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:text-left">
        <p>© {new Date().getFullYear()} Julia AI. Экспериментальный исследовательский проект.</p>

        <nav className="flex justify-center gap-4">
          <a href="#architecture" className="transition hover:text-white">
            Архитектура
          </a>
          <a href="#roadmap" className="transition hover:text-white">
            Roadmap
          </a>
          <a href="#launcher" className="transition hover:text-white">
            Launcher
          </a>
        </nav>
      </Container>
    </footer>
  );
}