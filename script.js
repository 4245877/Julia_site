class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'ru';
        this.supportedLanguages = ['en', 'ru', 'ua'];
        
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
            alert('Error loading initial language. Check console for details.');
        }
    }

    async loadLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.error(`Unsupported language: ${lang}`);
            return null;
        }

        try {
            // Используем полный путь от корня сайта
            const response = await fetch('./languages/' + lang + '.json');


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
        const oldLangButton = document.querySelector(`[data-lang="${this.currentLang}"]`);
        if (oldLangButton) {
            oldLangButton.classList.remove('active-lang');
        }

        const newLangButton = document.querySelector(`[data-lang="${lang}"]`);
        if (newLangButton) {
            newLangButton.classList.add('active-lang');
        }

        await this.loadAndUpdateLanguage(lang);
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
        // Обновление элементов с переводом
        document.getElementById('mainHeading').textContent = translations.header.title;
        document.getElementById('mainDescription').textContent = translations.header.subtitle;
        document.getElementById('featuresLink').textContent = translations.header.cta;

        const sectionTitles = {
            'features': translations.features.sectionTitle,
            'techStack': translations.techStack.sectionTitle,
            'developerJourney': translations.developerJourney.sectionTitle
        };

        Object.entries(sectionTitles).forEach(([id, title]) => {
            const sectionTitleElement = document.querySelector(`#${id} h2`);
            if (sectionTitleElement) {
                sectionTitleElement.textContent = title;
            }
        });

        const featureTitles = document.querySelectorAll('#features h3');
        if (featureTitles.length >= 3) {
            featureTitles[0].textContent = translations.features.feature1Title;
            featureTitles[1].textContent = translations.features.feature2Title;
            featureTitles[2].textContent = translations.features.feature3Title;

            const featureDescriptions = document.querySelectorAll('#features p');
            featureDescriptions[0].textContent = translations.features.feature1Description;
            featureDescriptions[1].textContent = translations.features.feature2Description;
            featureDescriptions[2].textContent = translations.features.feature3Description;
        }

        const techStackTitle = document.querySelector('section:nth-child(3) h3');
        if (techStackTitle) {
            techStackTitle.textContent = translations.techStack.whatDrivesTitle;
        }
    }
}

// Инициализация после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const languageManager = new LanguageManager();
});


//========================ПрогрессБар========================
let currentAmount = 12.53; // Изначальная сумма
const goalAmount = 1000; // Цель

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('donateModal');
    const progressFill = document.getElementById('progress-fill');
    const currentAmountElement = document.getElementById('current-amount');

    function openModal() {
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Функция для обновления прогресс-бара
    function updateProgressBar() {
        // Вычисление ширины заполненной части
        const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);
        progressFill.style.width = `${progressPercentage}%`;

        // Обновление отображаемой суммы
        currentAmountElement.textContent = currentAmount.toFixed(2);
    }

    // Инициализация
    updateProgressBar();
});
