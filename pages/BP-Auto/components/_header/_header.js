const headerBurgerMenu = (e, hamb) => {

    const headerMenuWrapper = document.querySelector('#header-menu-wrapper')
    const headerPopup = document.querySelector("#header-popup")
    const headerMenu = document.querySelector("#header-menu")
    const headerLogo = document.querySelector("#header-logo").cloneNode(1)
    const headerMenuTop = document.querySelector("#header-menu-top").cloneNode(1)

    const body = document.body;

    function hambHandler() {
        e.preventDefault();
        if (hamb.classList.contains('hamb__field--active')) {
            closeOnClick()
            return
        }
        headerPopup.classList.add("header-popup--open");
        hamb.classList.add("hamb__field--active");
        body.classList.add("noscroll");
        renderPopup();
    }

    hambHandler()

    function renderPopup() {
        headerPopup.appendChild(headerLogo)
        headerPopup.appendChild(headerMenu)
        headerPopup.appendChild(headerMenuTop)
    }

    // Код для закрытия меню при нажатии на ссылку

    const links = Array.from(headerMenu.children);

    links.forEach((link) => {
        link.addEventListener("click", closeOnClick);
    });

    function closeOnClick() {
        headerPopup.querySelector('#header-logo').remove()
        headerPopup.querySelector('#header-menu-top').remove()
        headerMenuWrapper.append(headerMenu)
        headerPopup.classList.remove("header-popup--open");
        hamb.classList.remove("hamb__field--active");
        body.classList.remove("noscroll");
    }

}

export { headerBurgerMenu }