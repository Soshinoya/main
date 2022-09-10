$(function(){

  $(".menu a, a.logo, .footer__link").on("click", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id = $(this).attr('href'),

      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 1000 мс
    $('body,html').animate({ scrollTop: top }, 1000);
  });

  var scrolled;
  window.onscroll = function () {
    scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > 600) {
      $(".header__top").addClass("header__top--active");
      $(".header__top").addClass("header__inner-top--active");
    }
    if (600 > scrolled) {
      $(".header__top").removeClass("header__top--active");
      $(".header__top").removeClass("header__inner-top--active");
    }
  }

  $('.slider__blog-inner').slick({
    dots:true,
    arrows: false
  })

  $('.menu__btn').on('click', function(){
    $('.menu').toggleClass('menu--active');
  });

  $('.filter__button').on('click', function(){
    $('.gallery__filter-btn').toggleClass('gallery__filter-btn--active');
  });

  $('.menu__list-item').on('click', function () {
    $('.menu').toggleClass('menu--active');
  });

  $('.logo').on('click', function () {
    $('.menu').removeClass('menu--active');
  });

  var mixer = mixitup('.gallery__images');
});