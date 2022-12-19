import { carsActiveRender } from "../components/_cars-active/_cars-active.js";
import { changeLanguage } from "./service/changeLang.js";

Promise.allSettled([
    carsActiveRender()
])
    .then(res => {
        changeLanguage()
    })
    .catch(console.log);
