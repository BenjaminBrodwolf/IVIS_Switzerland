/** @param {Event} event */
const drag = event => {
    event.dataTransfer.setData('text', event.target.id);
    document.getElementById("zone").style.borderStyle = "dashed"
}

/** @param {Event} event */
const allowDrop = event => event.preventDefault();


/** @param {Event} event */
const drop = event => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const segment = document.getElementById(data);
    event.target.appendChild(segment);
    event.target.style.borderStyle = 'solid';
    segment.style.height = "8em";
    segment.style.width = "8em";
    segment.style.backgroundColor = "rgba(255,87,87,0.66)";

    document.getElementById("slider" + data).parentElement.style.display = "none";
    document.getElementById("toggle" + data).parentElement.style.display = "none";


    propsG.forEach(prop => {
        if (data === prop.id) {
            prop.active = true;
            segment.innerHTML = prop.label;
            let low = prop.value.low, high = prop.value.high;
            if ( prop.dataType === "integer"){
                low = parseInt( prop.value.low, 10 );
                high = parseInt( prop.value.high, 10 );
            }
            if ( prop.dataType === "float"){
                low = parseFloat( prop.value.low).toFixed(1);
                high = parseFloat( prop.value.high).toFixed(1);
            }
            low += getValuetypeSign(prop.dataType);
            high += getValuetypeSign(prop.dataType);
            segment.title = low + " - " + high;
        }
    });

    if (segment.parentNode.parentNode.className === "segment"){
        segment.parentNode.parentNode.style.marginBottom = "5em";
    }

    gemeindeWithPrecondition.forEach(g => g.style.fillOpacity = '1');
    document.getElementById("svg").setAttribute("transform", "scale(1) translate(0,0)" );
    document.getElementById("gemeinden").setAttribute("transform", "scale(1) translate(0,0)");

    colorMapGemeinden();
}


/** @param {Event} event */
const enterDropzone = event => {
    const segment = event.target;
    if (segment.parentNode.className === "dropzone" && segment.childNodes.length >= 2){
        if (segment.childNodes[1].className === "segment"){
            segment.removeEventListener("ondragover", allowDrop)
        } else {
            event.target.style.borderStyle = 'dashed'
        }
    } else {
        event.target.style.borderStyle = 'dashed'
    }
}


/** @param {Event} event */
const leaveDropzone = event => event.target.style.borderStyle = 'solid';


/** */
const resetAll = () => {
    propsG.forEach(p => {
        if (p.active) {
            putItBack(p.id);
            p.active = false;
        }
    });
    gemeindeWithPrecondition.forEach(g => g.style.fillOpacity = '1');
    document.getElementById("svg").setAttribute("transform", "scale(1) translate(0,0)" );
    document.getElementById("gemeinden").setAttribute("transform", "scale(1) translate(0,0)");

    colorMapGemeinden();
}


/** @param {Node} node */
const putItBack = node => {
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

    }
}
