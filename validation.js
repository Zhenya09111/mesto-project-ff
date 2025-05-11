// показать ошибку
const showInputError = (inputItem, formItem, errorMessage, config) => {
  inputItem.classList.add(config.inputErrorClass);
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`);
  errorItem.textContent = errorMessage;
  errorItem.classList.add(config.errorClass);
};
// скрыть ошибку
const hideInputError = (inputItem, formItem, config) => {
  inputItem.classList.remove(config.inputErrorClass);
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`);
  errorItem.textContent = "";
  errorItem.classList.remove(config.errorClass);
};
// проверка инкута на валидность
const checkInputValid = (inputItem, formItem, errorMessage, config) => {
  if (inputItem.validity.patternMismatch) {
    inputItem.setCustomValidity(inputItem.dataset.errorMessage);
  } else {
    inputItem.setCustomValidity("");
  }
  if (!inputItem.validity.valid) {
    showInputError(inputItem, formItem, errorMessage, config);
  } else {
    hideInputError(inputItem, formItem, config);
  }
};
// активация и диактивация кнопки отправки формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputItem) => {
    return !inputItem.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonForm, config) => {
  if (hasInvalidInput(inputList)) {
    buttonForm.classList.add(config.inactiveButtonClass);
  } else {
    buttonForm.classList.remove(config.inactiveButtonClass);
  }
};
// присвоить слушатель всем инпутам в форме
const setEventListener = (formItem, config) => {
  const inputList = Array.from(formItem.querySelectorAll(config.inputSelector));
  const buttonForm = formItem.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonForm, config);
  inputList.forEach((inputItem) => {
    inputItem.addEventListener("input", () => {
      checkInputValid(inputItem, formItem, inputItem.validationMessage, config);
      toggleButtonState(inputList, buttonForm, config);
    });
  });
};
// во всех формах присвоить слушатель всем инпутам
export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formItem) => {
    setEventListener(formItem, config);
  });
};
