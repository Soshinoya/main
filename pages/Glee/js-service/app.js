// Shop Service
let productService;
// const cartService = new CartService()
let htmlService;

// const cartContainer = document.getElementById('cart')
const productsContainer = document.getElementById('products__items')

// productsContainer.addEventListener('click', event => {
//   const sku = event.target.dataset.sku
//     ? event.target.dataset.sku
//     : event.target.closest('li')?.dataset.sku

//   if (sku) {
//     cartService.add(
//       productService.getBySku(+sku)
//     )
//     renderCart()
//   }
// })

// cartContainer.addEventListener('click', event => {
//   const type = event.target?.dataset.type
//   const sku = event.target?.dataset.sku

// switch (type) {
//   case 'clear':
//     cartService.clear()
//     renderCart()
//     break
//   case 'remove':
//     cartService.remove(sku)
//     renderCart()
//     break
// }
// })
// function renderCart() {
//   cartContainer.innerHTML = htmlService.paintCart(
//     cartService.getInfo()
//   )
// }

function changeSessionSku(those) {
    sku = sessionStorage.setItem('sku', those.closest('li').dataset.sku);
};

const productPageInner = document.querySelector('.product-one__inner');

function renderProductPage(sku) {
    productPageInner.innerHTML = htmlService.paintProductPage(productService.getBySku(sku));
};

function renderProducts(products) {
    productsContainer ? productsContainer.innerHTML = htmlService.paintProducts(products) : 0;
}

class productServiceClass {

    constructor(products = []) {
        this.products = products
    }

    filterByTitle(search = '') {
        if (!search.trim()) return this.products;

        return this.products.filter(product => {
            return product.title.toLowerCase().includes(search.toLowerCase())
        })
    }

    filterBy(category = [], brand = '', min = 0, max = 0) {
        let filteredProducts = this.products.slice();

        if (category.length !== 0) {
            filteredProducts = filteredProducts.filter(product => {
                for (let i = 0; i < category.length; i++) {
                    if (product.category === category[i]) {
                        return product;
                    };
                };
            });
        };

        filteredProducts = filteredProducts.filter(product => {
            if (min <= product.price && max >= product.price) {
                return product;
            };
        });

        if (brand) {
            filteredProducts = filteredProducts.filter(product => {
                if (product.brand === brand) {
                    return product;
                };
            });
        };

        if (category === [] && brand === '') {
            console.log('brand and category default');
            return this.products;
        };

        return filteredProducts;
    };

    get(index) {
        return this.products[index]
    }

    getBySku(sku) {
        return this.products.find(product => {
            return product.sku === sku
        })
    }
}

function ellipsis(string = '', maxLenght = 30) {
    if (string.length > maxLenght) {
        return string.substring(0, maxLenght) + '...'
    }
    return string
}

