// Data 
const todo1 = {
    text: "Bozorlik qilish",
    status: "inProgress",
    id: "td1"
}
const todo2 = {
    text: "Maktabdan bolalarni olish",
    status: "inProgress",
    id: "td2",
}
const todo3 = {
    text: "Ovqat tayyorlash",
    status: "completed",
    id: "td3"
}

const todos = [todo1, todo2, todo3];

// constants
const todosUl = document.querySelector(".todos")
const btnAdd = document.querySelector(".btn-add")

// DELETE FUNCTION ********************************
const deleteItem = function (event) {
    // console.log(event.target.parentElement.value);
    const id = event.target.parentElement.value;
    const findTodoItem = todos.find(todo => todo.id === id);
    //  {text: 'Bozorlik qilish', status: 'inProgress', id: 'td1'}
    findTodoItem.status = "removed";
    //  {text: 'Bozorlik qilish', status: 'removed', id: 'td1'}
    updatedTodosUI();
}
const addDeleteListener = function () {
    const delBtns = document.querySelectorAll(".btn-delete");
    // console.log(delBtns);
    delBtns.forEach(btn => btn.addEventListener("click", deleteItem));
}

// COMPLETED FUNCTION ********************************
const completed = (e) => {
    const id = e.target.value; //td2
    const findForCompleted = todos.find(todo => todo.id === id);
    findForCompleted.status = findForCompleted.status !== "completed" ? "completed" : "inProgress" // middle

    updatedTodosUI()
}

const addCompletedListener = function () {
    const checkBtns = document.querySelectorAll(".btn-check");
    checkBtns.forEach(btn => btn.addEventListener("click", completed))
}



const updatedTodosUI = function () {

    todosUl.innerHTML = "";
    btnAdd.classList.remove("hidden")

    const TODOS = todos.filter(todo => todo.status != "removed");

    TODOS.forEach(todo => {
        const li = `
            <li class="todo-item ${todo.status === 'completed' ? "completed" : ""}">
                <div class="todo-text">
                    <button class="btn-check" value="${todo.id}"></button>
                    <span>${todo.text}</span>
                </div>
                <button class="btn-delete ${todo.status === "completed" ? "hidden" : ""}" value="${todo.id}">
                    <img src="img/remove-icon.svg" alt="">
                </button>
            </li>
        `;
        todosUl.insertAdjacentHTML("afterbegin", li)
    });

    addDeleteListener();
    addCompletedListener();
}

updatedTodosUI();

// MODAL FUNCTION ********************************
const modal = document.querySelector(".overlay");
const btnCreate = document.querySelector(".btn-add");
const cancelBtn = document.querySelector(".cancel");
const saveBtn = document.querySelector(".save");
const modalInput = document.querySelector(".modalInput")



btnCreate.addEventListener("click", () => {
    modalInput.value = ""
    modal.classList.remove("showHide")
})

cancelBtn.addEventListener("click", () => {
    modal.classList.add("showHide")
})

saveBtn.addEventListener("click", () => {

    if (modalInput.value.trim()) {
        modal.classList.add("showHide");
        const obj = {
            text: modalInput.value,
            id: `td${todos.length + 1}`,
            status: "inProgress",
        }
        todos.push(obj);
        updatedTodosUI();
    }

})


/**********************MENU-SORT*********************** */
const menuSort = document.querySelector(".menu-sort");
const btnSort = document.querySelector(".btn-sort");
btnSort.addEventListener("click", () => {
    // menuSort.classList.toggle("hide")
    menuSort.classList.toggle("hide")
})

const allBtn = document.querySelector("#all");
const completedBtn = document.querySelector("#completed");
const inprogressBtn = document.querySelector("#inProgress");
const removedBtn = document.querySelector("#removed");

allBtn.addEventListener("click", updatedTodosUI)

const renderSelectingMenu = (event) => {
    // console.log(event.target.id);
    
    const status = event.target.id;
    const todosCompleted = todos.filter(todo => todo.status === status);
    todosUl.innerHTML = "";

    todosCompleted.forEach(todo => {
        const li = `
                <li class="todo-item ${todo.status === "completed" ? "completed": ""}">
                    <div class="todo-text">
                        <button class="btn-check" value="${todo.id}"></button>
                        <span>${todo.text}</span>
                    </div>
                    <button class="btn-delete ${todo.status === "completed" ? "hidden": ""}" value="${todo.id}">
                        <img src="img/remove-icon.svg" alt="">
                    </button>
                </li>
        `
        todosUl.insertAdjacentHTML("afterbegin", li)
    })

    // btnAdd.innerHTML = "" junior
    btnAdd.classList.add("hidden");
    addCompletedListener();
}

completedBtn.addEventListener("click", renderSelectingMenu)
inprogressBtn.addEventListener("click", renderSelectingMenu)
removedBtn.addEventListener("click", renderSelectingMenu)



