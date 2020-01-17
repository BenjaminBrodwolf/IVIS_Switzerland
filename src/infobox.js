let selectedMunicipality;

/**
 * @param {String} municipalityID
 * @description Generates an info box with a table which contains information about the area (size, agricultural area,
 * settlement area and forest area) and the population (number, mutations, foreigners and households).
 * */
const displayInfobox = municipalityID => {

    const clickedMunicipality = document.getElementById(municipalityID);

    municipalitiesWithPrecondition.forEach(g => g.style.fillOpacity = '0.3');

    if (selectedMunicipality && document.getElementById("listElement" + selectedMunicipality.id)) {
        selectedMunicipality.style.fillOpacity = '0.3';
        document.getElementById("listElement" + selectedMunicipality.id).style.backgroundColor = ' rgba(230, 230, 230, 0.9)';
        document.getElementById("goBack" + selectedMunicipality.id).style.display = "none";

    }

    // is done because some municipalities have multiple paths
    if (clickedMunicipality.length > 1) {
        for (let i = 0; i < clickedMunicipality.length; i++) {
            if (clickedMunicipality[i].parentNode.id === "municipalities") {
                selectedMunicipality = clickedMunicipality[i];
            }
        }
    } else {
        selectedMunicipality = clickedMunicipality;
    }

    onFocus = true; // a municipality is focused

    selectedMunicipality.style.fillOpacity = '1';

    if (document.getElementById("listElement" + selectedMunicipality.id)) {
        document.getElementById("listElement" + selectedMunicipality.id).style.backgroundColor = '#FF5757';
        document.getElementById("goBack" + selectedMunicipality.id).style.display = "inline";
    }


    //Area Infos
    const area = propsG.find(p => p.label === "Gesamtfläche").data.find(g => g.municipality === selectedMunicipality.id);
    const agricultureArea = propsG.find(p => p.label === "Landwirtschaft").data.find(g => g.municipality === selectedMunicipality.id);
    const settlementArea = propsG.find(p => p.label === "Siedlungsfläche").data.find(g => g.municipality === selectedMunicipality.id);
    const forest = propsG.find(p => p.label === "Wald").data.find(g => g.municipality === selectedMunicipality.id);

    //Population Infos
    const population = propsG.find(p => p.label === "Einwohner").data.find(g => g.municipality === selectedMunicipality.id);
    const populationMutation = propsG.find(p => p.label === "Veränderung").data.find(g => g.municipality === selectedMunicipality.id);
    const foreigner = propsG.find(p => p.label === "Ausländer").data.find(g => g.municipality === selectedMunicipality.id);
    const households = propsG.find(p => p.label === "Haushalte").data.find(g => g.municipality === selectedMunicipality.id);

    const infoBox = dom(`<div id="infoBox"></div>`)

    const box = dom(`<div>
                        <table id="infoTable">
                            <thead>
                                <tr id="infoTableHeader">
                                    <th colspan="4">${area.municipality}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Fläche:</td>
                                    <td>${area.value} km²</td>
                                    <td>Einwohner:</td>
                                    <td>${population.value}</td>
                                </tr>
                                <tr>
                                    <td>Landwirtschaftsfläche:</td>
                                    <td>${agricultureArea.value} %</td>
                                    <td>Bevölkerungsveränderung:</td>
                                    <td>${populationMutation.value} %</td>
                                </tr>
                                <tr>
                                    <td>Siedlungsfläche:</td>
                                    <td>${settlementArea.value} %</td>
                                    <td>Ausländeranteil:</td>
                                    <td>${foreigner.value} %</td>
                                </tr>
                                <tr>
                                    <td>Waldfläche:</td>
                                    <td>${forest.value} %</td>
                                    <td>Haushalte:</td>
                                    <td>${households.value}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>`);

    infoBox.appendChild(box);
    document.getElementById("infoBox").replaceWith(infoBox);
}


