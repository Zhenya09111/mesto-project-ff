// конфиг авторизации
export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-37",
  headers: {
    authorization: "ded4903e-1c10-4453-96a5-a3b7a95ca423",
    "Content-Type": "application/json",
  },
};
// проверка запроса
function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
// запрос на карточки
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
}
// запрос на пользователя
export function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
}
// смена аватара
export function changeAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(handleResponse);
}

// изменение данных профиля
export function editProfileApi(nameApi, aboutApi) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: nameApi,
      about: aboutApi,
    }),
    headers: config.headers,
  }).then(handleResponse);
}
// сохранение карточки на сервере
export function saveNewCardApi(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  }).then(handleResponse);
}
// удаление карточки
export function deleteCardApi(cardID) {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}
// оставить лайк
export function saveLike(cardID, evt, cardItem) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
}
// удаление лайка
export function deleteLike(cardID /*, evt, cardItem*/) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}
