// Глобальные функции для модального окна
function openModal() {
    const modal = document.getElementById('donateModal');
    if (modal) {
        modal.hidden = false;
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('donateModal');
    if (modal) {
        modal.hidden = true;
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// Улучшенная функция копирования
async function copyToClipboard(textToCopy, buttonElement) {
    try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = buttonElement.textContent;
        buttonElement.textContent = 'Скопировано!';
        setTimeout(() => {
            buttonElement.textContent = originalText;
        }, 2000);
    } catch (err) {
        console.error('Не удалось скопировать текст: ', err);
        alert('Ошибка при копировании. Пожалуйста, скопируйте вручную.');
    }
}


// Класс управления языками (без изменений)
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'ru';
        this.supportedLanguages = ['en', 'ru', 'ua'];
        this.translations = {};

        this.init();
    }

    async init() {
        await this.loadAndUpdateLanguage(this.currentLang);

        this.supportedLanguages.forEach(lang => {
            const langOption = document.querySelector(`.lang-option[data-lang="${lang}"]`);
            if (langOption) {
                langOption.addEventListener('click', () => this.changeLanguage(lang));
            }
        });

        this.updateLangButtonUI();
    }

    async loadLanguage(lang) {
        if (this.translations[lang]) {
            return this.translations[lang];
        }
        if (!this.supportedLanguages.includes(lang)) {
            console.error(`Unsupported language: ${lang}`);
            return null;
        }
        try {
            const response = await fetch(`languages/${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.translations[lang] = data; // Кэшируем переводы
            return data;
        } catch (error) {
            console.error('Error loading language file:', error);
            return null;
        }
    }

    async changeLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        await this.loadAndUpdateLanguage(lang);
        document.documentElement.lang = lang; // Обновляем атрибут lang у html
        this.updateLangButtonUI();
    }
    
    updateLangButtonUI() {
        // Убираем активный класс со всех кнопок
        this.supportedLanguages.forEach(lang => {
            const langOption = document.querySelector(`.lang-option[data-lang="${lang}"]`);
            if (langOption) {
                langOption.classList.remove('active-lang');
            }
        });
        // Добавляем активный класс текущей кнопке
        const activeLangOption = document.querySelector(`.lang-option[data-lang="${this.currentLang}"]`);
        if (activeLangOption) {
            activeLangOption.classList.add('active-lang');
        }
    }

    async loadAndUpdateLanguage(lang) {
        const translations = await this.loadLanguage(lang);
        if (translations) {
            this.updatePageContent(translations);
        }
    }

    updatePageContent(translations) {
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });
    }
}


// Инициализация после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {

    // --- НАЧАЛО ИСПРАВЛЕНИЙ ---
    
    // Находим все нужные элементы
    const headerDonateButton = document.querySelector('.donate-btn');
    const supportButton = document.getElementById('supportButton');
    const closeModalButton = document.getElementById('closeModalButton');
    const donateModal = document.getElementById('donateModal');
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');

    // 1. Восстанавливаем работу кнопки "Donate" в шапке
    if (headerDonateButton) {
        headerDonateButton.addEventListener('click', openModal);
    }
    
    // Работа кнопки "Поддержать" (у вас уже было, оставляем)
    if (supportButton) {
        supportButton.addEventListener('click', openModal);
    }

    // Работа кнопки "X" (закрыть) в модальном окне
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }
    
    // 2. Восстанавливаем работу кнопки смены языка (глобус)
    if (langToggle && langDropdown) {
        langToggle.addEventListener('click', (event) => {
            // Предотвращаем "всплытие" события, чтобы не сработал обработчик на документе
            event.stopPropagation(); 
            langDropdown.classList.toggle('show');
        });
    }

    // 3. Улучшение: закрываем выпадающее меню языка при клике в любом другом месте
    document.addEventListener('click', () => {
        if (langDropdown && langDropdown.classList.contains('show')) {
            langDropdown.classList.remove('show');
        }
    });

    // --- КОНЕЦ ИСПРАВЛЕНИЙ ---


    // Закрытие модального окна при клике на фон и по клавише Escape
    if (donateModal) {
        donateModal.addEventListener('click', (event) => {
            if (event.target === donateModal) {
                closeModal();
            }
        });
    }
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !donateModal.hidden) {
            closeModal();
        }
    });

    // Обработчики для кнопок копирования
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const textToCopy = event.currentTarget.getAttribute('data-clipboard-text');
            copyToClipboard(textToCopy, event.currentTarget);
        });
    });

    // Обработка плавной прокрутки (без изменений)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Инициализация языкового менеджера
    new LanguageManager();

    // Инициализация прогресс-бара (без изменений)
    const currentAmount = 12.53;
    const goalAmount = 100;
    const progressFill = document.getElementById('progress-fill');
    const currentAmountElement = document.getElementById('current-amount');
    if (progressFill && currentAmountElement) {
        const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);
        progressFill.style.width = `${progressPercentage}%`;
        progressFill.parentElement.setAttribute('aria-valuenow', currentAmount.toFixed(2));
        currentAmountElement.textContent = currentAmount.toFixed(2);
    }
});