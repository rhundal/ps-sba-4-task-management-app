const AVAILABLE_CATEGORIES = ["Work", "Personal", "School", "Errands"];
const AVAILABLE_STATUS = ["upcoming", "in progress", "overdue", "completed"];

let typeOfFilter = "";
let userInput = null;
let filterUserInput = "";

// capture userinput

let taskName = document.getElementById("taskName");
let categoryName = document.getElementById("categoryName");
let dueDate = document.getElementById("taskDueDate");
let initialStatus = document.getElementById("statusDropDown");

const addTaskBtn = document.getElementById("addTask");
const taskListArea = document.getElementById("taskList");
const filterBtn = document.getElementById("filterTask");

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
  localStorage.setItem("currentState", JSON.stringify(allTasks));
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
  newTask.deadline = new Date(
    dueDateEl.value + "T00:00:00",
  ).toLocaleDateString();
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
  localStorage.setItem("currentState", JSON.stringify(allTasks));
}

// Automatically check each task’s deadline and mark tasks as “Overdue” if the current date has passed the deadline.

function checkTaskIfOverdue() {
  // in production this will have to run once every 1 hour

  allTasks.forEach((task) => {
    if (task.status.toLowerCase() === "completed") return;
    if (task.status.toLowerCase() === "overdue") return;
    let currentDate = new Date();
    let taskDate = new Date(task.deadline); // end of the due day, local time

    if (taskDate.getTime() < currentDate.getTime()) {
      // currentDate.getTime will always be greater than or equal to time in the past
      // move task to Overdue

      let currentTaskId = task.id;
      currentListItemId = currentTaskId + "_li";

      updateTaskObj(task, currentListItemId, "overdue");
    }
  });
}

// new added functions for filtering

function getFilterInput() {
  console.log("getFilterInput called");
  filterUserInput = document
    .getElementById("searchField")
    .value.toLowerCase()
    .trim();
  let categoryToFilter = null,
    statusToFilter = null;

  let isCategory = AVAILABLE_CATEGORIES.map((cat) =>
    cat.toLowerCase(),
  ).includes(filterUserInput);

  let isStatus = AVAILABLE_STATUS.includes(filterUserInput);

  if (isCategory) {
    categoryToFilter = AVAILABLE_CATEGORIES.find(
      (cat) => cat.toLowerCase() === filterUserInput,
    );
    typeOfFilter = "category";
  } else if (isStatus) {
    statusToFilter = filterUserInput;
    typeOfFilter = "status";
  } else {
    typeOfFilter = "unknown";
    return null;
  }

  return isCategory ? categoryToFilter : statusToFilter;
}

function filterByCriteria() {
  // get input from user
  userInput = getFilterInput(); // global variable
  console.log("userInput " + userInput);

  if (!userInput || typeOfFilter === "unknown") return [];

  let results = [];

  if (typeOfFilter === "category") {
    results = allTasks.filter(
      (task) => task.category.toLowerCase() === userInput.toLowerCase(),
    );
  } else {
    results = allTasks.filter(
      (task) => task.status.toLowerCase() === userInput.toLowerCase(),
    );
  }

  return results; // can return status or categories
}

function updateResultsByCategory(filteredTasks) {
  // needed hand holding to make this function perfect

  let allSections = [
    upcomingListSection,
    inprogressListSection,
    overdueListSection,
    completedListSection,
  ];

  let isFieldEmpty = document.getElementById("searchField").value.trim() === "";
  let showAll = isFieldEmpty;

  allSections.forEach((section) => {
    section.querySelectorAll("li").forEach((lisItem) => {
      // let ItemIdBeforeConversion = lisItem.id.split("_")[0];
      let ItemId = Number(lisItem.id.split("_")[0]);

      let isFound =
        showAll ||
        filteredTasks.some((result) => {
          return result.id === ItemId;
        });

      console.log("isFound " + isFound);
      if (isFound) {
        lisItem.style.display = "";
      } else {
        lisItem.style.display = "none";
      }
    });
  });
}

function updateResultsByStatus(filteredTasks) {
  // let resultsReturnedForStatus = filterByCriteria(typeOfFilter); // redundant

  let allSections = [
    upcomingListSection,
    inprogressListSection,
    overdueListSection,
    completedListSection,
  ];

  // Check if the input box is completely clear
  let isFieldEmpty = document.getElementById("searchField").value.trim() === "";

  allSections.forEach((section) => {
    // If the search field is empty, UNHIDE all column sections instantly [1]
    if (isFieldEmpty) {
      section.style.display = "";
    } else if (
      section.id.toLowerCase() ===
      userInput.replace(" ", "").toLowerCase() + "list"
    ) {
      section.style.display = "";
    } else {
      section.style.display = "none";
    }
  });
}

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

  // allTasks.forEach((task) => console.log(task));
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
  updateDialog.close(); // Have to send the select box value here.
  let newSelectedStatus = selectEl.value;

  updateTaskObj(foundTaskToUpdate, currentListItemId, newSelectedStatus);
  selectEl.value = "default"; // reset to default
});

// filtering buttons

filterBtn.addEventListener("click", function () {
  let tasksCaught = filterByCriteria();

  tasksCaught.forEach((task) => {
    console.log(task);
  });

  if (typeOfFilter === "category") {
    updateResultsByCategory(tasksCaught);
  } else {
    updateResultsByStatus(tasksCaught);
  }
});

// Global document-level listener
document.addEventListener("input", function (event) {
  // Check if the input event came from your specific search field
  if (event.target && event.target.id === "searchField") {
    let currentText = event.target.value.trim();

    // If the user cleared out the text field, instantly restore all items
    if (currentText === "") {
      console.log(
        "Global Document Check: Search field cleared. Restoring board...",
      );
      updateResultsByCategory([]);
      updateResultsByStatus([]);
    }
  }
});

// Run once immediately when the script loads, so tasks are correct
// before the user does anything at all.
checkTaskIfOverdue();

// Then re-check periodically, so a task doesn't wait on user input
//  to become "Overdue".
setInterval(checkTaskIfOverdue, 60 * 1000); // every 60 seconds

localStorage.getItem("currentState", allTasks);

function loadTasksFromStorage() {
  let stored = localStorage.getItem("currentState");
  if (!stored) return;

  try {
    let parsedTasks = JSON.parse(stored);
    allTasks = parsedTasks;
    allTasks.forEach((taskObj) => createListItem(taskObj));
  } catch (err) {
    console.error("Could not load saved tasks:", err);
  }
}

loadTasksFromStorage();
