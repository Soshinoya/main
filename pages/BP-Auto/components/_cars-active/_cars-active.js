import { HTMLService } from "../../js/service/htmlService.js";
import { renderPromise } from "../../js/service/app.js";

const HTMLServiceInstance = new HTMLService()

// рендер авто

const carsActiveInner = document.querySelector('#cars-active__cards')

const carActiveIdentificators = [0, 1]

const carsActiveRenderOptions = {
    pathToDb: 'carsActive',
    url: './js/db/db.json'
}

const carsActiveRender = () => {
    renderPromise(carsActiveRenderOptions)
        .then(response => {
            const cardsHTML = [];
            carActiveIdentificators.forEach(id => {
                if (response[id]) {
                    cardsHTML.push(HTMLServiceInstance.renderProduct(response[id]))
                }
            })
            return cardsHTML
        })
        .then(res => carsActiveInner.insertAdjacentHTML('beforeend', res))
        .catch(console.log)
}

//

export { carsActiveRender }