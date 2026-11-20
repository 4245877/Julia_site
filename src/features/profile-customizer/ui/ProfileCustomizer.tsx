"use client";

import { useState, type CSSProperties } from "react";
import { sectionNumber } from "@/shared/config/navigation";
import { ButtonLink } from "@/shared/ui/Button";
import { ColorPicker } from "@/shared/ui/ColorPicker";
import { Container } from "@/shared/ui/Container";
import { Icon, type IconName } from "@/shared/ui/Icon";
import { RangeField } from "@/shared/ui/RangeField";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { SegmentedControl } from "@/shared/ui/SegmentedControl";
import { SelectField } from "@/shared/ui/SelectField";
import styles from "./ProfileCustomizer.module.css";

const visualStyles = [
  { value: "3d", label: "3D-модель" },
  { value: "2d", label: "2D-стилизация" },
  { value: "hyperrealism", label: "Гиперреализм" },
  { value: "photorealism", label: "Фотореализм" },
] as const;

// Swatch tones are softened to sit quietly next to the site palette.
const hairColors = [
  { value: "brown", label: "Коричневый", swatch: "#6b4a3a" },
  { value: "black", label: "Чёрный", swatch: "#2b2422" },
  { value: "blonde", label: "Блонд", swatch: "#d8bf8e" },
  { value: "red", label: "Рыжий", swatch: "#a85b3b" },
  { value: "blue", label: "Синий", swatch: "#5a6f91" },
  { value: "purple", label: "Фиолетовый", swatch: "#7d5e89" },
  { value: "pink", label: "Розовый", swatch: "#d79bb0" },
  { value: "green", label: "Зелёный", swatch: "#6e8a69" },
  { value: "white", label: "Белый", swatch: "#efeae3" },
] as const;

const eyeColors = [
  { value: "brown", label: "Карий", swatch: "#6b4a3a" },
  { value: "blue", label: "Синий", swatch: "#5b80a8" },
  { value: "green", label: "Зелёный", swatch: "#6a8f6a" },
  { value: "gray", label: "Серый", swatch: "#8d9297" },
  { value: "purple", label: "Фиолетовый", swatch: "#7d5e89" },
  { value: "pink", label: "Розовый", swatch: "#d79bb0" },
  { value: "gold", label: "Золотой", swatch: "#c8a04f" },
  { value: "red", label: "Красный", swatch: "#9e4842" },
] as const;

const ageOptions = [
  { value: "18", label: "18 лет" },
  { value: "20", label: "20 лет" },
  { value: "22", label: "22 года" },
  { value: "25", label: "25 лет" },
  { value: "28", label: "28 лет" },
  { value: "30", label: "30 лет" },
  { value: "35", label: "35 лет" },
] as const;

const personalityOptions = [
  { value: "balanced", label: "Сбалансированный" },
  { value: "analytical", label: "Аналитический" },
  { value: "supportive", label: "Поддерживающий" },
  { value: "creative", label: "Креативный" },
  { value: "formal", label: "Формальный" },
  { value: "research", label: "Исследовательский" },
] as const;

const accentOptions = [
  { value: "none", label: "Без акцента" },
  { value: "russian", label: "Русский" },
  { value: "ukrainian", label: "Украинский" },
  { value: "belarusian", label: "Белорусский" },
  { value: "british", label: "Британский" },
  { value: "american", label: "Американский" },
  { value: "french", label: "Французский" },
  { value: "japanese", label: "Японский" },
  { value: "caucasian", label: "Кавказский" },
] as const;

const aspects: readonly { icon: IconName; title: string; text: string }[] = [
  {
    icon: "image",
    title: "Визуальный образ",
    text: "2D, 3D, фотореалистичный или стилизованный интерфейсный персонаж.",
  },
  {
    icon: "voice",
    title: "Речь и голос",
    text: "Тембр, скорость речи, интонация, паузы и эмоциональная окраска ответа.",
  },
  {
    icon: "sliders",
    title: "Поведенческий профиль",
    text: "Формальность, эмпатия, инициативность, осторожность, креативность и глубина объяснений.",
  },
];

function labelOf(options: readonly { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? "";
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

  const selectedStyleLabel = labelOf(visualStyles, visualStyle) || "3D-модель";
  const hair = hairColors.find((color) => color.value === hairColor) ?? hairColors[0];
  const eyes = eyeColors.find((color) => color.value === eyeColor) ?? eyeColors[0];

  return (
    <Section id="character-customization" aria-labelledby="customizer-title">
      <Container>
        <SectionHeading
          index={sectionNumber("character-customization")}
          eyebrow="Profile interface"
          eyebrowLang="en"
          titleId="customizer-title"
          title={
            <>
              Настройка <em>интерфейсной личности</em>
            </>
          }
          lead="Внешний образ Julia — это не основа системы, а пользовательский интерфейсный слой. Он позволяет выбрать визуальное представление, голос, стиль речи и параметры поведения, не меняя глубинную нейрокогнитивную архитектуру."
        />

        <ul className={styles.aspects}>
          {aspects.map((aspect) => (
            <li key={aspect.title} className={styles.aspect}>
              <span className={styles.aspectIcon}>
                <Icon name={aspect.icon} size={22} />
              </span>
              <article>
                <h3 className={styles.aspectTitle}>{aspect.title}</h3>
                <p className={styles.aspectText}>{aspect.text}</p>
              </article>
            </li>
          ))}
        </ul>

        <div className={styles.workbench}>
          <div className={styles.styleRow}>
            <div className={styles.styleControl}>
              <h3 id="visual-style-title" className={styles.blockTitle}>
                Стиль визуального слоя
              </h3>
              <SegmentedControl
                labelledBy="visual-style-title"
                value={visualStyle}
                options={visualStyles}
                onChange={setVisualStyle}
                className={styles.segments}
              />
            </div>

            <div className={styles.preview}>
              <div
                className={styles.orb}
                data-style={visualStyle}
                style={{ "--hair": hair.swatch, "--eyes": eyes.swatch } as CSSProperties}
                aria-hidden="true"
              >
                <span className={styles.orbHair} />
                <span className={styles.orbEyes} />
              </div>

              <div className={styles.previewText}>
                <p className={styles.previewLabel}>Превью интерфейсного образа</p>
                <p className={styles.previewStyle} aria-live="polite">
                  Выбран стиль: <em>{selectedStyleLabel}</em>
                </p>
                <dl className={styles.facts}>
                  <div>
                    <dt>Возраст</dt>
                    <dd>{labelOf(ageOptions, age)}</dd>
                  </div>
                  <div>
                    <dt>Рост</dt>
                    <dd>{height} см</dd>
                  </div>
                  <div>
                    <dt>Волосы</dt>
                    <dd>{hair.label}</dd>
                  </div>
                  <div>
                    <dt>Глаза</dt>
                    <dd>{eyes.label}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className={styles.basics}>
            <h3 className={styles.blockTitle}>Основные настройки</h3>

            <div className={styles.groups}>
              <article className={styles.group}>
                <h4 className={styles.groupTitle}>
                  <Icon name="image" size={18} />
                  Визуальное представление
                </h4>

                <SelectField
                  id="age"
                  label="Возраст интерфейсного персонажа"
                  value={age}
                  onChange={setAge}
                  options={ageOptions}
                />

                <RangeField
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
                  name="hair-color"
                  label="Цвет волос"
                  value={hairColor}
                  options={hairColors}
                  onChange={setHairColor}
                />

                <ColorPicker
                  name="eye-color"
                  label="Цвет глаз"
                  value={eyeColor}
                  options={eyeColors}
                  onChange={setEyeColor}
                />
              </article>

              <article className={styles.group}>
                <h4 className={styles.groupTitle}>
                  <Icon name="sliders" size={18} />
                  Поведенческий профиль
                </h4>

                <RangeField
                  id="temperament"
                  label="Темперамент"
                  unit="%"
                  minLabel="Спокойный"
                  maxLabel="Энергичный"
                  value={temperament}
                  onChange={setTemperament}
                />

                <RangeField
                  id="empathy"
                  label="Эмпатия"
                  unit="%"
                  minLabel="Сдержанная"
                  maxLabel="Выраженная"
                  value={empathy}
                  onChange={setEmpathy}
                />

                <RangeField
                  id="formality"
                  label="Формальность речи"
                  unit="%"
                  minLabel="Неформальная"
                  maxLabel="Официальная"
                  value={formality}
                  onChange={setFormality}
                />

                <SelectField
                  id="personality-type"
                  label="Когнитивный профиль"
                  value={personalityType}
                  onChange={setPersonalityType}
                  options={personalityOptions}
                />
              </article>

              <article className={styles.group}>
                <h4 className={styles.groupTitle}>
                  <Icon name="voice" size={18} />
                  Голос
                </h4>

                <RangeField
                  id="voice-pitch"
                  label="Тембр"
                  unit="%"
                  minLabel="Низкий"
                  maxLabel="Высокий"
                  value={voicePitch}
                  onChange={setVoicePitch}
                />

                <RangeField
                  id="speech-speed"
                  label="Темп речи"
                  unit="%"
                  minLabel="Медленный"
                  maxLabel="Быстрый"
                  value={speechSpeed}
                  onChange={setSpeechSpeed}
                />

                <SelectField
                  id="accent"
                  label="Акцент"
                  value={accent}
                  onChange={setAccent}
                  options={accentOptions}
                />
              </article>
            </div>
          </div>

          <div className={styles.advanced}>
            <button
              type="button"
              className={styles.disclosure}
              aria-expanded={advancedOpen}
              aria-controls="profile-advanced-settings"
              onClick={() => setAdvancedOpen((current) => !current)}
            >
              <span>Дополнительные параметры</span>
              <Icon name="chevron-down" size={20} className={styles.chevron} />
            </button>

            {advancedOpen && (
              <div id="profile-advanced-settings" className={styles.advancedPanel}>
                <h3 className={styles.blockTitle}>Расширенные настройки</h3>

                <div className={styles.advancedGrid}>
                  <RangeField
                    id="initiative"
                    label="Степень инициативности"
                    unit="%"
                    minLabel="Низкая"
                    maxLabel="Высокая"
                    value={initiative}
                    onChange={setInitiative}
                  />

                  <RangeField
                    id="creativity"
                    label="Креативность"
                    unit="%"
                    minLabel="Логичная"
                    maxLabel="Творческая"
                    value={creativity}
                    onChange={setCreativity}
                  />

                  <RangeField
                    id="realism"
                    label="Допустимость естественных ошибок"
                    unit="%"
                    minLabel="Минимальная"
                    maxLabel="Повышенная"
                    value={realism}
                    onChange={setRealism}
                  />

                  <RangeField
                    id="knowledge"
                    label="Глубина объяснений"
                    unit="%"
                    minLabel="Базовая"
                    maxLabel="Экспертная"
                    value={knowledge}
                    onChange={setKnowledge}
                  />

                  <RangeField
                    id="memory"
                    label="Объём пользовательского контекста"
                    unit="%"
                    minLabel="Короткий"
                    maxLabel="Долгий"
                    value={memory}
                    onChange={setMemory}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={styles.footer}>
            <ButtonLink href="#launcher" icon="arrow-right">
              Настроить профиль Julia
            </ButtonLink>

            <p className={styles.note}>
              <Icon name="info" size={18} className={styles.noteIcon} />
              <span>
                Настройки демонстрации <em>сбрасываются при перезагрузке</em>
              </span>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
