const lists = [{"taskName":"Sample Task","dateValue":"2025-11-15"},
{"taskName":"Another Task","dateValue":"2025-12-01"}];


renderTasks();
function addTask() {
  const inputElement = document.querySelector(".js-input");
  const taskName = inputElement.value;
  const dateElement = document.querySelector(".js-date");
  const dateValue = dateElement.value;
  const inputobj = {
    taskName,
    dateValue
  }
  lists.push(inputobj);
  inputElement.value = "";
  dateElement.value = "";

  renderTasks();
}

function renderTasks() {
  const outputElement = document.querySelector(".js-output");
  let html = "";
  for (let i = 0; i < lists.length; i++) {
    const {taskName, dateValue} = lists[i];
    html += `
    
    <div>${taskName}</div>  
    <div>${dateValue}</div>
    <button class="js-delete-button" onclick="deleteTask(${i})">Delete</button>
    
    `;
  }
  outputElement.innerHTML = html;
}

function handlekey(event) {
  if(event.key === "Enter"){
    addTask();
  }
}

function deleteTask(index) {
  lists.splice(index, 1);
  renderTasks();
}
