### 1. Adding New Tasks [CREATE] / Done

Create input fields for the task name, category, deadline, and an initial status (e.g., “In Progress”).
Include an “Add Task” button that will add the task to the task list.
Each task should be stored as an object with properties such as task name, category, deadline, and status.
Add the task object to an array that holds all tasks.

### 2. Displaying the Task List [VIEW] / Done

Create an HTML structure (such as an unordered list or table) to display the task list.
For each task, display the task name, category, deadline, and status.
Dynamically update the task list in the browser each time a new task is added or a status is updated.

### 3. Updating Task Status [UPDATE] / Done

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

### 4. Filtering Tasks [SEARCH] / Done

Add functionality to filter tasks by category or status (e.g., show only “Completed” tasks or tasks under the “Work” category).
Provide a dropdown or set of buttons for users to choose a filter.
When a filter is selected, only display the tasks that match the selected category or status.

### 5. Persisting Task Data with Local / Pending

Use local storage to save the current state of the task list so that tasks are restored when the page is refreshed.
Ensure that task data (including name, category, deadline, and status) is stored and retrieved correctly.

### 6. Also need to move (checking overdue functionality in document.eventListener()) / Pending

### Task Categories / Tags ⭐ / Bonus (If I had more time)

Allow tasks to belong to categories such as: drop down list (gives options) Or allow multiple tags per task.

Work
Personal
School
Errands
