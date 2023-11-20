var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  loop: true,
  loopedSlides: 2,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  height: 100,
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  },
  speed: 2300,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
});

function mostrarImagen(id) {
  const slideIndex = obtenerIndicePorId(id);
  if (slideIndex !== -1) {
    swiper.slideTo(slideIndex); // Cambiar a la diapositiva correspondiente
  } else {
    console.error('Imagen no encontrada');
  }
}
function obtenerIndicePorId(id) {
  const slides = document.querySelectorAll('.swiper-slide');
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].getAttribute('id') === id) {
      return i;
    }
  }
  return -1; // Retorna -1 si no se encuentra el id
}

window.mostrarImagen = mostrarImagen;