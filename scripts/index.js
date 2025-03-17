// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const deleteCard = (cardItem) => {
cardItem.remove();
};
    const creatCard = (data, deleteCard) => {
const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
cardItem.querySelector('.card__image').src = data.link;
cardItem.querySelector('.card__title').textContent = data.name;
cardItem.querySelector('.card__image').alt = data.name;
const deleteButton = cardItem.querySelector('.card__delete-button');
deleteButton.addEventListener('click', () => deleteCard(cardItem));
return cardItem;
}

initialCards.forEach((item) => {
     cardList.append(creatCard(item, deleteCard));
});
