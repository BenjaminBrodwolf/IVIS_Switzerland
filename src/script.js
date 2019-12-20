const canton = {path: cantonsSVG, table: cantonTable, data: undefined};

const gemeinden = {path: gemeindenSVG, table: gemeindenTable, data: undefined};

const propsG = [
    {
        id: "p1",
        active: false,
        value: {first: 500, second: 1000},
        label: 'Population',
        table: population,
        data: undefined,
        amount: undefined,
        gemeinde: {}
    },
    {
        id: "p2",
        active: false,
        value: {first: 28.0, second: 40.0},
        label: 'Age1',
        table: age1,
        data: undefined,
        amount: undefined,
        gemeinde: {}
    },
];

let focusedSegment = null;

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
    const data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
    ev.target.style.borderStyle = 'solid';
    document.getElementById(data).style.height = "8em";
    document.getElementById(data).style.width = "8em";

    propsG.forEach(prop => {
        if (data === prop.id) {
            prop.active = true;
            document.getElementById(data).innerHTML = prop.label;
            document.getElementById(data).title = prop.label;
            console.log(prop.data)
        }
    });

    //colorMapCanton();
    colorMapGemeinden();
    createHtmlList();
}

function enterDropzone(ev) {
    ev.target.style.borderStyle = 'dashed'
}

function leaveDropzone(ev) {
    ev.target.style.borderStyle = 'solid'
}

function resetAll() {
    propsG.forEach(p => {
        if (p.active) {
            putItBack(p.id);
            p.active = false;
        }
    })
}

function resetSelected() {
    putItBack(focusedSegment.id);
    propsG.find(p => p.id === focusedSegment.id).active = false;
    focusedSegment = null;
    document.getElementById("resetSelButton").style.visibility = 'hidden';
}

function select(element) {
    if (propsG.find(p => p.id === element.id).active) {
        document.getElementById("resetSelButton").style.visibility = 'visible';
        propsG.forEach(p => {
            focusedSegment = element;
            if (focusedSegment.id === p.id) {
                if (checkElementIntersection(focusedSegment).operator === false){
                    document.getElementById(p.id).style.borderColor = "rgb(255,0,0)";
                }
                else {
                    document.getElementById(p.id).style.borderColor = "rgb(255,0,0)";
                    document.getElementById(focusedSegment.firstElementChild.id).style.borderColor = "rgb(255,0,0)";
                }
            } else {
                document.getElementById(p.id).style.borderColor = "rgb(0,0,0)";
            }
        })
    }
}

function putItBack(node) {
    const dragfield = document.getElementById("dragfield");
    const segment = document.getElementById(node);

    for (let i = 0; i < segment.children.length; i++) {
        dragfield.appendChild(segment.children[i]);
    }

    dragfield.appendChild(segment);
    segment.style.height = "3em";
    segment.style.width = "3em";
    segment.style.backgroundColor = '#ffd311';
    segment.style.borderColor = 'rgb(0, 0, 0)';
    segment.innerHTML = "";
    const propLabel = dom(`<p class="propLabel">${segment.title}</p>`);
    segment.appendChild(propLabel)
    //colorMapCanton();
    colorMapGemeinden();
    createHtmlList();
}

/*
Sammelt die Objekte mit den Operatore und Elementen in einer Liste
*/
function getPreconditions() {
    const filterBox = document.getElementById("zone");
    let listWithPrecondition = []

    for (let i = 0; i < filterBox.children.length; i++) {
        listWithPrecondition.push({
            filterOperator: checkElementIntersection(filterBox.children[i]).operator,
            filterProperty: checkElementIntersection(filterBox.children[i]).element,
        });
    }

    return listWithPrecondition;
}

/*
Es wird getestet ob es ein UND-Operator (true) oder ODER-Operator ist (false) und speichert dieser
boolean mit dem Element zusammen in ein Objekt
 */
function checkElementIntersection(element) {
    if (element.firstElementChild === null) {
        return {
            operator: false,
            element: orOperation(element)
        }
    }
    return {
        operator: true,
        element: andOperation(element, element.firstElementChild)
    }
}

/*
Getter Methoden
 */
function andOperation(firstElement, secondElement) {
    return {
        firstElement: firstElement.title,
        secondElement: secondElement.title,
    };
}

function orOperation(element) {
    return element.title
}

function colorMapGemeinden() {
    const selectElements = document.querySelector(`#gemeinden`);
    const elementsG = selectElements.querySelectorAll('path');
    elementsG.forEach(c => c.style.fill = 'rgb(0, 0, 0)');
    const coloredGemeinden = searchGemeindenWithPrecondition();
    coloredGemeinden.forEach(c => {
        c.style.fill = 'rgb(255,0,0)';
    })
}

/*
Gibt Liste zurück von Kantonen die eingefärbt werden
 */
function searchGemeindenWithPrecondition() {
    const selectElements = document.querySelector(`#gemeinden`);
    const elementsG = selectElements.querySelectorAll('path');

    const gemeindenWithPrecondition = [];

    elementsG.forEach(c => {
        if (checkGemeinde(c)) {
            gemeindenWithPrecondition.push(c);
        }
    });

    return gemeindenWithPrecondition;
}


/*
Testet einen einzelnen Kanton, ob er die Bedingung erfüllt
 */
