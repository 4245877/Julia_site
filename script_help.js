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
        'Intel Core i3 10100': 40,
        'Intel Core i3 12100F': 48,
        'Intel Core i5 10400F': 52,
        'Intel Core i5 13400F': 55,
        'Intel Core i5 12400': 60,
        'Intel Core i7 10700': 70,
        'Intel Core i7 12700': 85,
        'Intel Core i9 11900K': 88,
        'Intel Core i9 12900K': 95,
        'Intel Core i9 13900K': 98,
        'AMD Ryzen 3 3100': 42,
        'AMD Ryzen 3 3300X': 45,
        'AMD Ryzen 5 3600': 55,
        'AMD Ryzen 5 5500': 50,
        'AMD Ryzen 5 5600X': 65,
        'AMD Ryzen 7 3700X': 80,
        'AMD Ryzen 7 5800X': 88,
        'AMD Ryzen 9 5900X': 90,
        'AMD Ryzen 9 5950X': 94,
        'AMD Ryzen 9 7950X': 99
    };

    const gpuModels = {
        'NVIDIA GTX 1050 Ti': 35,
        'NVIDIA GTX 1650': 38,
        'NVIDIA GTX 1660': 42,
        'NVIDIA GTX 1070': 45,
        'NVIDIA RTX 2060': 60,
        'NVIDIA RTX 3060': 75,
        'NVIDIA RTX 3070': 85,
        'NVIDIA RTX 3080': 90,
        'NVIDIA RTX 3090': 95,
        'NVIDIA RTX 4090': 99,
        'AMD RX 550': 30,
        'AMD RX 5600 XT': 40,
        'AMD RX 6600': 70,
        'AMD RX 6700 XT': 80,
        'AMD RX 6800': 85,
        'AMD RX 6800 XT': 90,
        'AMD RX 6900 XT': 93,
        'AMD RX 7900 XT': 97,
        'AMD RX 7900 XTX': 98
    };

    const os = document.getElementById('os').value;
    const cpu = document.getElementById('cpu').value;
    const gpu = document.getElementById('gpu').value;
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

    const cpuPerformance = cpuModels[cpu] || 0;
    if (cpuPerformance >= requirements.cpu.rec) {
        result += 'Процессор соответствует рекомендуемым требованиям.<br>';
    } else if (cpuPerformance >= requirements.cpu.min) {
        result += 'Процессор соответствует минимальным требованиям.<br>';
    } else {
        result += 'Процессор не соответствует требованиям.<br>';
    }

    const gpuPerformance = gpuModels[gpu] || 0;
    if (gpuPerformance >= requirements.gpu.rec) {
        result += 'Видеокарта соответствует рекомендуемым требованиям.<br>';
    } else if (gpuPerformance >= requirements.gpu.min) {
        result += 'Видеокарта соответствует минимальным требованиям.<br>';
    } else {
        result += 'Видеокарта не соответствует требованиям.<br>';
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