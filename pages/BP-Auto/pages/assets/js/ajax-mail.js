"use strict"

let orderSendBtn = document.querySelector('.modal .btn:not(.modal-test-drive .btn)');
orderSendBtn.addEventListener("click", ajaxSend);

// Отправка письма на почту

async function ajaxSend(e) {
	e.preventDefault();

	// Получаем значения всех полей в модальном оке
	let getEmail = document.querySelector('.modal:not(.modal-test-drive) input[name="mail"]');
	let getPrice = document.querySelector('.modal:not(.modal-test-drive) input[name="message"]');
	let getComment = document.querySelector('.modal:not(.modal-test-drive) textarea');
	let errorText = document.querySelector('.modal:not(.modal-test-drive) .result-text');
	let getCaptha = document.querySelector('.modal:not(.modal-test-drive) input[name="capthca"]');

	let errors = [];
	// Удаление классов с ошибками с элементов
	getEmail.classList.remove('error-input');
	getPrice.classList.remove('error-input');
	getCaptha.classList.remove('error-input');
	getComment.classList.remove('error-input');
	errorText.classList.remove('error_text');
	errorText.classList.remove('success_text');
	errorText.textContent = '';


	// Проверяем не пустые ли значения
	// Если какое то значение осталось пустым, то заносим ошибку в массив
	if(!getEmail.value) 
		errors.push('mail');

	if(!getPrice.value) 
		errors.push('price');

	if(!getComment.value)
		errors.push('comment');

	if(!getCaptha.value)
		errors.push('captcha');


	// Проверяем не пустой ли массив с ошибками, если ошибки есть - выводим ошибки
	// Если массив пуст - отправляем данные на сервер
	if(errors.length) {
		errorText.classList.add('error_text');
		errors.forEach((element) => {
			errorText.textContent = 'Некорректно введены данные';
			if(element == 'mail')
				getEmail.classList.add('error-input');
			if(element == 'price')
				getPrice.classList.add('error-input');
			if(element == 'comment')
				getComment.classList.add('error-input');
			if(element == 'captcha')
				getCaptha.classList.add('error-input');
		});
		return false;
	} else {
		// Во время отправки сообщения блокируем кнопку отправки во избежание спама
		document.querySelector('.modal:not(.modal-test-drive) .btn-primary').setAttribute("disabled", "disabled");

		let createFormData = new FormData();
		createFormData.append('mail', getEmail.value);
		createFormData.append('price', getPrice.value);
		createFormData.append('comment', getComment.value);
		createFormData.append('captcha', getCaptha.value);
		createFormData.append('type', 'price');

		let response = await fetch('pages/assets/php/order-mail.php', {
			method: 'POST',
			body: createFormData
		});

		// Получаем ответ в формате JSON
		let result = await response.json();

		// Если отправка прошла успешно - сообщаем об этом пользователя
		// Так же разрешаем взаимодействие с кнопкой отправки
		// После закрываем модальное окно
		if(response.ok) {
			document.querySelector('.modal:not(.modal-test-drive) .btn-primary').removeAttribute("disabled");
			
			if(result.status === false && result.errors.length) {
				errorText.classList.add('error_text');
				errorText.textContent = 'Некорректно введены данные';
				result.errors.forEach((element) => {
					if(element == 'mail') 
						getEmail.classList.add('error_text');

					if(element == 'price')
						getPrice.classList.add('error-input');

					if(element == 'comment')
						getComment.classList.add('error-input');

					if(element == 'captcha') {
						errorText.textContent = 'Captcha не принята, попробуйте ещё раз';
						getCaptha.classList.add('error-input');
					}

					if(element == 'mailError') 
						errorText.textContent = 'Произошла ошибка при попытке отправки сообщения';

				});
			} else if(result.status === true){
				errorText.classList.add('success_text');
				errorText.textContent = 'Письмо было успешно отправлено!';

				setTimeout(() => {
					if(document.querySelector('.modal:not(.modal-test-drive)').classList.contains('modal_view')) {
						document.querySelector('.modal_blocker').classList.remove('active');
						document.querySelector('.modal:not(.modal-test-drive)').classList.remove('modal_view');
						errorText.classList.remove('success_text');
						errorText.textContent = '';
						document.querySelector('html').style.overflow = 'unset';
					}
				}, 4000);
			}
		}
	}
}





