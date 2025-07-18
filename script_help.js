const requirements = {
    os: {
        min: ['Windows 10', 'Windows 11', 'macOS 11', 'macOS 12', 'Ubuntu 20.04', 'Ubuntu 22.04'],
        rec: ['Windows 11', 'macOS 12', 'Ubuntu 22.04']
    },
    cpu: {
        min: 50,
        rec: 80
    },
    gpu: {
        min: 40,
        rec: 70
    },
    ram: {
        min: 32,
        rec: 128
    },
    storage: {
        min: 96,
        rec: 210
    }
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

function filterModels(input, models) {
    const inputWords = input.toLowerCase().split(/\s+/);
    return models.filter(model => {
        const modelWords = model.toLowerCase().split(/[\s-]+/); // Разделяем по пробелам и дефисам
        return inputWords.every(word => modelWords.some(mWord => mWord === word));
    });
}

function displaySuggestions(suggestions, container, inputField) {
    container.innerHTML = '';
    if (suggestions.length > 0) {
        const limitedSuggestions = suggestions.slice(0, 10);
        limitedSuggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.textContent = suggestion;
            div.addEventListener('click', () => {
                inputField.value = suggestion;
                container.style.display = 'none';
            });
            container.appendChild(div);
        });
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

const cpuInput = document.getElementById('cpu');
const cpuSuggestions = document.getElementById('cpu-suggestions');
cpuInput.addEventListener('input', () => {
    const input = cpuInput.value.trim();
    if (input.length > 0) {
        const suggestions = filterModels(input, cpuList);
        displaySuggestions(suggestions, cpuSuggestions, cpuInput);
    } else {
        cpuSuggestions.style.display = 'none';
    }
});

const gpuInput = document.getElementById('gpu');
const gpuSuggestions = document.getElementById('gpu-suggestions');
gpuInput.addEventListener('input', () => {
    const input = gpuInput.value.trim();
    if (input.length > 0) {
        const suggestions = filterModels(input, gpuList);
        displaySuggestions(suggestions, gpuSuggestions, gpuInput);
    } else {
        gpuSuggestions.style.display = 'none';
    }
});

cpuInput.addEventListener('blur', () => {
    setTimeout(() => {
        cpuSuggestions.style.display = 'none';
    }, 200);
});

gpuInput.addEventListener('blur', () => {
    setTimeout(() => {
        gpuSuggestions.style.display = 'none';
    }, 200);
});

function checkRequirements() {
    const os = document.getElementById('os').value;
    const cpu = document.getElementById('cpu').value;
    const gpu = document.getElementById('gpu').value;
    const ram = parseInt(document.getElementById('ram').value) || 0;
    const storage = parseInt(document.getElementById('storage').value) || 0;
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

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

 // Прогресс-бар прокрутки
        window.addEventListener('scroll', function() {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.getElementById('progressBar').style.width = scrolled + '%';
        });

        // Плавная прокрутка к якорям
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Анимация появления элементов при прокрутке
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card-hover').forEach(el => {
            observer.observe(el);
        });

        // Функция проверки системных требований
        function checkRequirements() {
            const os = document.querySelector('input[placeholder*="Windows"]').value;
            const cpu = document.querySelector('input[placeholder*="Intel"]').value;
            const gpu = document.querySelector('input[placeholder*="NVIDIA"]').value;
            const ram = document.querySelector('input[placeholder="8"]').value;
            const storage = document.querySelector('input[placeholder="50"]').value;
            
            const microphone = document.querySelector('input[type="checkbox"]').checked;
            const speakers = document.querySelectorAll('input[type="checkbox"]')[1].checked;
            const internet = document.querySelectorAll('input[type="checkbox"]')[2].checked;
            const webcam = document.querySelectorAll('input[type="checkbox"]')[3].checked;

            const resultDiv = document.getElementById('result');
            resultDiv.classList.remove('hidden');

            let score = 0;
            let messages = [];

            // Проверка основных компонентов
            if (os) score += 20;
            if (cpu) score += 20;
            if (gpu) score += 20;
            if (ram && parseInt(ram) >= 8) score += 20;
            if (storage && parseInt(storage) >= 50) score += 20;

            // Определение статуса
            if (score >= 80) {
                resultDiv.className = 'mt-4 p-4 rounded-lg bg-green-100 border border-green-300';
                resultDiv.innerHTML = `
                    <div class="flex items-center space-x-2">
                        <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <h4 class="text-lg font-semibold text-green-800">Отлично! Ваша система полностью совместима с Julia</h4>
                    </div>
                    <p class="text-green-700 mt-2">Все системные требования выполнены. Вы можете установить и использовать Julia без ограничений.</p>
                `;
            } else if (score >= 60) {
                resultDiv.className = 'mt-4 p-4 rounded-lg bg-yellow-100 border border-yellow-300';
                resultDiv.innerHTML = `
                    <div class="flex items-center space-x-2">
                        <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                        <h4 class="text-lg font-semibold text-yellow-800">Частично совместимо</h4>
                    </div>
                    <p class="text-yellow-700 mt-2">Ваша система может запустить Julia, но некоторые функции могут работать с ограничениями. Рекомендуется обновить компоненты.</p>
                `;
            } else {
                resultDiv.className = 'mt-4 p-4 rounded-lg bg-red-100 border border-red-300';
                resultDiv.innerHTML = `
                    <div class="flex items-center space-x-2">
                        <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                        </svg>
                        <h4 class="text-lg font-semibold text-red-800">Требуется обновление системы</h4>
                    </div>
                    <p class="text-red-700 mt-2">Ваша система не соответствует минимальным требованиям. Пожалуйста, обновите компоненты для корректной работы Julia.</p>
                `;
            }

            // Анимация результата
            resultDiv.style.opacity = '0';
            resultDiv.style.transform = 'translateY(20px)';
            setTimeout(() => {
                resultDiv.style.transition = 'all 0.5s ease';
                resultDiv.style.opacity = '1';
                resultDiv.style.transform = 'translateY(0)';
            }, 100);
        }

        // Добавляем эффекты при загрузке страницы
        window.addEventListener('load', function() {
            document.querySelectorAll('.fade-in').forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.6s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        });

        // Эффект параллакса для hero-секции
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.gradient-bg');
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        });

        // Подсветка активного пункта навигации
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('nav a[href^="#"]');
            
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });