// Nav module
class MyNav {

    constructor(nav) {
        this.nav = document.getElementById(nav);
        this.btn = this.nav.querySelector('.open-btn');

        this.initBtn();
        this.initLinks();
    }

    // constructor() {} ???

    initBtn() {
        this.btn.oncontextmenu = false;
        this.navIsOpen = false;

        this.btn.addEventListener('click', () => {
            this.activate();
        })
    }

    initLinks() {
        const links = this.nav.querySelectorAll('[href^="#"]');

        links.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const id = link.getAttribute('href');

                this.closeNav();

                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });
        })
    }

    getNav() {
        return this.nav;
    }

    setNav(nav) {
        this.nav = document.getElementById(nav);
    }

    activate() {
        if (this.navIsOpen) {
            return this.closeNav();
        } else {
            return this.openNav();
        }
    }

    openNav() {
        this.navIsOpen = true;
        this.btn.classList.toggle('animate');
        return this.nav.querySelector('.overlay').style.height = "100%";
    }

    closeNav() {
        this.navIsOpen = false;
        this.btn.classList.toggle('animate');
        return this.nav.querySelector('.overlay').style.height = "0%";
    }
}

// carousel module
$(function () {
    $('.portfolio__carousel').slick({
        infinite: true,
        centerMode: true,
        slidesToShow: 3,
        swipeToSlide: true,
        slidesToScroll: 1,
        prevArrow: $('.portfolio__btn-left'),
        nextArrow: $('.portfolio__btn-right'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 880,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

class Form {
    constructor(formElement) {
        this.formElement = formElement;
        this.init();
    }

    init() {
        const inputs = this.formElement.querySelectorAll('input');

        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = {};

            inputs.forEach((input) => {
                if (input.value.length > 0) {
                    formData[input.name] = input.value;
                    input.classList.toggle('err', false);
                } else {
                    input.classList.toggle('err', true);
                }
            });

            if (Object.keys(formData).length == inputs.length) {
                this.sendData(formData);
            }
        })
    }

    sendData(formData) {
        console.log(formData);

        this.formElement.reset();
    }
}

window.onload = function () {
    const formElement = document.getElementById('feedback-form');
    new Form(formElement);

    const nav = new MyNav('nav');

    swiperTabsNav = new Swiper(".swiper-tabs-nav", {
        centeredSlides: true,
        autoWidth: true,
        slideToClickedSlide: true,
        loop: true,
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 10
            }
        }
    });

    swiperTabsContent = new Swiper(".swiper-tabs-content", {
        spaceBetween: 5,
        loop: true,
        longSwipes: true,
        resistanceRatio: 0,
        watchOverflow: true,
        thumbs: {
            swiper: swiperTabsNav
        }
    });
}


