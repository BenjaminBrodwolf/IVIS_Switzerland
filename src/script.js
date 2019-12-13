const canton = {path: cantonsSVG, table: cantonTable, data: undefined};

const props = [
    {
        id: "p1",
        active: false,
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
        active: false,
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
        active: false,
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

function dropIn(ev) {
    ev.preventDefault();
    const randomColor = "rgb(" + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + ")";
    const data = ev.dataTransfer.getData('text');
    if (ev.target.className === "dropInZone"){
        ev.target.appendChild(document.getElementById(data));
        document.getElementById(data).style.backgroundColor = randomColor;

        props.forEach(prop => {
            if (data === prop.id) {
                prop.active = true;
                if (!document.getElementById("toggle").checked) {
                    document.getElementById(prop.value).style.visibility = "visible";
                }

                document.getElementById(prop.value).style.fill = randomColor;
                document.getElementById(prop.value).style.stroke = randomColor;
            }
        })
    }
}

function dropOut(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    if (ev.target.className === "dropOutZone"){
        ev.target.appendChild(document.getElementById(data));
        document.getElementById(data).style.backgroundColor = '#ffd311';

        if (document.getElementById("toggle").checked) {
            defaultMapColor();
            document.getElementById("toggle").checked = false;
        }

        props.forEach(prop => {
            if (data === prop.id) {
                prop.active = false;
                document.getElementById(prop.value).style.visibility = "hidden";
            }
        })
    }
}

function enterDropzone(ev) {
    if (ev.target.id === "zone") {
        ev.target.style.borderStyle = 'dashed'
    }
    if (ev.target.id === "dragfield") {
        ev.target.style.backgroundColor = '#cccfd6'
    }
}

function leaveDropzone(ev) {
    if (ev.target.id === "zone") {
        ev.target.style.borderStyle = 'solid'
    }
    if (ev.target.id === "dragfield") {
        ev.target.style.backgroundColor = '#e6e9f0'
    }
}

function getColorOfTemperature(amountArea, amountAll) {
    const temperature = (100 * amountAll) / amountArea;
    console.log(temperature)

    let color = 'rgb(255,255,255)';

    if (temperature > 0 && temperature < 3) {
        color = 'rgb(255,160,166)';
    } else if (temperature >= 3 && temperature < 15) {
        color = 'rgb(255,146,102)';
    } else if (temperature >= 15 && temperature <= 50) {
        color = 'rgb(255,91,63)';
    } else if (temperature > 50) {
        color = 'rgb(255,0,0)';

    }
    return color;
}

function colorMap() {
    const selectElements = document.querySelector(`#cantons`);
    const elementsG = selectElements.querySelectorAll('g');

    const allVisibleData = props.filter(e => e.active === true);

    let amountArea = 0;
    for (const data of allVisibleData) {
        amountArea += data.amount
    }

    elementsG.forEach(c => {

        let cantonAmount = 0;
        for (const data of allVisibleData) {
            cantonAmount += data.canton[c.id]
        }

        console.log(c.id + " : " + cantonAmount);
        c.style.fill = getColorOfTemperature(amountArea, cantonAmount);
    })
}

function defaultMapColor() {
    const selectElements = document.querySelector(`#cantons`);
    const elementsG = selectElements.querySelectorAll('g');
    elementsG.forEach(c => {
        c.style.fill = 'rgb(0, 0, 0)';
    })
}

const render = () => {

    const dragfield = dom(`<div id="dragfield" class="dropOutZone" ondragenter="enterDropzone(event)" ondragleave="leaveDropzone(event)" ondragover="allowDrop(event)" ondrop="dropOut(event)">`);
    const svg = dom(`<div id="svg">`);

    props.forEach(prop => {
        const propElement = dom(`<div class="segment" id="${prop.id}" draggable="true" ondragstart="drag(event)">
                                                <p class="propLabel">${prop.label}</p>
                                            </div>`);
        dragfield.appendChild(propElement);
    });

    let paths;
    props.forEach(prop => {
        paths = paths + prop.path;
    });

    const svgTag = dom(`<svg xmlns="http://www.w3.org/2000/svg" style="width: 100%" version="1.2" baseProfile="tiny" viewBox="0 0 800 507" stroke-linecap="round" stroke-linejoin="round">  
                                            ${cantonsSVG} + ${paths} 
                                            <circle id="visor" cx="-50" cy="-50" r="15" stroke="red" stroke-width="3"  fill="none"/>
                                   </svg>`);

    svg.appendChild(svgTag);

    const properties = document.getElementById("dragfield");
    properties.replaceWith(dragfield);

    const map = document.getElementById("svg");
    map.replaceWith(svg);


    cantonINIT();
    console.log(canton)
    /* Initialize every Data */

    props.forEach(e => dataINIT(e));

    document.getElementById("toggle").addEventListener("click", toggleVisibilty);

    const node = document.getElementById("GR37").getBBox();
    console.log(node)
};


const toggleVisibilty = () => {
    const value = document.getElementById("toggle").checked;
    console.log("toggle " + value);

    props.forEach(prop => {
        if (prop.active) {
            document.getElementById(prop.value).style.visibility = value ? "hidden" : "visible";
        }
    })
    if (value){
        colorMap()
    } else {
        defaultMapColor();
    }

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

    const gTag = document.getElementById(props.value);
    const allPath = gTag.querySelectorAll("path");
    let pathIDs = [];
    for (const path of allPath) {
        pathIDs.push(path.id)
    }
    console.log(pathIDs)

    const table = [];
    props.table.split("\n").forEach(data => {
        const [id, name] = data.split(";");

        if (pathIDs.includes(id) && !table.some(e => e.id == id)) {

            const svg = document.getElementById(id).getBBox();
            const coord = {
                x: svg.x,
                y: svg.y
            };

            table.push({
                id,
                canton: id.substring(0, 2),
                name,
                coord
            })

        }

    });
    console.log(table)

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


const dataFocus = (dataPoint, datasetName) => {
    const selectedDataPoint = props.filter(e => e.label === datasetName)[0].data.find(e => e.name === dataPoint);
    console.log(selectedDataPoint)

    const visor = document.getElementById("visor");

    console.log(visor);

    visor.setAttribute("cx", selectedDataPoint.coord.x);
    visor.setAttribute("cy", selectedDataPoint.coord.y);

    console.log(selectedDataPoint.coord.x);
    console.log(visor);


    // document.getElementById(selectedDataPoint.id).setAttribute("style", "stroke: white");
    // document.getElementById(selectedDataPoint.id).style.stroke = "white";
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

    const allVisibleData = props.filter(e => e.active);
    const colAmount = allVisibleData.length;

    let result = `<div class="row">`;

    allVisibleData.forEach(dataSet => {
        const filteredList = dataSet.data.filter(e => e.canton === canton.canton);
        console.log(filteredList)
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


