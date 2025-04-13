export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const creatCard = (data, deleteCard, myFunc, like) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  cardItem.querySelector(".card__image").src = data.link;
  cardItem.querySelector(".card__title").textContent = data.name;
  cardItem.querySelector(".card__image").alt = data.name;
  const deleteButton = cardItem.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardItem));
  cardItem.addEventListener("click", like);
  cardItem.addEventListener("click", myFunc);
  return cardItem;
};

export const deleteCard = (cardItem) => {
  cardItem.remove();
};

export function like(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export function addCard(evt) {
    evt.preventDefault();
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  cardItem.querySelector(".card__image").src = linkPlace.value;
  cardItem.querySelector(".card__title").textContent = namePlace.value;
  cardItem.querySelector(".card__image").alt = namePlace.value;
  const deleteButton = cardItem.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardItem.remove();
  });
  cardItem.addEventListener("click", like);
  cardItem.addEventListener("click", popupOpenImage);
  cardList.prepend(cardItem);
  closeModal(popupNewCard);
}

import { linkPlace, namePlace, popupNewCard, cardList } from "./index.js"
import {  closeModal, popupOpenImage } from "./components/modal.js"