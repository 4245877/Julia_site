import { injectFooter } from "./core/partials.js";

/**
 * @file Единый скрипт для управления всей интерактивностью страницы.
 * @description Включает управление модальным окном, языками, кастомизацией персонажей и другими элементами.
 */

// Ждем, пока вся структура страницы (DOM) будет готова
document.addEventListener('DOMContentLoaded', () => {

    // --- ОБЩИЕ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

    /**
     * Переключает активный класс для группы элементов.
     * @param {Element} target - Элемент, на котором произошло событие.
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
     * Получает вложенное значение из объекта по строковому ключу.
     * Например: 'header.title'.
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

        // Небольшая задержка, чтобы браузер успел применить display перед анимацией
        setTimeout(() => modal.classList.add('active'), 10);
    }

    function closeModal() {
        if (!modal) return;

        document.body.style.overflow = '';
        modal.classList.remove('active');

        // Ждем окончания CSS-анимации, чтобы скрыть элемент
        modal.addEventListener('transitionend', () => {
            modal.style.display = 'none';
        }, { once: true });
    }

    // Открытие модального окна
    document.querySelectorAll('[data-action="open-modal"]').forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Закрытие модального окна
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.querySelector('.modal .close-button')?.addEventListener('click', closeModal);
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
            document
                .querySelector(`.lang-switcher [data-lang="${this.currentLang}"]`)
                ?.classList.add('active-lang');

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
                const response = await fetch(`./i18n/${lang}.json`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                this.translations[lang] = data;

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
        const currentAmount = parseFloat(
            document.getElementById('current-amount')?.textContent || '0'
        );

        const goalAmount = parseFloat(
            document.getElementById('goal-amount')?.textContent || '100'
        );

        const progressPercentage = goalAmount > 0
            ? Math.min((currentAmount / goalAmount) * 100, 100)
            : 0;

        progressFill.style.width = `${progressPercentage}%`;
    }

    // --- КАСТОМИЗАЦИЯ ПЕРСОНАЖЕЙ ---

    // Переключение стилей рендера: 2D / 3D / Photorealism
    const styleButtonsContainer = document.getElementById('style-buttons');

    if (styleButtonsContainer) {
        styleButtonsContainer.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-style]');
            if (!button) return;

            handleActiveClass(button, '#style-buttons', 'button');

            const newStyle = button.dataset.style;

            document.querySelectorAll('#character-gallery img[data-char-name]').forEach(image => {
                const charName = image.dataset.charName;

                // Предполагаем, что расширение файла всегда .jpg
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

    // Раскрытие продвинутых настроек
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
        updateSliderOutput();
    });

    // --- ФУТЕР ---

    injectFooter();
});

// --- GOOGLE PAY ---

const GOOGLE_PAY_MERCHANT_ID = 'BCR2DN4TX7L47DYQ';

let paymentsClient = null;

// Вызывается при загрузке SDK Google Pay
function onGooglePayLoaded() {
    if (!window.google?.payments?.api) {
        console.error('Google Pay SDK не загружен.');
        return;
    }

    paymentsClient = new google.payments.api.PaymentsClient({
        environment: 'TEST'
    });

    paymentsClient.isReadyToPay({
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
            type: 'CARD',
            parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['VISA', 'MASTERCARD']
            }
        }]
    })
        .then(response => {
            if (response.result) {
                renderGooglePayButton();
            }
        })
        .catch(err => console.error('isReadyToPay error:', err));
}

// Рендерим кнопку Google Pay в контейнере
function renderGooglePayButton() {
    if (!paymentsClient) return;

    const container = document.getElementById('googlePayButtonContainer');
    if (!container) return;

    // Защита от повторного добавления кнопки
    if (container.children.length > 0) return;

    const button = paymentsClient.createButton({
        onClick: onGooglePayButtonClicked,
        buttonColor: 'default',
        buttonType: 'long'
    });

    container.appendChild(button);
}

// Обработчик клика по кнопке Google Pay
function onGooglePayButtonClicked() {
    if (!paymentsClient) return;

    const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        merchantInfo: {
            merchantId: GOOGLE_PAY_MERCHANT_ID,
            merchantName: 'Ваш Сайт Пожертвований'
        },
        allowedPaymentMethods: [{
            type: 'CARD',
            tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                    gateway: 'stripe',
                    gatewayMerchantId: 'pk_test_51RmwviQpWvUMxetMCSPlWnam13h1UNZVVBhVY56StZSpDuf9AX0SBLTDvzpR60qU0y76T1TjREdjoaYa1vRFDc9Y00IkuT5FNY'
                }
            },
            parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['VISA', 'MASTERCARD']
            }
        }],
        transactionInfo: {
            totalPriceStatus: 'ESTIMATED',
            totalPrice: '1.00',
            currencyCode: 'UAH'
        }
    };

    paymentsClient.loadPaymentData(paymentDataRequest)
        .then(paymentData => {
            // На GitHub Pages этот запрос не сработает без отдельного backend-сервера
            return fetch('/process-donation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData)
            });
        })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                alert('Дякуємо за вашу підтримку!');
            } else {
                alert('Помилка при оплаті: ' + result.error);
            }
        })
        .catch(err => console.error('loadPaymentData error:', err));
}

// Делаем функцию видимой для HTML-атрибута onload="onGooglePayLoaded()"
window.onGooglePayLoaded = onGooglePayLoaded;