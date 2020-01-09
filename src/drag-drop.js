function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    document.getElementById("zone").style.borderStyle = "dashed"
}

const allowDrop = ev => ev.preventDefault();


function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const segment = document.getElementById(data);
    ev.target.appendChild(segment);
    ev.target.style.borderStyle = 'solid';
    segment.style.height = "8em";
    segment.style.width = "8em";
    segment.style.backgroundColor = "rgba(255,87,87,0.66)";


    //console.log(data)
    document.getElementById("slider" + data).parentElement.style.display = "none";
    document.getElementById("toggle" + data).parentElement.style.display = "none";


    propsG.forEach(prop => {
        if (data === prop.id) {
            prop.active = true;
            segment.innerHTML = prop.label;
            segment.title = prop.label;
        }
    });

    if (segment.parentNode.parentNode.className === "segment"){
        segment.parentNode.parentNode.style.marginBottom = "5em";
    }

    colorMapGemeinden();
}

function enterDropzone(ev) {
    const segment = ev.target;
    if (segment.parentNode.className === "dropzone" && segment.childNodes.length >= 2){
        if (segment.childNodes[1].className === "segment"){
            segment.removeEventListener("ondragover", allowDrop)
        } else {
            ev.target.style.borderStyle = 'dashed'
        }
    } else {
        ev.target.style.borderStyle = 'dashed'
    }
}

const leaveDropzone = ev => ev.target.style.borderStyle = 'solid';



function resetAll() {
    propsG.forEach(p => {
        if (p.active) {
            putItBack(p.id);
            p.active = false;
        }
    })
}

let focusedSegment = null;

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
                document.getElementById(p.id).style.borderColor = "rgb(255,0,0)";
                if (checkElementIntersection(focusedSegment).operator) {
                    document.getElementById(focusedSegment.firstElementChild.id).style.borderColor = "rgb(255,0,0)";
                }
            } else {
                document.getElementById(p.id).style.borderColor = "rgb(0,0,0)";
            }
        })
    }
}

function putItBack(node) {
    if (node) {
        const segmentField = document.getElementById("col" + node);
        const segment = document.getElementById(node);

        for (let i = 0; i < segment.children.length; i++) {
            document.getElementById("col" + segment.children[i].id).appendChild(segment.children[i]);
        }

        segmentField.appendChild(segment);
        segment.style.height = "2em";
        segment.style.width = "2em";
        segment.style.marginBottom = "1em";
        segment.style.backgroundColor = '#fff';
        segment.style.borderColor = 'rgb(0, 0, 0)';
        segment.innerHTML = "";

        document.getElementById("slider" + segment.id).parentElement.style.display = "block";
        document.getElementById("toggle" + segment.id).parentElement.style.display = "block";

        colorMapGemeinden();
    }
}
