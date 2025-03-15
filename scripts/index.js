// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
function creatCard(data) {
   const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
   cardItem.querySelector('.card__image').src = data.link;
   cardItem.querySelector('.card__title').textContent = data.name;
   const deleteButton = cardItem.querySelector('.card__delete-button');
   deleteButton.addEventListener('click', function () {
      const listItem = deleteButton.closest('.places__item');
      listItem.remove();
   });
   return cardItem
}
function generateList(items) {
   for (let i = 0; i < items.length; i++) {
      cardList.append(creatCard(items[i]));
   }
}
generateList(initialCards)



