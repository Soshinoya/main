const hamb = document.querySelector("#header-hamb");
const popup = document.querySelector("#header-popup");
const menu = document.querySelector("#header-menu").cloneNode(1);
const body = document.body;

hamb.addEventListener("click", hambHandler);

function hambHandler(e) {
    e.preventDefault();
    popup.classList.toggle("popup--open");
    hamb.classList.toggle("hamb--active");
    body.classList.toggle("body--noscroll");
    popup.appendChild(menu)
}

// Код для закрытия меню при нажатии на ссылку

const links = Array.from(menu.children);

links.forEach((link) => {
    link.addEventListener("click", closeOnClick);
});

function closeOnClick() {
    popup.classList.remove("popup--open");
    hamb.classList.remove("hamb--active");
    body.classList.remove("body--noscroll");
}
