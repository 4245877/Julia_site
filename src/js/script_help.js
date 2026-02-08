document.addEventListener('DOMContentLoaded', () => {

    // Объекты с требованиями и моделями (остаются без изменений)
    const requirements = {
        os: { min: ['Windows 10', 'Windows 11', 'macOS 11', 'macOS 12', 'Ubuntu 20.04', 'Ubuntu 22.04'], rec: ['Windows 11', 'macOS 12', 'Ubuntu 22.04'] },
        cpu: { min: 50, rec: 80 },
        gpu: { min: 40, rec: 70 },
        ram: { min: 32, rec: 128 },
        storage: { min: 96, rec: 210 }
    };
    const cpuModels = {
    'Intel Core i3-10100': 15, 'Intel Core i3-10100T': 12, 'Intel Core i3-10300': 18, 'Intel Core i3-10320': 20,
    'Intel Core i3-12100': 25, 'Intel Core i3-12100F': 24, 'Intel Core i3-12300': 28, 'Intel Core i5-10400': 35,
    'Intel Core i5-10400F': 34, 'Intel Core i5-10500': 38, 'Intel Core i5-10600': 40, 'Intel Core i5-10600K': 42,
    'Intel Core i5-10600KF': 41, 'Intel Core i5-11400': 40, 'Intel Core i5-11400F': 39, 'Intel Core i5-11500': 42,
    'Intel Core i5-11600': 44, 'Intel Core i5-11600K': 46, 'Intel Core i5-11600KF': 45, 'Intel Core i5-12400': 45,
    'Intel Core i5-12400F': 44, 'Intel Core i5-12500': 48, 'Intel Core i5-12600': 50, 'Intel Core i5-12600K': 52,
    'Intel Core i5-12600KF': 51, 'Intel Core i5-13400F': 50, 'Intel Core i7-10700': 55, 'Intel Core i7-10700K': 58,
    'Intel Core i7-10700KF': 57, 'Intel Core i7-11700': 60, 'Intel Core i7-11700K': 62, 'Intel Core i7-11700KF': 61,
    'Intel Core i7-12700': 65, 'Intel Core i7-12700K': 68, 'Intel Core i7-12700KF': 67, 'Intel Core i9-10850K': 70,
    'Intel Core i9-10900K': 72, 'Intel Core i9-11900': 70, 'Intel Core i9-11900K': 75, 'Intel Core i9-11900KF': 74,
    'Intel Core i9-12900': 80, 'Intel Core i9-12900K': 85, 'Intel Core i9-12900KF': 84, 'Intel Core i9-13900K': 90,
    'Intel Core i3-1115G4': 20, 'Intel Core i5-1135G7': 30, 'Intel Core i5-1145G7': 32, 'Intel Core i7-1165G7': 35,
    'Intel Core i7-1185G7': 38, 'Intel Xeon Bronze': 40, 'Intel Xeon Silver': 60, 'Intel Xeon Gold': 80,
    'Intel Xeon Platinum': 95, 'AMD Ryzen 3 1200': 10, 'AMD Ryzen 3 2200G': 20, 'AMD Ryzen 3 3100': 25,
    'AMD Ryzen 3 3300X': 30, 'AMD Ryzen 3 8300G': 30, 'AMD Ryzen 5 3600': 40, 'AMD Ryzen 5 5500': 35,
    'AMD Ryzen 5 5500GT': 40, 'AMD Ryzen 5 5600GT': 45, 'AMD Ryzen 5 5600X': 50, 'AMD Ryzen 5 7500F': 55,
    'AMD Ryzen 5 7600': 58, 'AMD Ryzen 5 7600X': 60, 'AMD Ryzen 5 8500G': 50, 'AMD Ryzen 5 8600G': 55,
    'AMD Ryzen 5 9600X': 65, 'AMD Ryzen 7 3700X': 50, 'AMD Ryzen 7 5700': 52, 'AMD Ryzen 7 5700X3D': 60,
    'AMD Ryzen 7 5800X': 65, 'AMD Ryzen 7 5800XT': 70, 'AMD Ryzen 7 7700': 68, 'AMD Ryzen 7 7700X': 70,
    'AMD Ryzen 7 7800X3D': 75, 'AMD Ryzen 7 8700G': 60, 'AMD Ryzen 7 9700X': 72, 'AMD Ryzen 9 5900X': 75,
    'AMD Ryzen 9 5900XT': 78, 'AMD Ryzen 9 5950X': 80, 'AMD Ryzen 9 7900': 82, 'AMD Ryzen 9 7900X': 85,
    'AMD Ryzen 9 7900X3D': 88, 'AMD Ryzen 9 7950X': 90, 'AMD Ryzen 9 7950X3D': 95, 'AMD Ryzen 9 9900X': 92,
    'AMD Ryzen 9 9950X': 98, 'AMD Ryzen AI 9 365': 65, 'AMD Ryzen AI 9 HX 370': 70,
    'AMD Ryzen Threadripper 7980X': 98, 'AMD Ryzen Threadripper PRO 7995WX': 100,
    // Добавленные модели:
    'Ryzen 7 8845HS': 64,
    'Ryzen 7 8840HS': 62,
    'Ryzen 7 8840U': 58,
    'Ryzen 5 8645HS': 60,
    'Ryzen 5 8640HS': 58,
    'Ryzen 5 8640U': 54,
    'Ryzen 5 8540U': 52,
    'Ryzen 3 8440U': 48,
    'Ryzen AI 9 HX 170': 72,
    'Ryzen AI 9 165': 70,
    'Ryzen AI 7 160': 66,
    'Ryzen AI 5 150': 62
};

const gpuModels = {
    'Intel UHD Graphics 630': 18, 'Intel Iris Xe Graphics': 28, 'Intel Iris Xe MAX': 35, 'Intel ARC B580': 50,
    'Intel ARC A380': 42, 'Intel ARC A580': 55, 'Intel ARC A750': 62, 'Intel ARC A770': 68, 'AMD Radeon Vega 3': 15,
    'AMD Radeon Vega 8': 22, 'AMD Radeon 780M' : 37, 'AMD Radeon Vega 10': 27, 'AMD Radeon RX Vega 11': 32, 'NVIDIA GTX 750 Ti': 28,
    'NVIDIA GTX 950': 32, 'NVIDIA GTX 960': 36, 'NVIDIA GTX 970': 42, 'NVIDIA GTX 980': 46, 'NVIDIA GTX 980 Ti': 52,
    'NVIDIA GTX 1050': 35, 'NVIDIA GTX 1050 Ti': 40, 'NVIDIA GTX 1060': 48, 'NVIDIA GTX 1070': 58,
    'NVIDIA GTX 1070 Ti': 62, 'NVIDIA GTX 1080': 68, 'NVIDIA GTX 1080 Ti': 75, 'NVIDIA GTX 1650': 42,
    'NVIDIA GTX 1650 Ti': 46, 'NVIDIA GTX 1660': 50, 'NVIDIA GTX 1660 Super': 55, 'NVIDIA GTX 1660 Ti': 58,
    'NVIDIA RTX 2060': 65, 'NVIDIA RTX 2060 Super': 70, 'NVIDIA RTX 2070': 75, 'NVIDIA RTX 2070 Super': 80,
    'NVIDIA RTX 2080': 85, 'NVIDIA RTX 2080 Super': 90, 'NVIDIA RTX 2080 Ti': 95, 'NVIDIA RTX 3060': 72,
    'NVIDIA RTX 3070': 82, 'NVIDIA RTX 3080': 92, 'NVIDIA RTX 3090': 97, 'NVIDIA RTX 4080 Ti': 98,
    'NVIDIA RTX 4090': 100, 'AMD RX 550': 28, 'AMD RX 560': 32, 'AMD RX 570': 38, 'AMD RX 580': 42,
    'AMD RX 590': 46, 'AMD Vega 56': 55, 'AMD Vega 64': 60, 'AMD RX 5500 XT': 40, 'AMD RX 6500 XT': 45,
    'AMD RX 5600 XT': 52, 'AMD RX 5700': 58, 'AMD RX 5700 XT': 65, 'AMD RX 6600': 68, 'AMD RX 6600 XT': 72,
    'AMD RX 6700': 75, 'AMD RX 6700 XT': 80, 'AMD RX 6800': 88, 'AMD RX 6800 XT': 92, 'AMD RX 6900 XT': 96,
    'AMD RX 6950 XT': 98, 'AMD RX 7600': 70, 'AMD RX 7600 XT': 74, 'AMD RX 7800': 78, 'AMD RX 7800 XT': 82,
    'AMD RX 7900': 85, 'AMD RX 7900 GRE': 90, 'AMD RX 7900 XT': 95, 'AMD RX 7900 XTX': 100,
    'NVIDIA Tesla K80': 40, 'NVIDIA Tesla P100': 50, 'NVIDIA Tesla V100': 60, 'NVIDIA Tesla A100': 75
};
    const cpuList = Object.keys(cpuModels);
    const gpuList = Object.keys(gpuModels);

    // Логика автодополнения (suggestions)
    function setupAutocomplete(inputId, suggestionsId, modelList) {
        const inputField = document.getElementById(inputId);
        const suggestionsContainer = document.getElementById(suggestionsId);
        
        if (!inputField || !suggestionsContainer) return;

        inputField.addEventListener('input', () => {
            const input = inputField.value.trim().toLowerCase();
            if (input.length > 0) {
                const filteredModels = modelList.filter(model => model.toLowerCase().includes(input)).slice(0, 10);
                
                suggestionsContainer.innerHTML = '';
                if (filteredModels.length > 0) {
                    filteredModels.forEach(suggestion => {
                        const div = document.createElement('div');
                        div.textContent = suggestion;
                        div.addEventListener('click', () => {
                            inputField.value = suggestion;
                            suggestionsContainer.style.display = 'none';
                        });
                        suggestionsContainer.appendChild(div);
                    });
                    suggestionsContainer.style.display = 'block';
                } else {
                    suggestionsContainer.style.display = 'none';
                }
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });

        inputField.addEventListener('blur', () => {
            setTimeout(() => { suggestionsContainer.style.display = 'none'; }, 200);
        });
    }

    setupAutocomplete('cpu', 'cpu-suggestions', cpuList);
    setupAutocomplete('gpu', 'gpu-suggestions', gpuList);

    // Глобальная функция проверки требований (привязана к window, чтобы onclick работал)
    window.checkRequirements = function() {
        const os = document.getElementById('os').value;
        const cpu = document.getElementById('cpu').value;
        const gpu = document.getElementById('gpu').value;
        const ram = parseInt(document.getElementById('ram').value) || 0;
        const storage = parseInt(document.getElementById('storage').value) || 0;
        const microphone = document.getElementById('microphone').checked;
        const speakers = document.getElementById('speakers').checked;
        const internet = document.getElementById('internet').checked;
        const webcam = document.getElementById('webcam').checked;

        let messages = [];
        let totalScore = 0;
        const maxScore = 5;

        // Проверка ОС
        if (requirements.os.rec.some(recOs => os.toLowerCase().includes(recOs.toLowerCase().split(' ')[0]))) {
            messages.push('<span class="text-green-600 font-semibold">✔ ОС:</span> Соответствует рекомендуемым требованиям.');
            totalScore++;
        } else if (requirements.os.min.some(minOs => os.toLowerCase().includes(minOs.toLowerCase().split(' ')[0]))) {
            messages.push('<span class="text-yellow-600 font-semibold">✔ ОС:</span> Соответствует минимальным требованиям.');
            totalScore += 0.5;
        } else {
            messages.push('<span class="text-red-600 font-semibold">✖ ОС:</span> Не соответствует требованиям.');
        }

        // Проверка CPU
        const cpuPerformance = cpuModels[cpu] || 0;
        if (cpuPerformance >= requirements.cpu.rec) {
             messages.push('<span class="text-green-600 font-semibold">✔ Процессор:</span> Соответствует рекомендуемым требованиям.');
             totalScore++;
        } else if (cpuPerformance >= requirements.cpu.min) {
            messages.push('<span class="text-yellow-600 font-semibold">✔ Процессор:</span> Соответствует минимальным требованиям.');
            totalScore += 0.5;
        } else {
            messages.push('<span class="text-red-600 font-semibold">✖ Процессор:</span> Не соответствует требованиям.');
        }

        // Проверка GPU
        const gpuPerformance = gpuModels[gpu] || 0;
        if (gpuPerformance >= requirements.gpu.rec) {
             messages.push('<span class="text-green-600 font-semibold">✔ Видеокарта:</span> Соответствует рекомендуемым требованиям.');
             totalScore++;
        } else if (gpuPerformance >= requirements.gpu.min) {
            messages.push('<span class="text-yellow-600 font-semibold">✔ Видеокарта:</span> Соответствует минимальным требованиям.');
            totalScore += 0.5;
        } else {
            messages.push('<span class="text-red-600 font-semibold">✖ Видеокарта:</span> Не соответствует требованиям.');
        }

        // Проверка RAM
        if (ram >= requirements.ram.rec) {
            messages.push('<span class="text-green-600 font-semibold">✔ ОЗУ:</span> Соответствует рекомендуемым требованиям.');
            totalScore++;
        } else if (ram >= requirements.ram.min) {
            messages.push('<span class="text-yellow-600 font-semibold">✔ ОЗУ:</span> Соответствует минимальным требованиям.');
            totalScore += 0.5;
        } else {
            messages.push('<span class="text-red-600 font-semibold">✖ ОЗУ:</span> Не соответствует требованиям.');
        }

        // Проверка Storage
        if (storage >= requirements.storage.rec) {
            messages.push('<span class="text-green-600 font-semibold">✔ Место на диске:</span> Соответствует рекомендуемым требованиям.');
            totalScore++;
        } else if (storage >= requirements.storage.min) {
            messages.push('<span class="text-yellow-600 font-semibold">✔ Место на диске:</span> Соответствует минимальным требованиям.');
            totalScore += 0.5;
        } else {
            messages.push('<span class="text-red-600 font-semibold">✖ Место на диске:</span> Не соответствует требованиям.');
        }

        // Проверка периферии
        if (!microphone) messages.push('<span class="text-yellow-600 font-semibold">! Микрофон:</span> Необходим для голосового взаимодействия.');
        if (!internet) messages.push('<span class="text-red-600 font-semibold">! Интернет:</span> Критически необходим для работы ИИ.');

        const resultDiv = document.getElementById('result');
        let statusHTML = '';
        if (totalScore >= 4) {
             statusHTML = `<div class="p-4 rounded-lg bg-green-100 border border-green-300"><h4 class="font-bold text-green-800">Отлично! Система полностью совместима.</h4>`;
        } else if (totalScore >= 2) {
            statusHTML = `<div class="p-4 rounded-lg bg-yellow-100 border border-yellow-300"><h4 class="font-bold text-yellow-800">Частично совместимо.</h4>`;
        } else {
            statusHTML = `<div class="p-4 rounded-lg bg-red-100 border border-red-300"><h4 class="font-bold text-red-800">Требуется обновление.</h4>`;
        }
        
        resultDiv.innerHTML = statusHTML + `<ul class="list-none mt-2 space-y-1">${messages.map(m => `<li>${m}</li>`).join('')}</ul></div>`;
        resultDiv.classList.remove('hidden');
    }

    // Прогресс-бар прокрутки
    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('progressBar').style.width = scrolled + '%';
    });

    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Анимация появления элементов при прокрутке
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.section-card').forEach(el => observer.observe(el));

   const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { 
        rootMargin: '-50% 0px -50% 0px', // Срабатывает, когда секция находится в центре экрана
        threshold: 0 
    });

    sections.forEach(section => navObserver.observe(section));
});