class HTMLServiceClass {
    paintProduct(product) {
        return `
          <li class="products__item mix category-${product.category}" data-sku="${product.sku}" data-brand="${product.brand}" id="products__item">
            <div class="products__item-img">
                <img loading="lazy" src="${product.images[0]}">
            </div>
            <h3 class="products__item-title">${ellipsis(product.title, 50)}</h3>
            <p class="products__price">$${product.price}.00</p>
            <div class="products__panel">
            <a class="products__btn products__btn--lupa" href="product.html" onclick="changeSessionSku(this)">
                <svg preserveAspectRatio="xMidYMid" width="20" height="20" viewBox="0 0 20 20">
                    <defs>
                        <style>
                            .cls-1 {
                                fill: #9ABCCA;
                                fill-rule: evenodd;
                            }
                        </style>
                    </defs>
                    <path
                        d="M19.450,19.448 C18.719,20.181 17.531,20.181 16.799,19.448 L12.211,14.860 C13.274,14.178 14.178,13.272 14.862,12.209 L19.450,16.798 C20.183,17.530 20.183,18.718 19.450,19.448 ZM7.500,14.999 C3.358,14.999 -0.000,11.640 -0.000,7.499 C-0.000,3.357 3.358,-0.002 7.500,-0.002 C11.642,-0.002 15.000,3.357 15.000,7.499 C15.000,11.640 11.642,14.999 7.500,14.999 ZM7.500,1.873 C4.398,1.873 1.875,4.397 1.875,7.499 C1.875,10.601 4.398,13.123 7.500,13.123 C10.602,13.123 13.125,10.601 13.125,7.499 C13.125,4.397 10.602,1.873 7.500,1.873 ZM4.375,7.499 L3.125,7.499 C3.125,5.087 5.088,3.123 7.500,3.123 L7.500,4.374 C5.777,4.374 4.375,5.776 4.375,7.499 Z"
                        class="cls-1" />
                </svg>
            </a>
            <a class="products__btn products__btn--main">
                <svg preserveAspectRatio="xMidYMid" width="22" height="20" viewBox="0 0 22 20">
                    <defs>
                        <style>
                            .cls-1 {
                                fill: #9ABCCA;
                                fill-rule: evenodd;
                            }
                        </style>
                    </defs>
                    <path
                        d="M21.934,5.216 L18.217,13.776 C18.082,14.075 17.797,14.264 17.471,14.264 L7.257,14.264 C6.891,14.264 6.565,14.020 6.470,13.667 L3.147,1.629 L0.814,1.629 C0.366,1.629 -0.000,1.262 -0.000,0.814 C-0.000,0.365 0.366,-0.002 0.814,-0.002 L3.757,-0.002 C4.124,-0.002 4.449,0.243 4.544,0.596 L7.867,12.634 L16.929,12.634 L19.940,5.705 L9.902,5.705 C9.454,5.705 9.088,5.338 9.088,4.889 C9.088,4.440 9.454,4.074 9.902,4.074 L21.188,4.074 C21.459,4.074 21.717,4.211 21.866,4.440 C22.015,4.673 22.043,4.957 21.934,5.216 ZM6.484,16.303 C7.501,16.303 8.329,17.131 8.329,18.150 C8.329,19.169 7.501,19.999 6.484,19.999 C5.466,19.999 4.639,19.169 4.639,18.150 C4.639,17.131 5.466,16.303 6.484,16.303 ZM17.892,16.303 C18.909,16.235 19.791,17.009 19.859,18.015 C19.886,18.517 19.737,18.994 19.411,19.360 C19.085,19.740 18.638,19.958 18.149,19.999 C18.109,19.999 18.055,19.999 18.014,19.999 C17.051,19.999 16.250,19.238 16.183,18.273 C16.115,17.267 16.874,16.371 17.892,16.303 Z"
                        class="cls-1" />
                </svg>
            </a>
            <a class="products__btn products__btn--heart">
                <svg preserveAspectRatio="xMidYMid" width="22" height="18" viewBox="0 0 22 18">
                    <defs>
                        <style>
                            .cls-1 {
                                fill: #9ABCCA;
                                fill-rule: evenodd;
                            }
                        </style>
                    </defs>
                    <path
                        d="M21.990,5.820 C21.907,4.269 21.250,2.813 20.141,1.720 C19.016,0.610 17.545,-0.001 16.002,-0.001 C13.691,-0.001 12.054,1.784 11.175,2.744 C11.125,2.798 11.071,2.857 11.019,2.913 C10.991,2.882 10.963,2.849 10.936,2.819 C10.132,1.903 8.460,-0.001 5.998,-0.001 C4.455,-0.001 2.985,0.610 1.859,1.720 C0.750,2.813 0.093,4.269 0.010,5.820 C-0.072,7.361 0.320,8.700 1.281,10.158 C2.142,11.466 4.385,13.532 6.044,14.906 C7.749,16.317 9.994,17.999 11.009,17.999 C12.041,17.999 14.278,16.319 15.974,14.912 C17.620,13.545 19.850,11.480 20.720,10.158 C21.366,9.174 22.095,7.792 21.990,5.820 ZM19.614,9.430 C18.982,10.391 17.202,12.166 15.183,13.848 C12.777,15.852 11.352,16.643 11.011,16.674 C10.669,16.639 9.241,15.841 6.823,13.831 C4.793,12.145 3.010,10.377 2.386,9.429 C1.591,8.223 1.266,7.132 1.332,5.891 C1.467,3.372 3.560,1.322 5.998,1.322 C7.861,1.322 9.214,2.864 9.941,3.692 C10.369,4.180 10.604,4.447 11.000,4.447 C11.409,4.447 11.672,4.161 12.151,3.638 C12.945,2.772 14.273,1.322 16.002,1.322 C18.440,1.322 20.533,3.372 20.668,5.891 C20.735,7.145 20.420,8.204 19.614,9.430 Z"
                        class="cls-1" />
                </svg>
            </a>
            </div>
          </li>
        `
    }

