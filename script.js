// script.js

// --- Глобальные функции для модального окна поддержки ---

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

// --- Класс управления языками ---
class LanguageManager {
    constructor() {
        this.currentLang = sessionStorage.getItem('selectedLanguage') || 'ru';
        this.supportedLanguages = ['en', 'ru', 'ua'];
        this.init();
    }

    async init() {
        try {
            await this.loadAndUpdateLanguage(this.currentLang);
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    async loadLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.error(`Unsupported language: ${lang}`);
            return null;
        }
        try {
            const response = await fetch(`languages/${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading language file:', error);
            return null;
        }
    }

    async loadAndUpdateLanguage(lang) {
        const translations = await this.loadLanguage(lang);
        if (translations) {
            this.currentLang = lang;
            sessionStorage.setItem('selectedLanguage', lang);
            this.updatePageContent(translations);
        }
    }

    updatePageContent(translations) {
        const elements = {
            'mainHeading': translations.mainHeading,
            'mainDescription': translations.mainDescription,
            'featuresLink': translations.featuresLink,
            'features-heading': translations.featuresHeading,
            'tech-heading': translations.techHeading,
            'launcherTitle': translations.launcherTitle,
            'developerJourneyTitle': translations.developerJourneyTitle
        };

        Object.keys(elements).forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element && elements[elementId]) {
                element.textContent = elements[elementId];
            }
        });
    }
}

// --- Инициализация после полной загрузки DOM ---
document.addEventListener('DOMContentLoaded', () => {

    // --- ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ---
    const header = document.querySelector('.header');
    const langToggleBtn = document.getElementById('language-toggle-btn');
    const langDropdownMenu = document.getElementById('language-dropdown-menu');
    const langOptions = document.querySelectorAll('.language-option');
    const currentLangText = document.getElementById('current-lang-text');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const headerSupportBtn = document.getElementById('header-support-btn');
    const donateModal = document.getElementById('donateModal');
    const closeModalButton = document.getElementById('closeModalButton');
    const copyButtons = document.querySelectorAll('.copy-button');
    
    // --- НОВАЯ ПЕРЕМЕННАЯ ---
    // Находим секцию "Обо мне", чтобы сделать ее кликабельной
    const developerJourneySection = document.getElementById('developerJourneyTitle');


    // --- УСТАНОВКА ОБРАБОТЧИКОВ СОБЫТИЙ ---

    // 1. Эффект при прокрутке страницы
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // 2. Открытие/закрытие меню выбора языка
    if (langToggleBtn && langDropdownMenu) {
        langToggleBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            langDropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
            if (!langDropdownMenu.contains(event.target) && !langToggleBtn.contains(event.target)) {
                langDropdownMenu.classList.remove('show');
            }
        });
    }

    // 3. Логика мобильного меню "бургер"
    if (mobileMenuBtn && mobileNavMenu) {
        mobileMenuBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            mobileNavMenu.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
            if (!mobileNavMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileNavMenu.classList.remove('show');
            }
        });

        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileNavMenu.classList.remove('show');
            });
        });
    }

    // 4. Открытие модального окна "Поддержать" (ДВА ОБРАБОТЧИКА)
    // Обработчик для кнопки в шапке
    if (headerSupportBtn) {
        headerSupportBtn.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
        });
    }
    
    // --- НОВЫЙ КОД ---
    // Обработчик для секции "Обо мне"
    if (developerJourneySection) {
        developerJourneySection.addEventListener('click', () => {
            openModal();
        });
    }
    // --- КОНЕЦ НОВОГО КОДА ---

    // 5. Закрытие модального окна (кнопка, фон, клавиша Esc)
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }
    if (donateModal) {
        donateModal.addEventListener('click', (event) => {
            if (event.target === donateModal) closeModal();
        });
    }
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && donateModal && !donateModal.hidden) {
            closeModal();
        }
    });

    // 6. Инициализация кнопок копирования
    copyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const textToCopy = event.currentTarget.getAttribute('data-clipboard-text');
            copyToClipboard(textToCopy, event.currentTarget);
        });
    });

    // 7. Инициализация и обработка смены языка
    const langManager = new LanguageManager();
    
    langOptions.forEach(option => {
        option.addEventListener('click', function(event) {
            event.stopPropagation();
            const selectedLang = this.getAttribute('data-lang').toLowerCase();

            if (currentLangText) {
                currentLangText.textContent = selectedLang.toUpperCase();
            }
            
            langOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            if (langDropdownMenu) {
                langDropdownMenu.classList.remove('show');
            }

            langManager.loadAndUpdateLanguage(selectedLang);
        });
    });

    const activeLang = sessionStorage.getItem('selectedLanguage') || 'ru';
    if (currentLangText) {
        currentLangText.textContent = activeLang.toUpperCase();
    }
    
    langOptions.forEach(opt => {
        opt.classList.remove('active');
        if (opt.getAttribute('data-lang').toLowerCase() === activeLang.toLowerCase()) {
            opt.classList.add('active');
        }
    });

    // 8. Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // 9. Инициализация прогресс-бара
    const currentAmount = 12.53;
    const goalAmount = 100;
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);
        progressFill.style.width = `${progressPercentage}%`;
        progressFill.parentElement.setAttribute('aria-valuenow', currentAmount.toFixed(2));
    }
});