## Reflection

1. Challenges faced during the project.
   - I struggled with the local storage part a bit.
   - Also looked up some help for properly adjusting the date so overdue works properly
   - Needed help to organize my code around these 2 functions as well to get the application flow right
     `updateResultsByCategory([])` and `updateResultsByStatus([])`

2. How you approached solving those challenges.
   - I converted the allTasks array JSON.stringify() to be able to store it in localstorage and then on page load, I reversed the conversion with JSON.parse() to
     to convert it back to JS object and render it on the board again
   - I had to convert the date to local midnight with the help of `new Date(
  dueDateEl.value + "T00:00:00",
).toLocaleDateString()`
   - I updated the DOM li-by-li on each change instead of using a single render() function that clears and redraws the whole board. This avoids losing scroll position and unnecessary re-creation of every list item.

3. What you would improve if given more time.
   - For the approach I took of updating DOM li-by-li, it means the update logic is duplicated between createListItem and updateTaskObj — I would like to refactor this into one shared render path before adding more features like delete or drag-and-drop.
   - I also have some dead code I could delete.
   - Some other Items I would like to implement with more time
     - utilize the following topics more:
       - Event Handling
       - Form Validation
       - Advanced DOM Manipultion (Fragments, replaceWith etc)
       - Allow tasks to belong to categories such as: drop down list (gives options) Or allow multiple tags per task.

## Assignment

### 1. Adding New Tasks [CREATE]

Create input fields for the task name, category, deadline, and an initial status (e.g., “In Progress”).
Include an “Add Task” button that will add the task to the task list.
Each task should be stored as an object with properties such as task name, category, deadline, and status.
Add the task object to an array that holds all tasks.

### 2. Displaying the Task List [VIEW]

Create an HTML structure (such as an unordered list or table) to display the task list.
For each task, display the task name, category, deadline, and status.
Dynamically update the task list in the browser each time a new task is added or a status is updated.

### 3. Updating Task Status [UPDATE]

Allow users to update the status of tasks (e.g., “In Progress,” “Completed”) via a dropdown or button.
Automatically check each task’s deadline and mark tasks as “Overdue” if the current date has passed the deadline.
Update the displayed task list whenever a task’s status changes.

Status used -

- Upcoming
- In Progress
- Overdue
- Completed

- The Past: currentDate.getTime() is greater than pastDate.getTime()
- The Present: currentDate.getTime() is equal to currentDate.getTime()
- The Future: currentDate.getTime() is less than futureDate.getTime()

### 4. Filtering Tasks [SEARCH]

Add functionality to filter tasks by category or status (e.g., show only “Completed” tasks or tasks under the “Work” category).
Provide a dropdown or set of buttons for users to choose a filter.
When a filter is selected, only display the tasks that match the selected category or status.

### 5. Persisting Task Data with Local

Use local storage to save the current state of the task list so that tasks are restored when the page is refreshed.
Ensure that task data (including name, category, deadline, and status) is stored and retrieved correctly.
