const newTask=document.querySelector("#inputTask");
const filterTask=document.querySelector("#filter");
const taskForm=document.querySelector("#task-form");
const clearTaskBtn=document.querySelector("#clearAll");
const taskList=document.querySelector("ul");

loadEventListeners();


function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", loadTasks);
  taskForm.addEventListener("submit",addNewTask);
  taskList.addEventListener("click",delTask);
  clearTaskBtn.addEventListener("click",clearAll);
  filterTask.addEventListener("keyup",filter);  
}


function loadTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task){
    let li = document.createElement("li");
    li.classList.add("collection-item");
    li.innerHTML=  `${task}<a href=# class='secondary-content del-item'><i class='fas fa-trash-alt'></i></a>`;
    taskList.appendChild(li);
  });
}

function addNewTask(e) {
  if(newTask.value ===""){
    alert("Plz input your new task");
  }else{
    // create a <li></li>
    let li = document.createElement("li");
    // add a class to li
    li.classList.add("collection-item");
    li.innerHTML=  `${newTask.value}<a href=# class='secondary-content del-item'><i class='fas fa-trash-alt'></i></a>`;
    // append li to ul
    taskList.appendChild(li);
    storeTaskInLocalStorage(newTask.value);
    // clear input
    newTask.value ="";
    e.preventDefault();
  }
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function delTask(e){
  if(e.target.parentElement.classList.contains("del-item"))
  // if(e.target.classList[1] === "fa-trash-alt")
  { 
    if(confirm("Are you sure to delete?")){
      //.parentE.parentE也就是li (.parentE是a)
      e.target.parentElement.parentElement.remove()
      removeTaskInLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskInLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function (task, index) {
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAll() {
  // taskList.innerHTML = '';
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  // https://jsperf.com/innerhtml-vs-removechild
  // 一個一個remove效率比直接innerHTML = ''好
  clearAllTasksInLocalStorage();  
}
function clearAllTasksInLocalStorage() {
  localStorage.clear();
}

function filter(e){
  const filterText = e.target.value.toLowerCase();
  document.querySelectorAll("li.collection-item").forEach(function (task) {
    // const taskText = task.textContent;
    const taskText = task.firstChild.textContent;
    if(taskText.toLowerCase().indexOf(filterText) != -1){
      task.style.display="block";
    }else{
      task.style.display="none";
    }
  });
}