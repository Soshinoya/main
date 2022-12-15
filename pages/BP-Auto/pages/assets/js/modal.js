"use strict";

// btn - кнопка, которая отвечает за открытие модального окна
// block - БЛОК/КОНТЕЙНЕР который будет открыватся при нажатии на кнопку (btn)
// addClass - класс со стилями, который будет применятся к блоку (block), который будет открыт
// blockedModal - блок, который будет блокировать доступ к содержимому сайта (кликам), а так же к данному блоку применяется стиль затемнения
// blockedModalClass - стили, которые применяются к модальному окну (blockedModal)
// closeBtn - кнопка которая отвечает за закрытие модяльного окна
// windowClose - данный аргумент отвечает за то, будет ли модальное окно закрыватся, при нажатии на пустое окно,
//   			 то есть при нажатии вне модального окна, по умолчанию данная функция выключена

function modalBuy(
	btn,
	block,
	addClass,
	blockedModal,
	blockedModalClass,
	closeBtn,
	windowClose = false
) {
	let getBtn = document.querySelector(btn);
	let getBlock = document.querySelector(block);
	let getBlockedModal = document.querySelector(blockedModal);

	if (getBtn && getBlockedModal) {
		getBlockedModal.add;
		getBtn.addEventListener("click", () => {
			getBlock.classList.add(addClass);
			getBlockedModal.classList.add(blockedModalClass);
			document.querySelector("html").style.overflow = "hidden";
		});
	}

	let getCloseBtn = document.querySelector(closeBtn);
	getCloseBtn.addEventListener("click", e => {
		if (
			getBlock.classList.contains(addClass) &&
			getBlockedModal.classList.contains(blockedModalClass) &&
			!getBlock.classList.contains("links")
		) {
			e.preventDefault();
			getBlock.classList.remove(addClass);
			getBlockedModal.classList.remove(blockedModalClass);
			document.querySelector("html").style.overflow = "unset";
		}
	});

	if (windowClose == true) {
		getBlockedModal.addEventListener("click", () => {
			getBlock.classList.remove(addClass);
			getBlockedModal.classList.remove(blockedModalClass);
			document.querySelector("html").style.overflow = "unset";
		});
	}
}
document.body.style.minHeight = window.innerHeight + "px";
modalBuy(
	".car__dscr-report",
	".modal",
	"modal_view",
	".modal_blocker",
	"active",
	".modal .close-modal",
	true
);
modalBuy(
	".car__dscr-numArtc",
	".modal-test-drive",
	"modal_view",
	".modal_blocker",
	"active",
	".modal-test-drive .close-modal",
	true
);
