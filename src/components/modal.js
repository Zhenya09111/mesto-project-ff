const popupPicture = document.querySelector(".popup_type_image");
// открытие попа
const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escpClose);
};
// закрытие на эскейп
const escpClose = (evt) => {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".popup_is-opened");
    if (modal) closeModal(modal);
  }
};
// закрытие попа
const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escpClose);
};
// анимация попа
const animated = (popup) => {
  popup.classList.add("popup_is-animated");
};
// открытие попа по изоброжению
const popupOpenImage = (evt) => {
  if (evt.target.classList.contains("card__image")) {
    popupPicture.querySelector(".popup__image").src = evt.target.src;
    popupPicture.querySelector(".popup__image").alt = evt.target.alt;
    popupPicture.querySelector(".popup__caption").textContent = evt.target.alt;
    openModal(popupPicture);
  }
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

export {
  openModal,
  animated,
  popupOpenImage,
  closeModal,
  escpClose,
  handleFormSubmit
};

import { nameInput, jobInput, popupTypeEdit } from "../index.js"