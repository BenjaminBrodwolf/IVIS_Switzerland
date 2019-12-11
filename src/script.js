const canton = {path: cantonsSVG, table: cantonTable, data: undefined};

const props = [
    {
        id: "p1",
        display: false,
        value: "trockenwiesen",
        label: 'Trockenwiesen',
        path: trockenwiesenSVG,
        table: trockenwiesenTable,
        data: undefined,
        amount: undefined,
        canton: {
            ZH: undefined,
            BE: undefined,
            LU: undefined,
            UR: undefined,
            SZ: undefined,
            OW: undefined,
            NW: undefined,
            GL: undefined,
            ZG: undefined,
            FR: undefined,
            SO: undefined,
            BS: undefined,
            BL: undefined,
            SH: undefined,
            AA: undefined,
            AI: undefined,
            SG: undefined,
            GR: undefined,
            AG: undefined,
            TG: undefined,
            TI: undefined,
            VD: undefined,
            VS: undefined,
            NE: undefined,
            GE: undefined,
            JU: undefined
        }
    },
    {
        id: "p2",
        display: false,
        value: "laichgebiete",
        label: 'Laichgebiete',
        path: laichgebieteSVG,
        table: laichgebieteTable,
        data: undefined,
        amount: undefined,
        canton: {
            ZH: undefined,
            BE: undefined,
            LU: undefined,
            UR: undefined,
            SZ: undefined,
            OW: undefined,
            NW: undefined,
            GL: undefined,
            ZG: undefined,
            FR: undefined,
            SO: undefined,
            BS: undefined,
            BL: undefined,
            SH: undefined,
            AA: undefined,
            AI: undefined,
            SG: undefined,
            GR: undefined,
            AG: undefined,
            TG: undefined,
            TI: undefined,
            VD: undefined,
            VS: undefined,
            NE: undefined,
            GE: undefined,
            JU: undefined
        }
    },
    {
        id: "p3",
        display: false,
        value: "wanderobjekte",
        label: 'Wanderobjekte',
        path: wanderobjekteSVG,
        table: wanderobjekteTable,
        data: undefined,
        amount: undefined,
        canton: {
            ZH: undefined,
            BE: undefined,
            LU: undefined,
            UR: undefined,
            SZ: undefined,
            OW: undefined,
            NW: undefined,
            GL: undefined,
            ZG: undefined,
            FR: undefined,
            SO: undefined,
            BS: undefined,
            BL: undefined,
            SH: undefined,
            AA: undefined,
            AI: undefined,
            SG: undefined,
            GR: undefined,
            AG: undefined,
            TG: undefined,
            TI: undefined,
            VD: undefined,
            VS: undefined,
            NE: undefined,
            GE: undefined,
            JU: undefined
        }
    },
];

var unusedProps = props;
var usedProps = [];


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
    document.getElementById(data).style.height = "8em";
    document.getElementById(data).style.width = "8em";
    document.getElementById(data).style.backgroundColor = randomColor;

    unusedProps.forEach(prop => {
        if (data === prop.id) {
            prop.display = true;
            console.log("Vor dem Drop:");
            console.log(unusedProps);
            console.log(usedProps);
            usedProps.push(prop);
            unusedProps.pop();
            console.log("Nach dem Drop:");
            console.log(unusedProps);
            console.log(usedProps);
            if (!document.getElementById("toggle").checked) {
                document.getElementById(prop.value).style.visibility = "visible";
            }
            document.getElementById(data).innerHTML = prop.label;
            document.getElementById(data).title = prop.label;
            document.getElementById(prop.value).style.fill = randomColor;
            document.getElementById(prop.value).style.stroke = randomColor;
        }
    })
}

function reset() {
    console.log("Vor der Methode:");
    console.log(unusedProps);
    console.log(usedProps);
    const resetElement = usedProps[usedProps.length - 1];
    if (resetElement !== undefined) {
        unusedProps.push(resetElement);
        usedProps.pop();
        console.log("Nach der Methode");
        console.log(unusedProps);
        console.log(usedProps);
    }
}

