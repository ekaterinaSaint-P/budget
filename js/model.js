//DATA
const budget = [];

function createRecord(formValue) {
  // находим id
  let id = 1;

  if (budget.length > 0) {
    let lastElem = budget[budget.length - 1]; // находим последный элемент в массиве

    let lastElemId = lastElem.id; // определяем id последнего элемента в массиве

    id = lastElemId + 1; // определяем id нового добавленного элемента
  }

  const record = {
    id: id,
    type: formValue.type,
    title: formValue.title.trim(), // trim() в данном случае убирает пробелы если они были при введение значения в инпут
    value: +formValue.value,
  };

  budget.push(record);
  return record;
}

function deleteRecord(id) {
  const index = budget.findIndex(function (element) {
    // ищем в массиве какой это индекс используя мнетод findIndex
    if (id === element.id) return true;
  });

  budget.splice(index, 1); // удаляем из массива значение по индексу в кол-ве 1
  console.log(budget);
}

// функция подсчета общего прихода и расхода

function calcBudget() {
  // общий доход
  let totalIncome = budget.reduce(function (total, element) {
    if (element.type === "inc") {
      return total + element.value;
    } else {
      return total;
    }
  }, 0);

  // общий расход
  let totalExpense = budget.reduce(function (total, element) {
    if (element.type === "exp") {
      return total + element.value;
    } else {
      return total;
    }
  }, 0);

  // общий бюджет

  const totalBudget = totalIncome - totalExpense;

  // процент расссходов

  let persentExpense = 0;

  if (totalIncome > 0) {
    persentExpense = Math.round((totalBudget * 100) / totalIncome);
  }

  return { totalIncome, totalExpense, totalBudget, persentExpense };
}

function getTestData() {
  const dataTest = [
    { type: "inc", title: "Selary", value: 3000 },
    { type: "inc", title: "Rent", value: 700 },
    { type: "inc", title: "Debt", value: 100 },
    { type: "inc", title: "Donats", value: 500 },
    { type: "exp", title: "Car", value: 200 },
    { type: "exp", title: "Bills", value: 600 },
    { type: "exp", title: "Food", value: 600 },
    { type: "exp", title: "Charety", value: 500 },
  ];

  // возвращаем раномное целое число
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const randomIndex = getRandomInt(dataTest.length);

  console.log(dataTest[randomIndex]);
  const randomValue = dataTest[randomIndex];
  return randomValue;
}

function getMonhtYear() {
  const now = new Date();
  const year = now.getFullYear();
  const timeFormatter = new Intl.DateTimeFormat("ru-Ru", { month: "long" });
  const month = timeFormatter.format(now);

  return { month, year };
}

export { createRecord, deleteRecord, calcBudget, getTestData, getMonhtYear };
