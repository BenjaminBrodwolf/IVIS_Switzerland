let zoomstate = false;

/**
 * @description tbd
 * */
const zooming = () => {
    zoomstate = !zoomstate;

    if (zoomstate) {
        document.getElementById("svg").classList.add("zooming")
    } else {
        document.getElementById("svg").classList.remove("zooming")
        selectedMunicipality.style.fill = 'rgb(0,0,0)'
    }
};


let scale = 3;		// maximum size to zoom to canton
const mapWidth = 900;  // map container width
const mapHeight = 600; // map container height
const viewport = document.getElementById("svg");
const municipalityViewport = document.getElementById("municipalities");
let selectedMunicipalityID;
let zoomingMunicipality;

/**
 * @param {String} municipalityD
 * @description tbd
 * */
const zoomToMunicipality = (municipalityD) => {
    const municipalityPath = document.getElementById(municipalityD);

    if (municipalityPath.length > 1){
        for (let i = 0; i < municipalityPath.length; i++) {
            if (municipalityPath[i].parentNode.id === "municipalities"){
                zoomingMunicipality = municipalityPath[i];
            }
        }
    } else {
        zoomingMunicipality = municipalityPath;
    }

    if (zoomingMunicipality.id === selectedMunicipalityID) {
        const exFocus = document.getElementById(selectedMunicipalityID);
        if (exFocus) exFocus.parentElement.classList.remove("focused");

        viewport.setAttribute("transform", "scale(1) translate(0,0)" );
        municipalityViewport.setAttribute("transform", "scale(1) translate(0,0)");
        selectedMunicipalityID = "";

    } else {

        const exFocus = document.getElementById(selectedMunicipalityID);
        if (exFocus) exFocus.parentElement.classList.remove("focused");

        selectedMunicipalityID = zoomingMunicipality.id;

        const xy = getBoundingBox(zoomingMunicipality);
        scale = Math.min(mapWidth / xy[1], mapHeight / xy[3], 3);
        const tx = -xy[0] + (mapWidth - xy[1] * scale) / (2 * scale);
        const ty = -xy[2] + (mapHeight - xy[3] * scale) / (2 * scale);

        document.getElementById(selectedMunicipalityID).parentElement.classList.add("focused");

        viewport.setAttribute("transform", "scale(" + scale + ")translate(" + tx + "," + ty + ")");
        municipalityViewport.setAttribute("transform", "scale(" + scale + ")translate(" + tx + "," + ty + ")");
    }

};


/**
 * @param {Element} element
 * @return {Array}
 * @description tbd
 * */
const getBoundingBox = element => {
    // get x,y co-ordinates of top-left of bounding box and width and height
    const bbox = element.getBBox();
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    return [bbox.x, bbox.width, bbox.y, bbox.height, cx, cy];
}


