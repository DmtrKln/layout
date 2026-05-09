// свайпер
(function () {
    const swiperEl = document.getElementById('servicesSwiper');
    if (!swiperEl) return;

    const progressLine = document.getElementById('servicesProgressLine');
    const progressThumb = document.getElementById('servicesProgressThumb');
    const progressBar = document.getElementById('servicesProgress');

    const swiper = new Swiper('#servicesSwiper', {
        slidesPerView: 1.15,
        spaceBetween: 20,
        speed: 600,

        breakpoints: {
          
            567: {
                slidesPerView: 1,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 28,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 32,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
        },

        on: {
            init(sw) { updateProgress(sw); },
            slideChange(sw) { updateProgress(sw); },
            resize(sw) { updateProgress(sw); },
        },
    });

    function updateProgress(sw) {
        const total = sw.slides.length;
        const perView = sw.params.slidesPerView;
        const numericPerView = typeof perView === 'number' ? perView : 1;
        const lastVisible = sw.activeIndex + numericPerView;
        const percent = Math.min((lastVisible / total) * 100, 100);

        if (progressLine) progressLine.style.width = percent + '%';
        if (progressThumb) progressThumb.style.left = percent + '%';
    }

    // Drag на прогресс-бар
    if (progressBar) {
        let isDragging = false;

        function getPercent(e) {
            const rect = progressBar.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        }

        function dragToSlide(e) {
            if (!isDragging) return;
            const percent = getPercent(e);
            const total = swiper.slides.length;
            const perView = typeof swiper.params.slidesPerView === 'number'
                ? swiper.params.slidesPerView : 1;
            const maxIndex = Math.max(0, total - Math.ceil(perView));
            const index = Math.round(percent * maxIndex);
            swiper.slideTo(index);
        }

        progressBar.addEventListener('mousedown', (e) => { isDragging = true; dragToSlide(e); });
        document.addEventListener('mousemove', dragToSlide);
        document.addEventListener('mouseup', () => { isDragging = false; });

        progressBar.addEventListener('touchstart', (e) => { isDragging = true; dragToSlide(e); }, { passive: true });
        document.addEventListener('touchmove', dragToSlide, { passive: true });
        document.addEventListener('touchend', () => { isDragging = false; });

        // Клик по полосе
        progressBar.addEventListener('click', (e) => {
            const percent = getPercent(e);
            const total = swiper.slides.length;
            const perView = typeof swiper.params.slidesPerView === 'number'
                ? swiper.params.slidesPerView : 1;
            const maxIndex = Math.max(0, total - Math.ceil(perView));
            swiper.slideTo(Math.round(percent * maxIndex));
        });
    }
})();

const items = document.querySelectorAll('.directions__listItem');
items.forEach(item => {
    item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// мобильное меню 
const burger = document.querySelector('.header__burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenuOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenuOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
}

if (burger) burger.addEventListener('click', openMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);