const linksList = document.getElementById('header-links')
const filterInput = document.getElementById('header-form__input')
const filterOpenLink = document.getElementById('header-form__link')//-----------------

document.addEventListener('click', (e) => {
    if (e.target.id != 'header-form__input') {
        linksList.innerHTML = '';
    };
});

filterInput.addEventListener('input', event => {
    const value = event.target.value

    const filteredProducts = productService.filterByTitle(value)

    renderLinksList(filteredProducts)
});

function renderLinksList(products) {
    linksList ? linksList.innerHTML = htmlService.paintLinksList(products) : 0;
};

$(function () {

    // Search
    $('.header-form__link').on('click', function () {
        $('.header-form__input').toggleClass('header-form__input--active');
        $('.user__nav-wrapper').toggleClass('user__nav-wrapper--hide');
        $('.user__nav-link--btn').toggleClass('user__nav-link--btn--hide');
        $('.menu').toggleClass('menu--hide');
        $('.logo').toggleClass('logo--hide');
        $('.header-form').toggleClass('header-form--wide');
    });

    // Burger Menu
    $('.user__nav-link--btn').on('click', function (e) {
        e.preventDefault();
        $('.menu').toggleClass('menu--active');
        $(this).toggleClass('user__nav-link--btn-resolve');
    });

});