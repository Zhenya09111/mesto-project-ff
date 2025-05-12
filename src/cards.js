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

export function creatCard(id, data, deleteCard, openPopupByImage, switchLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = cardItem.querySelector(".card__delete-button");
  const cardID = data._id;
  cardItem.querySelector(".card__image").src = data.link;
  cardItem.querySelector(".card__title").textContent = data.name;
  cardItem.querySelector(".card__image").alt = data.name;
  cardItem.querySelector(".like__counter").textContent = data.likes.length;
  deleteButton.addEventListener("click", () => deleteCard(cardItem, cardID));
  cardItem.addEventListener("click", (evt) => {
    switchLike(evt, cardID, cardItem, id);
  });
  cardItem.addEventListener("click", openPopupByImage);
  const btnLike = cardItem.querySelector(".card__like-button");
  const likes = data.likes;
  likes.forEach((like) => {
    if (like._id === id) {
      btnLike.classList.add("card__like-button_is-active");
    }
  });
  if (data.owner._id !== id) {
    const btnRemove = cardItem.querySelector(".card__delete-button")
    btnRemove.remove()
  }
  return cardItem;
}
