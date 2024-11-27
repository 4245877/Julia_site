// Асинхронная функция для загрузки JSON-файла
async function loadContent() {
    try {
        // Загружаем JSON
        const response = await fetch('languages/en.json');
        if (!response.ok) throw new Error('Failed to load JSON');
        
        const data = await response.json();

        // Обновляем элементы HTML
        document.getElementById('mainHeading').textContent = data.header.title;
        document.getElementById('mainDescription').textContent = data.header.subtitle;
        document.getElementById('featuresLink').textContent = data.header.cta;
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Запускаем функцию после загрузки страницы
document.addEventListener('DOMContentLoaded', loadContent);


function changeLanguage(lang) {
    // Логика смены языка
    console.log(`Язык изменен на: ${lang}`);
    
    // Пример простой реализации
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => btn.classList.remove('ring-4'));
    
    const selectedButton = document.querySelector(`[data-lang="${lang}"]`);
    if (selectedButton) {
        selectedButton.classList.add('ring-4');
    }
}

// Добавление обработчиков событий
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            changeLanguage(btn.dataset.lang);
        });
    });
});


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
