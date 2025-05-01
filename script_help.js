function checkRequirements() {
    const requirements = {
        os: {
            min: ['Windows 10', 'Windows 11', 'macOS 11', 'macOS 12', 'Ubuntu 20.04', 'Ubuntu 22.04'],
            rec: ['Windows 11', 'macOS 12', 'Ubuntu 22.04']
        },
        cpu: {
            min: 50, // Минимальная производительность
            rec: 80  // Рекомендуемая производительность
        },
        gpu: {
            min: 40, // Минимальная производительность
            rec: 70  // Рекомендуемая производительность
        },
        ram: {
            min: 8,
            rec: 32
        },
        storage: {
            min: 96,
            rec: 210
        }
    };

    const cpuModels = {
        // Процессоры Intel (настольные)
        'Intel Core i3-10100': 15,         // Базовый уровень, слабая производительность
        'Intel Core i3-10100T': 12,        // Энергоэффективная версия i3-10100
        'Intel Core i3-10300': 18,         // Чуть лучше i3-10100
        'Intel Core i3-10320': 20,         // Улучшенный i3-10300
        'Intel Core i3-12100': 25,         // Современный бюджетный процессор
        'Intel Core i3-12100F': 24,        // Без интегрированной графики
        'Intel Core i3-12300': 28,         // Улучшенный i3-12100
        'Intel Core i5-10400': 35,         // Средний уровень прошлого поколения
        'Intel Core i5-10400F': 34,        // Без интегрированной графики
        'Intel Core i5-10500': 38,         // Чуть лучше i5-10400
        'Intel Core i5-10600': 40,         // Средний уровень
        'Intel Core i5-10600K': 42,        // Разгоняемый i5-10600
        'Intel Core i5-10600KF': 41,       // Разгоняемый без графики
        'Intel Core i5-11400': 40,         // Средний уровень 11-го поколения
        'Intel Core i5-11400F': 39,        // Без графики
        'Intel Core i5-11500': 42,         // Улучшенный i5-11400
        'Intel Core i5-11600': 44,         // Хорошая производительность
        'Intel Core i5-11600K': 46,        // Разгоняемый i5-11600
        'Intel Core i5-11600KF': 45,       // Разгоняемый без графики
        'Intel Core i5-12400': 45,         // Современный средний уровень
        'Intel Core i5-12400F': 44,        // Без графики
        'Intel Core i5-12500': 48,         // Улучшенный i5-12400
        'Intel Core i5-12600': 50,         // Хорошая производительность
        'Intel Core i5-12600K': 52,        // Разгоняемый i5-12600
        'Intel Core i5-12600KF': 51,       // Разгоняемый без графики
        'Intel Core i5-13400F': 50,        // Хорошая производительность для игр
        'Intel Core i7-10700': 55,         // Средний-высокий уровень прошлого поколения
        'Intel Core i7-10700K': 58,        // Разгоняемый i7-10700
        'Intel Core i7-10700KF': 57,       // Разгоняемый без графики
        'Intel Core i7-11700': 60,         // Высокий уровень 11-го поколения
        'Intel Core i7-11700K': 62,        // Разгоняемый i7-11700
        'Intel Core i7-11700KF': 61,       // Разгоняемый без графики
        'Intel Core i7-12700': 65,         // Отличная производительность
        'Intel Core i7-12700K': 68,        // Разгоняемый i7-12700
        'Intel Core i7-12700KF': 67,       // Разгоняемый без графики
        'Intel Core i9-10850K': 70,        // Топ прошлого поколения
        'Intel Core i9-10900K': 72,        // Улучшенный i9-10850K
        'Intel Core i9-11900': 70,         // Топ 11-го поколения
        'Intel Core i9-11900K': 75,        // Разгоняемый i9-11900
        'Intel Core i9-11900KF': 74,       // Разгоняемый без графики
        'Intel Core i9-12900': 80,         // Современный топ
        'Intel Core i9-12900K': 85,        // Разгоняемый i9-12900
        'Intel Core i9-12900KF': 84,       // Разгоняемый без графики
        'Intel Core i9-13900K': 90,        // Очень мощный процессор
    
        // Мобильные процессоры Intel
        'Intel Core i3-1115G4': 20,        // Бюджетный мобильный процессор
        'Intel Core i5-1135G7': 30,        // Средний уровень для ноутбуков
        'Intel Core i5-1145G7': 32,        // Чуть лучше i5-1135G7
        'Intel Core i7-1165G7': 35,        // Хорошая производительность для мобильных устройств
        'Intel Core i7-1185G7': 38,        // Улучшенный i7-1165G7
    
        // Серверные процессоры Intel
        'Intel Xeon Bronze': 40,           // Серверный, начальный уровень
        'Intel Xeon Silver': 60,           // Серверный, средний уровень
        'Intel Xeon Gold': 80,             // Серверный, высокий уровень
        'Intel Xeon Platinum': 95,         // Серверный, топовый уровень
    
        // Процессоры AMD
        'AMD Ryzen 3 1200': 10,            // Очень слабый процессор
        'AMD Ryzen 3 2200G': 20,           // Бюджетный с интегрированной графикой
        'AMD Ryzen 3 3100': 25,            // Улучшенный бюджетный вариант
        'AMD Ryzen 3 3300X': 30,           // Хороший бюджетный процессор
        'AMD Ryzen 3 8300G': 30,           // Бюджетный уровень с графикой
        'AMD Ryzen 5 3600': 40,            // Популярный средний уровень
        'AMD Ryzen 5 5500': 35,            // Бюджетный средний уровень
        'AMD Ryzen 5 5500GT': 40,          // Бюджетный средний уровень с графикой
        'AMD Ryzen 5 5600GT': 45,          // Средний уровень с интегрированной графикой
        'AMD Ryzen 5 5600X': 50,           // Отличный средний уровень
        'AMD Ryzen 5 7500F': 55,           // Средний уровень без интегрированной графики
        'AMD Ryzen 5 7600': 58,            // Чуть слабее 7600X
        'AMD Ryzen 5 7600X': 60,           // Современный средний уровень
        'AMD Ryzen 5 8500G': 50,           // Бюджетный средний уровень с графикой
        'AMD Ryzen 5 8600G': 55,           // Средний уровень с интегрированной графикой
        'AMD Ryzen 5 9600X': 65,           // Современный средний уровень
        'AMD Ryzen 7 3700X': 50,           // Хороший средний-высокий уровень
        'AMD Ryzen 7 5700': 52,            // Сбалансированный средний уровень
        'AMD Ryzen 7 5700X3D': 60,         // Оптимизирован для игр
        'AMD Ryzen 7 5800X': 65,           // Отличная производительность
        'AMD Ryzen 7 5800XT': 70,          // Улучшенный 5800X
        'AMD Ryzen 7 7700': 68,            // Чуть слабее 7700X
        'AMD Ryzen 7 7700X': 70,           // Современный высокий уровень
        'AMD Ryzen 7 7800X3D': 75,         // Специализирован для игр
        'AMD Ryzen 7 8700G': 60,           // Высокий уровень с интегрированной графикой
        'AMD Ryzen 7 9700X': 72,           // Современный средний-высокий уровень
        'AMD Ryzen 9 5900X': 75,           // Топовый уровень
        'AMD Ryzen 9 5900XT': 78,          // Улучшенный 5900X
        'AMD Ryzen 9 5950X': 80,           // Очень мощный процессор
        'AMD Ryzen 9 7900': 82,            // Чуть слабее 7900X
        'AMD Ryzen 9 7900X': 85,           // Современный топ
        'AMD Ryzen 9 7900X3D': 88,         // Топ с 3D V-Cache
        'AMD Ryzen 9 7950X': 90,           // Очень мощный процессор
        'AMD Ryzen 9 7950X3D': 95,         // Топ для игр и многопоточности
        'AMD Ryzen 9 9900X': 92,           // Чуть слабее 9950X
        'AMD Ryzen 9 9950X': 98,           // Новейший топовый процессор
        'AMD Ryzen AI 9 365': 65,          // Мобильный процессор
        'AMD Ryzen AI 9 HX 370': 70,       // Мобильный процессор
        'AMD Ryzen Threadripper 7980X': 98,// Очень мощный для энтузиастов
        'AMD Ryzen Threadripper PRO 7995WX': 100 // Абсолютный топ для рабочих станций
    };

    const gpuModels = {
        // Встроенные видеокарты Intel
        'Intel UHD Graphics 630': 18,      // Базовая графика, слабая производительность
        'Intel Iris Xe Graphics': 28,      // Улучшенная встроенная графика
        'Intel Iris Xe MAX': 35,           // Чуть лучше, но не для серьёзных задач
        'Intel ARC B580': 50,              // Предположительно средний уровень (нет в thinking, оценка условна)
        'Intel ARC A380': 42,              // Начальный уровень дискретных карт
        'Intel ARC A580': 55,              // Средний уровень
        'Intel ARC A750': 62,              // Хорошая производительность для цены
        'Intel ARC A770': 68,              // Средний уровень, ближе к верхнему сегменту
    
        // Встроенные видеокарты AMD
        'AMD Radeon Vega 3': 15,           // Очень слабая графика
        'AMD Radeon Vega 8': 22,           // Базовая игровая производительность
        'AMD Radeon Vega 10': 27,          // Чуть лучше Vega 8
        'AMD Radeon RX Vega 11': 32,       // Неплохая встроенная графика
    
        // Дискретные видеокарты NVIDIA
        'NVIDIA GTX 750 Ti': 28,           // Устаревшая, но ещё рабочая
        'NVIDIA GTX 950': 32,              // Начальный уровень прошлого поколения
        'NVIDIA GTX 960': 36,              // Средний уровень прошлого поколения
        'NVIDIA GTX 970': 42,              // Хорошая производительность для своего времени
        'NVIDIA GTX 980': 46,              // Верхний сегмент прошлого поколения
        'NVIDIA GTX 980 Ti': 52,           // Почти топ своего времени
        'NVIDIA GTX 1050': 35,             // Бюджетный вариант
        'NVIDIA GTX 1050 Ti': 40,          // Улучшенный бюджетный вариант
        'NVIDIA GTX 1060': 48,             // Средний уровень для 1080p
        'NVIDIA GTX 1070': 58,             // Хорошая производительность
        'NVIDIA GTX 1070 Ti': 62,          // Ближе к верхнему сегменту
        'NVIDIA GTX 1080': 68,             // Отличная производительность
        'NVIDIA GTX 1080 Ti': 75,          // Топ своего времени
        'NVIDIA GTX 1650': 42,             // Современный бюджетный уровень
        'NVIDIA GTX 1650 Ti': 46,          // Улучшенный GTX 1650
        'NVIDIA GTX 1660': 50,             // Хороший средний уровень
        'NVIDIA GTX 1660 Super': 55,       // Улучшенная версия 1660
        'NVIDIA GTX 1660 Ti': 58,          // Ещё лучше для 1080p
        'NVIDIA RTX 2060': 65,             // Начало трассировки лучей
        'NVIDIA RTX 2060 Super': 70,       // Улучшенная версия
        'NVIDIA RTX 2070': 75,             // Хороший средний уровень
        'NVIDIA RTX 2070 Super': 80,       // Отличная производительность
        'NVIDIA RTX 2080': 85,             // Верхний сегмент
        'NVIDIA RTX 2080 Super': 90,       // Ещё лучше
        'NVIDIA RTX 2080 Ti': 95,          // Топ прошлого поколения
        'NVIDIA RTX 3060': 72,             // Хороший баланс цены и качества
        'NVIDIA RTX 3070': 82,             // Отличная производительность
        'NVIDIA RTX 3080': 92,             // Топовый уровень
        'NVIDIA RTX 3090': 97,             // Почти максимум
        'NVIDIA RTX 4080 Ti': 98,          // Улучшенная версия 3060
        'NVIDIA RTX 4090': 100,            // Абсолютный топ
    
        // Дискретные видеокарты AMD
        'AMD RX 550': 28,                  // Бюджетный уровень
        'AMD RX 560': 32,                  // Чуть лучше RX 550
        'AMD RX 570': 38,                  // Хороший бюджетный вариант
        'AMD RX 580': 42,                  // Популярный средний уровень
        'AMD RX 590': 46,                  // Улучшенный RX 580
        'AMD Vega 56': 55,                 // Средний уровень своего времени
        'AMD Vega 64': 60,                 // Хорошая производительность
        'AMD RX 5500 XT': 40,              // Современный бюджетный уровень
        'AMD RX 6500 XT': 45,              // Улучшенный бюджетный вариант
        'AMD RX 5600 XT': 52,              // Средний уровень для 1080p
        'AMD RX 5700': 58,                 // Хорошая производительность
        'AMD RX 5700 XT': 65,              // Отличный средний уровень
        'AMD RX 6600': 68,                 // Хороший современный уровень
        'AMD RX 6600 XT': 72,              // Улучшенная версия
        'AMD RX 6700': 75,                 // Средний-высокий уровень
        'AMD RX 6700 XT': 80,              // Отличная производительность
        'AMD RX 6800': 88,                 // Верхний сегмент
        'AMD RX 6800 XT': 92,              // Топовый уровень
        'AMD RX 6900 XT': 96,              // Почти максимум
        'AMD RX 6950 XT': 98,              // Очень мощная карта
        'AMD RX 7600': 70,                 // Современный средний уровень
        'AMD RX 7600 XT': 74,              // Улучшенная версия
        'AMD RX 7800': 78,                 // Хороший средний-высокий уровень
        'AMD RX 7800 XT': 82,              // Отличная производительность
        'AMD RX 7900': 85,                 // Верхний сегмент
        'AMD RX 7900 GRE': 90,             // Улучшенная версия
        'AMD RX 7900 XT': 95,              // Топовый уровень
        'AMD RX 7900 XTX': 100,            // Абсолютный топ
    
        // NVIDIA Tesla
        'NVIDIA Tesla K80': 40,            // Устаревшая вычислительная карта
        'NVIDIA Tesla P100': 50,           // Средний уровень для вычислений
        'NVIDIA Tesla V100': 60,           // Хорошая вычислительная производительность
        'NVIDIA Tesla A100': 75            // Современный топ для вычислений
    };

    const os = document.getElementById('os').value;
    const cpuInput = document.getElementById('cpu').value.trim().toLowerCase();
    const gpuInput = document.getElementById('gpu').value.trim().toLowerCase();
    const ram = parseInt(document.getElementById('ram').value);
    const storage = parseInt(document.getElementById('storage').value);
    const microphone = document.getElementById('microphone').checked;
    const speakers = document.getElementById('speakers').checked;
    const internet = document.getElementById('internet').checked;
    const webcam = document.getElementById('webcam').checked;

    let result = '';

    if (requirements.os.rec.includes(os)) {
        result += 'ОС соответствует рекомендуемым требованиям.<br>';
    } else if (requirements.os.min.includes(os)) {
        result += 'ОС соответствует минимальным требованиям.<br>';
    } else {
        result += 'ОС не соответствует требованиям.<br>';
    }

    const cpuPerformance = findModelPerformance(cpuModels, cpuInput);
    if (cpuPerformance >= requirements.cpu.rec) {
        result += 'Процессор соответствует рекомендуемым требованиям.<br>';
    } else if (cpuPerformance >= requirements.cpu.min) {
        result += 'Процессор соответствует минимальным требованиям.<br>';
    } else {
        result += 'Процессор не распознан или не соответствует требованиям.<br>';
    }

    const gpuPerformance = findModelPerformance(gpuModels, gpuInput);
    if (gpuPerformance >= requirements.gpu.rec) {
        result += 'Видеокарта соответствует рекомендуемым требованиям.<br>';
    } else if (gpuPerformance >= requirements.gpu.min) {
        result += 'Видеокарта соответствует минимальным требованиям.<br>';
    } else {
        result += 'Видеокарта не распознана или не соответствует требованиям.<br>';
    }

    if (ram >= requirements.ram.rec) {
        result += 'ОЗУ соответствует рекомендуемым требованиям.<br>';
    } else if (ram >= requirements.ram.min) {
        result += 'ОЗУ соответствует минимальным требованиям.<br>';
    } else {
        result += 'ОЗУ не соответствует требованиям.<br>';
    }

    if (storage >= requirements.storage.rec) {
        result += 'Место на диске соответствует рекомендуемым требованиям.<br>';
    } else if (storage >= requirements.storage.min) {
        result += 'Место на диске соответствует минимальным требованиям.<br>';
    } else {
        result += 'Место на диске не соответствует требованиям.<br>';
    }

    if (!microphone) {
        result += 'Микрофон необходим для голосового взаимодействия.<br>';
    }
    if (!speakers) {
        result += 'Динамики или наушники необходимы для аудио вывода.<br>';
    }
    if (!internet) {
        result += 'Интернет-соединение необходимо для работы ИИ.<br>';
    }
    if (!webcam) {
        result += 'Веб-камера рекомендуется для визуальной идентификации.<br>';
    }

    document.getElementById('result').innerHTML = result;
}

function findModelPerformance(models, input) {
    const inputWords = input.split(' ').filter(word => word.length > 0);
    for (const model in models) {
        const modelLower = model.toLowerCase();
        if (inputWords.every(word => modelLower.includes(word))) {
            return models[model];
        }
    }
    return 0;
}