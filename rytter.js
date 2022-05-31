const out = function (str){
    console.log(str);
}

out("hej");

document.addEventListener('DOMContentLoaded', createFormEventListener);
const holdUrl = 'http://localhost:8080/api/hold';

let rytterForm;
function createFormEventListener() {
    rytterForm = document.getElementById("newRytterForm");
    rytterForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    out("hej1");
    const form = event.currentTarget;
    const url = form.action;
    out(form);
    out(url);
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
        out(formData);
        const responseData = await postFormDataAsJson(url, formData);
        out(responseData);
        alert(formData.get('navn') + ' er oprettet');

    } catch (err) {
        alert(err.message);
        out(err);
    }
}

async function postFormDataAsJson(url, formData) {
    out(formData.entries());
    const plainFormData = Object.fromEntries(formData.entries());
    console.log("plain form data")
    out(plainFormData);

    plainFormData.hold = {};
    plainFormData.hold.id = ddHold.value;
    out(ddHold.value);


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
    out("get all film kaldt");
    return fetch(url).then(response => response.json());
}



const holdMap = new Map();
async function createHoldMap() {
    out("show alle film");
    const holdList = await fetchAll(holdUrl);
    holdList.forEach((hold) => {
        out(hold.navn);
        holdMap.set(hold.navn, hold);
    })
}

async function callHoldMap(){
    await createHoldMap();
}

async function holdDropDown() {
//Create a dropdown

    holdMap.forEach(hold => {
        out(hold);
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



const createRytter = document.getElementById('addRytter');
createRytter.addEventListener('click', openForm);