
const searchBtn = document.querySelector(".searchBtn");
const input = document.querySelector("#inputVal");
let result = document.querySelector("#result");
const mathscatagery = document.querySelector("#mathsCategory");

let history_arr = [];
localStorage.setItem('data', history_arr);

async function getData(mathscatageryValue, encodedExpression) {
    const response = await fetch(`https://newton.now.sh/api/v2/${mathscatageryValue}/${encodedExpression}`)
    const json = await response.json();

    create_element(json);

}

searchBtn.addEventListener('click', () => {
    if (input.value.trim() !== '') {

        let mathscatageryValue = mathscatagery.value;
        const InputExpression = input.value;
        const encodedExpression = encodeURI(InputExpression);

        getData(mathscatageryValue, encodedExpression);

    }
    else {
        alert("Enter some value....")
    }
})

/** Create element for show result */

function create_element(json) {
    let div = document.querySelector("#show_div")
    div.classList.add("completeResult");

    let h2 = div.querySelector("h2");
    h2.classList.add("selected-operation");
    h2.innerText = `${json.operation} : ${json.expression}`;

    let showResult = div.querySelector("p");
    showResult.classList.add("find-result");
    showResult.innerText = json.result;

    let deleteBtn = div.querySelector("i");
    deleteBtn.classList.add("fa-regular", "fa-trash-can", "trase");

    history_arr.push(json);

    localStorage.setItem('data', JSON.stringify(history_arr));
    
    input.value = "";
}

/**  Delete data form LocalStorage   */
function deleteData(event) {
    let div = document.querySelector("#show_div")
    div.classList.remove("completeResult");
    let h2 = div.querySelector("h2");
    h2.classList.remove("selected-operation")
    h2.innerText = '';
    let p = div.querySelector("p")
    p.classList.remove("find-result")
    p.innerText = '';
    let i = div.querySelector("i");
    i.classList.remove("fa-regular", "fa-trash-can", "trase")

    history_arr = JSON.parse(localStorage.getItem('data'));

    if (history_arr.length === 0) {
        localStorage.clear();
    }
    else if (Array.isArray(history_arr)) {
        history_arr.pop();
        localStorage.clear();
        localStorage.setItem("data", JSON.stringify(history_arr));
    }
    history_arr = JSON.parse(localStorage.getItem('data'));
}

