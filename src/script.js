const canton = {path: cantonsSVG, table: cantonTable};

const props = [
    {id: "p1", value: "trockenwiesen", label: 'Trockenwiesen', path: trockenwiesenSVG, table: trockenwiesenTable},
    {id: "p2", value: "laichgebiete", label: 'Laichgebiete', path: laichgebieteSVG, table: laichgebieteTable},
];


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const dom = innerString => {
    const tmpl = document.createElement("DIV");
    tmpl.innerHTML = innerString;
    return tmpl.firstChild;
};

function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    document.getElementById("zone").style.borderStyle = "dashed"
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    const randomColor = "rgb(" + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + ")";
    var data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
    ev.target.style.borderStyle = 'solid';
    document.getElementById(data).style.height = "5em";
    document.getElementById(data).style.width = "5em";
    document.getElementById(data).style.backgroundColor = randomColor;

    props.forEach(prop => {
        if (data === prop.id) {
            document.getElementById(prop.value).style.visibility = "visible";
            document.getElementById(data).innerHTML = prop.label;
            document.getElementById(prop.value).style.fill = randomColor;
            document.getElementById(prop.value).style.stroke = randomColor;
        }
    })

}

function enterDropzone(ev) {
    ev.target.style.borderStyle = 'dashed'
}

function leaveDropzone(ev) {
    ev.target.style.borderStyle = 'solid'
}

const render = () => {

    const dragfield = dom(`<div id="dragfield">`);
    const svg = dom(`<div id="svg">`);

    props.forEach(prop => {
        const propElement = dom(`<div class="segment" id="${prop.id}" draggable="true" ondragstart="drag(event)"><p class="propLabel">${prop.label}</p></div>`)
        dragfield.appendChild(propElement);
    });

    let paths;
    props.forEach(prop => {
        paths = paths + prop.path;
    });


    const svgTag = dom(`<svg xmlns="http://www.w3.org/2000/svg" style="width: 100%" version="1.2" baseProfile="tiny" width="800" height="507" viewBox="0 0 800 507" stroke-linecap="round" stroke-linejoin="round"> ${cantonsSVG} + ${paths} </svg>`)
    svg.appendChild(svgTag);

    const properties = document.getElementById("dragfield");
    properties.replaceWith(dragfield);

    const map = document.getElementById("svg");
    map.replaceWith(svg);


    cantonFocus();

    /* Integrate the MousOver-Effect to the Datas */
    props.forEach(e => dataFocus(e));

    // console.log(laicheTable);

};

const cantonTableToObject = data => {
    const [canton, name, population, area, lakearea] = data.split(";");
    return {
        canton,
        name,
        population,
        area,
        lakearea
    }
};

const dataTableToObject = data => {
    const [id, name] = data.split(";");
    return {
        id,
        canton: id.substring(0, 2),
        name
    }
};

const cantonFocus = () => {
    const table = [];
    canton.table.split("\n").forEach(e => table.push(cantonTableToObject(e)));
    console.log(table);

    const selectElements = document.querySelector(`#cantons`);
    const elementsG = selectElements.querySelectorAll('g');

    elementsG.forEach(e => e.addEventListener('click', event => {

        const getElement = table.filter(e => e.name === event.target.id);
        console.log(getElement[0].name)
    }));

};

const dataFocus = props => {
    const table = [];
    props.table.split("\n").forEach(e => table.push(dataTableToObject(e)));

    const selectElements = document.querySelector(`#${props.value}`);
    const elementsPath = selectElements.querySelectorAll('path');

    elementsPath.forEach(e => e.addEventListener('mouseenter', event => {
        const getElement = table.filter(e => e.id === event.target.id);
        infoTitel(getElement[0]);
    }));
};

const infoTitel = element => {
    document.getElementById("infoBox").innerHTML = `
        <h3>Ort: ${element.name} </h3>
    
    `;


};

const createViewTable = tableData => {
    document.getElementById("tableTitle").innerText = tableData.title;


    const table = document.getElementById('table');
    const tableBody = document.createElement('tbody');


};


const createTableHead = headInfos => `
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Kanton</th>
                </tr>
             </thead>
`;

const makeTableHTML = myArray => {
    let result = "<table border=1>";
    result += createTableHead(myArray);
    for (var i = 0; i < myArray.length; i++) {
        result += "<tr>";
        for (var j = 0; j < myArray[i].length; j++) {
            result += "<td>" + myArray[i][j] + "</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}

render();


