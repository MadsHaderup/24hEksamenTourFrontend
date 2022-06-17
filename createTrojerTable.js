function addRow(rytter, i) {

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
    inp.setAttribute('readonly', 'readonly');
    cell.appendChild(inp);

    cell = row.insertCell(colCount++);
    const inp1 = document.createElement('input');
    inp1.type = "text";
    inp1.setAttribute("value", rytter.alder);
    inp1.setAttribute('readonly', 'readonly');
    cell.appendChild(inp1);

    cell = row.insertCell(colCount++);
    const inp2 = document.createElement('input');
    inp2.type = "text";
    inp2.setAttribute("value", rytter.land);
    inp2.setAttribute('readonly', 'readonly');
    cell.appendChild(inp2);

    cell = row.insertCell(colCount++);
    const inp3 = document.createElement('input');
    inp3.type = "number";
    inp3.setAttribute("value", rytter.bjergPoint);
    inp3.setAttribute('readonly', 'readonly');
    cell.appendChild(inp3);

    cell = row.insertCell(colCount++);
    const inp4 = document.createElement('input');
    inp4.type = "number";
    inp4.setAttribute("value", rytter.spurtPoint);
    inp4.setAttribute('readonly', 'readonly');
    cell.appendChild(inp4);

    cell = row.insertCell(colCount++);
    const inp5 = document.createElement('input');
    inp5.type = "text";
    inp5.setAttribute("value", rytter.tid);
    inp5.setAttribute('readonly', 'readonly');
    cell.appendChild(inp5);

    cell = row.insertCell(colCount++);
    const inp6 = document.createElement('input');
    inp6.type = "text";
    inp6.setAttribute("value", rytter.hold.navn);
    inp6.setAttribute('readonly', 'readonly');
    cell.appendChild(inp6);

    cell = row.insertCell(colCount++);
    const inp7 = document.createElement('input');
    inp7.type = "text";
    console.log("i: "+ i);
    switch (i){
        case 0:
            inp7.setAttribute("value", "Gul Trøje");
            inp7.setAttribute('readonly', 'readonly');
            break;
        case 1:
            inp7.setAttribute("value", "Bjerg Trøje");
            inp7.setAttribute('readonly', 'readonly');
            break;
        case 2:
            inp7.setAttribute("value", "Grøn Trøje");
            inp7.setAttribute('readonly', 'readonly');
            break;
        case 3:
            inp7.setAttribute("value", "Hvid Trøje");
            inp7.setAttribute('readonly', 'readonly');
            break;
        default:
            console.log("Ikke flere trøjer");
    }
    cell.appendChild(inp7);




} //addRow



function createTableFromMap() {

    let table = document.getElementById("rytterTable");
    var rowCount = table.rows.length;
    if (rowCount > 2) {
        console.log("createTableLoop");
        for (var x = rowCount - 1; x > 1; x--) {
            table.deleteRow(x);
        }
    }
    let i = 0;

    rytterList.forEach(rytter => addRow(rytter, i++));
}

const rytterTable = document.getElementById("rytterTable");


const pbCreateTable = document.getElementById('createTable');

//add event listeners
pbCreateTable.addEventListener('click', createTableFromMap);

