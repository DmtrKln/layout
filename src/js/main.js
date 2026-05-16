document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // SERVICES SWIPER
    // =========================

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
                updateProgress(this, ".services__progress-line");
            },

            slideChange() {
                updateProgress(this, ".services__progress-line");
            },

            resize() {
                updateProgress(this, ".services__progress-line");
            },
        },
    });

    // =========================
    // KEY AREAS SWIPER
    // =========================

    const keyAreasSwiper = new Swiper(".keyAreas__slider", {
        slidesPerView: 3,
        spaceBetween: 15,
        speed: 800,
        watchSlidesProgress: true,

        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },

        on: {
            init() {
                updateProgress(this, ".keyAreas__progress-line");
                paintCards();
            },

            slideChange() {
                updateProgress(this, ".keyAreas__progress-line");
            },

            resize() {
                updateProgress(this, ".keyAreas__progress-line");
            },
        },
    });

    // =========================
    // UPDATE PROGRESS
    // =========================

    function updateProgress(swiper, selector) {
        const progressLine = document.querySelector(selector);

        if (!progressLine) return;

        const totalSlides = swiper.slides.length;

        const slidesPerView =
            typeof swiper.params.slidesPerView === "number"
                ? swiper.params.slidesPerView
                : swiper.currentBreakpoint &&
                  swiper.params.breakpoints[swiper.currentBreakpoint]
                ? swiper.params.breakpoints[swiper.currentBreakpoint]
                      .slidesPerView
                : 1;

        const lastVisibleSlideIndex =
            swiper.activeIndex + slidesPerView;

        const progressPercent = Math.min(
            (lastVisibleSlideIndex / totalSlides) * 100,
            100
        );

        progressLine.style.width = `${progressPercent}%`;
    }

    // =========================
    // PAINT CARDS
    // =========================

    function paintCards() {
        const cards = document.querySelectorAll(".keyAreas__card");

        cards.forEach((card, index) => {
            card.style.backgroundColor =
                index % 2 === 0 ? "#D5E4F2" : "#FFFFFF";
        });
    }

    // =========================
    // DIRECTIONS ACCORDION
    // =========================

    const directionItems = document.querySelectorAll(
        ".directions__listItem"
    );

    directionItems.forEach((item) => {
        item.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });

    // =========================
    // HEADER / MOBILE MENU
    // =========================

    const header = document.querySelector(".header");
    const burger = document.querySelector(".header__burger");
    const cross = document.querySelector(".header__cross");
    const mobileMenu = document.querySelector(".header__mobile");

    const SCROLLED_CLASS = "scrolled";
    const MENU_OPEN_CLASS = "menu-open";
    const MOBILE_ACTIVE_CLASS = "active";

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 10) {
                header.classList.add(SCROLLED_CLASS);
            } else {
                header.classList.remove(SCROLLED_CLASS);

                if (
                    mobileMenu &&
                    !mobileMenu.classList.contains(
                        MOBILE_ACTIVE_CLASS
                    )
                ) {
                    header.classList.remove(MENU_OPEN_CLASS);
                }
            }
        });
    }

    if (burger && mobileMenu && header) {
        burger.addEventListener("click", () => {
            mobileMenu.classList.add(MOBILE_ACTIVE_CLASS);
            header.classList.add(MENU_OPEN_CLASS);
            document.body.classList.add("no-scroll");
        });
    }

    if (cross && mobileMenu && header) {
        cross.addEventListener("click", () => {
            mobileMenu.classList.remove(MOBILE_ACTIVE_CLASS);
            header.classList.remove(MENU_OPEN_CLASS);
            document.body.classList.remove("no-scroll");

            if (window.scrollY < 10) {
                header.classList.remove(SCROLLED_CLASS);
            }
        });
    }

    // =========================
    // INFINITE SLIDER
    // =========================

    const slider = document.getElementById("infiniteSlider");

    if (slider) {
        const images = [];

        const sliderItems = document.querySelectorAll(
            ".infiniteString__sliderItem"
        );

        sliderItems.forEach((item) => {
            const img = item.querySelector("img");

            if (img) {
                images.push(img.src);
            }
        });

        function createSlider() {
            slider.innerHTML = "";

            for (let copy = 0; copy < 3; copy++) {
                images.forEach((src) => {
                    const item = document.createElement("div");

                    item.className =
                        "infiniteString__sliderItem";

                    const img = document.createElement("img");

                    img.src = src;
                    img.alt = "sponsor";

                    item.appendChild(img);
                    slider.appendChild(item);
                });
            }
        }

        createSlider();

        let currentPosition = 0;
        let animationId = null;
        let lastTime = null;

        let isPlaying = true;
        let speed = 1;
        let pixelsPerSecond = 100;

        let widthOfOneSet = 0;

        function updateWidth() {
            const items = slider.children;

            if (items.length < images.length) return;

            let firstSetWidth = 0;

            for (let i = 0; i < images.length; i++) {
                const item = items[i];

                const marginRight =
                    parseFloat(
                        getComputedStyle(item).marginRight
                    ) || 0;

                firstSetWidth +=
                    item.offsetWidth + marginRight;
            }

            widthOfOneSet = firstSetWidth;
        }

        function animate(currentTime) {
            if (!isPlaying) {
                lastTime = null;
                animationId =
                    requestAnimationFrame(animate);
                return;
            }

            if (lastTime === null) {
                lastTime = currentTime;

                animationId =
                    requestAnimationFrame(animate);

                return;
            }

            const delta = Math.min(
                0.033,
                (currentTime - lastTime) / 1000
            );

            currentPosition +=
                pixelsPerSecond * speed * delta;

            if (
                widthOfOneSet > 0 &&
                currentPosition >= widthOfOneSet
            ) {
                currentPosition -= widthOfOneSet;
            }

            slider.style.transform = `translateX(-${currentPosition}px)`;

            lastTime = currentTime;

            animationId =
                requestAnimationFrame(animate);
        }

        window.addEventListener("load", () => {
            updateWidth();

            currentPosition = 0;

            slider.style.transform =
                "translateX(0px)";
        });

        window.addEventListener("resize", () => {
            updateWidth();

            currentPosition = 0;

            slider.style.transform =
                "translateX(0px)";

            lastTime = null;
        });

        document.addEventListener(
            "visibilitychange",
            () => {
                isPlaying = !document.hidden;
            }
        );

        animationId =
            requestAnimationFrame(animate);
    }

    // =========================
    // COOKIE
    // =========================

    const cookieBanner =
        document.getElementById("cookie-banner");

    const acceptButton =
        document.getElementById("accept-cookies");

    if (
        cookieBanner &&
        localStorage.getItem("cookiesAccepted")
    ) {
        cookieBanner.style.display = "none";
    }

    if (acceptButton && cookieBanner) {
        acceptButton.addEventListener("click", () => {
            localStorage.setItem(
                "cookiesAccepted",
                "true"
            );

            cookieBanner.style.display = "none";
        });
    }
});