// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// импорт элементов
import "./index.css";
import { initialCards, creatCard, deleteCard } from "./cards.js";
import {  
  openModal,
  animated,
  popupOpenImage,
  closeModal,
} from "./components/modal.js";
import {
  formAddCard,
  namePlace,
  linkPlace,
  addNewCard,
  handleFormSubmit,
  nameInput,
  jobInput,
  formElement,
} from "./components/form.js";
// объявление
export const cardList = document.querySelector(".places__list");
export const popupTypeEdit = document.querySelector(".popup_type_edit");
export const popupNewCard = document.querySelector(".popup_type_new-card");
const btnProfileEdit = document.querySelector(".profile__edit-button");
const btnAddProfile = document.querySelector(".profile__add-button");
const popupAll = document.querySelectorAll(".popup");
// создание карточек из массива
initialCards.forEach((item) => {
  cardList.append(creatCard(item, deleteCard, popupOpenImage));
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
formAddCard.addEventListener("submit", addNewCard);
formElement.addEventListener("submit", handleFormSubmit);
