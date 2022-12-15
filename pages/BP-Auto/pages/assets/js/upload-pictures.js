"use strict";


// ПОДСЧИТЫВАЕМ КОЛИЧЕСТВО ФОТО
let getElemPhotos;

function colPhoto(content, contentSet) {
	let getContent = document.querySelectorAll(content);
	getElemPhotos = document.querySelector(contentSet);

	for(let i = 0; i < getContent.length; i++) {
		getElemPhotos.textContent = i + 1;
	}
}

colPhoto('.more-photo .more_photo-1[upload-picture]', '.car__images-main-count span');

// ЗАГРУЖАЕМ ФОТО В FANCYBOX ПРИ НАЖАТИИ НА КНОПКИ

function uploadMore (content) {
	let getContent = document.querySelectorAll(content);

	for(let i = 0; i < getContent.length; i++) {
		if(getContent[0].className == getContent[i].className) {
			let getAttr = getContent[i].getAttribute('upload-picture');

			let createA = document.createElement('a');
			createA.setAttribute('class', 'car__images-item');
			createA.setAttribute('data-fancybox-group', 'thumb');
			createA.setAttribute('href', getAttr);

			let createImg = document.createElement('img');
			createImg.classList.add('fancybox');
			createImg.setAttribute('src', getAttr);

			getContent[i].after(createA);
			createA.style.display = 'none';
			createA.append(createImg);

			getContent[i].remove();
		}
	}
}

document.querySelector('.car__images-item.all').addEventListener('click', () => {
	uploadMore('span[upload-picture]');
});

document.querySelectorAll('.car__images-item')[0].addEventListener('click', () => {
	uploadMore('span[upload-picture]');
});

document.querySelectorAll('.car__images-item')[1].addEventListener('click', () => {
	uploadMore('span[upload-picture]');
});

document.querySelectorAll('.car__images-item')[2].addEventListener('click', () => {
	uploadMore('span[upload-picture]');
});



