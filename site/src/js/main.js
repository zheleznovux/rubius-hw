import {MyNav} from "./components/MyNav";
import {Form} from "./components/Form";


window.onload = function () {
    const formElement = document.getElementById('feedback-form');
    new Form(formElement);

    const nav = new MyNav('nav');

    const swiperTabsNav = new Swiper(".swiper-tabs-nav", {
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

    const swiperTabsContent = new Swiper(".swiper-tabs-content", {
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

