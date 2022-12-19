const changeLanguage = () => {

    // Массив с языками
    const allLang = ['rus', 'lv', 'en'];

    // Определение текущей локали
    let locale = window.location.hash;
    locale = locale.substr(1);

    // Если локаль обнаружена
    if (locale) {

        // Если активный элемент (menu-top__lang) не равен текущей локали, то переопределить классы
        if (document.querySelector('.menu-top__lang--active').dataset.pageLng !== locale) {
            document.querySelectorAll('.menu-top__lang').forEach(lang => lang.classList.remove('menu-top__lang--active'))
            document.querySelector(`[data-page-lng="${locale}"]`).classList.add('menu-top__lang--active')
        }

        // В противном случае ставим стандартную локаль, взятую из массива allLang
    } else {
        document.querySelectorAll('.menu-top__lang').forEach(lang => lang.classList.remove('menu-top__lang--active'))
        const active = document.querySelector(`[data-page-lng="${allLang[0]}"]`)
        active.classList.add('menu-top__lang--active')
        changeURLLanguage(active)
    }

    changeLanguageFunc()

    // Проверка на наличие бургер-меню (появляется до 992px), если меню есть, то найти в нём элемент родителя ссылок
    if (window.matchMedia("(max-width: 992px)").matches) {

        const hamb = document.querySelector("#hamb");
        hamb.addEventListener('click', () => {
            const popup = document.querySelector('.header-popup')
            if (popup.classList.contains('header-popup--open')) {
                const menuLang = popup.querySelector('.menu-top__languages')
                addListenerForLang(menuLang)
            }
        })

    } else {

        const menuLang = document.querySelector('.menu-top__languages')
        addListenerForLang(menuLang)

    }

    // Функция навешивает обработчик событий по клику
    function addListenerForLang(elem) {
        elem.addEventListener('click', e => {
            changeClass(e.target)
        });
    }

    // Функция изменяющая классы для ссылок
    function changeClass(elem) {
        if (elem.closest('.menu-top__lang')) {
            Array.from(elem.closest('.menu-top__languages').children).forEach(child => child.classList.remove('menu-top__lang--active'))
            elem.closest('.menu-top__lang').classList.add('menu-top__lang--active')
            changeURLLanguage(elem.closest('.menu-top__lang'))
        }
    }

    // перенаправить на url с указанием языка
    function changeURLLanguage(elem) {
        let lang = elem.textContent.trim().toLowerCase();
        location.href = window.location.pathname + '#' + lang;
        location.reload();
    }

    // Функция меняет язык на странице
    // Текст берёт с другого файла (language.json)
    // Ищет в документе элементы по id и изменяет их текст с помощью innerHTML
    function changeLanguageFunc() {

        const promise = () => {
            return new Promise((resolve, reject) => {

                const xhr = new XMLHttpRequest();

                xhr.open('GET', './js/languages/language.json');

                xhr.responseType = 'json';

                xhr.send()

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(xhr.response)
                    } else {
                        reject(xhr.response)
                    }
                }

            })
        };

        promise()
            .then(res => {

                for (const sectionKey in res) {
                    for (const elemKey in res[sectionKey]) {
                        const elements = document.querySelectorAll(`#lng-${sectionKey}-${elemKey}`);
                        elements.forEach(elem => {
                            if (elem) {
                                elem.innerHTML = res[sectionKey][elemKey][locale]
                            }
                        })
                    }
                }

            })
            // Функция продолжает свою работу, если не нашла элемент с определённым id
            .catch(err => {
                console.log(err);
                promise()
            })
    }
}

export { changeLanguage }