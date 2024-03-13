const radioButtons = document.querySelectorAll(".radioInput");
const tipAmountField = document.querySelector(".tipAmountField");
const totalField = document.querySelector(".totalField");
const billField = document.querySelector(".billField");
const customField = document.querySelector(".radioCustom");
const numberOfPeopleField = document.querySelector(".numberOfPeopleField");
const labelWithNumberPeople = document.querySelector(".labelWithNumberPeople");

let currentPercent = 0;

const countResult = () => {
  console.log(+numberOfPeopleField.value, +billField.value, +customField.value);
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
  // console.log(billField.value, currentPercent);
  let percent = (billField.value * currentPercent) / 100;
  // console.log(percent);
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
    countResult();
  });
});

billField.addEventListener("keyup", () => {
  countResult();
});
customField.addEventListener("keyup", () => {
  currentPercent = +customField.value;
  countResult();
});
numberOfPeopleField.addEventListener("keyup", () => {
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
