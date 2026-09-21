const AVAILABLE_CATEGORIES = ["Work", "Personal", "School", "Errands"];
const AVAILABLE_STATUS = ["upcoming", "in progress", "overdue", "completed"];

let typeOfFilter = null;
// let id_counter = 1;

// capture userinput

let taskName = document.getElementById("taskName");
let categoryName = document.getElementById("categoryName");
let dueDate = document.getElementById("taskDueDate");
let initialStatus = document.getElementById("statusDropDown");

const addTaskBtn = document.getElementById("addTask");
const taskListArea = document.getElementById("taskList");
const updateTaskBtn = document.getElementById("updateTask");
const checkOverdueBtn = document.getElementById("checkOverdue");

let upcomingListSection = taskListArea.querySelector("#upcomingList");
let inprogressListSection = taskListArea.querySelector("#inprogressList");
let overdueListSection = taskListArea.querySelector("#overdueList");
let completedListSection = taskListArea.querySelector("#completedList");

const showButton = document.getElementById("showDialog");
const updateDialog = document.getElementById("updateDialog");
const selectEl = updateDialog.querySelector("select");
const confirmBtn = updateDialog.querySelector("#confirmBtn");

let task = {
  id: 1,
  name: "",
  category: "",
  deadline: new Date("2026-12-31"),
  status: "In Progress",
};

let upComingTasks,
  inProgressTasks,
  overdueTasks,
  completedTasks,
  allTasks = [];

function addTask(taskObj) {
  // create new li
  allTasks.push(taskObj);
  createListItem(taskObj);
}

function createListItem(taskObj) {
  let listItem = document.createElement("li");
  listItem.style.listStyle = "none";
  listItem.style.border = "1px dotted black";
  listItem.classList.add("whitespace-pre-line");
  listItem.textContent = `Task: ${taskObj.name} \nCategory: ${taskObj.category} \nDeadline: ${taskObj.deadline} \nStatus: ${taskObj.status}\n`;
  listItem.setAttribute("id", taskObj.id + "_" + "li");
  let updateBtn = document.createElement("button");
  updateBtn.innerText = "Update";
  updateBtn.style.border = "3px solid pink";
  updateBtn.style.backgroundColor = "#e6579e";
  updateBtn.style.borderRadius = "4px";
  updateBtn.style.fontWeight = "600";
  updateBtn.setAttribute("id", taskObj.id + "_" + taskObj.name);
  updateBtn.addEventListener("click", openModal);
  listItem.appendChild(updateBtn);

  displayTask(listItem, taskObj); // not sure about this yet
}

function displayTask(itemToDisplay, taskObj) {
  let statusSelected = taskObj.status.toLowerCase().trim();

  if (statusSelected === "upcoming") {
    upcomingListSection.appendChild(itemToDisplay);
  } else if (statusSelected === "in progress") {
    inprogressListSection.appendChild(itemToDisplay);
  } else if (statusSelected === "overdue") {
    overdueListSection.appendChild(itemToDisplay);
  } else {
    // completed

    completedListSection.appendChild(itemToDisplay);
  }
}

function constructTaskObj(nameEl, categoryEl, dueDateEl, statusEl) {
  let newTask = { ...task }; // 1. Make a fresh, separate copy of the template first

  newTask.id = allTasks.length + 1;
  newTask.name = nameEl.value;
  newTask.category = categoryEl.value;
  newTask.deadline = new Date(dueDateEl.value).toLocaleDateString();
  newTask.status = statusEl.value;

  // 3. Return the independent copy
  return newTask;
}

