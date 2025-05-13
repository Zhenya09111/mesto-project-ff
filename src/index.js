// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// импорт элементов
import "./index.css";
import { creatCard } from "./card.js";
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
  getProfile,
  deleteLike,
  saveLike,
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
  clearValidation(formElement, validationConfig);
});
// открыть попап добавления карточки через кнопку
btnAddProfile.addEventListener("click", () => {
  openModal(popupNewCard);
  linkPlace.value = "";
  namePlace.value = "";
  clearValidation(formAddCard, validationConfig);
});
// открыть попап смены аватара
btnAvatarEdit.addEventListener("click", () => {
  openModal(popupAvatar);
  avatar.value = "";
  clearValidation(formAvatar, validationConfig);
});
// редактирование профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const btn = evt.target;
  btn.querySelector(".popup__button").textContent = "Загрузка...";
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  editProfileApi(nameInput.value, jobInput.value, btn)
    .then((result) => {
      document.querySelector(".profile__title").textContent = result.name;
      document.querySelector(".profile__description").textContent =
        result.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      btn.querySelector(".popup__button").textContent = "Сохранить";
    });
  closeModal(popupTypeEdit);
}
// добавление новой карточки через попап
function addCard(evt) {
  evt.preventDefault();
  const data = {
    name: namePlace.value,
    link: linkPlace.value,
  };
  const btn = evt.target;
  btn.querySelector(".popup__button").textContent = "Загрузка...";
  saveNewCardApi(data)
    .then((result) => {
      cardList.prepend(
        creatCard(id, result, deleteCard, openPopupByImage, like)
      );
      closeModal(popupNewCard);
    })
    .finally(() => {
      btn.querySelector(".popup__button").textContent = "Сохранить";
      // btn.querySelector(".popup__button").classList.add("popup__button_disabled");
    });
}
// смена аватара на сервере
function addAvatar(evt) {
  const btn = evt.target;
  evt.preventDefault();
  btn.querySelector(".popup__button").textContent = "Загрузка...";
  changeAvatar(avatar.value, btn)
    .then((result) => {
      document.querySelector(
        ".profile__image"
      ).style = `background-image: url(${result.avatar})`;
      closeModal(document.querySelector(".popup_type_new-avatar"));
    })
    .finally(() => {
      btn.querySelector(".popup__button").textContent = "Сохранить";
    });
}
// лайк
export function like(evt, cardID, cardItem, id) {
  if (evt.target.classList.contains("card__like-button")) {
    getInitialCards().then((data) => {
      data.forEach((item) => {
        if (item._id === cardID) {
          const likes = item.likes;
          if (checkUserLike(likes, id)) {
            likeDeleteApi(cardID, evt, cardItem);
          } else {
            putLike(cardID, evt, cardItem);
          }
        }
      });
    });
  }
}
// проверка наличия лайка пользователя
export function checkUserLike(likes, id) {
  return likes.some((like) => {
    return like._id === id;
  });
}
// отображение числа лайков на карточке
function likesScore(cardID, cardItem) {
  getInitialCards().then((data) => {
    data.forEach((item) => {
      if (item._id === cardID) {
        cardItem.querySelector(
          ".like__counter"
        ).textContent = `${item.likes.length}`;
      }
    });
  });
}
// оставить лайк
function putLike(cardID, evt, cardItem) {
  saveLike(cardID).then(() => {
    evt.target.classList.add("card__like-button_is-active");
    likesScore(cardID, cardItem);
  });
}
// удаление лайка
function likeDeleteApi(cardID, evt, cardItem) {
  deleteLike(cardID).then(() => {
    evt.target.classList.remove("card__like-button_is-active");
    likesScore(cardID, cardItem);
  });
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
// удаление карточки
function deleteCard(cardItem, cardID) {
  deleteCardApi(cardID).then(() => {
    cardItem.remove();
  });
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
// отправка форм
formAddCard.addEventListener("submit", addCard);
formElement.addEventListener("submit", handleProfileFormSubmit);
formAvatar.addEventListener("submit", addAvatar);
// вызов функции валидации для всех полей
enableValidation(validationConfig);
// экспорт
export { nameInput, jobInput, popupTypeEdit, openPopupByImage };
// показать на странице все карточки;
Promise.all([getInitialCards(), getProfile()]).then(([cards, user]) => {
  cards.forEach((data) => {
    cardList.prepend(
      creatCard(user._id, data, deleteCard, openPopupByImage, like)
    );
  });
  id = user._id;
  document.querySelector(
    ".profile__image"
  ).style = `background-image: url(${user.avatar})`;
  document.querySelector(".profile__title").textContent = user.name;
  document.querySelector(".profile__description").textContent = user.about;
});
