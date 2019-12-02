const props = [
    // {id: "p0", value: "flachmoor", label: 'Flachmoor', path: flachmoorSVG},
    // {id: "p1", value: "hochmoor", label: 'Hochmoor', path: hochmoorSVG},
    // {id: "p2", value: "amphibien", label: 'Amphibien', path: amphibsSVG},
    // {id: "p3", value: "auen", label: 'Auen', path: auenSVG},
    // {id: "p4", value: "geotope", label: 'Geotope', path: geotopeSVG},
    {id: "p5", value: "trockenwiesen", label: 'Trockenwiesen', path: trockenwiesenSVG},
    {id: "p6", value: "laichgebiete", label: 'Laichgebiete', path: laichgebieteSVG},
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
    document.getElementById(data).style.height = "10em";
    document.getElementById(data).style.width = "10em";
    document.getElementById(data).style.backgroundColor = randomColor;

    props.forEach(prop => {
        if (data === prop.id) {
            document.getElementById(prop.value).style.visibility = "visible";
            document.getElementById(data).innerHTML = prop.label;
            document.getElementById(prop.value).style.fill = randomColor;
            document.getElementById(prop.value).style.stroke = randomColor;
            console.log(document.getElementById(prop.id.parentElement))
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


    // const laiche = document.getElementById('laichgebiete').childNodes;
    const laiche = document.querySelector("#laichgebiete");
    const laichePath = laiche.querySelectorAll('path');

    laichePath.forEach(e => e.addEventListener('mouseover', event => {
        console.log(event.target.id);
    })  );

    const twts = trockenwiesenTable.split("\n");
    const twtPairs = {};

w
};

render();