function checkGemeinde(checkedGemeinde) {
    let fulfillPrecondition = false;
    const preconditions = getPreconditions();

    preconditions.forEach(pc => {
        if (pc.filterOperator) {
            const prop1 = propsG.find(p => p.label === pc.filterProperty.firstElement);
            if (prop1.data.find(p => p.gemeinde === checkedGemeinde.id  && (prop1.value.first < p.value && prop1.value.second > p.value))) {
                const prop2 = propsG.find(p => p.label === pc.filterProperty.secondElement);
                if (prop2.data.find(p => p.gemeinde === checkedGemeinde.id  && (prop2.value.first < p.value && prop2.value.second > p.value))) {
                    fulfillPrecondition = true;
                }

            } else {
                fulfillPrecondition = false
            }
        } else {
            const prop = propsG.find(p => p.label === pc.filterProperty);

            if (prop.data.find(p => p.gemeinde === checkedGemeinde.id && (prop.value.first < p.value && prop.value.second > p.value))) {
                fulfillPrecondition = true;
            } else {
                fulfillPrecondition = false
            }

        }
    });
    return fulfillPrecondition;
}


const render = () => {

    const dragfield = dom(`<div class="scrollable"  id="dragfield">`);
    const svg = dom(`<div id="svg">`);

    propsG.forEach(prop => {
        const propElement = dom(`<div class="segment" id="${prop.id}" draggable="true" onclick="select(this)" ondragstart="drag(event)">
                                                <p class="propLabel">${prop.label}</p>
                                            </div>`)
        dragfield.appendChild(propElement);
    });

    const svgTag = dom(`<svg xmlns="http://www.w3.org/2000/svg" style="width: 100%" version="1.2" baseProfile="tiny" viewBox="0 0 800 507" stroke-linecap="round" stroke-linejoin="round">  
                                            ${gemeindenSVG} + ${cantonsSVG}
                                   </svg>`);

    svg.appendChild(svgTag);

    const properties = document.getElementById("dragfield");
    properties.replaceWith(dragfield);

    const map = document.getElementById("svg");
    map.replaceWith(svg);


    cantonINIT();
    gemeindeINIT();
    /* Initialize every Data */

    propsG.forEach(e => dataINITGemeinden(e))

};

const cantonTableToObject = data => {
    const [canton, name, nr] = data.split(";");
    return {
        canton,
        name,
        nr,
    }
};

const gemeindeTableToObject = data => {
    const [name, cantonNr] = data.split(";");
    return {
        name,
        cantonNr,
    }
};

const gemeindeINIT = () => {
    const table = [];
    canton.table.split("\n").forEach(e => table.push(gemeindeTableToObject(e)));
    canton.data = table;

    const selectElements = document.querySelector(`#gemeinden`);
    const elementsG = selectElements.querySelectorAll('path');

    /* Add MouseOver-Listener to the Gemeinden */
    elementsG.forEach(e => e.addEventListener('mouseover', event => {
        document.getElementById("infoBox").innerText = e.id;
    }));
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
    }));
};

const dataINITCanton = props => {
    const table = [];
    props.table.split("\n").forEach(data => {
        const [id, name] = data.split(";");
            table.push({
                id,
                canton: id.substring(0, 2),
                name,
            })
    });
    props.data = table;

    for (const canton in props.canton) {
        props.canton[canton] = props.data.filter(e => e.canton === canton).length;
    }
    props.amount = props.data.length;
};

const dataINITGemeinden = props => {
    const table = [];
    props.table.split("\n").forEach(data => {
        const [gemeinde, value] = data.split(";");
        table.push({
            gemeinde,
            value,
        })
    });
    props.data = table;
};


function createHtmlList() {

    const foundGemeinden = searchGemeindenWithPrecondition();

    let result = `         <div class="scrollable">
                             <table class="table table-hover">
                                 <thead>
                                      <tr>
                                         <th scope="col">Gefundene Orte: ${foundGemeinden.length}</th> 
                                     </tr>
                                 </thead>
                             <tbody>`;


    foundGemeinden.forEach(c => {
        result += `<tr>
                          <td> ${c.id} </td> 
                       </tr>`;
    });

    result += `    </tbody>
                      </table>
                   </div>`;

    document.getElementById('table').innerHTML = result;
}
render();

// -------- Zoom ---------
let zoomstate = false;
const zooming = () => {
    zoomstate = !zoomstate;

    if (zoomstate) {
        document.getElementById("svg").classList.add("zooming")
    } else {
        document.getElementById("svg").classList.remove("zooming")

    }
};


let scale = 3;		// maximum size to zoom to canton
const mapWidth = 900;  // map container width
const mapHeight = 600; // map container height
const viewport = document.getElementById("cantons");
const gemeindenViewport = document.getElementById("gemeinden");
let selectedCantonID;


document.addEventListener('click', e => {
    if (zoomstate) {

        const selected = e.target;

        if (selected.id === selectedCantonID) {
            const exFocus = document.getElementById(selectedCantonID);
            if (exFocus) exFocus.parentElement.classList.remove("focused");

            viewport.setAttribute("transform", "scale(1.0)");
            gemeindenViewport.setAttribute("transform", "scale(1.0)");
            selectedCantonID = "";

        } else {

            const exFocus = document.getElementById(selectedCantonID);
            if (exFocus) exFocus.parentElement.classList.remove("focused");

            selectedCantonID = selected.id;

            const xy = getBoundingBox(selected);
            scale = Math.min(mapWidth / xy[1], mapHeight / xy[3], 3);
            const tx = -xy[0] + (mapWidth - xy[1] * scale) / (2 * scale);
            const ty = -xy[2] + (mapHeight - xy[3] * scale) / (2 * scale);

            document.getElementById(selectedCantonID).parentElement.classList.add("focused");

            viewport.setAttribute("transform", "scale(" + scale + ")translate(" + tx + "," + ty + ")");
            gemeindenViewport.setAttribute("transform", "scale(" + scale + ")translate(" + tx + "," + ty + ")");
        }
    }
});

const getBoundingBox = element => {
    // get x,y co-ordinates of top-left of bounding box and width and height
    const bbox = element.getBBox();
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    return [bbox.x, bbox.width, bbox.y, bbox.height, cx, cy];
}





