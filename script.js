/**
 * @file Единый скрипт для управления всей интерактивностью страницы.
 * @description Включает управление модальным окном, языками, кастомизацией персонажей и другими элементами.
 */

// Ждем, пока вся структура страницы (DOM) будет готова
document.addEventListener('DOMContentLoaded', () => {

    // --- ОБЩИЕ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

    /**
     * Переключает активный класс для группы элементов.
     * @param {Element} target - Элемент, на котором произошло событие (который должен стать активным).
     * @param {string} containerSelector - Селектор родительского контейнера.
     * @param {string} itemSelector - Селектор для всех элементов в группе.
     * @param {string} activeClass - CSS-класс для активного состояния.
     */
    function handleActiveClass(target, containerSelector, itemSelector, activeClass = 'active') {
        const container = target.closest(containerSelector);
        if (!container) return;

        container.querySelectorAll(itemSelector).forEach(btn => btn.classList.remove(activeClass));
        target.classList.add(activeClass);
    }

    /**
     * Получает вложенное значение из объекта по строковому ключу (например, 'header.title').
     * @param {object} obj - Объект для поиска.
     * @param {string} key - Строковый ключ.
     * @returns {string|null} - Найденное значение или null.
     */
    function getNestedTranslation(obj, key) {
        return key.split('.').reduce((acc, part) => acc && acc[part] ? acc[part] : null, obj);
    }

    // --- УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ ---

    const modal = document.getElementById('donateModal');

    function openModal() {
        if (!modal) return;
        document.body.style.overflow = 'hidden';
        modal.style.display = 'flex';
        // Небольшая задержка, чтобы браузер успел применить display, перед добавлением класса для анимации
        setTimeout(() => modal.classList.add('active'), 10);
    }

    function closeModal() {
        if (!modal) return;
        document.body.style.overflow = '';
        modal.classList.remove('active');

        // Ждем окончания CSS-анимации, чтобы скрыть элемент.
        // { once: true } автоматически удаляет обработчик после первого выполнения.
        modal.addEventListener('transitionend', () => {
            modal.style.display = 'none';
        }, { once: true });
    }

    // Назначаем обработчики на все элементы, которые должны открывать модальное окно
    document.querySelectorAll('[data-action="open-modal"]').forEach(btn => btn.addEventListener('click', openModal));

    // Закрытие модального окна
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(); // Клик по фону (оверлею)
        });
        document.querySelector('.modal .close-button')?.addEventListener('click', closeModal); // Клик по кнопке закрытия
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });

    // --- КОПИРОВАНИЕ В БУФЕР ОБМЕНА ---

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => alert(`Скопировано: ${text}`))
            .catch(err => {
                console.error('Ошибка копирования: ', err);
                alert('Не удалось скопировать.');
            });
    }

    document.querySelectorAll('[data-copy]').forEach(element => {
        element.addEventListener('click', () => {
            const textToCopy = element.dataset.copy;
            copyToClipboard(textToCopy);
        });
    });

    // --- СИСТЕМА ПЕРЕВОДА ---

    class LanguageManager {
        constructor(supportedLanguages = ['en', 'ru', 'ua']) {
            this.supportedLanguages = supportedLanguages;
            this.currentLang = localStorage.getItem('selectedLanguage') || 'ru';
            this.translations = {};
            this.init();
        }

        async init() {
            document.querySelector(`.lang-switcher [data-lang="${this.currentLang}"]`)?.classList.add('active-lang');

            document.querySelector('.lang-switcher')?.addEventListener('click', (e) => {
                const langButton = e.target.closest('[data-lang]');
                if (langButton) {
                    this.changeLanguage(langButton.dataset.lang);
                    handleActiveClass(langButton, '.lang-switcher', '[data-lang]', 'active-lang');
                }
            });

            await this.loadAndUpdateLanguage(this.currentLang);
        }

        async loadLanguage(lang) {
            if (this.translations[lang]) {
                return this.translations[lang];
            }
            try {
                const response = await fetch(`languages/${lang}.json`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                this.translations[lang] = data; // Кэшируем переводы
                return data;
            } catch (error) {
                console.error(`Error loading language file for ${lang}:`, error);
                return null;
            }
        }

        async changeLanguage(lang) {
            if (lang === this.currentLang || !this.supportedLanguages.includes(lang)) return;
            this.currentLang = lang;
            localStorage.setItem('selectedLanguage', lang);
            await this.loadAndUpdateLanguage(lang);
        }

        async loadAndUpdateLanguage(lang) {
            const translations = await this.loadLanguage(lang);
            if (translations) {
                this.updatePageContent(translations);
            }
        }

        updatePageContent(translations) {
            document.querySelectorAll('[data-translate-key]').forEach(element => {
                const key = element.dataset.translateKey;
                const value = getNestedTranslation(translations, key);

                if (value) {
                    // Обработка специальных случаев
                    if (key === 'techStack.technologies' && Array.isArray(value)) {
                        element.innerHTML = value.map(tech => `<li>${tech}</li>`).join('');
                    } else {
                        element.textContent = value;
                    }
                } else {
                    console.warn(`Translation key not found: ${key}`);
                }
            });
        }
    }

    // Инициализация менеджера языков
    new LanguageManager(['en', 'ru', 'ua']);

    // --- ПЛАВНАЯ ПРОКРУТКА ---

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- ПРОГРЕСС-БАР ---

    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const currentAmount = parseFloat(progressFill.dataset.current || '0');
        const goalAmount = parseFloat(progressFill.dataset.goal || '100');
        const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);
        progressFill.style.width = `${progressPercentage}%`;
    }

    // --- КАСТОМИЗАЦИЯ ПЕРСОНАЖЕЙ ---

    // Переключение стилей рендера (2D / 3D / Photorealism)
    const styleButtonsContainer = document.getElementById('style-buttons');
    if (styleButtonsContainer) {
        styleButtonsContainer.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-style]');
            if (!button) return;

            handleActiveClass(button, '#style-buttons', 'button');

            const newStyle = button.dataset.style;
            document.querySelectorAll('#character-gallery img[data-char-name]').forEach(image => {
                const charName = image.dataset.charName;
                // Предполагаем, что расширение файла всегда .jpg для простоты
                image.src = `Images/Characters/${newStyle}/${charName}.jpg`;
            });
        });
    }

    // Переключение цветов
    document.querySelectorAll('.color-options').forEach(container => {
        container.addEventListener('click', (e) => {
            const colorOption = e.target.closest('.color-option');
            if (colorOption) {
                handleActiveClass(colorOption, '.color-options', '.color-option', 'selected');
            }
        });
    });


    // Раскрытие "продвинутых" настроек
    const advancedToggle = document.getElementById('advanced-toggle');
    if (advancedToggle) {
        advancedToggle.addEventListener('click', () => {
            const advancedOptions = document.getElementById('advanced-options');
            const toggleIcon = document.getElementById('toggle-icon');
            if (!advancedOptions || !toggleIcon) return;

            const isActive = advancedOptions.classList.toggle('active');
            toggleIcon.textContent = isActive ? '▲' : '▼';
        });
    }

    // Обновление значений слайдеров
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        const output = document.querySelector(`output[for="${slider.id}"]`);
        if (!output) return;

        const updateSliderOutput = () => {
            let value = slider.value;
            if (slider.dataset.unit) {
                value += ` ${slider.dataset.unit}`;
            }
            output.textContent = value;
        };

        slider.addEventListener('input', updateSliderOutput);
        updateSliderOutput(); // Устанавливаем начальное значение
    });
});