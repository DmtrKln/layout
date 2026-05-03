const initSlider = () => {
  new Swiper('.services__slider', {
    slidesPerView: 'auto',
    spaceBetween: 65,

    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true, //мышь
        onlyInViewport: true, //клава
    },
  });
};

document.addEventListener('DOMContentLoaded', initSlider);