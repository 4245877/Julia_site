class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
        this.supportedLanguages = ['en', 'ru', 'ua'];
    }

    async loadLanguage(lang) {
        // Нормализация кода языка
        lang = lang === 'rus' ? 'ru' : lang;

        if (!this.supportedLanguages.includes(lang)) {
            console.error(`Unsupported language: ${lang}`);
            return null;
        }

        try {
            const response = await fetch(`/languages/${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Detailed error loading language file:', error);
            return null;
        }
    }

    async changeLanguage(lang) {
        const prevLang = this.currentLang;
        try {
            // Добавлена нормализация языка
            lang = lang === 'rus' ? 'ru' : lang;
            
            const translations = await this.loadLanguage(lang);
            if (!translations) {
                throw new Error('Translation load failed');
            }
            
            console.log('Loaded translations:', translations);
            
            this.currentLang = lang;
            localStorage.setItem('selectedLanguage', lang);
            this.updatePageContent(translations);
            this.updateLanguageButtonStyles(lang);
        } catch (error) {
            console.error('Language change failed', error);
            alert('Не удалось сменить язык. Попробуйте позже.');
            // Исправлена рекурсивная ошибка
            if (lang !== prevLang) {
                this.changeLanguage(prevLang);
            }
        }
    }

    // Остальной код без изменений
}








//========================ПрогрессБар========================
let currentAmount = 12.53; // Изначальная сумма
const goalAmount = 1000; // Цель

function openModal() {
    document.getElementById('donateModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('donateModal').style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('donateModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Функция для обновления прогресс-бара
function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const currentAmountElement = document.getElementById('current-amount');

    // Вычисление ширины заполненной части
    const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);
    progressFill.style.width = `${progressPercentage}%`;

    // Обновление отображаемой суммы
    currentAmountElement.textContent = currentAmount.toFixed(2);
}

// Инициализация
updateProgressBar();
