const defaultUrl = './js/db/db.json'

const renderPromise = ({ pathToDb, url = defaultUrl }) => {
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest()

        xhr.open('GET', url)

        xhr.responseType = 'json'

        xhr.send()

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response[pathToDb])
            } else {
                reject(xhr.response)
            }
        }

    })
}

export { renderPromise }