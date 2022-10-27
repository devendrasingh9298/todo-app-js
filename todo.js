// TODO 2 : get it from local storage
 
let todos = localStorage.getItem("todos") !== null ? JSON.parse(localStorage.getItem("todos")) : [];


let counter = 0;

const todosContainer = document.getElementById('tbody');

document.getElementById("add_todo_action").addEventListener("click", function(e) {
    const title = document.getElementById("todo_text").value;
    if (title === " ") return;

    const todo = {
        id: counter,
        title: title,
        completed: false
    }
    todos.push(todo);
    counter ++;
     createTodoItem(title)
     updateStorage();
})
const updateStorage = () => {
    // TODO 1 : call local storage, make json from todos array, store it to
    //local storage
    const todostr = JSON.stringify(todos);
    localStorage.setItem("todos", todostr)

}

var createTodoItem = (title, completed) => {
     //big div
     const todoDiv = document.createElement('div');
     todoDiv.classList.add('todoDiv');
 
     //first small div to add text
     const textDiv = document.createElement('div')
     const serialNumber = document.createElement('h5');
     
     serialNumber.innerText = "TODO # "+ (counter);
 
     textDiv.appendChild(serialNumber);
 
     const todoTitle = document.createElement('h2');
     serialNumber.classList.add('serialNumber');
     todoTitle.innerText = title;
     textDiv.appendChild(todoTitle);
 
     // set div, action
     const actionDiv = document.createElement('div');
     actionDiv.classList.add('actionDiv');
     const completeButton = document.createElement('button');
     completeButton.innerText = completed ? 'completed' : 'Mark As Complted'
     if(completed){
        completeButton.disabled = true;
        completeButton.style.backgroundColor = 'green'
        completeButton.style.color = 'white'
     }
     actionDiv.appendChild(completeButton);
 
     const deleteButton = document.createElement('button');
     deleteButton.innerText = 'Delete'
     deleteButton.style.backgroundColor = 'red';
     deleteButton.style.color = 'white';
     deleteButton.style.border = '0';
     deleteButton.style.borderRadius = '2px';
     deleteButton.style.padding = '3px 5px';
     actionDiv.appendChild(deleteButton);
 
 
     deleteButton.addEventListener('click', function(e){
         todosContainer.removeChild(todoDiv);
         const title = todoTitle.innerText;
        todos = todos.filter(todo => todo.title != title);
        updateStorage();
     })
 
     completeButton.addEventListener('click', function(e){
         completeButton.innerText = 'Completed';
         completeButton.disabled = true;
         completeButton.style.backgroundColor = 'green';
         completeButton.style.color = 'white';
        todos = todos.map(todo => {
            if(todo.title === title){
                todo.completed = true;
            }
            return todo;
        })
        console.log(todos);
         updateStorage();
     })
 
     todoDiv.appendChild(textDiv);
     todoDiv.appendChild(actionDiv);
   
     todosContainer.appendChild(todoDiv);  
     document.getElementById('todo_text').value = " ";
}
    
   // TODO 3 : create a function to add todos in the list
todos.map(todo => {
    counter++;
    createTodoItem(todo.title, todo.completed)
})
    
