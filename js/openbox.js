
	

    const containerBox = document.getElementById('containerBox');
    const zoomedImage = document.getElementById('popupBox-img');
    const popupBox = document.getElementById('popupBox');
    const images = ['./spark1.png', './spark2.png'];

    const startFireworks = 500  // Время задерки перед первым взрывом
    const imageTransitions = 1000 // Время перехода из коробки в монетку
    const fireworksSequence = 3 // Количество серий взрывов
    const countMainParticles = 150 // Количество частиц в одном взрыве
    const countAddParticles = 100 // Количество частиц в "догоняющем" взрыве
    const addParticlesTimeout = 500 // Задержка перед "догоняющим" взрывом

    function startEffect() {
        popupBox.style.transform = 'translate(-50%, -50%) scale(1)';
        popupBox.style.opacity = '1';

        // Получаем координаты центра изображения для позиции круга
        const rect = zoomedImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Создаем эффект круга
        const circle = document.createElement('div');
        circle.classList.add('circle-effect');
        containerBox.appendChild(circle);

        // Позиционируем круг в центре изображения
        circle.style.left = `${centerX}px`;
        circle.style.top = `${centerY}px`;

        // Запускаем фейерверки и анимацию круга одновременно
        createFireworkSequence(fireworksSequence);
        transitionImage();
    }

    function transitionImage() {
        zoomedImage.style.opacity = '0';
        setTimeout(() => {
            zoomedImage.src = './img/achievement.png';
            zoomedImage.style.opacity = '1';
        }, imageTransitions);
    }

    function createParticle(x, y) {
        const isImage = Math.random() > 0.8;
        const particle = document.createElement('div');

        if (isImage) {
            const imageIndex = Math.floor(Math.random() * images.length);
            particle.classList.add('spark-image');
            particle.style.backgroundImage = `url('${images[imageIndex]}')`;
        } else {
            particle.classList.add('particle');
        }

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random();
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        const scale = Math.random() * 0.8 + 0.2;
        const rotation = Math.random() * 360 + 'deg';

        particle.style.setProperty('--dx', dx);
        particle.style.setProperty('--dy', dy);
        particle.style.setProperty('--scale', scale);
        particle.style.setProperty('--angle', rotation);

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        containerBox.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }

    function createFirework() {
        const rect = zoomedImage.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        for (let i = 0; i < countMainParticles; i++) {
            createParticle(x, y);
        }

        setTimeout(() => {
            for (let i = 0; i < countAddParticles; i++) {
                createParticle(x, y);
            }
        }, addParticlesTimeout);
    }

    function createFireworkSequence(count) {
        if (count <= 0) return;

        createFirework();

        setTimeout(() => createFireworkSequence(count - 1), Math.random() * 50 + 50);
    }