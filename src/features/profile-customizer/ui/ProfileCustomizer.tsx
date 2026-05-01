"use client";

import { useMemo, useState } from "react";
import { ButtonLink, Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { ColorPicker } from "@/shared/ui/ColorPicker";
import { Container } from "@/shared/ui/Container";
import { RangeField } from "@/shared/ui/RangeField";
import { Section } from "@/shared/ui/Section";
import { SelectField } from "@/shared/ui/SelectField";
import { cn } from "@/shared/lib/cn";

const visualStyles = [
  { value: "3d", label: "3D-модель" },
  { value: "2d", label: "2D-стилизация" },
  { value: "hyperrealism", label: "Гиперреализм" },
  { value: "photorealism", label: "Фотореализм" },
] as const;

const hairColors = [
  { value: "brown", label: "Коричневый", hex: "#8B4513" },
  { value: "black", label: "Чёрный", hex: "#000000" },
  { value: "blonde", label: "Блонд", hex: "#FFD700" },
  { value: "red", label: "Рыжий", hex: "#B22222" },
  { value: "blue", label: "Синий", hex: "#4169E1" },
  { value: "purple", label: "Фиолетовый", hex: "#9370DB" },
  { value: "pink", label: "Розовый", hex: "#FF69B4" },
  { value: "green", label: "Зелёный", hex: "#90EE90" },
  { value: "white", label: "Белый", hex: "#eeeeee" },
];

const eyeColors = [
  { value: "brown", label: "Карий", hex: "#8B4513" },
  { value: "blue", label: "Синий", hex: "#4169E1" },
  { value: "green", label: "Зелёный", hex: "#228B22" },
  { value: "gray", label: "Серый", hex: "#808080" },
  { value: "purple", label: "Фиолетовый", hex: "#9370DB" },
  { value: "pink", label: "Розовый", hex: "#FF69B4" },
  { value: "gold", label: "Золотой", hex: "#FFD700" },
  { value: "red", label: "Красный", hex: "#B22222" },
];

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
    return visualStyles.find((style) => style.value === visualStyle)?.label ?? "3D-модель";
  }, [visualStyle]);

  return (
    <Section id="character-customization" className="bg-slate-900">
      <Container>
        <div className="mb-12 max-w-4xl">
          <h2 className="mb-4 text-4xl font-bold">Настройка интерфейсной личности</h2>

          <p className="text-lg leading-8 text-slate-300">
            Внешний образ Julia — это не основа системы, а пользовательский
            интерфейсный слой. Он позволяет выбрать визуальное представление,
            голос, стиль речи и параметры поведения, не меняя глубинную
            нейрокогнитивную архитектуру.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card>
            <h3 className="mb-4 text-2xl font-semibold">Визуальный образ</h3>
            <p className="text-slate-300">
              2D, 3D, фотореалистичный или стилизованный интерфейсный персонаж.
            </p>
          </Card>

          <Card>
            <h3 className="mb-4 text-2xl font-semibold">Речь и голос</h3>
            <p className="text-slate-300">
              Тембр, скорость речи, интонация, паузы и эмоциональная окраска ответа.
            </p>
          </Card>

          <Card>
            <h3 className="mb-4 text-2xl font-semibold">Поведенческий профиль</h3>
            <p className="text-slate-300">
              Формальность, эмпатия, инициативность, осторожность, креативность и
              глубина объяснений.
            </p>
          </Card>
        </div>

        <div className="mb-12">
          <h3 className="mb-4 text-2xl font-semibold">Стиль визуального слоя</h3>

          <div className="flex flex-wrap gap-4">
            {visualStyles.map((style) => (
              <button
                type="button"
                key={style.value}
                onClick={() => setVisualStyle(style.value)}
                className={cn(
                  "rounded-xl px-4 py-2 font-medium transition",
                  visualStyle === style.value
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-200 hover:bg-slate-700",
                )}
              >
                {style.label}
              </button>
            ))}
          </div>

          <div className="mt-6 flex h-64 w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-950 text-center text-slate-400">
            <div>
              <p className="text-lg font-semibold text-slate-200">
                Превью интерфейсного образа
              </p>
              <p className="mt-2 text-sm">Выбран стиль: {selectedStyleLabel}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl">
          <h3 className="mb-8 text-2xl font-bold">Основные настройки</h3>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card>
              <h4 className="mb-6 text-xl font-semibold">Визуальное представление</h4>

              <div className="grid gap-6">
                <SelectField
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
              </div>
            </Card>

            <Card>
              <h4 className="mb-6 text-xl font-semibold">Поведенческий профиль</h4>

              <div className="grid gap-6">
                <RangeField
                  id="temperament"
                  label="Темперамент"
                  minLabel="Спокойный"
                  maxLabel="Энергичный"
                  value={temperament}
                  onChange={setTemperament}
                />

                <RangeField
                  id="empathy"
                  label="Эмпатия"
                  minLabel="Сдержанная"
                  maxLabel="Выраженная"
                  value={empathy}
                  onChange={setEmpathy}
                />

                <RangeField
                  id="formality"
                  label="Формальность речи"
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
                  options={[
                    { value: "balanced", label: "Сбалансированный" },
                    { value: "analytical", label: "Аналитический" },
                    { value: "supportive", label: "Поддерживающий" },
                    { value: "creative", label: "Креативный" },
                    { value: "formal", label: "Формальный" },
                    { value: "research", label: "Исследовательский" },
                  ]}
                />
              </div>
            </Card>

            <Card>
              <h4 className="mb-6 text-xl font-semibold">Голос</h4>

              <div className="grid gap-6">
                <RangeField
                  id="voice-pitch"
                  label="Тембр"
                  minLabel="Низкий"
                  maxLabel="Высокий"
                  value={voicePitch}
                  onChange={setVoicePitch}
                />

                <RangeField
                  id="speech-speed"
                  label="Темп речи"
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
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Button
            variant="secondary"
            onClick={() => setAdvancedOpen((current) => !current)}
            className="w-full justify-between rounded-2xl px-6"
          >
            <span>Дополнительные параметры</span>
            <span>{advancedOpen ? "▲" : "▼"}</span>
          </Button>

          {advancedOpen && (
            <Card className="mt-6">
              <h3 className="mb-8 text-2xl font-bold">Расширенные настройки</h3>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <RangeField
                  id="initiative"
                  label="Степень инициативности"
                  minLabel="Низкая"
                  maxLabel="Высокая"
                  value={initiative}
                  onChange={setInitiative}
                />

                <RangeField
                  id="creativity"
                  label="Креативность"
                  minLabel="Логичная"
                  maxLabel="Творческая"
                  value={creativity}
                  onChange={setCreativity}
                />

                <RangeField
                  id="realism"
                  label="Допустимость естественных ошибок"
                  minLabel="Минимальная"
                  maxLabel="Повышенная"
                  value={realism}
                  onChange={setRealism}
                />

                <RangeField
                  id="knowledge"
                  label="Глубина объяснений"
                  minLabel="Базовая"
                  maxLabel="Экспертная"
                  value={knowledge}
                  onChange={setKnowledge}
                />

                <RangeField
                  id="memory"
                  label="Объём пользовательского контекста"
                  minLabel="Короткий"
                  maxLabel="Долгий"
                  value={memory}
                  onChange={setMemory}
                />
              </div>
            </Card>
          )}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="#launcher">Настроить профиль Julia</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}