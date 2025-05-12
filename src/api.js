// id пользователья
export let id;  
// конфиг авторизации
export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-37",
  headers: {
    authorization: "ded4903e-1c10-4453-96a5-a3b7a95ca423",
    "Content-Type": "application/json",
  },
};
// запрос на карточки
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
// запрос на пользователя
export function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
// вывести все карточки и инфо пользователя
export function allInfo(
  cardList,
  creatCard,
  deleteCardApi,
  openPopupByImage,
  switchLike 
) {
  Promise.all([getInitialCards(), getProfile()]).then(([cards, user]) => {
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
}
// смена аватара
export function changeAvatar(avatar, closeModal, evt) {
  const btn = evt.target;
  btn.querySelector(".popup__button").textContent = "Загрузка...";
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result.avatar);
      document.querySelector(
        ".profile__image"
      ).style = `background-image: url(${result.avatar})`;
      closeModal(document.querySelector(".popup_type_new-avatar"));
    })
    .finally(() => {
      btn.querySelector(".popup__button").textContent = "Сохранить";
      btn
        .querySelector(".popup__button")
        .classList.add("popup__button_disabled");
    });
}

// изменение данных профиля
export function editProfileApi(nameApi, aboutApi, evt) {
  const btn = evt.target;
  btn.querySelector(".popup__button").textContent = "Загрузка...";
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: nameApi,
      about: aboutApi,
    }),
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
    .then((result) => {
      document.querySelector(".profile__title").textContent = result.name;
      document.querySelector(".profile__description").textContent =
        result.about;
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      btn.querySelector(".popup__button").textContent = "Сохранить";
      btn
        .querySelector(".popup__button")
        .classList.add("popup__button_disabled");
    });
}
// сохранение карточки на сервере
export function saveNewCardApi(
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
) {
  const btn = evt.target;
  btn.querySelector(".popup__button").textContent = "Загрузка...";
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
    .then((result) => {
      cardList.prepend(
        creatCard(id, result, deleteCardApi, openPopupByImage, switchLike)
      );
      closeModal(popupNewCard);
    })
    .finally(() => {
      btn.querySelector(".popup__button").textContent = "Сохранить";
      btn
        .querySelector(".popup__button")
        .classList.add("popup__button_disabled");
    });
}
// удаление карточки
export function deleteCardApi(cardItem, cardID) {
  cardItem.remove();
  fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  });
}
// слушатель лайка
export function switchLike(evt, cardID, cardItem) {
  if (evt.target.classList.contains("card__like-button")) {
    getInitialCards().then((data) => {
      data.forEach((item) => {
        if (item._id === cardID) {
          const likes = item.likes;
          if (checkUserLike(likes)) {
            deleteLike(cardID, evt, cardItem);
          } else {
            saveLike(cardID, evt, cardItem);
          }
        }
      });
    });
  }
}
// проверка наличия лайка пользователя
export function checkUserLike(likes) {
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
export function saveLike(cardID, evt, cardItem) {
  fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }).then(() => {
    evt.target.classList.add("card__like-button_is-active");
    likesScore(cardID, cardItem);
  });
}// удаление лайка
export function deleteLike(cardID, evt, cardItem) {
  fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }).then(() => {
    evt.target.classList.remove("card__like-button_is-active");
    likesScore(cardID, cardItem);
  });
}
