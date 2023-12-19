import * as model from "./model.js";
import * as view from "./view.js";

// получение реальной даты
function displayDate() {
  const monthYear = model.getMonhtYear();
  view.renderdisplayDate(monthYear.month, monthYear.year);
}

// Тестовые рандомные занчания
function insertTestData() {
  const randomValue = model.getTestData();
  view.rendomDataTest(randomValue);
}

// ACTIONS
displayDate();
insertTestData();

// const budgetSumm = model.calcBudget();
// view.renderBudget(budgetSumm);
view.renderBudget(model.calcBudget());

// добавление значений
view.elements.form.addEventListener("submit", function (e) {
  e.preventDefault();

  const checkResult = view.checkEmptyInputs();
  if (checkResult === false) {
    return;
  }

  //формируем запись
  const formValue = view.getFormValue();
  const record = model.createRecord(formValue);

  view.renderRecord(record); // отображаем запись на странице
  view.renderBudget(model.calcBudget()); //пересчет общего значения
  view.clearForm();
  insertTestData();
});

// удаление значений
document.body.addEventListener("click", function (e) {
  if (e.target.closest("button.item__remove")) {
    //ищем клик по кнопке использую тег и класс ('button.item__remove')
    const id = +view.getRecordId(e);

    model.deleteRecord(id);

    view.renderBudget(model.calcBudget()); //пересчет общего значения
  }
});
