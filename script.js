// intersection observer

function handler(entries, observer) {
    for (entry of entries) {
        console.log(entry);

        // statusText.textContent = entry.isIntersecting;

        if (entry.isIntersecting) {
            console.log("yes");

            document.getElementsByTagName('footer')[0].style.position = 'relative';
        } else {
            document.getElementsByTagName('footer')[0].style.position = 'fixed';
            document.getElementsByTagName('footer')[0].style.bottom = '0';
        }
    }
}
let observer = new IntersectionObserver(handler);
observer.observe(document.getElementById("hero"));


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


// on document ready state
const validate = {
    email: function (email) {
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        return emailRegex.test(email);
    },
    phoneNumber: function (number) {
        var numberRegex = /^\d{10}$/;
        return numberRegex.test(number);
    },

    phoneoremail: function (data) {
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        var numberRegex = /^\d{10}$/;
        return numberRegex.test(data) || emailRegex.test(data);
    },

    generalText: function (text) {
        return text.trim() !== "";
    }
}

function fillFormFormLocalStorage() {
    let data = JSON.parse(localStorage.getItem('gl-from-data'));
    document.querySelector('#gl-start-now input[name="name"]').value = data.name;
    document.querySelector('#gl-start-now input[name="email"]').value = data.email;
    document.querySelector('#gl-start-now input[name="phone"]').value = data.phone;
    document.querySelector('#gl-start-now input[name="experience"]').value = data.experience
    document.querySelector(`#gl-start-now option[value="${data.organisation}"]`).selected = true;
    if (data.authorize) {
        document.querySelector('#gl-start-now input[name="authorize"]').checked = true
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const moveToTop = document.getElementById("move-to-top");
    const submitForm = document.getElementById("submit-form");

    moveToTop && moveToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    submitForm && submitForm.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        let validArray = [];
        let formInputs = {
            name: document.querySelector('#gl-start-now input[name="name"]'),
            email: document.querySelector('#gl-start-now input[name="email"]'),
            phone: document.querySelector('#gl-start-now input[name="phone"]'),
            experience: document.querySelector('#gl-start-now input[name="experience"]')
        }

        let otherDetail = {
            organisation: document.querySelector('#gl-start-now option:checked')
        }

        // validate
        for (var key in formInputs) {
            if (validate.generalText(formInputs[key].value)) {
                formInputs[key].style.border = '1px solid #ccc';
                formInputs[key].nextElementSibling.style.display = "none";

                if (formInputs[key].type == 'email') {
                    if (validate.email(formInputs[key].value)) {
                        validArray.push("true");
                        formInputs[key].style.border = '1px solid #ccc';
                        formInputs[key].nextElementSibling.style.display = "none";
                    } else {
                        validArray.push("false");
                        formInputs[key].style.border = '1px solid #f32d2d73';
                        formInputs[key].nextElementSibling.innerHTML = "Please enter valid email";
                        formInputs[key].nextElementSibling.style.display = "inline";
                    }
                }

                if (formInputs[key].name == 'phone') {
                    if (validate.phoneNumber(formInputs[key].value)) {
                        validArray.push("true");
                        formInputs[key].style.border = '1px solid #ccc';
                        formInputs[key].nextElementSibling.style.display = "none";
                    } else {
                        validArray.push("false");
                        formInputs[key].style.border = '1px solid #f32d2d73'
                        formInputs[key].nextElementSibling.innerHTML = "Please enter 10 digit mobile number";
                        formInputs[key].nextElementSibling.style.display = "inline";
                    }
                }
            } else {
                if (formInputs[key].hasAttribute('required')) {

                    validArray.push("false");
                    formInputs[key].nextElementSibling.innerHTML = formInputs[key].name + " is required";

                    formInputs[key].style.border = '1px solid red';
                    formInputs[key].nextElementSibling.style.display = "inline";
                } else {
                    formInputs[key].style.border = '1px solid #ccc';
                    formInputs[key].nextElementSibling.style.display = "none";
                    validArray.push("true");
                }
            }
        }
        // checks dropdown
        if (otherDetail.organisation.value && otherDetail.organisation.value !== "*") {
            validArray.push("true");
            otherDetail.organisation.parentElement.style.border = '1px solid #ccc';
            otherDetail.organisation.parentElement.nextElementSibling.style.display = "none";
        } else {
            validArray.push("false");
            otherDetail.organisation.parentElement.style.border = '1px solid red';
            otherDetail.organisation.parentElement.nextElementSibling.innerHTML = "Please select your organisation";
        }
        // checks checkbox
        if (document.querySelector('#gl-start-now input[name="authorize"]:checked')) {
            validArray.push("true");
            document.querySelector('#gl-start-now input[name="authorize"]').style.outline = '1px solid #ccc';
        } else {
            validArray.push("false");
            document.querySelector('#gl-start-now input[name="authorize"]').style.outline = '1px solid red';
        }


        if (validArray.indexOf("false") <= 0) {
            let data = {
                name: document.querySelector('#gl-start-now input[name="name"]').value,
                email: document.querySelector('#gl-start-now input[name="email"]').value,
                phone: document.querySelector('#gl-start-now input[name="phone"]').value,
                experience: document.querySelector('#gl-start-now input[name="experience"]').value,
                organisation: otherDetail.organisation.value,
                authorize: true
            }
            localStorage.setItem('gl-from-data', JSON.stringify(data));
        }

    }, false);

    if (localStorage.getItem('gl-from-data')) {
        fillFormFormLocalStorage();
    }
});

