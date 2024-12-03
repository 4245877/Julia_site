class LanguageManager {
    constructor() {
        this.currentLang = 'en'; // Default language
        this.supportedLanguages = ['en', 'ru', 'ua'];
    }

    async loadLanguage(lang) {
        // Validate language
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
            console.error('Error loading language file:', error);
            return null;
        }
    }

    async changeLanguage(lang) {
        const translations = await this.loadLanguage(lang);
        if (!translations) return;

        this.currentLang = lang;
        this.updatePageContent(translations);
        this.updateLanguageButtonStyles(lang);
    }

    updatePageContent(translations) {
        // Обновление текста модального окна
        const modalTitle = document.querySelector('#donateModal h2');
        const modalDetails = document.querySelector('#donateModal p');
        if (modalTitle) {
            modalTitle.textContent = translations.donation.modalTitle;
        }
        if (modalDetails) {
            modalDetails.textContent = translations.donation.paymentDetails;
        }
    
        // Обновление других разделов, если они есть
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            // Обновление заголовков и описаний функций
            const sectionTitle = featuresSection.querySelector('h2');
            if (sectionTitle) {
                sectionTitle.textContent = translations.features.sectionTitle;
            }
    
            const featureBlocks = featuresSection.querySelectorAll('div > div');
            if (featureBlocks.length >= 3) {
                const features = [
                    { titleKey: 'feature1Title', descKey: 'feature1Description' },
                    { titleKey: 'feature2Title', descKey: 'feature2Description' },
                    { titleKey: 'feature3Title', descKey: 'feature3Description' }
                ];
    
                features.forEach((feature, index) => {
                    const titleElement = featureBlocks[index].querySelector('h3');
                    const descElement = featureBlocks[index].querySelector('p');
    
                    if (titleElement) {
                        titleElement.textContent = translations.features[feature.titleKey];
                    }
                    if (descElement) {
                        descElement.textContent = translations.features[feature.descKey];
                    }
                });
            }
        }
    }
    

    updateLanguageButtonStyles(lang) {
        const buttons = document.querySelectorAll('[data-lang]');
        buttons.forEach(btn => {
            btn.classList.remove('ring-4');
            if (btn.dataset.lang === lang) {
                btn.classList.add('ring-4');
            }
        });
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const languageManager = new LanguageManager();

    // Setup language switch buttons
    const buttons = document.querySelectorAll('[data-lang]');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            languageManager.changeLanguage(btn.dataset.lang);
        });
    });

    // Optional: Set initial language to browser language if supported
    const browserLang = navigator.language.split('-')[0];
    if (languageManager.supportedLanguages.includes(browserLang)) {
        languageManager.changeLanguage(browserLang);
    }
});



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
