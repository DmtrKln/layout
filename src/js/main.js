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

    if (!progressLine) return;

    const totalSlides = swiper.slides.length;

    const slidesPerView =
        typeof swiper.params.slidesPerView === "number"
            ? swiper.params.slidesPerView
            : swiper.currentBreakpoint
                ? swiper.params.breakpoints[swiper.currentBreakpoint].slidesPerView
                : 1;

    const lastVisibleSlideIndex = swiper.activeIndex + slidesPerView;

    const progressPercent = Math.min(
        (lastVisibleSlideIndex / totalSlides) * 100,
        100
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
const burger = document.querySelector(".header__burger");
const cross = document.querySelector(".header__cross");
const mobileMenu = document.querySelector(".header__mobile");

const SCROLLED_CLASS = "scrolled";
const MENU_OPEN_CLASS = "menu-open";
const MOBILE_ACTIVE_CLASS = "active";


window.addEventListener("scroll", () => {
    if (window.scrollY >= 10) {
        header.classList.add(SCROLLED_CLASS);
    } else {
        header.classList.remove(SCROLLED_CLASS);

        // если меню открыто — не ломаем его
        if (!mobileMenu.classList.contains(MOBILE_ACTIVE_CLASS)) {
            header.classList.remove(MENU_OPEN_CLASS);
        }
    }
});


burger.addEventListener("click", () => {
    mobileMenu.classList.add(MOBILE_ACTIVE_CLASS);
    header.classList.add(MENU_OPEN_CLASS);
    document.body.classList.add("no-scroll");
});


cross.addEventListener("click", () => {
    mobileMenu.classList.remove(MOBILE_ACTIVE_CLASS);
    header.classList.remove(MENU_OPEN_CLASS);
    document.body.classList.remove("no-scroll");

    // если страница уже проскроллена — оставляем scrolled
    if (window.scrollY < 10) {
        header.classList.remove(SCROLLED_CLASS);
    }
});

const slider = document.querySelector(".map__slider");
const logos = document.querySelector(".map__sliderWrap");

if (slider && logos) {
    const copy = logos.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    slider.appendChild(copy);
}