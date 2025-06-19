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
        this.currentLang = localStorage.getItem('selectedLanguage') || 'ru';
        this.supportedLanguages = ['en', 'ru',ua'];
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
            // Убедитесь, что у вас есть папка 'languages' с файлами en.json, ru.json, ua.json
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
            localStorage.setItem('selectedLanguage', lang);
            this.updatePageContent(translations);
        }
    }

    updatePageContent(translations) {
        // Обновляем текст на элементах страницы
        // Пример:
        // document.getElementById('mainHeading').textContent = translations.mainHeading;
        // document.getElementById('mainDescription').textContent = translations.mainDescription;
        // document.getElementById('featuresLink').textContent = translations.featuresLink;
        // ... и так далее для всех остальных элементов
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

    // --- УСТАНОВКА ОБРАБОТЧИКОВ СОБЫТИЙ ---

    // 1. Эффект при прокрутке страницы
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Открытие/закрытие меню выбора языка
    if (langToggleBtn && langDropdownMenu) {
        langToggleBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            langDropdownMenu.classList.toggle('show');
        });
        window.addEventListener('click', () => {
            if (langDropdownMenu.classList.contains('show')) {
                langDropdownMenu.classList.remove('show');
            }
        });
    }

    // 3. Логика мобильного меню "бургер"
    if (mobileMenuBtn && mobileNavMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileNavMenu.classList.toggle('show');
        });
    }

    // 4. Открытие модального окна "Поддержать"
    if (headerSupportBtn) {
        headerSupportBtn.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
        });
    }

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
        if (event.key === 'Escape' && !donateModal.hidden) {
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
    const langManager = new LanguageManager(); // Создаем ОДИН экземпляр
    langOptions.forEach(option => {
        option.addEventListener('click', function(event) {
            event.stopPropagation();
            const selectedLang = this.getAttribute('data-lang');
            
            // Обновляем UI немедленно
            currentLangText.textContent = selectedLang.toUpperCase();
            langOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            langDropdownMenu.classList.remove('show');

            // Вызываем менеджер для загрузки и обновления контента
            langManager.loadAndUpdateLanguage(selectedLang);
        });
    });

    // Обновление UI языка при первоначальной загрузке страницы
    const activeLang = localStorage.getItem('selectedLanguage') || 'ru';
    currentLangText.textContent = activeLang.toUpperCase();
    langOptions.forEach(opt => {
        opt.classList.remove('active');
        if (opt.getAttribute('data-lang').toLowerCase() === activeLang) {
            opt.classList.add('active');
        }
    });

    // 8. Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1) { 
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
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