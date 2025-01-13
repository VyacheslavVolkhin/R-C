
document.addEventListener("DOMContentLoaded", function() {
	
	const START_X = 100; // Начальная координата по X
	const START_Y = 100; // Начальная координата по Y
	const STEP = 5; // Шаг между буквами
	const DEFAULT_COUNT = 3; // Количество букв по умолчанию
	const INTERVAL = 300; // Интервал между буквами
	const LOOP_ENABLED = true; // Повторение процесса
	const LETTER_LIFETIME = 3000; // Время жизни буквы

	const containerZzz = document.getElementById('zzzContainer');
	
	function createZ(x, y) {
		const span = document.createElement('span');
		span.textContent = 'z';
		span.className = 'zzz';
		span.style.left = `${x}px`;
		span.style.top = `${y}px`;
		containerZzz.appendChild(span);
		setTimeout(() => span.remove(), LETTER_LIFETIME);
	}

	function startProcess(x, y, count = DEFAULT_COUNT, loop = LOOP_ENABLED, interval = INTERVAL) {
		function createSequence() {
			for (let i = 0; i < count; i++) {
				setTimeout(() => {
					createZ(x + i * STEP, y + i * STEP);
				}, i * interval);
			}
		}

		createSequence();
		if (loop) {
			setInterval(createSequence, count * interval + 1000);
		}
	}

	
	if (containerZzz) {
		startProcess(START_X, START_Y);
	}
	
})