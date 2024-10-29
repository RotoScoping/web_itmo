let grapher = null;
let attemptsMade = 0;
const resultEntriesCacheKey = "result_entries";
const getEntryCacheKey = function (index) {
  return `${resultEntriesCacheKey}[${index}]`;
};
const rCacheKey = "R";
const attemptsMadeCacheKey = "attemptsMade";

document.addEventListener("DOMContentLoaded", function () {
  //вызывает функцию runGrapher() из graph.js
  grapher = runGrapher();
  loadDataFromLocalStorage();
  loadActiveRButton();
});
function addEntry(entry) {
  try {
    const resultsTable = document.getElementById("results");
    const tableBody = resultsTable.getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();
    const attemptNumberCell = newRow.insertCell();
    const xCell = newRow.insertCell();
    const yCell = newRow.insertCell();
    const rCell = newRow.insertCell();
    const resultCell = newRow.insertCell();
    const attemptTimeCell = newRow.insertCell();
    const processingTimeCell = newRow.insertCell();

    attemptNumberCell.innerHTML = entry["attemptNumber"];
    xCell.innerHTML = entry.x;
    yCell.innerHTML = entry.y;
    rCell.innerHTML = entry["r"];
    resultCell.innerHTML = entry["result"];
    attemptTimeCell.innerHTML = entry["attemptTime"];
    processingTimeCell.innerHTML = entry["processingTime"];
    grapher.drawGraph();
  } catch (TypeError) {
    console.log(":)");
  }
}

function loadDataFromLocalStorage() {


  const r = localStorage.getItem(rCacheKey);
  if (r) {
    setR(r);
  }

  const attemptsMadeCached = localStorage.getItem(attemptsMadeCacheKey);
  if (attemptsMadeCached) {
    attemptsMade = attemptsMadeCached;
  }

  if (attemptsMade) {
    for (var i = 0; i < attemptsMade; i++) {
      const cachedEntryString = localStorage.getItem(getEntryCacheKey(i));
      const cachedEntry = JSON.parse(cachedEntryString);
      addEntry(cachedEntry);
    }
  }
}

function loadActiveRButton() {


  if (localStorage.getItem(rCacheKey) !== null) {
    const rElement = document.getElementById("r");
    const buttons = rElement.getElementsByTagName("button");
    for (const button of buttons) {
      if (Number(button.innerHTML) == Number(localStorage.getItem(rCacheKey))) {
        button.className = "active";
      }
    }
  }
}
async function checkPoint() {
  const data = getData();
  const errorMessage = validateData(data);

  if (errorMessage) {
    alert("Error: " + errorMessage);
    return;
  }

  const dataEntry = {};

  dataEntry.x = data.x.toString();

  dataEntry.y = data.y.toString();

  dataEntry.r = data.r.toString();

  const sendDate = new Date().getTime();
  const checkResult = await getCheckPointResult(dataEntry);
  dataEntry.attemptNumber = attemptsMade;
  dataEntry.result = checkResult;
  const receiveDate = new Date().getTime();

  const notDateParsed = new Date();
  const date = ('0' + notDateParsed.getDate()).slice(-2);
  const month = ('0' + (notDateParsed.getMonth() + 1)).slice(-2);
  const year = notDateParsed.getFullYear();
  const hours = ('0' + notDateParsed.getHours()).slice(-2);
  const minutes = ('0' + notDateParsed.getMinutes()).slice(-2);
  const seconds = ('0' + notDateParsed.getSeconds()).slice(-2);
  dataEntry.attemptTime = `${date}/${month}/${year}, ${hours}:${minutes}:${seconds}`

  const responseTimeMs = receiveDate - sendDate;
  dataEntry.processingTime = responseTimeMs + " ms";

  addEntry(dataEntry);

  localStorage.setItem(
    getEntryCacheKey(dataEntry.attemptNumber - 1),
    JSON.stringify(dataEntry)
  );

  localStorage.setItem(attemptsMadeCacheKey, attemptsMade);
}



