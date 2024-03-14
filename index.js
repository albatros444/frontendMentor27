const radioButtons = document.querySelectorAll(".radioInput");
const tipAmountField = document.querySelector(".tipAmountField");
const totalField = document.querySelector(".totalField");
const billField = document.querySelector(".billField");
const customField = document.querySelector(".radioCustom");
const numberOfPeopleField = document.querySelector(".numberOfPeopleField");
const labelWithNumberPeople = document.querySelector(".labelWithNumberPeople");
const resetButton = document.querySelector(".reset");

let currentPercent = 0;
const changeResetAvailable = () => {
  if (
    +numberOfPeopleField.value === 0 &&
    +billField.value === 0 &&
    +currentPercent === 0
  ) {
    resetButton.classList.remove("resetLight");
  } else {
    resetButton.classList.add("resetLight");
  }
};

const countResult = () => {
  console.log(+numberOfPeopleField.value, +billField.value, currentPercent);
  if (+numberOfPeopleField.value === 0) {
    labelWithNumberPeople.classList.add("hasError");
    return;
  } else {
    labelWithNumberPeople.classList.remove("hasError");
  }
  if (
    isNaN(+numberOfPeopleField.value) ||
    isNaN(+billField.value) ||
    isNaN(+customField.value)
  ) {
    return;
  }

  let percent = (billField.value * currentPercent) / 100;
  let total = (+billField.value + percent) / +numberOfPeopleField.value;
  totalField.innerText = total.toFixed(2);
  let tipAmount = percent / +numberOfPeopleField.value;
  tipAmountField.innerText = tipAmount.toFixed(2);
};

radioButtons.forEach((rb) => {
  rb.addEventListener("click", () => {
    radioButtons.forEach((b) => {
      b.classList.remove("active");
      customField.classList.remove("active");
    });
    rb.classList.add("active");
    currentPercent = rb.value;
    changeResetAvailable();
    countResult();
  });
});

billField.addEventListener("keyup", () => {
  changeResetAvailable();
  countResult();
});
customField.addEventListener("keyup", () => {
  currentPercent = +customField.value;
  changeResetAvailable();
  countResult();
});
numberOfPeopleField.addEventListener("keyup", () => {
  changeResetAvailable();
  countResult();
});

customField.addEventListener("click", () => {
  radioButtons.forEach((b) => {
    b.classList.remove("active");
  });
  customField.classList.add("active");
  currentPercent = +customField.value;
  if (customField.value === "") {
    customField.value = 0;
  }
  countResult();
});

resetButton.addEventListener("click", () => {
  resetButton.classList.remove("resetLight");
  numberOfPeopleField.value = 0;
  billField.value = 0;
  customField.value = 0;
  currentPercent = 0;
  labelWithNumberPeople.classList.remove("hasError");
  radioButtons.forEach((b) => {
    b.classList.remove("active");
    customField.classList.remove("active");
  });
  totalField.innerText = "0.00";
  tipAmountField.innerText = "0.00";
});
