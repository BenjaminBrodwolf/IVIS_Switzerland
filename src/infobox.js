let selectedGemeinde;


function displayInfobox(gemeindeID) {

    const clickedGemeinde = document.getElementById(gemeindeID);

    gemeindeWithPrecondition.forEach(g => g.style.fillOpacity = '0.3')

    if (selectedGemeinde){
        selectedGemeinde.style.fillOpacity = '0.3';
        document.getElementById("listElement" + selectedGemeinde.id).style.backgroundColor = ' rgba(230, 230, 230, 0.9)';
    }

    if (clickedGemeinde.length > 1){
        for (let i = 0; i < clickedGemeinde.length; i++) {
            if (clickedGemeinde[i].parentNode.id === "gemeinden"){
                selectedGemeinde = clickedGemeinde[i];
            }
        }
    } else {
        selectedGemeinde = clickedGemeinde;
    }

    selectedGemeinde.style.fillOpacity = '1';
    document.getElementById("listElement" + selectedGemeinde.id).style.backgroundColor = '#FF5757';

    onFocus = true;

    //Area Infos
    const area = propsG.find(p => p.label === "Gesamtfläche").data.find(g => g.gemeinde === selectedGemeinde.id);
    const agricultureArea = propsG.find(p => p.label === "Landwirtschaft").data.find(g => g.gemeinde === selectedGemeinde.id);
    const settlementArea = propsG.find(p => p.label === "Siedlungsfläche").data.find(g => g.gemeinde === selectedGemeinde.id);
    const forest = propsG.find(p => p.label === "Wald").data.find(g => g.gemeinde === selectedGemeinde.id);

    //Population Infos
    const population = propsG.find(p => p.label === "Einwohner").data.find(g => g.gemeinde === selectedGemeinde.id);
    const populationMutation = propsG.find(p => p.label === "Veränderung").data.find(g => g.gemeinde === selectedGemeinde.id);
    const foreigner = propsG.find(p => p.label === "Ausländer").data.find(g => g.gemeinde === selectedGemeinde.id);
    const households = propsG.find(p => p.label === "Haushalte").data.find(g => g.gemeinde === selectedGemeinde.id);

    const infoBox = dom(`<div id="infoBox"></div>`)

    const box = dom(`<div>
                        <table id="infoTable">
                            <thead>
                                <tr id="infoTableHeader">
                                    <th colspan="4">${area.gemeinde}</th>
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



