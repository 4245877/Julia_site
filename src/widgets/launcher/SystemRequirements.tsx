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

export function SystemRequirements() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Системные требования</h3>
      </div>

      <p className={styles.description}>
        Требования зависят от выбранных модулей, размера моделей, объёма памяти
        и режима запуска. Ниже указаны ориентиры для локальной экспериментальной
        сборки.
      </p>

      <div className={styles.divider}>Конфигурации</div>

      <div className={styles.grid}>
        {requirements.map((group) => (
          <article key={group.title} className={styles.card}>
            <div className={styles.cardHeader}>
              <h4 className={styles.cardTitle}>{group.title}</h4>
            </div>

            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}