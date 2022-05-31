const out = function (str){
    console.log(str);
}

document.addEventListener('DOMContentLoaded', createFormEventListener);
const holdUrl = 'http://localhost:8080/api/hold';

let rytterForm;
function createFormEventListener() {
    rytterForm = document.getElementById("newRytterForm");
    rytterForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;
    try {
        const formData = new FormData(form);
        const hours = formData.get("timer");
        const minutter = formData.get("minutter");
        const sekunder = formData.get("sekunder");

        let totaltid = hours + ":" + minutter + ":" + sekunder;
        formData.append("tid", totaltid);

        formData.delete("timer");
        formData.delete("minutter");
        formData.delete("sekunder");
        const responseData = await postFormDataAsJson(url, formData);
        out(responseData);


    } catch (err) {
        out(err);
    }
}

async function postFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());

    plainFormData.hold = {};
    plainFormData.hold.id = ddHold.value;


    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: formDataJsonString
    };

    const response = await fetch(url, fetchOptions);
    if (!response) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    console.log("response JSON");
    console.log(response.json);
    return response.json();
}

callHoldMap();

function fetchAll(url) {
    return fetch(url).then(response => response.json());
}



const holdMap = new Map();
async function createHoldMap() {
    const holdList = await fetchAll(holdUrl);
    holdList.forEach((hold) => {
        holdMap.set(hold.navn, hold);
    })
}

async function callHoldMap(){
    await createHoldMap();
}

async function holdDropDown() {
//Create a dropdown

    holdMap.forEach(hold => {
        const el = document.createElement("option");
        el.textContent = hold.navn;
        el.value = hold.id;
        ddHold.appendChild(el);

    });
}

async function openForm() {
    holdDropDown();
    document.getElementById("popUpForm").style.display = "block";
}
async function closeForm() {
    document.getElementById("popUpForm").style.display = "none";
}

const exitFormButton = document.getElementById('closebtn');
const createRytter = document.getElementById('addRytter');
createRytter.addEventListener('click', openForm);
exitFormButton.addEventListener('click', closeForm);