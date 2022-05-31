const rytterUrl = 'http://localhost:8080/api/rytter';
const rytterUrlSorted = 'http://localhost:8080/api/rytter/sort';

const rytterMap = new Map();


function fetchAllRytter(url) {
    return fetch(url).then(response => response.json());
}

async function createRytterMap(url) {
    rytterMap.clear();
    const rytterList = await fetchAllRytter(url);
    rytterList.forEach((rytter) => {
        out(rytter.navn);
        rytterMap.set(rytter.navn, rytter);

    })
}


const pbFetchRytter = document.getElementById('getRytter');
const pbFetchRytterSorted = document.getElementById('getRytterSorted');

//add event listeners
pbFetchRytter.addEventListener('click', function(){createRytterMap(rytterUrl)});
pbFetchRytterSorted.addEventListener('click', function(){createRytterMap(rytterUrlSorted)});
