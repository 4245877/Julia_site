// Глобальные функции для модального окна
function openModal() {
    // В моем HTML я использовал id="donateModal", что надежнее, чем класс.
    const modal = document.getElementById('donateModal'); 
    if (modal) {
        // Вместо добавления класса 'active', я рекомендую использовать атрибут 'hidden'.
        // Это семантически правильно и соответствует моему HTML.
        modal.hidden = false; 
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку фона
    }
}

function closeModal() {
    const modal = document.getElementById('donateModal');
    if (modal) {
        modal.hidden = true;
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Возвращаем прокрутку
    }
}

// УЛУЧШЕНИЕ: Более современная и безопасная функция копирования
async function copyToClipboard(textToCopy, buttonElement) {
    try {
        await navigator.clipboard.writeText(textToCopy);
        // UX Улучшение: даем обратную связь пользователю
        const originalText = buttonElement.textContent;
        buttonElement.textContent = 'Скопировано!';
        setTimeout(() => {
            buttonElement.textContent = originalText;
        }, 2000); // Возвращаем текст кнопки через 2 секунды
    } catch (err) {
        console.error('Не удалось скопировать текст: ', err);
        alert('Ошибка при копировании. Пожалуйста, скопируйте вручную.');
    }
}


// Класс управления языками (без изменений, ваш код здесь отличный)
class LanguageManager {
    // ... ваш код LanguageManager остается здесь без изменений ...
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'ru';
        this.supportedLanguages = ['en', 'ru', 'ua'];
        
        this.supportedLanguages.forEach(lang => {
            const button = document.querySelector(`[data-lang="${lang}"]`);
            if (button) {
                button.classList.remove('active-lang');
            }
        });

        const activeLangButton = document.querySelector(`[data-lang="${this.currentLang}"]`);
        if (activeLangButton) {
            activeLangButton.classList.add('active-lang');
        }
        
        this.init();
    }

    async init() {
        this.supportedLanguages.forEach(lang => {
            const langButton = document.querySelector(`[data-lang="${lang}"]`);
            if (langButton) {
                langButton.addEventListener('click', () => this.changeLanguage(lang));
            }
        });

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

    changeLanguage(lang) {
        const oldLangButton = document.querySelector(`[data-lang="${this.currentLang}"]`);
        if (oldLangButton) {
            oldLangButton.classList.remove('active-lang');
        }

        const newLangButton = document.querySelector(`[data-lang="${lang}"]`);
        if (newLangButton) {
            newLangButton.classList.add('active-lang');
        }

        this.loadAndUpdateLanguage(lang);
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
        // ... вся ваша логика обновления текста остается здесь ...
    }
}


// Инициализация после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {

    // --- ИСПРАВЛЕНИЕ НАЧИНАЕТСЯ ЗДЕСЬ ---
    
    // Находим все нужные элементы по их ID, которые я добавил в HTML
    const supportButton = document.getElementById('supportButton');
    const closeModalButton = document.getElementById('closeModalButton');
    const donateModal = document.getElementById('donateModal');
    
    // 1. Восстанавливаем работу кнопки "Поддержать"
    if (supportButton) {
        supportButton.addEventListener('click', () => {
            openModal(); // Вызываем вашу функцию открытия окна
        });
    }

    // 2. Восстанавливаем работу кнопки "X" (закрыть) в модальном окне
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            closeModal(); // Вызываем вашу функцию закрытия окна
        });
    }

    // 3. Закрытие модального окна при клике на фон
    if (donateModal) {
        donateModal.addEventListener('click', (event) => {
            if (event.target === donateModal) {
                closeModal();
            }
        });
    }

    // 4. Закрытие модального окна по клавише Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !donateModal.hidden) {
            closeModal();
        }
    });

    // 5. Обновляем кнопки копирования для работы с новой функцией
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const textToCopy = event.currentTarget.getAttribute('data-clipboard-text');
            copyToClipboard(textToCopy, event.currentTarget);
        });
    });

    // --- КОНЕЦ ИСПРАВЛЕНИЙ ---


    // Обработка плавной прокрутки
    // ИСПРАВЛЕНИЕ: Добавляем проверку, чтобы скрипт не мешал другим ссылкам
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Проверяем, есть ли у ссылки # и что-то после него
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

    // Инициализация прогресс-бара
    const currentAmount = 12.53;
    const goalAmount = 100;
    const progressFill = document.getElementById('progress-fill');
    const currentAmountElement = document.getElementById('current-amount');

    if (progressFill && currentAmountElement) {
        const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);
        progressFill.style.width = `${progressPercentage}%`;
        // Обновление ARIA-атрибута для доступности
        progressFill.parentElement.setAttribute('aria-valuenow', currentAmount.toFixed(2)); 
        currentAmountElement.textContent = currentAmount.toFixed(2);
    }
});