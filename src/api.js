// конфиг авторизации
export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-37",
  headers: {
    authorization: "ded4903e-1c10-4453-96a5-a3b7a95ca423",
    "Content-Type": "application/json",
  },
};
// id пользователья
let id;
export function profileID() {
  getProfile().then((result) => {
    id = result._id;
  });
}
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
// загрузка
// export function upLoadApi(isLoading) {
//   const btnSave = document.querySelector(".popup__button");
//   if (isLoading) {
//     btnSave.querySelector(".popup__button").textContent = "загрузка...";
//   } else {
//     btnSave.textContent = "Сохранить";
//     btnSave.classList.add("popup__button_disabled");
//   }
// }
// информация о пользователе
export function infoUser() {
  getProfile()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}
// вывод массива всех карточек в консоль
export function allCardsInCosole() {
  getInitialCards()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}
// вывести все мои карточки в консоль
export function allInfo(cardList, creatCard, deleteCardApi, openPopupByImage, switchLike, likeCounter) {
  Promise.all([getInitialCards(), getProfile()])
  .then(([cards, user]) => {
    cards.forEach((data) => {
         cardList.prepend(creatCard(data, deleteCardApi, openPopupByImage, switchLike, likeCounter)
        );
    });
    document.querySelector('.profile__image').style = `background-image: url(${user.avatar})`
    document.querySelector(".profile__title").textContent = user.name;
    document.querySelector(".profile__description").textContent = user.about;
    console.log(user)
  });
}




// обновление на странице имени и занятия
// export function updateProfile() {
//   getProfile()
//     .then((result) => {
//       document.querySelector(".profile__title").textContent = result.name;
//       document.querySelector(".profile__description").textContent = result.about;
//     })

//     .catch((err) => {
//       console.log(err);
//     });
//   }
// изменение данных профиля
export function editProfileApi(nameApi, aboutApi, evt) {
  const btn = evt. target
  btn.querySelector('.popup__button').textContent = 'Загрузка...'
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: nameApi,
      about: aboutApi,
    }),
    headers: config.headers,
  })
    .then(res => res.json())
      .then((result) => {
        document.querySelector(".profile__title").textContent = result.name;
        document.querySelector(".profile__description").textContent = result.about;
        console.log(result)
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      btn.querySelector('.popup__button').textContent = 'Сохранить'
      btn.querySelector('.popup__button').classList.add('popup__button_disabled')
    })
}
// сохранение карточки на сервере
export function saveNewCardApi
(
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
      ) {
  const btn = evt.target
  btn.querySelector('.popup__button').textContent = 'Загрузка...'
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  })
  .then(res => res.json())
    .then(data => {
      console.log(data)
        cardList.prepend(
        creatCard(data, deleteCardApi, openPopupByImage, switchLike, likeCounter)
        );
      closeModal(popupNewCard)
    })
  // .catch((err) => {
  //   console.log(err);
  // })
  //  .then((res) => {
  //   console.log(res)
  //   closeModal(popupNewCard)
  //  })
    .finally(() => {
      btn.querySelector('.popup__button').textContent = 'Сохранить'
      btn.querySelector('.popup__button').classList.add('popup__button_disabled')
    })
}
// показать на странице мои карточки
export function showMyCards(
  cardList,
  creatCard,
  deleteCardApi,
  openPopupByImage,
  switchLike,
  likeCounter,
) {
  getInitialCards()
  .then((result) => {
    result.forEach((data) => {
      if (data.owner._id === id) {
        cardList.append(creatCard(data, deleteCardApi, openPopupByImage, switchLike, likeCounter)
        );
      }
    });
  });
}
// поставить лайк
export function saveLike(cardID, evt, cardItem) {
  fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  }).then(() => {
    evt.target.classList.add("card__like-button_is-active");
    likesScore(cardID, cardItem);
  });
}
// удаление лайка
export function deleteLike(cardID, evt, cardItem) {
  fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(() => {
    evt.target.classList.remove("card__like-button_is-active");
    likesScore(cardID, cardItem);
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

// оборажение количества лайков при запуске страницы
export function likeCounter(cardID, cardItem) {
  getInitialCards().then((data) => {
    data.forEach((item) => {
      if (item._id === cardID) {
        cardItem.querySelector(".like__counter").textContent = `${item.likes.length}`;
        const likes = item.likes;
        if (checkUserLike(likes)) {
          cardItem.querySelector(".card__like-button") .classList.add("card__like-button_is-active");
        }
      }
    });
  });
}
// проверка лайка пользователя на картинке
export function checkUserLike(likes) {
  return likes.some((like) => {
    return like._id === id;
  });
}
// поставить лайк
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
// отображение числа лайков на карточке
function likesScore(cardID, cardItem) {
  getInitialCards().then((data) => {
    data.forEach((item) => {
      if (item._id === cardID) {
        cardItem.querySelector(".like__counter").textContent = `${item.likes.length}`;
      }
    });
  });
}
// вывод всех карточек на странице
export function showAllCards(
  cardList,
  creatCard,
  deleteCardApi,
  openPopupByImage,
  switchLike,
  likeCounter
) {
  getInitialCards().then((result) => {
    result.forEach((data) => {
        cardList.prepend(creatCard(data, deleteCardApi, openPopupByImage, switchLike, likeCounter)
        );
    });
  });
}
// смена аватара
export function changeAvatar(avatar, closeModal, evt) {
  const btn = evt. target
  btn.querySelector('.popup__button').textContent = 'Загрузка...'
   fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    }),
  })
    .then(res => res.json())
      .then(result => {
        console.log(result.avatar)
        document.querySelector('.profile__image').style = `background-image: url(${result.avatar})`
        closeModal(document.querySelector('.popup_type_new-avatar'))
      })
      .finally(() => {
      btn.querySelector('.popup__button').textContent = 'Сохранить'
      btn.querySelector('.popup__button').classList.add('popup__button_disabled')
    })
}
