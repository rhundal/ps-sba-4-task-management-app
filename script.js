/*
1. Adding New Tasks [CREATE]
Create input fields for the task name, category, deadline, and an initial status (e.g., “In Progress”).
Include an “Add Task” button that will add the task to the task list.
Each task should be stored as an object with properties such as task name, category, deadline, and status.
Add the task object to an array that holds all tasks.

Task Categories / Tags ⭐

Allow tasks to belong to categories such as: drop down list (gives options)

Work
Personal
School
Errands

Or allow multiple tags per task.

status - 

Upcoming
In Progress
Overdue
Completed
*/

const AVAILABLE_CATEGORIES = ["Work", "Personal", "School", "Errands"];
let id_counter = 1;

// capture userinput

let taskName = document.getElementById("taskName");
let categoryName = document.getElementById("categoryName");
let dueDate = document.getElementById("taskDueDate");
let initialStatus = document.getElementById("statusDropDown");

const addTaskBtn = document.getElementById("addTask");
const taskListArea = document.getElementById("taskList");

let upcomingListSection = taskListArea.querySelector("#upcomingList");
let inprogressListSection = taskListArea.querySelector("#inprogressList");
let overdueListSection = taskListArea.querySelector("#overdueList");
let completedListSection = taskListArea.querySelector("#completedList");

let task = {
  id: null,
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
  listItem.textContent = `${taskObj.name} ${taskObj.category} ${taskObj.deadline} ${taskObj.status}`;

  displayTask(listItem, taskObj);
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

  newTask.id = id_counter++;
  newTask.name = nameEl.value;
  newTask.category = categoryEl.value;
  newTask.deadline = new Date(dueDateEl.value);
  newTask.status = statusEl.value;

  // 3. Return the independent copy
  return newTask;
}

addTaskBtn.addEventListener("click", () => {
  //   console.log("task caught!");
  //   console.log(taskNameInput);
  //   console.log(categoryNameInput);
  //   console.log(dueDateSelected);
  //   console.log(statusSelected);

  // construct a list item
  // add it to the taskList
  // give crud operations to the list item

  let newTaskCreated = constructTaskObj(
    taskName,
    categoryName,
    dueDate,
    initialStatus,
  );

  allTasks.push(newTaskCreated);

  addTask(newTaskCreated);

  // Clear inputs after adding
  taskName.value = "";
  categoryName.value = "";
  dueDate.value = "";
  initialStatus.selectedIndex = 0;

  allTasks.forEach((task) => console.log(task));
});
