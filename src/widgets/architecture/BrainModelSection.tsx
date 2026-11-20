import { homeRu } from "@/content/home.ru";
import { siteConfig } from "@/shared/config/site.config";

export function BrainModelSection() {
  return (
    <section>
      <div>
        <header>
          <div>Architecture</div>

          <h2>
            Модель мозга в <em>программной архитектуре</em>
          </h2>

          <p>
            Архитектура мышления как система: точная, живая и способная
            развиваться вместе с продуктом.
          </p>
        </header>

        <div>
          {homeRu.brainModelCards.map((card) => (
            <article key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>

        <div>
          <a href={siteConfig.discussionsUrl}>
            Обсудить архитектуру
          </a>
        </div>
      </div>
    </section>
  );
}
