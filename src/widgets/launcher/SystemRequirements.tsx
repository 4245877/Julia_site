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
    <div className="mt-12 rounded-2xl border border-white/10 bg-slate-900 p-6">
      <h3 className="mb-4 text-xl font-bold">Системные требования</h3>

      <p className="mb-6 leading-8 text-slate-300">
        Требования зависят от выбранных модулей, размера моделей, объёма памяти
        и режима запуска. Ниже указаны ориентиры для локальной экспериментальной
        сборки.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {requirements.map((group) => (
          <div key={group.title}>
            <h4 className="mb-2 font-bold">{group.title}</h4>

            <ul className="ml-6 list-disc space-y-1 text-slate-200">
              {group.items.map((item) => (
                <li key={item} className="leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}