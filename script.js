// Глобальные функции для модального окна
window.openModal = function() {
    const modal = document.getElementById('donateModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку фона
    }
};

window.closeModal = function() {
    const modal = document.getElementById('donateModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Возвращаем прокрутку
    }
};

// Класс управления языками
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'ru';
        this.supportedLanguages = ['en', 'ru', 'ua'];
        
        // Удаляем все предыдущие классы active-lang
        this.supportedLanguages.forEach(lang => {
            const button = document.querySelector(`[data-lang="${lang}"]`);
            if (button) {
                button.classList.remove('active-lang');
            }
        });

        // Добавляем класс active-lang текущему языку
        const activeLangButton = document.querySelector(`[data-lang="${this.currentLang}"]`);
        if (activeLangButton) {
            activeLangButton.classList.add('active-lang');
        }
        
        this.init();
    }

    async init() {
        // Добавляем обработчики для кнопок языка
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
            // Убираем alert, чтобы не беспокоить пользователя
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
            return null; // Возвращаем null в случае ошибки
        }
    }

    changeLanguage(lang) { // Убираем async
        // Удаляем класс active-lang у предыдущего активного языка
        const oldLangButton = document.querySelector(`[data-lang="${this.currentLang}"]`);
        if (oldLangButton) {
            oldLangButton.classList.remove('active-lang');
        }

        // Добавляем класс active-lang новому активному языку
        const newLangButton = document.querySelector(`[data-lang="${lang}"]`);
        if (newLangButton) {
            newLangButton.classList.add('active-lang');
        }

        this.loadAndUpdateLanguage(lang); // Убираем await
    }

    async loadAndUpdateLanguage(lang) {
        const translations = await this.loadLanguage(lang);
        if (translations) { // Добавляем проверку
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
            featureTitles[0].text
            Content = translations.features.feature1Title;
            featureTitles[1].textContent = translations.features.feature2Title;
            featureTitles[2].textContent = translations.features.feature3Title;

            const featureDescriptions = document.querySelectorAll('#features p');
            if (featureDescriptions.length >= 3) {
                featureDescriptions[0].textContent = translations.features.feature1Description;
                featureDescriptions[1].textContent = translations.features.feature2Description;
                featureDescriptions[2].textContent = translations.features.feature3Description;
            }
        }

        const techStackTitle = document.querySelector('section:nth-child(3) h3');
        if (techStackTitle) {
            techStackTitle.textContent = translations.techStack.whatDrivesTitle;
        }

        const developerJourneyTitle = document.querySelector('section:nth-child(4) h2');
        if (developerJourneyTitle) {
            developerJourneyTitle.textContent = translations.developerJourney.sectionTitle;
        }

        const footerTitle = document.querySelector('footer h2');
        if (footerTitle) {
            footerTitle.textContent = translations.footer.title;
        }
    }
}

// Инициализация после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Обработка плавной прокрутки
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Инициализация языкового менеджера
    const languageManager = new LanguageManager();

    // Инициализация прогресс-бара
    const currentAmount = 12.53; // Изначальная сумма
    const goalAmount = 1000; // Цель
    const progressFill = document.getElementById('progress-fill');
    const currentAmountElement = document.getElementById('current-amount');

    if (progressFill && currentAmountElement) {
        const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);
        progressFill.style.width = `${progressPercentage}%`;
        currentAmountElement.textContent = currentAmount.toFixed(2);
    }

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('donateModal');
        if (event.target === modal) {
            closeModal();
        }
    });
});