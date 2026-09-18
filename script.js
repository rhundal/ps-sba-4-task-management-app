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

let task = {
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

// function constructTask(name, category, date, status) {

// }

function addTask(taskObj) {
  allTasks.push(taskObj);
}

// capture userinput

let taskName = document.getElementById("taskName");
let categoryName = document.getElementById("categoryName");
let dueDate = document.getElementById("taskDueDate");
let initialStatus = document.getElementById("statusCheckBoxes");

const addTaskBtn = document.getElementById("addTask");
const taskListArea = document.getElementById("taskList");

let upcomingListSection = taskListArea.querySelector("#upcomingList");
let inprogressListSection = taskListArea.querySelector("#inprogressList");
let overdueListSection = taskListArea.querySelector("#overdueList");
let completedListSection = taskListArea.querySelector("#completedList");

addTaskBtn.addEventListener("click", () => {
  console.log("task caught!");

  // construct the task object

  let taskNameInput = taskName.value;
  let categoryNameInput = categoryName.value;
  let dueDateSelected = dueDate.value;
  let statusSelected = initialStatus.value;

  console.log(taskNameInput);
  console.log(categoryNameInput);
  console.log(dueDateSelected);
  console.log(statusSelected);
});
