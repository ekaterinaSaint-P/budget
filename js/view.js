const elements = {
  form: document.querySelector("#form"),
  type: document.querySelector("#type"),
  value: document.querySelector("#value"),
  title: document.querySelector("#title"),
  incomesList: document.querySelector("#incomes-list"),
  expensesList: document.querySelector("#expenses-list"),
  totalBudgetElement: document.querySelector("#budget"),
  totalIncomeElement: document.querySelector("#total-income"),
  totalExpenseElement: document.querySelector("#total-expense"),
  expensePercentsWrapper: document.querySelector("#expense-percents-wrapper"),
  monthElement: document.querySelector("#month"),
  yearElement: document.querySelector("#year"),
};

// если интпут title , value пустой
function checkEmptyInputs() {
  if (elements.title.value.trim() === "") {
    elements.title.classList.add("form__inpur--error");
    return false;
  } else {
    elements.title.classList.remove("form__inpur--error");
  }

  if (
    elements.value.value.trim() === "" ||
    parseInt(elements.value.value) <= 0
  ) {
    // trim() не позволяет добавить пустой импут с пробелами
    elements.value.classList.add("form__inpur--error");
    return false;
  } else {
    elements.value.classList.remove("form__inpur--error");
  }
  return true;
}

const priceFormatter = new Intl.NumberFormat("ru-Ru", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function renderRecord(record) {
  // находи li в разметке,копируем в js , изменяя переменные
  // создаем переменную где должен появиться li (incomesList)
  // отоброжаем список li

  if (record.type === "inc") {
    const html = `<li data-id =" ${
      record.id
    }" class="budget-list__item item item--income">
                                  <div class="item__title">${record.title}</div>
                                  <div class="item__right">
                                        <div class="item__amount">+ ${priceFormatter.format(
                                          record.value
                                        )}</div>
                                        <button class="item__remove">
                                        <img
                                              src="./img/circle-green.svg"
                                              alt="delete"
                                        />
                                        </button>
                                  </div>
                      </li>`;
    elements.incomesList.insertAdjacentHTML("afterbegin", html);
  }

  if (record.type === "exp") {
    const html = `<li data-id =" ${
      record.id
    }" class="budget-list__item item item--expense">
                                  <div class="item__title">${record.title}</div>
                                   <div class="item__right">
                                   <div class="item__amount">
                                        - ${priceFormatter.format(record.value)}
                                   </div>
                                  <button class="item__remove">
                                        <img src="./img/circle-red.svg" alt="delete" />
                                  </button>
                                  </div>
                            </li>`;

    elements.expensesList.insertAdjacentHTML("afterbegin", html);
  }
}

function renderBudget({
  totalIncome,
  totalExpense,
  totalBudget,
  persentExpense,
}) {
  // подставляем занчения

  elements.totalBudgetElement.innerHTML = priceFormatter.format(totalBudget);
  elements.totalIncomeElement.innerHTML = priceFormatter.format(totalIncome);
  elements.totalExpenseElement.innerHTML =
    "- " + priceFormatter.format(totalExpense);

  if (persentExpense > 0) {
    const html = `<div class="badge">${persentExpense}%</div>`;
    elements.expensePercentsWrapper.innerHTML = html;
  } else {
    elements.expensePercentsWrapper.innerHTML = "";
  }
}

// функця для очистки формы очищаем форму , но выводим ее после "SUBMIT"

function clearForm() {
  elements.form.reset();
}
// получение реальной даты
function renderdisplayDate(month, year) {
  elements.monthElement.innerHTML = month;
  elements.yearElement.innerHTML = year;
}

function rendomDataTest(randomValue) {
  // чтобы отразить на странице вносим значение в value

  // type.value = dataTest[randomIndex]["type"]; длинная запись!
  elements.title.value = randomValue.title;
  elements.value.value = randomValue.value;
  elements.type.value = randomValue.type;
}

function getFormValue() {
  const formValue = {
    type: elements.type.value,
    title: elements.title.value,
    value: elements.value.value,
  };
  return formValue;
}

function getRecordId(e) {
  const recordElement = e.target.closest("li.budget-list__item"); // e.target.closest  вданном случае это наша кнопка , далее ищем соседний родительский div
  const id = recordElement.dataset.id; // приводим к числу либо + либо parseInt
  recordElement.remove(); // обращаемся к главному элементу li и удаляем его со страницы

  return id;
}

export {
  elements,
  priceFormatter,
  checkEmptyInputs,
  renderRecord,
  renderBudget,
  clearForm,
  renderdisplayDate,
  rendomDataTest,
  getFormValue,
  getRecordId,
};
