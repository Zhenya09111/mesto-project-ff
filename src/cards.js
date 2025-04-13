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

export const creatCard = (data, deleteCard, myFunc) => {
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

import { like } from "./components/form";
