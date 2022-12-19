class HTMLService {

    renderProduct(product) {
        return `
        <a class="car-card" href="#">
            <div class="car-card__img">
                <img src="${product.imgPath}" alt="">
            </div>
            <div class="car-card__info">
                <h4 class="title car-card__title">
                    ${product.title}
                </h4>
                <p class="secondary-text car-card__text"id="lng-carsActive-carItem-${product.id}">
                    ${product.text}
                </p>
                <p class="car-card__price">
                    ${this.priceFormatter(product.price)} EUR
                </p>
            </div>
        </a>
        `
    }

    priceFormatter(num) {
        return new Intl.NumberFormat('eu').format(num)
    }

}

export { HTMLService }