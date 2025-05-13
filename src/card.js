export function creatCard(id, data, deleteCard, openPopupByImage, like) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = cardItem.querySelector(".card__delete-button");
  const cardID = data._id;
  cardItem.querySelector(".card__image").src = data.link;
  cardItem.querySelector(".card__title").textContent = data.name;
  cardItem.querySelector(".card__image").alt = data.name;
  cardItem.querySelector(".like__counter").textContent = data.likes.length;
  deleteButton.addEventListener("click", () => deleteCard(cardItem, cardID));
  cardItem.addEventListener("click", (evt) => {
    like(evt, cardID, cardItem, id);
  });
  cardItem.addEventListener("click", openPopupByImage);
  const btnLike = cardItem.querySelector(".card__like-button");
  const likes = data.likes;
  if (likes.some((like) => like._id === id)) {
    btnLike.classList.add("card__like-button_is-active");
  }
  if (data.owner._id !== id) {
    deleteButton.remove();
  }
  return cardItem;
}
