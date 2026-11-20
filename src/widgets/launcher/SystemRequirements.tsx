import { cn } from "@/shared/lib/cn";
import styles from "./SystemRequirements.module.css";

const requirements = [
  {
    title: "Базовый запуск",
    items: [
      "ОС: Windows 10/11, macOS 11+, Ubuntu 20.04+",
      "Процессор: x86-64 CPU с поддержкой AVX2",
      "ОЗУ: от 16 GB",
      "Хранилище: от 20 GB SSD",
      "GPU: необязательно для лёгких модулей",
    ],
  },
  {
    title: "Рекомендуемый режим",
    items: [
      "ОС: Windows 11, macOS 12+, Ubuntu 22.04+",
      "Процессор: современный 8-ядерный x86-64 CPU",
      "ОЗУ: 32–64 GB",
      "Хранилище: 100 GB+ NVMe SSD",
      "GPU: NVIDIA RTX / AMD Radeon / Apple Silicon GPU при наличии совместимых модулей",
    ],
  },
  {
    title: "Исследовательская сборка",
    items: [
      "ОЗУ: 128 GB+ для крупных локальных моделей и расширенной памяти",
      "Хранилище: 1 TB+ NVMe SSD для датасетов, логов и экспериментальных моделей",
      "CPU: AVX2/AVX-512, высокая пропускная способность памяти",
      "GPU: одна или несколько видеокарт для тяжёлого инференса",
      "Дополнительно: микрофон, камера, динамики или наушники",
    ],
  },
];

/** "ОС: Windows 11" → term and value. */
function splitSpec(item: string) {
  const separator = item.indexOf(": ");
  return separator === -1
    ? { term: "", value: item }
    : { term: item.slice(0, separator), value: item.slice(separator + 2) };
}

export function SystemRequirements() {
  return (
    <section id="system-requirements" className={styles.requirements} aria-labelledby="system-requirements-title">
      <div className={styles.header}>
        <h3 id="system-requirements-title" className={styles.title}>
          Системные требования
        </h3>
        <p className={styles.intro}>
          Требования зависят от выбранных модулей, размера моделей, объёма памяти и режима
          запуска. Ниже указаны ориентиры для локальной экспериментальной сборки.
        </p>
      </div>

      <p className={styles.label}>Конфигурации</p>

      <ol className={styles.tiers}>
        {requirements.map((group, index) => (
          <li key={group.title} className={cn(styles.tier, index === 1 && styles.recommended)} data-reveal>
            <div className={styles.tierHead}>
              <span className={styles.tierIndex} aria-hidden="true">
                {index + 1}
              </span>
              <h4 className={styles.tierTitle}>{group.title}</h4>
            </div>

            <dl className={styles.specs}>
              {group.items.map((item) => {
                const { term, value } = splitSpec(item);
                return (
                  <div key={item} className={styles.spec}>
                    {term && <dt>{term}</dt>}
                    <dd>{value}</dd>
                  </div>
                );
              })}
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}