    paintProducts(products = []) {
        return products.map(this.paintProduct).join('')
    }

    paintLinksLink(product) {
        return `
        <li class="header-links__item" data-sku="${product.sku}">
            <a class="header-links__link" href="product.html" onclick="changeSessionSku(this)">${product.title}</a>
        </li>
      `
    }

    paintLinksList(products = []) {
        return products.map(this.paintLinksLink).join('')
    };

    paintProductPage(product) {
        return `
      <div class="product-one__slider product-slide">
        <div class="product-slide__thumb">
            <div class="product-slide__thumb-item first__thumb">
                <img loading="lazy" src="${product.images[0]}" alt="">
            </div>
            <div class="product-slide__thumb-item">
                <img loading="lazy" src="${product.images[1]}" alt="">
            </div>
            <div class="product-slide__thumb-item product-slide__thumb-item--last">
                <img loading="lazy" src="${product.images[2]}" alt="">
            </div>
        </div>
        <div class="product-slide__big">
            <div class="product-slide__big-item first__big">
                <img loading="lazy" src="${product.images[0]}" alt="">
            </div>
            <div class="product-slide__big-item">
                <img loading="lazy" src="${product.images[1]}" alt="">
            </div>
            <div class="product-slide__big-item">
                <img loading="lazy" src="${product.images[2]}" alt="">
            </div>
        </div>
      </div>
      <div class="product-one__content">
          <h2 class="product-one__title">${product.title}</h2>
          <div class="star" data-rateyo-rating="4"></div>
          <p class="product-one__price">${product.price}$</p>
          <p class="product-one__text">
              ${product.description}
          </p>
          <form class="product-one__form" action="#">
              <input class="product-one__input" type="number" value="1" min="1" max="5">
              <button class="product-one__btn" type="submit">Add to cart</button>
          </form>
          <div class="product-one__info">
              <p>SKU: ${product.sku}</p>
              <p>Category: ${product.category}</p>
              <p>Tag: Decorative</p>
          </div>
      </div>
      `;
    };

    paintCartItem(item) {
        return `
          <li data-type="remove" data-id="${item.id}">
            (${item.amount}) 
            ${item.title}
            <strong>$${item.price}</strong>
          </li>
        `
    }

    paintCart({ items, totalPrice }) {
        if (items.length === 0) {
            return `<p>Корзина пуста</p>`
        }

        return `
          <ul class="cart-list">
            ${items.map(this.paintCartItem).join('')}
          </ul>
          <hr />
          <p class="info">
            <span>Общая цена: <strong>$${totalPrice.toFixed(2)}</strong></span>
            <button class="clear" data-type="clear">Очистить</button>
          </p>
        `
    }
}

$(function () {

    $('.select-style, .product-one__input').styler();

});

function startApplication() {
    // renderCart()
    const data = dataOfProducts;

    productService = new productServiceClass(data)

    htmlService = new HTMLServiceClass()

    renderProducts(productService.products)

    typeof mixCall === 'function' ? mixCall() : 0;

    typeof relatedSliderActivate === 'function' ? relatedSliderActivate() : 0;

    const sku = +sessionStorage.getItem('sku');

    if (productPageInner) {
        renderProductPage(sku);
        $(function () {

            $('.product-slide__thumb').slick({
                asNavFor: $('.product-slide__big'),
                focusOnSelect: true,
                slidesToShow: 3,
                vertical: true,
                draggable: false,
                arrows: false,
                autoplay: true,
            });

            $('.product-slide__big').slick({
                asNavFor: $('.product-slide__thumb'),
                draggable: false,
                slidesToScroll: 1,
                slidesToShow: 1,
                focusOnSelect: true,
                arrows: false,
                fade: true,
                speed: 500,
                autoplay: true,
            });

        });
    };
}

startApplication();