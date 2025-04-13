const formAddCard = document.forms.newPlace;
const namePlace = formAddCard.elements.placeName;
const linkPlace = formAddCard.elements.link;
const formElement = document.forms.editProfile;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

export {
  formAddCard,
  namePlace,
  linkPlace,
  addNewCard,
  like,
  handleFormSubmit,
  nameInput,
  jobInput,
  formElement,
};
import { closeModal, popupOpenImage } from "./modal.js";
import { cardList, popupNewCard, popupTypeEdit } from "../index.js";

const addNewCard = (evt) => {
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
};

function like(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closeModal(popupTypeEdit);
}
