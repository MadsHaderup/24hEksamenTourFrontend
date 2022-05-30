const rytterUrl = 'http://localhost:8080/api/rytter';

const rytterMap = new Map();


function fetchAllRytter() {
    out("get all film kaldt");
    return fetch(rytterUrl).then(response => response.json());
}

async function createRytterMap() {
    out("show alle film");
    const rytterList = await fetchAllRytter();
    rytterList.forEach((rytter) => {
        out(rytter.navn);
        rytterMap.set(rytter.navn, rytter);
        out(rytterMap.size);
    })
}
/*
async function callRytterMap(){
    await createRytterMap();
}*/

const pbFetchRytter = document.getElementById('getRytter');

//add event listeners
pbFetchRytter.addEventListener('click', createRytterMap);
