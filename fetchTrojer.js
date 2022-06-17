const rytterUrlTrojer = 'http://localhost:8080/api/rytter/trojer';

let rytterList;

function fetchAllRytter(url) {
    return fetch(url).then(response => response.json());
}

async function createRytterMap(url) {
    rytterList = await fetchAllRytter(url);
    rytterList.forEach((rytter) => {
        console.log(rytter.navn);

    })
}

const pbFetchRytter = document.getElementById('getRytterTrojer');

//add event listeners
pbFetchRytter.addEventListener('click', function(){createRytterMap(rytterUrlTrojer)});
