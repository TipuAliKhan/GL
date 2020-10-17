// accordion
const accordions = document.querySelectorAll(".accordion");
for (const accordion of accordions) {
    const panels = accordion.querySelectorAll(".accordion-panel");
    for (const panel of panels) {
        const head = panel.querySelector(".accordion-header");
        head.addEventListener('click', () => {
            for (const otherPanel of panels) {
                if (otherPanel !== panel) {
                    otherPanel.classList.remove('accordion-expanded');
                }
            }
            panel.classList.toggle('accordion-expanded');
        });
    }
}

// testimonial

let slideIndex = 1;
const btnPrev = document.querySelector(".slider__btn-prev");
const btnNext = document.querySelector(".slider__btn-next");
const indicators = document.querySelectorAll(".slider__indicator");
const slides = document.querySelectorAll(".slider__slide");

showSlides(slideIndex);

btnPrev.onclick = () => {
    plusSlides(-1);
};
btnNext.onclick = () => {
    plusSlides(1);
};

for (let i = 0; i < indicators.length; i++) {
    indicators[i].onclick = function () {
        for (let i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove("slider__indicator--active");
        }
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("slider__slide--active");
        }
        indicators[i].classList.add("slider__indicator--active");
        slides[i].classList.add("slider__slide--active");
    };
}

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("slider__slide--active");
    }
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove("slider__indicator--active");
    }
    slides[slideIndex - 1].classList.add("slider__slide--active");
    indicators[slideIndex - 1].classList.add("slider__indicator--active");
}
