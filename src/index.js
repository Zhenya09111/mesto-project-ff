// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// импорт элементов
import "./index.css";
import { initialCards, creatCard, deleteCard, like } from "./cards.js";
import { openModal, addAnimated, closeModal } from "./components/modal.js";
import { enableValidation } from "../validation.js";
// объявление
const cardList = document.querySelector(".places__list");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const btnProfileEdit = document.querySelector(".profile__edit-button");
const btnAddProfile = document.querySelector(".profile__add-button");
const popupAll = document.querySelectorAll(".popup");
const btnAvatarEdit = document.querySelector('.profile__Image')
const formElement = document.forms.editProfile;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const formAddCard = document.forms.newPlace;
const namePlace = formAddCard.elements.placeName;
const linkPlace = formAddCard.elements.link;
const popupPicture = document.querySelector(".popup_type_image");
const formAvatar = document.forms.avatar
const avatar = formAvatar.elements.link
// создание карточек из массива
// initialCards.forEach((item) => {
//   cardList.append(
//     creatCard(item, deleteCard, openPopupByImage, like, likeCounter)
//   );
// });
// кнопка редактора профиля
btnProfileEdit.addEventListener("click", () => {
  openModal(popupTypeEdit);
  jobInput.value = document.querySelector(".profile__description").textContent;
  nameInput.value = document.querySelector(".profile__title").textContent;
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
// кнопка добавления профиля
btnAddProfile.addEventListener("click", () => {
  openModal(popupNewCard);
  linkPlace.value = "";
  namePlace.value = "";
});
// класс анимации попапов
popupAll.forEach((popup) => {
  addAnimated(popup);
});
// ФОРМЫ
// добавление новой карточки через попап
function addCard(evt) {
  evt.preventDefault();
  const data = {};
  data.name = namePlace.value;
  data.link = linkPlace.value;
  // cardList.prepend(
  //   creatCard(data, deleteCard, openPopupByImage, switchLike, likeCounter)
  // );
  saveNewCardApi(
      data,
    closeModal,
    popupNewCard,
      evt,
      cardList,
        creatCard,
        deleteCardApi,
        openPopupByImage,
        switchLike,
        likeCounter
  );
  // closeModal(popupNewCard);
  
}
// редактирование профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  // document.querySelector(".profile__title").textContent = nameInput.value;
  // document.querySelector(".profile__description").textContent = jobInput.value;
  editProfileApi(nameInput.value, jobInput.value, evt)
  closeModal(popupTypeEdit);
}
//  открытие попа по картинке
function openPopupByImage(evt) {
  if (evt.target.classList.contains("card__image")) {
    popupPicture.querySelector(".popup__image").src = evt.target.src;
    popupPicture.querySelector(".popup__image").alt = evt.target.alt;
    popupPicture.querySelector(".popup__caption").textContent = evt.target.alt;
    openModal(popupPicture);
  }
}
btnAvatarEdit.addEventListener('click', () => {
  openModal(document.querySelector('.popup_type_new-avatar'))
  avatar.value = '';
})
function addAvatar(evt) {
evt.preventDefault();
changeAvatar(avatar.value, closeModal, evt)
}
// отправка форм
formAddCard.addEventListener("submit", addCard);
formElement.addEventListener("submit", handleProfileFormSubmit);
formAvatar.addEventListener('submit', addAvatar)
// конфиг
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// вызов функции валидации для всех полей
enableValidation(validationConfig);
// экспорт
export { nameInput, jobInput, popupTypeEdit, openPopupByImage };

import {
  showMyCards,
  saveNewCardApi,
  profileID,
  deleteCardApi,
  allInfo,
  likeCounter,
  switchLike,
  showAllCards,
  editProfileApi,
  changeAvatar,
  infoUser
} from "./api.js";

// showMyCards(
//   cardList,
//   creatCard,
//   deleteCardApi,
//   openPopupByImage,
//   switchLike,
//   likeCounter,
// );
// profileID();
// myCards();
// showAllCards(
//   cardList,
//   creatCard,
//   deleteCardApi,
//   openPopupByImage,
//   switchLike,
//   likeCounter
// );
  allInfo(cardList, creatCard, deleteCardApi, openPopupByImage, switchLike, likeCounter)






