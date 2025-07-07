// Глобальные функции для модального окна
function openModal() {
    // Находим модальное окно по его ID
    const modal = document.getElementById('donateModal');
    if (modal) {
        // Меняем display и добавляем класс для анимации
        modal.style.display = 'flex';
        // Небольшая задержка, чтобы браузер успел применить display,
        // а затем сработала анимация opacity
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку фона
    }
}

function closeModal() {
    // Находим модальное окно по его ID
    const modal = document.getElementById('donateModal');
    if (modal) {
        // Убираем класс для запуска анимации исчезновения
        modal.classList.remove('active');
        // Ждем окончания анимации перед тем как скрыть окно
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500); // Время должно совпадать с transition в CSS
        document.body.style.overflow = ''; // Возвращаем прокрутку
    }
}

// Функция для копирования текста в буфер обмена
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Скопировано: ' + text);
  }).catch(err => {
    console.error('Ошибка копирования: ', err);
    // Резервный метод для старых браузеров
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Скопировано: ' + text);
  });
}

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
            featureTitles[0].textContent = translations.features.feature1Title;
            featureTitles[1].textContent = translations.features.feature2Title;
            featureTitles[2].textContent = translations.features.feature3Title;

            const featureDescriptions = document.querySelectorAll('#features p');
            if (featureDescriptions.length >= 3) {
                featureDescriptions[0].textContent = translations.features.feature1Description;
                featureDescriptions[1].textContent = translations.features.feature2Description;
                featureDescriptions[2].textContent = translations.features.feature3Description;
            }
        }

        const techStackTitle = document.getElementById('techStackTitle');
        if (techStackTitle) {
            techStackTitle.textContent = translations.techStack.sectionTitle;
        }

        const whatDrivesTitle = document.getElementById('whatDrivesTitle');
        if (whatDrivesTitle) {
            whatDrivesTitle.textContent = translations.techStack.whatDrivesTitle;
        }

        const roadmapTitle = document.getElementById('roadmapTitle');
        if (roadmapTitle) {
            roadmapTitle.textContent = translations.techStack.roadmapTitle;
        }

        const techStackList = document.getElementById('techStackList');
        if (techStackList) {
            techStackList.innerHTML = '';
            translations.techStack.technologies.forEach(tech => {
                const li = document.createElement('li');
                li.textContent = tech;
                techStackList.appendChild(li);
            });
        }

        const developerJourneyTitle = document.getElementById('developerJourneyTitle');
        if (developerJourneyTitle) {
            developerJourneyTitle.textContent = translations.developerJourney.sectionTitle;
        }

        const developerJourneyDescription = document.getElementById('developerJourneyDescription');
        if (developerJourneyDescription) {
            developerJourneyDescription.textContent = translations.developerJourney.description;
        }

        const developerJourneySupportText = document.getElementById('developerJourneySupportText');
        if (developerJourneySupportText) {
            developerJourneySupportText.textContent = translations.developerJourney.supportText;
        }

        const footerTitle = document.querySelector('footer h2');
        if (footerTitle) {
            footerTitle.textContent = translations.footer.text;
        }

        // Обновление текста в модальном окне
        const modalTitle = document.getElementById('modalTitle');
        if (modalTitle) {
            modalTitle.textContent = translations.donation.modalTitle;
        }

        const paymentDetailsUAH = document.getElementById('paymentDetailsUAH');
        if (paymentDetailsUAH) {
            paymentDetailsUAH.textContent = translations.donation.paymentDetailsUAH;
        }

        const paymentDetailsUSD = document.getElementById('paymentDetailsUSD');
        if (paymentDetailsUSD) {
            paymentDetailsUSD.textContent = translations.donation.paymentDetailsUSD;
        }

        const paymentDetailsBTC = document.getElementById('paymentDetailsBTC');
        if (paymentDetailsBTC) {
            paymentDetailsBTC.textContent = translations.donation.paymentDetailsBTC;
        }

        // Обновление текста кнопок копирования
        const copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
            button.textContent = translations.donation.copybtn;
        });

        // Обновление текста кнопки пожертвования
        const donateButton = document.querySelector('.progress-container button');
        if (donateButton) {
            donateButton.textContent = translations.donation.buttonText;
        }

        // Обновление текущей суммы и цели
        const currentAmountElement = document.getElementById('current-amount');
        const goalAmountElement = document.getElementById('goal-amount');
        const ofTextElement = document.getElementById('of-text');
        if (currentAmountElement && goalAmountElement && ofTextElement) {
            currentAmountElement.textContent = translations.donation.currentAmount;
            goalAmountElement.textContent = translations.donation.goalAmount;
            ofTextElement.textContent = translations.donation.of;
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
    const goalAmount = 100; // Цель
    const progressFill = document.getElementById('progress-fill');
    const currentAmountElement = document.getElementById('current-amount');

    if (progressFill && currentAmountElement) {
        const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);
        progressFill.style.width = `${progressPercentage}%`;
        currentAmountElement.textContent = currentAmount.toFixed(2);
    }


    // Закрытие модального окна при клике вне его
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    });


    // Закрытие модального окна при нажатии клавиши Esc
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('donateModal');
        // Проверяем, что окно видимо (имеет класс active)
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
});
// character-customization.js
document.addEventListener('DOMContentLoaded', function() {
  // Load character presets
  const characters = [
    { name: "Raphtalia", image: "Images/Characters/2D/Raphtalia.jpg" },
    { name: "Yor Forger", image: "Images/Characters/2D/YorForger.jpg" },
    { name: "Roxy Migurdia", image: "Images/Characters/2D/RoxyMigurdia.jpg" },
    { name: "Friren", image: "Images/Characters/2D/Friren.jpg" },
    { name: "Emilia", image: "Images/Characters/2D/Emilia.jpg" },
    { name: "Zero Two", image: "Images/Characters/2D/Zero Two.jpg" },
    { name: "Asuna", image: "Images/Characters/2D/Asuna.jpg" },
    { name: "Nezuko", image: "Images/Characters/2D/Nezuko.jpg" },
    { name: "Hinata", image: "Images/Characters/2D/Hinata.jpg" }
  ];

  const container = document.getElementById('character-presets');
  characters.forEach(char => {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
      <img src="${char.image}" alt="${char.name}">
      <span>${char.name}</span>
    `;
    container.appendChild(card);
  });

  // Render style buttons
  const renderButtons = document.querySelectorAll('.render-controls button');
  renderButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      renderButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      // Здесь будет логика обновления превью
    });
  });

  // Color pickers
  const colorOptions = document.querySelectorAll('.color-option');
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      const group = this.closest('.form-group');
      group.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // Advanced toggle
  const advancedToggle = document.getElementById('advanced-toggle');
  const advancedOptions = document.getElementById('advanced-options');
  const toggleIcon = document.getElementById('toggle-icon');
  
  advancedToggle.addEventListener('click', function() {
    advancedOptions.classList.toggle('active');
    toggleIcon.textContent = advancedOptions.classList.contains('active') ? '▲' : '▼';
  });
});

document.addEventListener('DOMContentLoaded', () => {
    // Находим все ползунки на странице
    const sliders = document.querySelectorAll('input[type="range"]');

    // Функция для обновления значения в <output>
    const updateSliderOutput = (slider) => {
        // Находим связанный с ползунком элемент <output> по атрибуту 'for'
        const output = document.querySelector(`output[for="${slider.id}"]`);
        if (output) {
            let value = slider.value;
            // Для ползунка роста добавляем "см"
            if (slider.id === 'height') {
                value += ' см';
            }
            output.textContent = value;
        }
    };

    // Проходим по каждому ползунку
    sliders.forEach(slider => {
        // Устанавливаем начальное значение при загрузке страницы
        updateSliderOutput(slider);

        // Добавляем слушатель события 'input', чтобы обновлять значение при движении
        slider.addEventListener('input', (event) => {
            updateSliderOutput(event.target);
        });
    });
});