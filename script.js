function changeLanguage(lang) {
    const buttons = document.querySelectorAll('[data-lang]');
    buttons.forEach(btn => btn.classList.remove('ring-4'));
    
    const selectedButton = document.querySelector(`[data-lang="${lang}"]`);
    if (selectedButton) {
        selectedButton.classList.add('ring-4');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('[data-lang]');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            changeLanguage(btn.dataset.lang);
        });
    });
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
