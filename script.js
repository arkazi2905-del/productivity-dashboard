const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

const darkModeToggle = document.getElementById("darkModeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

/* ADD TASK */

addBtn.addEventListener("click", () => {

  const text = taskInput.value.trim();

  if(text === ""){
    alert("Enter a task!");
    return;
  }

  const task = {
    text,
    date: dueDate.value,
    category: category.value,
    completed:false
  };

  tasks.push(task);

  saveTasks();
  renderTasks();

  taskInput.value="";
  dueDate.value="";
});

/* RENDER */

function renderTasks(filter="all"){

  taskList.innerHTML="";

  let filteredTasks = tasks.filter(task => {

    if(filter === "completed") return task.completed;

    if(filter === "pending") return !task.completed;

    return true;
  });

  filteredTasks.forEach((task,index)=>{

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-info ${task.completed ? "completed" : ""}">
        <strong>${task.text}</strong><br>
        📅 ${task.date || "No date"}<br>
        📂 ${task.category}<br>
        
      </div>

      <div class="task-actions">
        <button onclick="toggleTask(${index})">✔️</button>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    taskList.appendChild(li);

  });

  taskCount.textContent = `Total Tasks: ${tasks.length}`;
}

/* SAVE */

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* TOGGLE */

function toggleTask(index){
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

/* DELETE */

function deleteTask(index){
  tasks.splice(index,1);
  saveTasks();
  renderTasks();
}

/* EDIT */

function editTask(index){

  const newTask = prompt("Edit Task", tasks[index].text);

  if(newTask){
    tasks[index].text = newTask;
    saveTasks();
    renderTasks();
  }

}

/* FILTER */

function filterTasks(type){
  renderTasks(type);
}



/* DARK MODE */

darkModeToggle.addEventListener("click", ()=>{

  document.body.classList.toggle("dark");

});

/* CLOCK */

function updateClock(){

  const now = new Date();

  const time =
    now.toLocaleTimeString();

  const date =
    now.toLocaleDateString(undefined,{
      weekday:"long",
      year:"numeric",
      month:"long",
      day:"numeric"
    });

  const hour = now.getHours();

  let greeting = "";

  if(hour < 12){
    greeting = "Good Morning ☀️";
  }
  else if(hour < 18){
    greeting = "Good Afternoon 🌤️";
  }
  else{
    greeting = "Good Evening 🌙";
  }

  document.getElementById("clock").innerHTML = `
    <div>${greeting}</div>
    <div style="margin-top:10px;">${date}</div>
    <div style="margin-top:10px; font-size:40px; font-weight:bold;">
      ${time}
    </div>
  `;

}

setInterval(updateClock,1000);

updateClock();

/* CONTACT FORM */

document.getElementById("contactForm")
.addEventListener("submit", function(e){

  e.preventDefault();

  const name = document.getElementById("name").value.trim();

  const email = document.getElementById("email").value.trim();

  const message = document.getElementById("message").value.trim();

  const formMessage =
    document.getElementById("formMessage");

  const emailPattern =
    /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if(name === "" || email === "" || message === ""){

    formMessage.innerHTML =
      "❌ Please fill all fields";

    formMessage.style.color="red";

    return;
  }

  if(!email.match(emailPattern)){

    formMessage.innerHTML =
      "❌ Invalid email format";

    formMessage.style.color="red";

    return;
  }

  formMessage.innerHTML =
    "✅ Message sent successfully!";

  formMessage.style.color="green";

  this.reset();

});