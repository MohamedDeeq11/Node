const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const todoListFile = 'todoList.txt';

// Function to add a task to the Todo List
function addTask(task) {
  fs.appendFile(todoListFile, task + '\n', (err) => {
    if (err) throw err;
    console.log('Task added successfully!');
    showMenu();
  });
}

// Function to update a task in the Todo List
function updateTask(taskNumber, updatedTask) {
  fs.readFile(todoListFile, 'utf8', (err, data) => {
    if (err) throw err;

    const tasks = data.split('\n');
    if (taskNumber >= 1 && taskNumber <= tasks.length) {
      tasks[taskNumber - 1] = updatedTask;
      const updatedList = tasks.join('\n');

      fs.writeFile(todoListFile, updatedList, (err) => {
        if (err) throw err;
        console.log('Task updated successfully!');
        showMenu();
      });
    } else {
      console.log('Invalid task number.');
      showMenu();
    }
  });
}

// Function to delete a task from the Todo List
function deleteTask(taskNumber) {
  fs.readFile(todoListFile, 'utf8', (err, data) => {
    if (err) throw err;

    const tasks = data.split('\n');
    if (taskNumber >= 1 && taskNumber <= tasks.length) {
      tasks.splice(taskNumber - 1, 1);
      const updatedList = tasks.join('\n');

      fs.writeFile(todoListFile, updatedList, (err) => {
        if (err) throw err;
        console.log('Task deleted successfully!');
        showMenu();
      });
    } else {
      console.log('Invalid task number.');
      showMenu();
    }
  });
}

// Function to display the menu options
function showMenu() {
  console.log('\n=== Todo List App ===');
  console.log('1. Add Task');
  console.log('2. Update Task');
  console.log('3. Delete Task');
  console.log('4. Exit');

  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        rl.question('Enter the task: ', (task) => {
          addTask(task);
        });
        break;

      case '2':
        rl.question('Enter the task number: ', (taskNumber) => {
          rl.question('Enter the updated task: ', (updatedTask) => {
            updateTask(parseInt(taskNumber), updatedTask);
          });
        });
        break;

      case '3':
        rl.question('Enter the task number: ', (taskNumber) => {
          deleteTask(parseInt(taskNumber));
        });
        break;

      case '4':
        rl.close();
        break;

      default:
        console.log('Invalid choice.');
        showMenu();
        break;
    }
  });
}

// Create an empty Todo List file if it doesn't exist
fs.access(todoListFile, fs.constants.F_OK, (err) => {
  if (err) {
    fs.writeFile(todoListFile, '', (err) => {
      if (err) throw err;
      console.log('Todo List file created.');
      showMenu();
    });
  } else {
    showMenu();
  }
});