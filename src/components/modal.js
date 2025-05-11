// открытие попа
const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscp);
};
// закрытие на эскейп
const closeByEscp = (evt) => {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".popup_is-opened");
    if (modal) closeModal(modal);
  }
};
// закрытие попа
const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscp);
};
// анимация попа
const addAnimated = (popup) => {
  popup.classList.add("popup_is-animated");
};

export { openModal, addAnimated, closeModal };
