"use client";

import { useMemo, useState } from "react";
import { ColorPicker } from "@/shared/ui/ColorPicker";
import { Container } from "@/shared/ui/Container";

const visualStyles = [
  { value: "3d", label: "3D-модель" },
  { value: "2d", label: "2D-стилизация" },
  { value: "hyperrealism", label: "Гиперреализм" },
  { value: "photorealism", label: "Фотореализм" },
] as const;

const hairColors = [
  { value: "brown", label: "Коричневый" },
  { value: "black", label: "Чёрный" },
  { value: "blonde", label: "Блонд" },
  { value: "red", label: "Рыжий" },
  { value: "blue", label: "Синий" },
  { value: "purple", label: "Фиолетовый" },
  { value: "pink", label: "Розовый" },
  { value: "green", label: "Зелёный" },
  { value: "white", label: "Белый" },
];

const eyeColors = [
  { value: "brown", label: "Карий" },
  { value: "blue", label: "Синий" },
  { value: "green", label: "Зелёный" },
  { value: "gray", label: "Серый" },
  { value: "purple", label: "Фиолетовый" },
  { value: "pink", label: "Розовый" },
  { value: "gold", label: "Золотой" },
  { value: "red", label: "Красный" },
];

type SelectOption = {
  value: string;
  label: string;
};

type RangeControlProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  minLabel?: string;
  maxLabel?: string;
};

function RangeControl({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = "%",
  minLabel = "0",
  maxLabel = "100",
}: RangeControlProps) {
  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>

      <div>
        <div>
          <span>{minLabel}</span>
          <span>
            {value}
            {unit && ` ${unit}`}
          </span>
          <span>{maxLabel}</span>
        </div>

        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-valuetext={unit ? `${value} ${unit}` : String(value)}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </div>
    </div>
  );
}

