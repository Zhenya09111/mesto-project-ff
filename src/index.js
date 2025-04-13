// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// импорт элементов
import "./index.css";
import { initialCards, creatCard, deleteCard, like } from "./cards.js";
import {
  openModal,
  animated,
  popupOpenImage,
  closeModal
} from "./components/modal.js";
// объявление
const cardList = document.querySelector(".places__list");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const btnProfileEdit = document.querySelector(".profile__edit-button");
const btnAddProfile = document.querySelector(".profile__add-button");
const popupAll = document.querySelectorAll(".popup");
const formElement = document.forms.editProfile;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const formAddCard = document.forms.newPlace;
const namePlace = formAddCard.elements.placeName;
const linkPlace = formAddCard.elements.link;
// создание карточек из массива
initialCards.forEach((item) => {
  cardList.append(creatCard(item, deleteCard, popupOpenImage, like));
});
// кнопка редактора профиля
btnProfileEdit.addEventListener("click", () => {
  openModal(popupTypeEdit);
  jobInput.value = document.querySelector(".profile__description").textContent;
  nameInput.value = document.querySelector(".profile__title").textContent;
});
// кнопка добавления профиля
btnAddProfile.addEventListener("click", () => {
  openModal(popupNewCard);
  linkPlace.value = "";
  namePlace.value = "";
});
// класс анимации попапов
popupAll.forEach((popup) => {
  animated(popup);
});
// закрытие по оверлею, либо кнопке закрыть
popupAll.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup_is-opened") ||
      evt.target.classList.contains("popup__close")
    )
      closeModal(evt.currentTarget);
  });
});
// ФОРМЫ

function addCard(evt) {
  evt.preventDefault();
  const data = { }
  data.name = namePlace.value
  data.link  = linkPlace.value
  cardList.prepend(creatCard(data, deleteCard, popupOpenImage, like));
   closeModal(popupNewCard);
 }

 function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

formAddCard.addEventListener("submit", addCard);
formElement.addEventListener("submit",handleProfileFormSubmit);


export { nameInput, jobInput, popupTypeEdit }