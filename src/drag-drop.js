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
