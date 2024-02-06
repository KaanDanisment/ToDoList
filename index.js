let toDoList = JSON.parse(localStorage.getItem("toDoList"));

if(toDoList == null || toDoList.length == 0){
    let newList = []
    localStorage.setItem("toDoList", JSON.stringify(newList))
    toDoList = newList
}

let listDom = document.querySelector("#list")

for (let i = 0; i < toDoList.length; i++) {
    let li = createLiElementFromString(toDoList[i]);
    listDom.appendChild(li);
}

function newElement(){
    let task = document.querySelector("#task")
    if(task.value && task.value.trim() !== ""){ 
        appendToStorage(task.value)
        let liDom = document.createElement("li")
        liDom.innerHTML = task.value
        addRemoveSpan(liDom)
        listDom.append(liDom)
        task.value = ""
        $('#toastSuccess').toast('show')

        liDom.addEventListener("click", function() {
            this.classList.toggle("checked");
        });
    }else{
        $("#toastEmpty").toast('show');
    }
}

function addRemoveSpan(li){
    let removeSpan = document.createElement("span")
    removeSpan.className = "close"
    removeSpan.innerHTML = "×"
    li.append(removeSpan)
    
    removeSpan.onclick = function(){
        li.remove()
        removeFromStorage(li.value)
    }
}

function createLiElementFromString(string) {
    var li = document.createElement("li");
    li.append(string);
    addRemoveSpan(li)
    return li;
}

function appendToStorage(task){
    let list = JSON.parse(localStorage.getItem("toDoList"))
    list.push(task)
    localStorage.setItem("toDoList", JSON.stringify(list))
}

function removeFromStorage(string) {
    var list = JSON.parse(localStorage.getItem("toDoList"))
    list.splice(list.indexOf(string), 1);
    localStorage.setItem("toDoList", JSON.stringify(list))
}