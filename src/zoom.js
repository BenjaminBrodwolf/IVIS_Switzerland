// -------- Zoom ---------
let zoomstate = false;

const zooming = () => {
    zoomstate = !zoomstate;

    if (zoomstate) {
        document.getElementById("svg").classList.add("zooming")
    } else {
        document.getElementById("svg").classList.remove("zooming")
        selectedGemeinde.style.fill = 'rgb(0,0,0)'
    }
};


let scale = 3;		// maximum size to zoom to canton
const mapWidth = 900;  // map container width
const mapHeight = 600; // map container height
const viewport = document.getElementById("cantons");
const gemeindenViewport = document.getElementById("gemeinden");
let selectedCantonID;

const zoomToGemeinde = gemeindePaths =>{

    console.log(gemeindePaths)
    let zoominGemeinde;
    if(gemeindePaths.length > 1){
        zoominGemeinde = gemeindePaths[0];
    } else {
        zoominGemeinde = gemeindePaths;
    }

    if (zoominGemeinde.id === selectedCantonID) {
        const exFocus = document.getElementById(selectedCantonID);
        if (exFocus) exFocus.parentElement.classList.remove("focused");

        viewport.setAttribute("transform", "scale(1.0)");
        gemeindenViewport.setAttribute("transform", "scale(1.0)");
        selectedCantonID = "";

    } else {

        const exFocus = document.getElementById(selectedCantonID);
        if (exFocus) exFocus.parentElement.classList.remove("focused");

        selectedCantonID = zoominGemeinde.id;

        const xy = getBoundingBox(zoominGemeinde);
        scale = Math.min(mapWidth / xy[1], mapHeight / xy[3], 3);
        const tx = -xy[0] + (mapWidth - xy[1] * scale) / (2 * scale);
        const ty = -xy[2] + (mapHeight - xy[3] * scale) / (2 * scale);

        document.getElementById(selectedCantonID).parentElement.classList.add("focused");

        viewport.setAttribute("transform", "scale(" + scale + ")translate(" + tx + "," + ty + ")");
        gemeindenViewport.setAttribute("transform", "scale(" + scale + ")translate(" + tx + "," + ty + ")");
    }

};

document.addEventListener('click', e => {
    if (zoomstate) {

        const selected = e.target;
        console.log(selected)

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


