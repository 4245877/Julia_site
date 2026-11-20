import { SupportButton } from "@/features/donation-flow/ui/SupportButton";
import { publicAssetPath } from "@/shared/config/site.config";

export function DeveloperJourneySection() {
  const raised = 12.53;
  const goal = 6_774_053;
  const progressPercent = (raised / goal) * 100;

  return (
    <section id="contact">
      <div>
        <h2>
          Путь разработки <em>Julia</em>
        </h2>

        <div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={publicAssetPath("/images/developer.png")}
              alt="Михаил Головач"
              width={180}
              height={180}
              loading="lazy"
              decoding="async"
            />
          </div>

          <p>
            Julia началась как личный исследовательский проект, но постепенно
            выросла в попытку спроектировать более глубокую ИИ-архитектуру: с
            памятью, вниманием, внутренним состоянием, планированием и модульной
            системой восприятия. Основной инженерный фокус проекта —
            низкоуровневый контроль, производительность и возможность
            разворачивать ключевые компоненты на x86-платформе. Поэтому в основе
            разработки находятся C++, системное проектирование, нейросетевые
            модели, базы знаний, механизмы безопасности и интерфейсы
            человеко-машинного взаимодействия.
          </p>

          <p>Поддержите исследовательскую разработку Julia</p>
        </div>

        <div>
          <div>
            {raised.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            {" $ из "}
            {goal.toLocaleString("en-US")} $
          </div>

          <progress
            aria-label="Прогресс финансирования разработки Julia"
            max={goal}
            value={raised}
          />

          <p>{progressPercent.toFixed(6)}% собрано</p>

          <div>
            <div>
              <SupportButton />
            </div>

            <p>
              Каждая поддержка помогает продолжать разработку.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
