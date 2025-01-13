
document.addEventListener("DOMContentLoaded", function() {
        const BUBBLE_LIFETIME = 15000; // Время жизни пузыря в миллисекундах
        const LIFETIME_VARIATION = 0.5; // Вариация времени жизни (50%)
        const BUBBLE_INTERVAL = 200; // Интервал между созданием пузырей в миллисекундах
        const MIN_BUBBLE_SIZE = 20; // Минимальный размер пузыря в пикселях
        const MAX_BUBBLE_SIZE = 70; // Максимальный размер пузыря в пикселях
        const BASE_FLOAT_SPEED = 10; // Базовая скорость движения пузыря (в пикселях в секунду)
        const SPEED_VARIATION = 5; // Погрешность скорости (в пикселях в секунду)
        const BLUR_PROBABILITY = 0.3; // Доля пузырей с эффектом размытия
        const BOTTOM_PADDING_PERCENT = 80; // Процент от высоты контейнера для порога лопания пузыря

        const containerBubbles = document.getElementById('bubbleContainer');

        function createBubble() {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';

            if (Math.random() < BLUR_PROBABILITY) {
                bubble.classList.add('blurred');
            }

            const speedOffset = Math.random() * SPEED_VARIATION * 2 - SPEED_VARIATION;
            const floatSpeed = BASE_FLOAT_SPEED + speedOffset;

            const lifetimeOffset = Math.random() * LIFETIME_VARIATION * 2 - LIFETIME_VARIATION;
            const floatDuration = (BUBBLE_LIFETIME / 1000) * (1 + lifetimeOffset);

            bubble.style.setProperty('--float-duration', `${floatDuration}s`);

            const size = Math.random() * (MAX_BUBBLE_SIZE - MIN_BUBBLE_SIZE) + MIN_BUBBLE_SIZE;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;

            const xPosition = Math.random() * 100;

            const bottomPadding = containerBubbles.clientHeight * (BOTTOM_PADDING_PERCENT / 100);
            const yPosition = Math.random() * (bottomPadding);

            bubble.style.left = `${xPosition}%`;
            bubble.style.bottom = `${yPosition}px`;

            containerBubbles.appendChild(bubble);

            let yPos = yPosition;

            const floatInterval = setInterval(() => {
                yPos += floatSpeed / 60;
                bubble.style.bottom = `${yPos}px`;

                if (yPos >= bottomPadding) {
                    clearInterval(floatInterval);
                    popBubble();
                }
            }, 1000 / 60);

            function popBubble() {
                bubble.style.animation = `pop 0.3s forwards`;
                bubble.addEventListener('animationend', () => {
                    container.removeChild(bubble);
                });
            }

            setTimeout(() => {
                if (!bubble.style.animation) {
                    popBubble();
                }
            }, floatDuration * 1000);
        }

        if (containerBubbles) {
			setInterval(createBubble, BUBBLE_INTERVAL);
		}
})