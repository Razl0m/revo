/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Grid, Navigation } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на странице
	if (document.querySelector('.coffee__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		const swiper1 = new Swiper('.coffee__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Grid],
			grabCursor: true,
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			speed: 800,
			grid: {
				rows: 1,
			},

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},

			// Брейкпоинты

			breakpoints: {
				439: {
					grid: {
						rows: 1,
					},
					slidesPerView: 1,
				},
				440: {
					grid: {
						rows: 2,
					},
					slidesPerView: 1,
				},
				830: {
					slidesPerView: 2,
					grid: {
						rows: 2,
					},
				},
			},

			// События
			on: {
				init: function () {
					const sliderSlides = this.el.querySelectorAll(".coffee__slide");
					const countViewSlides = this.params.grid['rows'] * this.params.slidesPerView;
					sliderSlides.forEach((sliderSlide, index) => {
						if (index >= countViewSlides) {
							sliderSlide.classList.add('outside');
						}
					});
				},
			}
		});

		swiper1.on('resize', function (e) {
			OpacitySlide(e);
		});

		swiper1.on('setTranslate', function (e) {
			OpacitySlide(e);
		});
	}

	if (document.querySelector('.combo__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		const swiper1 = new Swiper('.combo__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Grid],
			grabCursor: true,
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			speed: 800,
			grid: {
				rows: 1,
			},

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},

			// Брейкпоинты

			breakpoints: {
				// 439: {
				// 	slidesPerView: 1,
				// },
				600: {
					slidesPerView: 2,
				},
				890: {
					slidesPerView: 3,
				},
			},

			// События
			on: {
				init: function () {
					const sliderSlides = this.el.querySelectorAll(".combo__slide");
					const countViewSlides = this.params.grid['rows'] * this.params.slidesPerView;
					sliderSlides.forEach((sliderSlide, index) => {
						if (index >= countViewSlides) {
							sliderSlide.classList.add('outside');
						}
					});
				},
			}
		});

		swiper1.on('resize', function (e) {
			OpacitySlide(e);
		});

		swiper1.on('setTranslate', function (e) {
			OpacitySlide(e);
		});
	}
}

// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

function OpacitySlide(e) {
	const sliderSlides = e.el.querySelectorAll(".swiper-slide");
	const gridRows = e.params.grid['rows'];
	const numberSlide = Math.round(e.progress * Math.ceil((sliderSlides.length - gridRows * e.params.slidesPerView) / gridRows));
	sliderSlides.forEach((sliderSlide, index) => {
		if (index >= numberSlide * gridRows && index < numberSlide * gridRows + gridRows * e.params.slidesPerView) {
			if (sliderSlide.classList.contains('outside')) {
				sliderSlide.classList.remove('outside');
			}
		} else {
			if (!sliderSlide.classList.contains('outside')) {
				sliderSlide.classList.add('outside')
			}
		}
	});
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	// initSlidersScroll();
});