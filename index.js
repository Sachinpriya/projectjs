let arritems = [];// empty array 

let nexttodopage;
let condition = true;


// initialisation
function initialisation() {
  if (condition) {
    document.getElementById("elem").style.display = "none";
    document.getElementById("elemn").style.display = "block";
  } else {
    document.getElementById("elemn").style.display = "none";
    document.getElementById("elem").style.display = "block";
  }
  if (arritems.length === 0) {
    console.log(document.getElementById("noTodo"));
    console.log(arritems);
    document.getElementById("noTodo").style.display = "block";
  } else {
    console.log("inside");
    document.getElementById("noTodo").style.display = "none";
  }
}

initialisation();

// create card
function renderTodo(todo) {
  initialisation();
  const list = document.querySelector(".container1");
  var child = list.lastElementChild;
  while (child) {
    list.removeChild(child);
    child = list.lastElementChild;
  }

  for (let i = 0; i < arritems.length; i++) {
    const node = document.createElement("div");
    node.setAttribute("class", `card`);
    node.setAttribute("data-key", arritems[i].id);
    node.innerHTML = `<p class="card-heading" onclick="redirect(this)">${arritems[i].heading}</p>
      <ul style="list-style-type:none;">
      </ul>
      <div class='footer'>
          <button class='btn-completed' onclick="removeToDo(this)"><i class="fa fa-trash" aria-hidden="true"></i></button> 
          <p class = 'btn-add' onclick="toggleAddItem(this)"><i class="fa fa-plus-circle"></i></p>
      </div>
      `;
    console.log(node.childNodes);
    list.append(node);
    let currentTodo = arritems[i];
    for (let j = 0; j < currentTodo.subTask.length; j++) {
      let classToPut = currentTodo.subTask[j].marked
        ? "card-item card-item-checked"
        : "card-item";
      let rest = currentTodo.subTask[j].marked
        ? ""
        : '<button class = "completedd" onclick="markCompleted(this)">completed</button>';
      const liNode = document.createElement("li");
      liNode.setAttribute("class", classToPut);
      liNode.setAttribute("data-key", currentTodo.subTask[j].id);
      liNode.innerHTML = ` ${currentTodo.subTask[j].name} ${rest}`;
      node.childNodes[2].append(liNode);
    }
  }
}
//  markDone button
function markCompleted(element) {
  let classToPut = condition
    ? "card-item card-item-checked"
    : "card-item-2 card-item-checked";
  element.parentNode.setAttribute("class", classToPut);
  let id = element.parentNode.parentNode.parentNode.getAttribute("data-key");
  let subTaskId = element.parentNode.getAttribute("data-key");


  for (let i = 0; i < arritems.length; i++) {
    if (arritems[i].id == id) {
      for (let j = 0; j < arritems[i].subTask.length; j++) {
        if (arritems[i].subTask[j].id == subTaskId) {
          arritems[i].subTask[j].marked = true;
        }
      }
    }
  }
  element.parentNode.removeChild(element);
}
// push into empty array
function addTodo() {
  let heading = document.getElementById("listHeading").value;
  if (heading !== "") {
    const todo = {
      heading,
      completed: false,
      subTask: [],
      id: Date.now(),
    };
    arritems.push(todo);
    toggle();
    goBack();
  }
}
// addd button on listing of item
function addSubTodo() {
  let taskHeading = document.getElementById("subListHeading").value;
  if (taskHeading !== "") {
    let list;
    if (condition) {
      list = nexttodopage.parentNode.parentNode.childNodes[2];
    } else {
      list = nexttodopage.parentNode.parentNode.childNodes[3];
    }
    console.log(nexttodopage.parentNode, nexttodopage.parentNode.parentNode);
    let id = nexttodopage.parentNode.parentNode.getAttribute("data-key");
    console.log(nexttodopage.parentNode.parentNode);

    const node = document.createElement("li");
    node.setAttribute("class", condition ? `card-item` : `card-item-2`);
    node.setAttribute("data-key", Date.now());
    node.innerHTML = ` ${taskHeading}<button class = "completedd" onclick="markCompleted(this)">completed</button>`;

    let currentTodo;
    //Find in the todo array
    for (let i = 0; i < arritems.length; i++) {
      if (arritems[i].id == id) {
        arritems[i].subTask.push({
          name: taskHeading,
          marked: false,
          id: node.getAttribute("data-key"),
        });
      }
    }

    list.append(node);
    toggleAddItem();
  }
  console.log(arritems);
}
// delete
function removeToDo(element) {
  let tempElement = element.parentNode.parentNode;
  console.log(tempElement);

  //Find in the todo array and remove
  for (let i = 0; i < arritems.length; i++) {
    if (arritems[i].id == tempElement.getAttribute("data-key")) {
      arritems.splice(i, 1);
    }
  }
  if (!condition) {
    goBack();
  } else {
    tempElement.parentNode.removeChild(tempElement);
    initialisation();
  }
}


// addd
function toggle() {
  var elemn;
  if (condition) {
    elemn = document.getElementById("elemn");
  } else {
    elemn = document.getElementById("elem");
  }
  elemn.classList.toggle("active");

  var popup = document.getElementById("pop");
  popup.classList.toggle("active");
}
// + icon
function toggleAddItem(item) {
  nexttodopage = item;
  var elemn;
  if (condition) {
    elemn = document.getElementById("elemn");
  } else {
    elemn = document.getElementById("elem");
  }
  elemn.classList.toggle("active");

  var popup = document.getElementById("popAddItem");
  popup.classList.toggle("active");
}
// heading of card
function redirect(element) {
  let id = element.parentNode.getAttribute("data-key");

  let currentTodo;
  //todo array
  for (let i = 0; i < arritems.length; i++) {
    if (arritems[i].id == id) {
      currentTodo = arritems[i];
    }
  }
  condition = false;
  initialisation();
  document.getElementById("currentHeading").textContent = currentTodo.heading;
  document.getElementById("currentHeading-1").textContent = currentTodo.heading;
  document
    .getElementById("currentHeading-1")
    .parentNode.setAttribute("data-key", currentTodo.id);

  console.log(currentTodo);
  let e = document.getElementById("singleList");
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  for (let i = 0; i < currentTodo.subTask.length; i++) {
    let classToPut = currentTodo.subTask[i].marked
      ? "card-item-2 card-item-checked"
      : "card-item-2";
    let rest = currentTodo.subTask[i].marked
      ? ""
      : '<button class = "completedd" onclick="markCompleted(this)">completed</button>';
    const node = document.createElement("li");
    node.setAttribute("class", classToPut);
    node.setAttribute("data-key", currentTodo.subTask[i].id);
    node.innerHTML = ` ${currentTodo.subTask[i].name} ${rest}`;
    e.append(node);
  }
}
// Back button 
function goBack() {
  condition = true;
  renderTodo();
}