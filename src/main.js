const nav = document.getElementById('myNav');

function openNav() {
    return nav.style.height = "100%";
} 

function closeNav() {
    return nav.style.height = "0%";
}

$(function() {
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
