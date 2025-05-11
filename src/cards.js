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

export function creatCard(
  data,
  deleteCard,
  openPopupByImage,
  like,
  likeCounter,
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  cardItem.querySelector(".card__image").src = data.link;
  cardItem.querySelector(".card__title").textContent = data.name;
  cardItem.querySelector(".card__image").alt = data.name;
  const deleteButton = cardItem.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardItem, cardID));
  cardItem.addEventListener("click", (evt) => {
    like(evt, cardID, cardItem);
  });
  cardItem.addEventListener("click", openPopupByImage);
  let cardID = data._id;
  likeCounter(cardID, cardItem);
  return cardItem;
}
// функция удаления карточки
export function deleteCard(cardItem) {
  cardItem.remove();
}
// функция лайка
export function like(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
