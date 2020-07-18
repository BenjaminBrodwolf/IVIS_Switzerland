/**
 * @param {Event} event
 * */
const drag = event => {
    event.dataTransfer.setData('text', event.target.id);
    document.getElementById("zone").style.borderStyle = "dashed"
}

/**
 * @param {Event} event
 * */
const allowDrop = event => event.preventDefault();


/**
 * @param {Event} event
 * @description Drops the data into the filter-zone and changes the style of the dropped segment
 * */
const drop = event => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const segment = document.getElementById(data);
    event.target.appendChild(segment);
    event.target.style.borderStyle = 'solid';
    segment.classList.add("dropped-segment");
    segment.classList.remove("segment");
    segment.classList.remove("top-segment");


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

    municipalitiesWithPrecondition.forEach(g => g.style.fillOpacity = '1');
    document.getElementById("svg").setAttribute("transform", "scale(1) translate(0,0)" );
    document.getElementById("municipalities").setAttribute("transform", "scale(1) translate(0,0)");

    //After every drop, the map is colored again
    colorMap();
}


/**
 * @param {Event} event
 * */
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


/**
 * @param {Event} event
 * */
const leaveDropzone = event => event.target.style.borderStyle = 'solid';


/**
 * @description resets all data which is in the drop-zone
 * */
const resetAll = () => {
    propsG.forEach(p => {
        if (p.active) {
            putItBack(p.id);
            p.active = false;
        }
    });
    municipalitiesWithPrecondition.forEach(g => g.style.fillOpacity = '1');
    document.getElementById("svg").setAttribute("transform", "scale(1) translate(0,0)" );
    document.getElementById("municipalities").setAttribute("transform", "scale(1) translate(0,0)");

    colorMap();
}


/**
 * @param {String} nodeID
 * @description Puts the segment back to the list
 * */
const putItBack = nodeID => {
    if (nodeID) {
        const segmentField = document.getElementById("col" + nodeID);
        const segment = document.getElementById(nodeID);

        for (let i = 0; i < segment.children.length; i++) {
            document.getElementById("col" + segment.children[i].id).appendChild(segment.children[i]);
        }

        segmentField.appendChild(segment);
        segment.classList.add("segment");
        segment.innerHTML = "";
        segment.classList.remove("dropped-segment");

        document.getElementById("slider" + segment.id).parentElement.style.display = "block";
        document.getElementById("toggle" + segment.id).parentElement.style.display = "block";

    }
}
