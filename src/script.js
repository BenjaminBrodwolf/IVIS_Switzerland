const canton = {path: cantonsSVG, table: cantonTable, data: undefined};

const props = [
    {
        id: "p1",
        display: false,
        value: "trockenwiesen",
        label: 'Trockenwiesen',
        path: trockenwiesenSVG,
        table: trockenwiesenTable,
        data: undefined
    },
    {
        id: "p2",
        display: false,
        value: "laichgebiete",
        label: 'Laichgebiete',
        path: laichgebieteSVG,
        table: laichgebieteTable,
        data: undefined
    },
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
            prop.display = true;
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


    cantonINIT();

    /* Initialize every Data */
    props.forEach(e => dataINIT(e));

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

const cantonINIT = () => {
    const table = [];
    canton.table.split("\n").forEach(e => table.push(cantonTableToObject(e)));
    canton.data = table;

    const selectElements = document.querySelector(`#cantons`);
    const elementsG = selectElements.querySelectorAll('g');

    /* Add MouseClick-Listener to the Cantons */
    elementsG.forEach(e => e.addEventListener('click', event => {
        const cantonName = table.filter(e => e.name === event.target.id);
        createViewList(cantonName[0]);
    }));
};

const dataFocus = (dataPoint, datasetName) => {
    console.log(dataPoint);
    console.log(datasetName);

    const selectedDataPoint = props.filter(e => e.label === datasetName)[0].data.find(e => e.name === dataPoint);
    console.log(selectedDataPoint.id)

    document.getElementById(selectedDataPoint.id).setAttribute("style", "stroke: white");
    // document.getElementById(selectedDataPoint.id).style.stroke = "white";


};

const dataINIT = props => {
    const table = [];
    props.table.split("\n").forEach(e => table.push(dataTableToObject(e)));

    props.data = table;

    const selectElements = document.querySelector(`#${props.value}`);
    const elementsPath = selectElements.querySelectorAll('path');

    /* Add MousOver-Listener to the Datas */
    elementsPath.forEach(e => e.addEventListener('mouseenter', event => {
        const getElement = table.filter(e => e.id === event.target.id);
        infoBox(getElement[0]);
    }));
};



const infoBox = element => {
    document.getElementById("infoBox").innerHTML = `<h3>Ort: ${element.name} </h3>`;
};

const distinct = array => {
    let distinctList = [];
    array.forEach(data => {
        if (!distinctList.includes(data.name)) {
            distinctList.push(data.name)
        }
    });
    return distinctList;
};

const createHtmlList = canton => {

    const allVisibleData = props.filter(e => e.display);
    const colAmount = allVisibleData.length;

    let result = `<div data-spy="scroll" data-offset="0">
                     <div class="row"> `;

    allVisibleData.forEach(dataSet => {
        const filteredList = dataSet.data.filter(e => e.canton === canton.canton);
        const distinctedList = distinct(filteredList);

        result += `<div class="col-md-${12 / colAmount}"> 
                        <table class="table table-hover">
                            <thead>
                                 <tr>
                                    <th scope="col"> ${dataSet.label} </th> 
                                </tr>
                            </thead>
                        <tbody>`;

        distinctedList.forEach(listName => {
            result += `<tr onmouseover='dataFocus( "${listName}" , "${dataSet.label}" )' >
                          <td> ${listName} </td> 
                       </tr>`;
        });

        result += `    </tbody>
                      </table>
                   </div>`;
    });

    return result += `</div>
                    </div>`;
};

const createViewList = canton => {
    document.getElementById("tableTitle").innerText = canton.name;

    document.getElementById('table').innerHTML = createHtmlList(canton);
};


render();