function updateTaskObj(taskToUpdate, currentLsItemId, newStatus) {
  // move it if status is updated (also automatic)
  // call displayTask - redraw the listitem
  // update a specific list item   // right now only updates status

  console.log("currentLsItemId");
  console.log(currentLsItemId);

  console.log(
    "All LI IDs currently in DOM:",
    Array.from(document.querySelectorAll("li")).map((el) => el.id),
  );
  console.log("JavaScript is looking for ID:", currentLsItemId);

  taskToUpdate.status = newStatus; // update the actual property of the object
  let currentListItem = document.getElementById(currentLsItemId); // get li with specific id matching the btn id
  currentListItem.textContent = `Task: ${taskToUpdate.name} \nCategory: ${taskToUpdate.category} \nDeadline: ${taskToUpdate.deadline} \nStatus: ${taskToUpdate.status}\n`; // update that li's status property
  let updateButton = document.createElement("button");
  updateButton.id = taskToUpdate.id + "_" + taskToUpdate.name;
  updateButton.innerText = "Update";
  updateButton.style.border = "3px solid pink";
  updateButton.style.backgroundColor = "#e6579e";
  updateButton.style.borderRadius = "4px";
  updateButton.style.fontWeight = "600";
  updateButton.addEventListener("click", openModal);
  currentListItem.appendChild(updateButton);

  // redraw the list item
  displayTask(currentListItem, taskToUpdate);
}

// Automatically check each task’s deadline and mark tasks as “Overdue” if the current date has passed the deadline.

function checkTaskIfOverdue() {
  // in production this will have to run once every 1 hour

  allTasks.forEach((task) => {
    let currentDate = new Date();
    let taskDate = new Date(task.deadline);

    if (taskDate.getTime() < currentDate.getTime()) {
      // currentDate.getTime will always be greater than or equal to time in the past
      // move task to Overdue

      let currentTaskId = task.id;
      currentListItemId = currentTaskId + "_li";

      updateTaskObj(task, currentListItemId, "overdue");
    }
  });
}

function getFilterInput() {
  let filterUserInput = document.getElementById("searchField");
  let categoryToFilter = null,
    statusToFilter = null;

  AVAILABLE_CATEGORIES.forEach((category) => {
    filterUserInput === category
      ? (categoryToFilter = category)
      : (categoryToFilter = null);
  });

  AVAILABLE_STATUS.forEach((status) => {
    filterUserInput === status
      ? (statusToFilter = status)
      : (statusToFilter = null);
  });

  if (categoryToFilter != null) {
    typeOfFilter = "category";
  } else {
    typeOfFilter = "status";
  }

  return categoryToFilter !== null ? categoryToFilter : statusToFilter;
}

function filterByCriteria(typeOfFilter) {
  // get input from user
  let userInput = getFilterInput();

  let results = [];

  if (typeOfFilter === "category") {
    results = allTasks.filter((task) => task.category === userInput);
  } else {
    results = allTasks.filter((task) => task.status === userInput);
  }

  return results; // can return status or categories
}

function updateResultsByCategory() {
  let resultsReturned = filterByCriteria(typeOfFilter);
}

function updateResultsByStatus() {}

// Implementing Buttons

addTaskBtn.addEventListener("click", () => {
  // construct a list item
  // add it to the taskList
  // give crud operations to the list item

  let newTaskCreated = constructTaskObj(
    taskName,
    categoryName,
    dueDate,
    initialStatus,
  );

  addTask(newTaskCreated);

  // Clear inputs after adding
  taskName.value = "";
  categoryName.value = "";
  dueDate.value = "";
  initialStatus.selectedIndex = 0;

  allTasks.forEach((task) => console.log(task));
});
let foundTaskToUpdate, currentListItemId;

function openModal(e) {
  let btnId = e.currentTarget.id;
  let currentTaskId = btnId.split("_")[0];
  foundTaskToUpdate = allTasks.find(
    (task) => task.id === Number(currentTaskId),
  ); // this is for updating the task itself, in addition to the ui
  currentListItemId = currentTaskId + "_li";

  // get user input from modal
  updateDialog.showModal();
}

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // just handling the ui
  updateDialog.close(); // Have to send the select box value here.
  let newSelectedStatus = selectEl.value;

  updateTaskObj(foundTaskToUpdate, currentListItemId, newSelectedStatus);
  selectEl.value = "default"; // reset to default
});

checkOverdueBtn.addEventListener("click", () => {
  checkTaskIfOverdue();
});