function enterDropzone(ev) {
    ev.target.style.borderStyle = 'dashed'
}

function leaveDropzone(ev) {
    ev.target.style.borderStyle = 'solid'
}

function getColorOfTemperature(amountArea, amountAll) {
    const temperature = (amountArea / amountAll);
    console.log(temperature)
    let color = 'rgb(255,255,255)';

    if (temperature > 5 && temperature < 30) {
        color = 'rgb(255,186,191)';
    } else if (temperature > 30 && temperature < 70) {
        color = 'rgb(255,116,126)';
    } else if (temperature > 70 && temperature <= 100) {
        color = 'rgb(255, 0, 0)';
    }
    return color;
}

function colorMap() {
    if (document.getElementById("toggle").checked) {
        const selectElements = document.querySelector(`#cantons`);
        const elementsG = selectElements.querySelectorAll('g');

        const allVisibleData = props.filter(e => e.display === true);

        let amountArea = 0;
        for (const data of allVisibleData) {
            amountArea += data.amount
        }

        elementsG.forEach(c => {

            let cantonAmount = 0;
            for (const data of allVisibleData) {
                cantonAmount += data.canton[c.id]
            }
            c.style.fill = getColorOfTemperature(amountArea, cantonAmount);
        })
    }
}

const render = () => {

    const dragfield = dom(`<div id="dragfield">`);
    const svg = dom(`<div id="svg">`);

    unusedProps.forEach(prop => {
        const propElement = dom(`<div class="segment" id="${prop.id}" draggable="true" ondragstart="drag(event)">
                                                <p class="propLabel">${prop.label}</p>
                                            </div>`)
        dragfield.appendChild(propElement);
    });

    let paths;
    unusedProps.forEach(prop => {
        paths = paths + prop.path;
    });


    const svgTag = dom(`<svg xmlns="http://www.w3.org/2000/svg" style="width: 100%" version="1.2" baseProfile="tiny" viewBox="0 0 800 507" stroke-linecap="round" stroke-linejoin="round"> ${cantonsSVG} + ${paths} </svg>`)
    svg.appendChild(svgTag);

    const properties = document.getElementById("dragfield");
    properties.replaceWith(dragfield);

    const map = document.getElementById("svg");
    map.replaceWith(svg);


    cantonINIT();
    console.log(canton)
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

const dataINIT = props => {
    const table = [];
    props.table.split("\n").forEach(e => table.push(dataTableToObject(e)));

    props.data = table;

    for (const canton in props.canton) {
        props.canton[canton] = props.data.filter(e => e.canton === canton).length;
    }
    props.amount = props.data.length;

    const selectElements = document.querySelector(`#${props.value}`);
    const elementsPath = selectElements.querySelectorAll('path, circle');

    /* Add MouseOver-Listener to the Datas */
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


const dataFocus = (dataPoint, datasetName) => {
    const selectedDataPoint = props.filter(e => e.label === datasetName)[0].data.find(e => e.name === dataPoint);
    console.log(selectedDataPoint.id)

    document.getElementById(selectedDataPoint.id).setAttribute("style", "stroke: white");
    // document.getElementById(selectedDataPoint.id).style.stroke = "white";
};
const createHtmlList = canton => {

    const allVisibleData = props.filter(e => e.display);
    const colAmount = allVisibleData.length;

    let result = `<div class="row">`;

    allVisibleData.forEach(dataSet => {
        const filteredList = dataSet.data.filter(e => e.canton === canton.canton);
        const distinctedList = distinct(filteredList);

        result += `<div class="col-md-${12 / colAmount}"> 
                        <div class="scrollable">
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
                     </div>
                   </div>`;
    });

    return result += `</div>`;
};

const createViewList = canton => {
    document.getElementById("tableTitle").innerText = "Kanton: " + canton.name;

    document.getElementById('table').innerHTML = createHtmlList(canton);
};

render();


