// script.js

// --- Глобальные функции для модального окна поддержки ---
function openModal() {
    const modal = document.getElementById('donateModal');
    const mainContent = document.querySelector('main'); // Для эффекта размытия (опционально)
    if (modal) {
        modal.classList.add('active'); // Используем класс для анимации
        document.body.style.overflow = 'hidden';
        if (mainContent) mainContent.classList.add('blur'); // Добавляем размытие
    }
}

function closeModal() {
    const modal = document.getElementById('donateModal');
    const mainContent = document.querySelector('main'); // Для эффекта размытия (опционально)
    if (modal) {
        modal.classList.remove('active'); // Убираем класс для анимации
        document.body.style.overflow = '';
        if (mainContent) mainContent.classList.remove('blur'); // Убираем размытие
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
        if (!this.supportedLanguages.includes(lang.toLowerCase())) {
            console.error(`Unsupported language: ${lang}`);
            return null;
        }
        try {
            // Убедимся, что путь к файлу корректный
            const response = await fetch(`languages/${lang.toLowerCase()}.json`);
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
            this.currentLang = lang.toLowerCase();
            sessionStorage.setItem('selectedLanguage', this.currentLang);
            this.updatePageContent(translations);
        }
    }

    updatePageContent(translations) {
        // Проходим по всем ключам в файле перевода
        Object.keys(translations).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                // Используем innerHTML чтобы поддерживать теги, если они есть в переводе
                element.innerHTML = translations[key];
            }
        });
    }
}

// --- Инициализация после полной загрузки DOM ---
document.addEventListener('DOMContentLoaded', () => {

    // --- ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ---
    const header = document.querySelector('header'); // Выбираем по тегу
    const langToggleBtn = document.getElementById('language-toggle-btn');
    const langDropdownMenu = document.getElementById('language-dropdown-menu');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangText = document.getElementById('current-lang-text');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const headerSupportBtn = document.getElementById('header-support-btn');
    const mobileSupportBtn = document.getElementById('mobile-support-btn'); // Кнопка в мобильном меню
    const developerJourneySection = document.getElementById('developerJourneyTitle');
    const donateModal = document.getElementById('donateModal');
    const closeModalButton = document.getElementById('closeModalButton');
    const copyButtons = document.querySelectorAll('.copy-button');
    

    // --- УСТАНОВКА ОБРАБОТЧИКОВ СОБЫТИЙ ---

    // 1. Эффект при прокрутке страницы
    if (header) {
        window.addEventListener('scroll', () => {
            // h-20 в Tailwind это 5rem, что примерно 80px. Сделаем триггер поменьше.
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // 2. Открытие/закрытие меню выбора языка
    if (langToggleBtn && langDropdownMenu) {
        langToggleBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            langDropdownMenu.classList.toggle('active'); // Используем .active
        });

        document.addEventListener('click', () => {
            langDropdownMenu.classList.remove('active'); // Закрываем при клике в любом месте
        });
    }
    
    // 3. Логика мобильного меню "бургер"
    if (mobileMenuBtn && mobileNavMenu) {
        mobileMenuBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            // Синхронизируем классы: .open для обоих элементов
            mobileMenuBtn.classList.toggle('open');
            mobileNavMenu.classList.toggle('open');
        });

        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('open');
                mobileNavMenu.classList.remove('open');
            });
        });
    }

    // 4. Открытие модального окна "Поддержать"
    if (headerSupportBtn) {
        headerSupportBtn.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
        });
    }
    if (mobileSupportBtn) {
        mobileSupportBtn.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
        });
    }
    if(developerJourneySection) {
        // Сделаем кликабельной всю секцию "Обо мне"
        const parentSection = developerJourneySection.closest('section');
        if (parentSection) {
            parentSection.style.cursor = 'pointer';
            parentSection.addEventListener('click', (event) => {
                // Предотвращаем открытие окна при клике на ссылку внутри секции
                if (event.target.tagName !== 'A') {
                    openModal();
                }
            });
        }
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
        if (event.key === 'Escape' && donateModal && donateModal.classList.contains('active')) {
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

            langManager.loadAndUpdateLanguage(selectedLang).then(() => {
                if (currentLangText) {
                    currentLangText.textContent = selectedLang.toUpperCase();
                }
                
                langOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                if (langDropdownMenu) {
                    langDropdownMenu.classList.remove('active');
                }
            });
        });
    });

    // Установка активного языка при загрузке страницы
    const activeLang = sessionStorage.getItem('selectedLanguage') || 'ru';
    if (currentLangText) {
        currentLangText.textContent = activeLang.toUpperCase();
    }
    langOptions.forEach(opt => {
        opt.classList.remove('active');
        if (opt.getAttribute('data-lang').toLowerCase() === activeLang) {
            opt.classList.add('active');
        }
    });

    // 8. Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1) {
                e.preventDefault();
                const targetElement = document.getElementById(href.substring(1));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
});