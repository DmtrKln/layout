const servicesSwiper = new Swiper(".services__slider", {
    slidesPerView: 4,
    spaceBetween: 40,
    speed: 800,
    watchSlidesProgress: true,

    scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 1.1,
        },
        360: {
            slidesPerView: 1.2,
        },
        480: {
            slidesPerView: 1.5,
        },
        768: {
            slidesPerView: 2.5,
        },
        1024: {
            slidesPerView: 3,
        },
        1280: {
            slidesPerView: 4,
        },
    },

    on: {
        init() {
            updateServicesProgress(this);
        },
        slideChange() {
            updateServicesProgress(this);
        },
        resize() {
            updateServicesProgress(this);
        },
    },

});

function updateServicesProgress(swiper) {
    const progressLine = document.querySelector(".services__progress-line");

    const totalSlides = swiper.slides.length;

    const slidesPerView =
        typeof swiper.params.slidesPerView === "number"
            ? swiper.params.slidesPerView
            : swiper.currentBreakpoint
              ? swiper.params.breakpoints[swiper.currentBreakpoint]
                    .slidesPerView
              : 1;

    const lastVisibleSlideIndex = swiper.activeIndex + slidesPerView;

    const progressPercent = Math.min(
        (lastVisibleSlideIndex / totalSlides) * 100,
        100,
    );

    progressLine.style.width = `${progressPercent}%`;
}


const items = document.querySelectorAll(".directions__listItem");
items.forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY;
    console.log(scrollPos);

    if (scrollPos >= 10) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
});

const burger = document.querySelector(".header__burger");
const mobileMenu = document.querySelector(".header__mobile");

burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

const slider = document.querySelector('.map__slider');
const logos = document.querySelector('.map__sliderWrap');
const copy = logos.cloneNode(true);
copy.setAttribute('aria-hidden','true');
slider.appendChild(copy);