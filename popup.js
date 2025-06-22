const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Safe JSON parsing with error handling
function safeJSONParse(jsonString, defaultValue = []) {
  try {
    return JSON.parse(jsonString) || defaultValue;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return defaultValue;
  }
}

// Input validation and sanitization
function validateAndSanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return null;
  }
  
  const trimmed = input.trim();
  
  // Check length limits
  if (trimmed.length === 0 || trimmed.length > 1000) {
    return null;
  }
  
  // Basic sanitization - remove potentially dangerous characters
  // This is a simple approach; for production, consider using a library like DOMPurify
  return trimmed.replace(/[<>]/g, '');
}

// Load tasks from localStorage and display them
function loadTasks() {
  const tasks = safeJSONParse(localStorage.getItem('tasks'), []);
  
  // Clear the list safely
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Show empty state if no tasks
  if (tasks.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No tasks yet. Add one above!';
    taskList.appendChild(emptyState);
    return;
  }

  tasks.forEach((task, index) => {
    if (typeof task !== 'string') {
      return; // Skip invalid tasks
    }
    
    const li = document.createElement('li');
    
    // Create span for task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task;
    li.appendChild(taskSpan);
    
    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✓';
    completeBtn.setAttribute('aria-label', `Complete task: ${task}`);
    completeBtn.onclick = () => {
      completeTask(index); // Use index instead of task content for more reliable completion
    };
    
    li.appendChild(completeBtn);
    taskList.appendChild(li);
  });
}

// Function to add a new task
function addTask() {
  const rawTask = taskInput.value;
  const task = validateAndSanitizeInput(rawTask);
  
  if (!task) {
    return; // Invalid input, don't add
  }
  
  try {
    const tasks = safeJSONParse(localStorage.getItem('tasks'), []);
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
    // Refocus the input field after adding a task
    taskInput.focus();
  } catch (error) {
    console.error('Error saving task:', error);
    // Could show user-friendly error message here
  }
}

// Add a new task when Add button is clicked
addBtn.onclick = addTask;

// Add a new task when Enter key is pressed
taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Complete a task by index (more reliable than by content)
function completeTask(index) {
  try {
    let tasks = safeJSONParse(localStorage.getItem('tasks'), []);
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
    }
  } catch (error) {
    console.error('Error completing task:', error);
  }
}

// Initialize the extension
loadTasks();

// Auto-focus the input field when the popup opens
// We use a small delay to ensure the popup is fully rendered
setTimeout(() => {
  taskInput.focus();
}, 100);
