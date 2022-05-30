const holdUrl = 'http://localhost:8080/api/rytter';

const rytterMap = new Map();


function fetchAll(url) {
    out("get all film kaldt");
    return fetch(url).then(response => response.json());
}

async function createRytterMap() {
    out("show alle film");
    const holdList = await fetchAll(rytterUrl);
    holdList.forEach((rytter) => {
        out(rytter.navn);
        rytterMap.set(rytter.navn, rytter);
    })
}

async function callRytterMap(){
    await createRytterMap();
}

callRytterMap();