type SelectControlProps = {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

function SelectControl({
  id,
  label,
  value,
  options,
  onChange,
}: SelectControlProps) {
  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ProfileCustomizer() {
  const [visualStyle, setVisualStyle] = useState("3d");
  const [age, setAge] = useState("25");
  const [height, setHeight] = useState(165);
  const [hairColor, setHairColor] = useState("brown");
  const [eyeColor, setEyeColor] = useState("blue");

  const [temperament, setTemperament] = useState(50);
  const [empathy, setEmpathy] = useState(70);
  const [formality, setFormality] = useState(30);
  const [personalityType, setPersonalityType] = useState("balanced");

  const [voicePitch, setVoicePitch] = useState(60);
  const [speechSpeed, setSpeechSpeed] = useState(50);
  const [accent, setAccent] = useState("none");

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [initiative, setInitiative] = useState(30);
  const [creativity, setCreativity] = useState(50);
  const [realism, setRealism] = useState(30);
  const [knowledge, setKnowledge] = useState(80);
  const [memory, setMemory] = useState(70);

  const selectedStyleLabel = useMemo(() => {
    return (
      visualStyles.find((style) => style.value === visualStyle)?.label ??
      "3D-модель"
    );
  }, [visualStyle]);

  return (
    <section id="character-customization">
      <Container>
        <div>
          <header>
            <span>Profile interface</span>

            <h2>
              Настройка <em>интерфейсной личности</em>
            </h2>

            <p>
              Внешний образ Julia — это не основа системы, а пользовательский
              интерфейсный слой. Он позволяет выбрать визуальное представление,
              голос, стиль речи и параметры поведения, не меняя глубинную
              нейрокогнитивную архитектуру.
            </p>
          </header>

          <div>
            <article>
              <h3>Визуальный образ</h3>

              <p>
                2D, 3D, фотореалистичный или стилизованный интерфейсный персонаж.
              </p>
            </article>

            <article>
              <h3>Речь и голос</h3>

              <p>
                Тембр, скорость речи, интонация, паузы и эмоциональная окраска
                ответа.
              </p>
            </article>

            <article>
              <h3>Поведенческий профиль</h3>

              <p>
                Формальность, эмпатия, инициативность, осторожность, креативность
                и глубина объяснений.
              </p>
            </article>
          </div>

          <div>
            <h3>Стиль визуального слоя</h3>

            <div>
              {visualStyles.map((style) => (
                <button
                  type="button"
                  key={style.value}
                  aria-pressed={visualStyle === style.value}
                  onClick={() => setVisualStyle(style.value)}
                >
                  {style.label}
                </button>
              ))}
            </div>

            <div>
              <p>Превью интерфейсного образа</p>
              <p>Выбран стиль: <em>{selectedStyleLabel}</em></p>
            </div>
          </div>

          <div>
            <h3>Основные настройки</h3>

            <div>
              <article>
                <h4>
                  Визуальное представление
                </h4>

                <SelectControl
                  id="age"
                  label="Возраст интерфейсного персонажа"
                  value={age}
                  onChange={setAge}
                  options={[
                    { value: "18", label: "18 лет" },
                    { value: "20", label: "20 лет" },
                    { value: "22", label: "22 года" },
                    { value: "25", label: "25 лет" },
                    { value: "28", label: "28 лет" },
                    { value: "30", label: "30 лет" },
                    { value: "35", label: "35 лет" },
                  ]}
                />

                <RangeControl
                  id="height"
                  label="Рост визуального образа"
                  min={140}
                  max={210}
                  unit="см"
                  minLabel="140 см"
                  maxLabel="210 см"
                  value={height}
                  onChange={setHeight}
                />

                <ColorPicker
                  label="Цвет волос"
                  value={hairColor}
                  options={hairColors}
                  onChange={setHairColor}
                />

                <ColorPicker
                  label="Цвет глаз"
                  value={eyeColor}
                  options={eyeColors}
                  onChange={setEyeColor}
                />
              </article>

              <article>
                <h4>
                  Поведенческий профиль
                </h4>

                <RangeControl
                  id="temperament"
                  label="Темперамент"
                  minLabel="Спокойный"
                  maxLabel="Энергичный"
                  value={temperament}
                  onChange={setTemperament}
                />

                <RangeControl
                  id="empathy"
                  label="Эмпатия"
                  minLabel="Сдержанная"
                  maxLabel="Выраженная"
                  value={empathy}
                  onChange={setEmpathy}
                />

                <RangeControl
                  id="formality"
                  label="Формальность речи"
                  minLabel="Неформальная"
                  maxLabel="Официальная"
                  value={formality}
                  onChange={setFormality}
                />

                <SelectControl
                  id="personality-type"
                  label="Когнитивный профиль"
                  value={personalityType}
                  onChange={setPersonalityType}
                  options={[
                    { value: "balanced", label: "Сбалансированный" },
                    { value: "analytical", label: "Аналитический" },
                    { value: "supportive", label: "Поддерживающий" },
                    { value: "creative", label: "Креативный" },
                    { value: "formal", label: "Формальный" },
                    { value: "research", label: "Исследовательский" },
                  ]}
                />
              </article>

              <article>
                <h4>Голос</h4>

                <RangeControl
                  id="voice-pitch"
                  label="Тембр"
                  minLabel="Низкий"
                  maxLabel="Высокий"
                  value={voicePitch}
                  onChange={setVoicePitch}
                />

                <RangeControl
                  id="speech-speed"
                  label="Темп речи"
                  minLabel="Медленный"
                  maxLabel="Быстрый"
                  value={speechSpeed}
                  onChange={setSpeechSpeed}
                />

                <SelectControl
                  id="accent"
                  label="Акцент"
                  value={accent}
                  onChange={setAccent}
                  options={[
                    { value: "none", label: "Без акцента" },
                    { value: "russian", label: "Русский" },
                    { value: "ukrainian", label: "Украинский" },
                    { value: "belarusian", label: "Белорусский" },
                    { value: "british", label: "Британский" },
                    { value: "american", label: "Американский" },
                    { value: "french", label: "Французский" },
                    { value: "japanese", label: "Японский" },
                    { value: "caucasian", label: "Кавказский" },
                  ]}
                />
              </article>
            </div>
          </div>

          <div>
            <button
              type="button"
              aria-expanded={advancedOpen}
              aria-controls="profile-advanced-settings"
              onClick={() => setAdvancedOpen((current) => !current)}
            >
              Дополнительные параметры
            </button>

            {advancedOpen && (
              <div id="profile-advanced-settings">
                <h3>Расширенные настройки</h3>

                <div>
                  <RangeControl
                    id="initiative"
                    label="Степень инициативности"
                    minLabel="Низкая"
                    maxLabel="Высокая"
                    value={initiative}
                    onChange={setInitiative}
                  />

                  <RangeControl
                    id="creativity"
                    label="Креативность"
                    minLabel="Логичная"
                    maxLabel="Творческая"
                    value={creativity}
                    onChange={setCreativity}
                  />

                  <RangeControl
                    id="realism"
                    label="Допустимость естественных ошибок"
                    minLabel="Минимальная"
                    maxLabel="Повышенная"
                    value={realism}
                    onChange={setRealism}
                  />

                  <RangeControl
                    id="knowledge"
                    label="Глубина объяснений"
                    minLabel="Базовая"
                    maxLabel="Экспертная"
                    value={knowledge}
                    onChange={setKnowledge}
                  />

                  <RangeControl
                    id="memory"
                    label="Объём пользовательского контекста"
                    minLabel="Короткий"
                    maxLabel="Долгий"
                    value={memory}
                    onChange={setMemory}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <a href="#launcher">Настроить профиль Julia</a>

            <p>
              Настройки демонстрации <em>сбрасываются при перезагрузке</em>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
