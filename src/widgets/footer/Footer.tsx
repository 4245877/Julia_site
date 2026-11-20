import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <div>
        <div>
          <Link href="/" aria-label="Julia AI">
            Julia AI <span>Research Project</span>
          </Link>

          <nav aria-label="Footer navigation">
            <ul>
              <li>
                <a href="#architecture">Архитектура</a>
              </li>
              <li>
                <a href="#roadmap">Roadmap</a>
              </li>
              <li>
                <a href="#launcher">Launcher</a>
              </li>
            </ul>
          </nav>
        </div>

        <p>Elegant intelligence. Quiet research. Julia AI.</p>

        <div>
          <p>
            © {new Date().getFullYear()} <em>Julia AI</em>. Экспериментальный исследовательский проект.
          </p>

          <span>Active</span>
        </div>
      </div>
    </footer>
  );
}
