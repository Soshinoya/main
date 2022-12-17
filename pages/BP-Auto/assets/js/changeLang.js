let headerSelect = document.querySelectorAll('.header__languages');
const allLang = ['en', 'rus', 'lv'];
const defLang = allLang[0]

document.querySelector("#header-hamb").addEventListener('click', e => {
    hambHandler(e)
    headerSelect = document.querySelectorAll('.header__languages');
    addListenerForSelect(headerSelect)
    getLangFromSessionStorage()
})

const getLangFromSessionStorage = localeStr => {
    if (localeStr) {
        sessionStorage.setItem("locale", localeStr)
    }
    if (typeof sessionStorage.getItem("locale") != 'string') {
        activeItemsCount = 0
        headerSelect.forEach(select => {
            Array.from(select.children).forEach(child => {
                if (child.classList.contains('active')) {
                    sessionStorage.setItem("locale", (child.textContent).trim())
                    activeItemsCount = activeItemsCount + 1
                }
            })
        })
        if (!activeItemsCount) {
            sessionStorage.setItem("locale", defLang);
            document.querySelector(`[data-pagelang=${defLang}]`).classList.add('active')
        }
    } else {
        const locale = sessionStorage.getItem("locale");
        headerSelect.forEach(select => {
            Array.from(select.children).forEach(child => {
                child.classList.remove('active')
            })
        })
        document.querySelectorAll(`[data-pagelang=${locale.toLowerCase()}]`).forEach(elem => elem?.classList.add('active'))
    }
    const locale = sessionStorage.getItem("locale")
    return locale
}

window.onload = () => {
    getLangFromSessionStorage()
    changeLanguage()
    addListenerForSelect(headerSelect)
};

const changeActiveHeaderLang = e => {
    if (e.target.classList.contains('header__languages-link')) {
        headerSelect.forEach(select => {
            Array.from(select.children).forEach(child => {
                child.classList.remove('active')
            })
        })
        e.target.classList.add('active')
        getLangFromSessionStorage(e.target.dataset.pagelang)
        changeLanguage()
    }
}

function addListenerForSelect(elem) {
    elem.forEach(select => {
        select.addEventListener('click', e => {
            changeActiveHeaderLang(e)
        });
    })
}

function changeLanguage() {
    let locale = sessionStorage.getItem("locale").toLowerCase();

    const promise = () => {
        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();

            xhr.open('GET', './language.json');

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
        .then(res => JSON.parse(JSON.stringify(res)))
        .then(res => {

            for (const sectionKey in res) {
                for (const elemKey in res[sectionKey]) {
                    const elements = document.querySelectorAll(`#lng-${sectionKey}-${elemKey}`);
                    elements.forEach(elem => {
                        if (elem) {
                            elem.innerHTML = res[sectionKey][elemKey][sessionStorage.getItem("locale").toLowerCase()]
                        }
                    })
                }
            }

        })
        .catch(err => {
            console.log(err);
            promise()
        })
}