function validateData(data) {
  if (!data.x) {
    return "x not a defined.";
  }

  if (isNaN(data.x)) {
    return "x not a number.";
  }

  if (!data.y && data.y == null) {
    return "y not a defined.";
  }

  if (isNaN(data.y)) {
    return "y not a number.";
  }

  if (!data.r) {
    return "r not a defined.";
  }

  if (isNaN(data.r)) {
    return "r not a number.";
  }

  if (data.x < -5) {
    return "x must be greater than (or equal to) -5";
  }

  if (data.x > 5) {
    return "x must be less than (or equal to) 5";
  }

  return null;
}

let y = null;
let r = null;
function getY() {
  const yInput = document.getElementById("y");
  return yInput.value.trim();
}

function setR(newValue) {
  localStorage.setItem(rCacheKey, newValue);
  const rInput = document.getElementById("r");
  rInput.value = newValue;
}

function getR() {
  const rInput = document.getElementById("r");
  return rInput.value.trim();
}

function setY(newValue) {
  const YInput = document.getElementById("y");
  YInput.value = newValue;
}

function getData() {
  const x = document.querySelector('.checkbox-group input[type="checkbox"]:checked');
  const y = document.getElementById("y").value.trim();
  const r = document.getElementById("R").value.trim();

  return {
    x: x ? x.value : null,
    y: y,
    r: r,
  };
}


document.addEventListener('DOMContentLoaded', function () {
  const yInput = document.getElementById('y');
  const rInput = document.getElementById('R');

  yInput.addEventListener('input', function () {
    validateInput(yInput, -5, 5);
  });

  rInput.addEventListener('input', function () {
    validateInput(rInput, 2, 5);
  });
});

// Функция для проверки значения поля
function validateInput(inputElement, underBound, upperBound) {
  const value = inputElement.value;
  const errorMessage = inputElement.nextElementSibling;  // Находим элемент ошибки рядом с input

  // Проверяем, является ли значение числом и находится ли оно в пределах границ
  if (!isNaN(value) && value >= underBound && value <= upperBound) {
    errorMessage.textContent = '';  // Очищаем сообщение об ошибке
    inputElement.classList.remove('input-error');
  } else {
    errorMessage.textContent = `Введите число от ${underBound} до ${upperBound}.`;  // Выводим сообщение об ошибке
    inputElement.classList.add('input-error');
  }
}

function resetForm() {
  document.getElementById("y").value = "";
  document.getElementById("R").value = "";
  const checkboxes = document.querySelectorAll("input[name='x']");
  checkboxes.forEach(checkbox => checkbox.checked = false);
  document.getElementById("submitButton").disabled = true;
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(message => message.textContent = "");
}



function checkInputs() {
  // Получаем значение чекбокса x
  const x = document.querySelector('.checkbox-group input[type="checkbox"]:checked');
  // Получаем значения y и R
  const y = document.getElementById('y').value.trim();
  const R = document.getElementById('R').value.trim();

  // Проверяем, что все значения заполнены
  const submitButton = document.getElementById('submitButton');
  if (x && y !== '' && R !== '' && !( y>5 || y<-5 || R<2 || R>5)) {
    submitButton.disabled = false;  // Активируем кнопку, если все значения есть
  } else {
    submitButton.disabled = true;  // Деактивируем кнопку, если хотя бы одно значение не заполнено
  }
}



function toggleCheckboxes(clickedCheckbox) {
  const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
  // Проходим по каждому чекбоксу
  checkboxes.forEach(checkbox => {
    // Если чекбокс не тот, который был нажат, отключаем его
    if (checkbox !== clickedCheckbox) {
      checkbox.checked = false;
    }
    checkInputs();
  });
}

async function getCheckPointResult(jsonData) {
  try {
    const queryString = new URLSearchParams(jsonData).toString();
    const url = `/fcgi-bin/?${queryString}`;

    // Отправляем запрос
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Проверяем успешен ли ответ
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    // Парсим JSON ответ
    const result = await response.json();

    if (result.error != null) {
      alert("Ответ от сервера не получен");
      console.log(result);
      return false;
    }
    return result.hit;

  } catch (error) {
    // Обрабатываем ошибки
    alert(error.message);
    console.error(error);
    return false;
  }
}
