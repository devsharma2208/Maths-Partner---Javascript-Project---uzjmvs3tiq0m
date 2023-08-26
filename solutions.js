history_arr = JSON.parse(localStorage.getItem('data'));

let section = document.querySelector("#result");
let count = 0;
if (history_arr.length !== 0){
    for (let i = 0; i < history_arr.length; i++) {

        let div = document.createElement("div");
        div.classList.add("completeResult");
        div.classList.add(i);
        let h2 = document.createElement("h2");
        h2.classList.add("selected-operation");
        h2.innerText = `${history_arr[i].operation} : ${history_arr[i].expression}`;

        let showResult = document.createElement("p");
        showResult.classList.add("find-result");
        showResult.innerText = history_arr[i].result;
        count++;
        let deleteBtn = document.createElement("i");
        deleteBtn.classList.add("fa-regular", "fa-trash-can", "trase")
        deleteBtn.setAttribute("id", i);

        deleteBtn.onclick=function(){
            deleteData(i);
            location.reload();
        }

        div.appendChild(h2);
        div.appendChild(showResult);
        div.appendChild(deleteBtn);
        section.appendChild(div);
    }
}

function deleteData(i) {
    history_arr = JSON.parse(localStorage.getItem('data'));

    if (Array.isArray(history_arr)){
        history_arr.splice(parseInt(i), 1);
        localStorage.clear();
        localStorage.setItem("data", JSON.stringify(history_arr));
    }
    else if(history_arr.length === 0){
        localStorage.clear();
    }
}
history_arr = JSON.parse(localStorage.getItem('data'));