// Отправка письма (запись на тест-драйв)

let testDrive = document.querySelector('.modal-test-drive .btn');
testDrive.addEventListener("click", ajaxSendTestDrive);

async function ajaxSendTestDrive(e) {
	e.preventDefault();

	// Получаем значения всех полей в модальном оке
	let getEmail = document.querySelector('.modal-test-drive input[name="mail"]');
	let getComment = document.querySelector('.modal-test-drive textarea');
	let errorText = document.querySelector('.modal-test-drive .result-text');
	let getCaptha = document.querySelector('.modal-test-drive input[name="capthca"]');

	let errors = [];
	// Удаление классов с ошибками с элементов
	getEmail.classList.remove('error-input');
	getCaptha.classList.remove('error-input');
	getComment.classList.remove('error-input');
	errorText.classList.remove('error_text');
	errorText.classList.remove('success_text');
	errorText.textContent = '';


	// Проверяем не пустые ли значения
	// Если какое то значение осталось пустым, то заносим ошибку в массив
	if(!getEmail.value) 
		errors.push('mail');

	if(!getComment.value)
		errors.push('comment');

	if(!getCaptha.value)
		errors.push('captcha');


	// Проверяем не пустой ли массив с ошибками, если ошибки есть - выводим ошибки
	// Если массив пуст - отправляем данные на сервер
	if(errors.length) {
		errorText.classList.add('error_text');
		errors.forEach((element) => {
			errorText.textContent = 'Некорректно введены данные';
			if(element == 'mail')
				getEmail.classList.add('error-input');
			if(element == 'comment')
				getComment.classList.add('error-input');
			if(element == 'captcha')
				getCaptha.classList.add('error-input');
		});
		return false;
	} else {
		// Во время отправки сообщения блокируем кнопку отправки во избежание спама
		document.querySelector('.modal-test-drive .btn-primary').setAttribute("disabled", "disabled");

		let createFormData = new FormData();
		createFormData.append('mail', getEmail.value);
		createFormData.append('comment', getComment.value);
		createFormData.append('captcha', getCaptha.value);
		createFormData.append('type', 'test-drive');

		let response = await fetch('pages/assets/php/order-mail.php', {
			method: 'POST',
			body: createFormData
		});

		// Получаем ответ в формате JSON
		let result = await response.json();

		// Если отправка прошла успешно - сообщаем об этом пользователя
		// Так же разрешаем взаимодействие с кнопкой отправки
		// После закрываем модальное окно
		if(response.ok) {
			document.querySelector('.modal-test-drive .btn-primary').removeAttribute("disabled");
			
			if(result.status === false && result.errors.length) {
				errorText.classList.add('error_text');
				errorText.textContent = 'Некорректно введены данные';
				result.errors.forEach((element) => {
					if(element == 'mail') 
						getEmail.classList.add('error_text');

					if(element == 'comment')
						getComment.classList.add('error-input');

					if(element == 'captcha') {
						errorText.textContent = 'Captcha не принята, попробуйте ещё раз';
						getCaptha.classList.add('error-input');
					}

					if(element == 'mailError') 
						errorText.textContent = 'Произошла ошибка при попытке отправки сообщения';

				});
			} else if(result.status === true){
				errorText.classList.add('success_text');
				errorText.textContent = 'Письмо было успешно отправлено!';

				setTimeout(() => {
					if(document.querySelector('.modal-test-drive').classList.contains('modal_view')) {
						document.querySelector('.modal_blocker').classList.remove('active');
						document.querySelector('.modal-test-drive').classList.remove('modal_view');
						errorText.classList.remove('success_text');
						errorText.textContent = '';
						document.querySelector('html').style.overflow = 'unset';
					}
				}, 4000);
			}
		}
	}
}