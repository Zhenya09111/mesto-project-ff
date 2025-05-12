// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// импорт элементов
import "./index.css";
import { initialCards, creatCard, deleteCard, like } from "./cards.js";
import { openModal, addAnimated, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "../validation.js";
import {
  // id,
  saveNewCardApi,
  deleteCardApi,
  allInfo,
  switchLike,
  editProfileApi,
  changeAvatar,
  getInitialCards,
  getProfile
} from "./api.js";
// объявление
let id;
const cardList = document.querySelector(".places__list");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const btnProfileEdit = document.querySelector(".profile__edit-button");
const btnAddProfile = document.querySelector(".profile__add-button");
const popupAll = document.querySelectorAll(".popup");
const btnAvatarEdit = document.querySelector(".profile__Image");
const formElement = document.forms.editProfile;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const formAddCard = document.forms.newPlace;
const namePlace = formAddCard.elements.placeName;
const linkPlace = formAddCard.elements.link;
const popupPicture = document.querySelector(".popup_type_image");
const formAvatar = document.forms.avatar;
const avatar = formAvatar.elements.link;
const popupAvatar = document.querySelector(".popup_type_new-avatar"); 
// конфиг валидации форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// открыть попап редактирования профиля
btnProfileEdit.addEventListener("click", () => {
  openModal(popupTypeEdit);
  jobInput.value = document.querySelector(".profile__description").textContent;
  nameInput.value = document.querySelector(".profile__title").textContent;
  clearValidation(popupTypeEdit, validationConfig)
});
// редактирование профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  editProfileApi(nameInput.value, jobInput.value, evt);
  closeModal(popupTypeEdit);
}
// открыть попап добавления карточки через кнопку
btnAddProfile.addEventListener("click", () => {
  openModal(popupNewCard);
  linkPlace.value = "";
  namePlace.value = "";
  clearValidation(popupNewCard, validationConfig)
});
// открыть попап смены аватара
btnAvatarEdit.addEventListener("click", () => {
  openModal(popupAvatar);
  avatar.value = "";
  clearValidation(popupAvatar, validationConfig)
});
 // смена аватара на сервере
function addAvatar(evt) {
  evt.preventDefault();
  changeAvatar(avatar.value, closeModal, evt);
}
//  открыть картинку
function openPopupByImage(evt) {
  if (evt.target.classList.contains("card__image")) {
    popupPicture.querySelector(".popup__image").src = evt.target.src;
    popupPicture.querySelector(".popup__image").alt = evt.target.alt;
    popupPicture.querySelector(".popup__caption").textContent = evt.target.alt;
    openModal(popupPicture);
  }
}
// закрытие попапа по оверлею, либо кнопке закрыть
popupAll.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup_is-opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(evt.currentTarget);
    }
  });
});
// присвоить всем попапам класс анимации
popupAll.forEach((popup) => {
  addAnimated(popup);
});
// добавление новой карточки через попап
function addCard(evt) {
  evt.preventDefault();
  const data = {
    name: namePlace.value,
    link: linkPlace.value
  }
  saveNewCardApi(
    id,
    data,
    closeModal,
    popupNewCard,
    evt,
    cardList,
    creatCard,
    deleteCardApi,
    openPopupByImage,
    switchLike
  );
}
// отправка форм
formAddCard.addEventListener("submit", addCard);
formElement.addEventListener("submit", handleProfileFormSubmit);
formAvatar.addEventListener("submit", addAvatar);
// вызов функции валидации для всех полей
enableValidation(validationConfig);
// экспорт
export { nameInput, jobInput, popupTypeEdit, openPopupByImage };
// показать на странице все карточки
// allInfo(cardList, creatCard, deleteCardApi, openPopupByImage, switchLike);
  Promise.all([getInitialCards(), getProfile()])
  .then(([cards, user]) => {
    cards.forEach((data) => {
      cardList.prepend(
        creatCard(
          user._id,
          data,
          deleteCardApi, 
          openPopupByImage,
          switchLike 
        )
      );
    });
    id = user._id;
    document.querySelector(
      ".profile__image"
    ).style = `background-image: url(${user.avatar})`;
    document.querySelector(".profile__title").textContent = user.name;
    document.querySelector(".profile__description").textContent = user.about;
  });
