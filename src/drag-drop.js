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
        console.log("Tripple")
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
    }
    else {
        ev.target.style.borderStyle = 'dashed'
    }
}

function leaveDropzone(ev) {
    ev.target.style.borderStyle = 'solid'
}
