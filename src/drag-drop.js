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

    propsG.forEach(prop => {
        if (data === prop.id) {
            prop.active = true;
            segment.innerHTML = prop.label;
            segment.title = prop.label;
        }
    });

    colorMapGemeinden();
}

function enterDropzone(ev) {
    ev.target.style.borderStyle = 'dashed'
}

function leaveDropzone(ev) {
    ev.target.style.borderStyle = 'solid'
}
