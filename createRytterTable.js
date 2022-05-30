createRytterMap();

function addRow(rytter) {
    const rowCount = rytterTable.rows.length;
    console.log("row count: " + rowCount);
    let row = rytterTable.insertRow(rowCount);
    let colCount = 0;

    let cell = row.insertCell(colCount++);
    cell.innerText = rytter.id;

    cell = row.insertCell(colCount++);
    const inp = document.createElement('input');
    inp.type = "text";
    inp.setAttribute("value", rytter.navn);
    cell.appendChild(inp);

    cell = row.insertCell(colCount++);
    const inp1 = document.createElement('input');
    inp1.type = "text";
    inp1.setAttribute("value", rytter.alder);
    cell.appendChild(inp1);

    cell = row.insertCell(colCount++);
    const inp2 = document.createElement('input');
    inp2.type = "number";
    inp2.setAttribute("value", rytter.bjergPoint);
    cell.appendChild(inp2);

    cell = row.insertCell(colCount++);
    const inp3 = document.createElement('input');
    inp3.type = "number";
    inp3.setAttribute("value", rytter.spurtPoint);
    cell.appendChild(inp3);

    cell = row.insertCell(colCount++);
    const inp4 = document.createElement('input');
    inp4.type = "text";
    inp4.setAttribute("value", rytter.tid);
    cell.appendChild(inp4);

    //Create a dropdown
    cell = row.insertCell(colCount++);
    const ddHold = document.createElement("select");
    let ix = 0;
    holdMap.forEach(hold => {
        const el = document.createElement("option");
        el.textContent = hold.navn;
        el.value = hold.id;
        ddHold.appendChild(el);
        if (hold.id == rytter.hold.id) {
            ddHold.selectedIndex = ix;
        }
        ix++;
        ddHold.addEventListener("change", (event) => {
            const selind = ddHold.selectedIndex;
            const opt = ddHold.options[selind];
            rytter.hold = holdMap.get(opt.value);
        })
    });
    cell.appendChild(ddHold);

    //delete button
    cell = row.insertCell(colCount++);
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute('value', 'Slet Rytter');
    pbDelete.onclick = function () {
        deleteRow(rytter, rowCount, row);
    }
    cell.appendChild(pbDelete);

    //update button
    cell = row.insertCell(colCount++);
    const pbUpdate = document.createElement("input");
    pbUpdate.type = "button";
    pbUpdate.setAttribute('value', 'Update Kommune');
    pbUpdate.onclick = function () {
        updateRow(rytter, rowCount, row, inp);
    }
    cell.appendChild(pbUpdate);


} //addRow

async function updateRow(rytter, rowNo, row, inputfield) {
    out(rytter);
    rytter.navn = inputfield.value;
    const response = await restUpdateCounty(rytter);
    out("nu har vi opdateret");
    out(response);
    //crazy rule, only change name once
    //inputfield.setAttribute('readonly', 'readonly');
}

async function restUpdateCounty(rytter) {
    const url = "http://localhost:8080/api/rytter/" + rytter.id;

    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }

    const jsonString = JSON.stringify(rytter);
    fetchOptions.body = jsonString;

    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);

    out(response);
    if (!response.ok) {
        out("Det gik ikke godt med update");
    };

    return response;
} //restDeleteConty



async function deleteRow(rytter, rowNo, row) {
    out(rytter);
    const response = await restDeleteCounty(rytter);
    out("nu har vi slettet");
    rytterTable.deleteRow(row.rowIndex);
}

async function restDeleteCounty(rytter) {
    const url = "http://localhost:8080/api/rytter/" + rytter.id;

    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }

    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);

    out(response);
    if (!response.ok) {
        out("Det gik ikke godt");
    };

    return response;
} //restDeleteConty


function createTableFromMap() {
    console.log(rytterMap.size);
    rytterMap.forEach(rytter => addRow(rytter));
}

const rytterTable = document.getElementById("rytterTable");


const pbCreateTable = document.getElementById('createTable');

//add event listeners
pbCreateTable.addEventListener('click', createTableFromMap);

