import { headerBurgerMenu } from "../components/_header/_header.js";

// Отслеживание клика на бургер меню
const hamb = document.querySelector("#hamb");
hamb.addEventListener("click", e => {
    headerBurgerMenu(e, hamb)
});
//

