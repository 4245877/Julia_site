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
        // Header section
        document.getElementById('mainHeading').textContent = translations.header.title;
        document.getElementById('mainDescription').textContent = translations.header.subtitle;
        document.getElementById('featuresLink').textContent = translations.header.cta;

        // Features section
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.querySelector('h2').textContent = translations.features.sectionTitle;
            
            const featureTitles = featuresSection.querySelectorAll('h3');
            const featureDescriptions = featuresSection.querySelectorAll('p');
            
            if (featureTitles.length >= 3) {
                featureTitles[0].textContent = translations.features.feature1Title;
                featureTitles[1].textContent = translations.features.feature2Title;
                featureTitles[2].textContent = translations.features.feature3Title;
                
                featureDescriptions[0].textContent = translations.features.feature1Description;
                featureDescriptions[1].textContent = translations.features.feature2Description;
                featureDescriptions[2].textContent = translations.features.feature3Description;
            }
        }

        // Tech Stack section
        const techStackSection = document.querySelector('.bg-gradient-to-r.from-gray-800');
        if (techStackSection) {
            techStackSection.querySelector('h2').textContent = translations.techStack.sectionTitle;
            const whatDrivesTitle = techStackSection.querySelector('h3');
            if (whatDrivesTitle) {
                whatDrivesTitle.textContent = translations.techStack.whatDrivesTitle;
            }
            
            // Update roadmap title and image alt
            const roadmapTitle = techStackSection.querySelectorAll('h3')[1];
            const roadmapImage = techStackSection.querySelector('img');
            if (roadmapTitle) {
                roadmapTitle.textContent = translations.techStack.roadmapTitle;
            }
            if (roadmapImage) {
                roadmapImage.alt = translations.techStack.roadmapImageAlt;
            }
        }

        // Developer Journey section
        const developerSection = document.querySelector('.py-20');
        if (developerSection) {
            developerSection.querySelector('h2').textContent = translations.developerJourney.sectionTitle;
            const description = developerSection.querySelector('p:not(.text-lg.font-bold)');
            const supportText = developerSection.querySelector('.text-lg.font-bold');
            
            if (description) {
                description.textContent = translations.developerJourney.description;
            }
            if (supportText) {
                supportText.textContent = translations.developerJourney.supportText;
            }
        }

        // Donation section
        const progressInfo = document.querySelector('.progress-info');
        const donateButton = document.querySelector('.progress-container button');
        const modal = document.getElementById('donateModal');
        
        if (progressInfo) {
            const currentAmountSpan = document.getElementById('current-amount');
            const goalAmountSpan = document.getElementById('goal-amount');
            if (currentAmountSpan) currentAmountSpan.textContent = translations.donation.currentAmount;
            if (goalAmountSpan) goalAmountSpan.textContent = translations.donation.goalAmount;
        }
        
        if (donateButton) {
            donateButton.textContent = translations.donation.buttonText;
        }
        
        if (modal) {
            const modalTitle = modal.querySelector('h2');
            const modalText = modal.querySelectorAll('p');
            
            if (modalTitle) modalTitle.textContent = translations.donation.modalTitle;
            if (modalText.length >= 2) {
                modalText[0].textContent = translations.donation.paymentDetailsUAH;
                modalText[1].textContent = translations.donation.paymentDetailsUSD;
            }
        }

        // Footer section
        const footer = document.querySelector('footer');
        if (footer) {
            const footerText = footer.querySelector('.container p');
            if (footerText) {
                footerText.textContent = translations.footer.text;
            }
        }
    }
}

// Initialize after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const languageManager = new LanguageManager();
});