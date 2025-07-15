const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Drag and drop state
let draggedElement = null;
let draggedIndex = -1;

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
    li.draggable = true;
    li.dataset.index = index;
    
    // Add drag handle
    const dragHandle = document.createElement('span');
    dragHandle.className = 'drag-handle';
    dragHandle.innerHTML = '⋮⋮';
    dragHandle.setAttribute('aria-label', 'Drag to reorder');
    li.appendChild(dragHandle);
    
    // Create span for task text
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-text';
    taskSpan.textContent = task;
    li.appendChild(taskSpan);
    
    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✓';
    completeBtn.setAttribute('aria-label', `Complete task: ${task}`);
    completeBtn.onclick = () => {
      completeTask(index); // Use index instead of task content for more reliable completion
    };
    
    li.appendChild(completeBtn);
    
    // Add drag and drop event listeners
    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragend', handleDragEnd);
    li.addEventListener('dragover', handleDragOver);
    li.addEventListener('drop', handleDrop);
    li.addEventListener('dragenter', handleDragEnter);
    li.addEventListener('dragleave', handleDragLeave);
    
    taskList.appendChild(li);
  });
}

// Drag and drop event handlers
function handleDragStart(e) {
  draggedElement = this;
  draggedIndex = parseInt(this.dataset.index);
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragEnd(e) {
  this.classList.remove('dragging');
  draggedElement = null;
  draggedIndex = -1;
  
  // Remove drop zone indicators
  document.querySelectorAll('.drag-over').forEach(el => {
    el.classList.remove('drag-over');
  });
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
  e.preventDefault();
  this.classList.add('drag-over');
}

function handleDragLeave(e) {
  // Only remove class if we're leaving the element entirely
  if (!this.contains(e.relatedTarget)) {
    this.classList.remove('drag-over');
  }
}

function handleDrop(e) {
  e.preventDefault();
  this.classList.remove('drag-over');
  
  if (draggedElement && draggedElement !== this) {
    const dropIndex = parseInt(this.dataset.index);
    
    // Reorder tasks in localStorage
    const tasks = safeJSONParse(localStorage.getItem('tasks'), []);
    const movedTask = tasks[draggedIndex];
    
    // Remove from original position
    tasks.splice(draggedIndex, 1);
    
    // Insert at new position
    tasks.splice(dropIndex, 0, movedTask);
    
    // Save back to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Reload the list to reflect the new order
    loadTasks();
  }
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
