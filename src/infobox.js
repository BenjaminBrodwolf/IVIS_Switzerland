function displayInfobox(clickedGemeinde) {

    if (selectedGemeinde){
        selectedGemeinde.style.fillOpacity = '1';
        document.getElementById("listElement" + selectedGemeinde.id).style.backgroundColor = '#fff';
        document.getElementById("listElement" + selectedGemeinde.id).style.color = '#000';
    }

    console.log(clickedGemeinde.length);
    if (clickedGemeinde.length > 1){
        for (let i = 0; i < clickedGemeinde.length; i++) {
            if (clickedGemeinde[i].parentNode.id === "gemeinden"){
                selectedGemeinde = clickedGemeinde[i];
            }
        }
    } else {
        selectedGemeinde = clickedGemeinde;
    }

    selectedGemeinde.style.fillOpacity = '0.3';
    document.getElementById("listElement" + selectedGemeinde.id).style.backgroundColor = '#777';
    document.getElementById("listElement" + selectedGemeinde.id).style.color = '#fff';
    onFocus = true;

    const area = propsG.find(p => p.label === "Gesamtfläche").data.find(g => g.gemeinde === selectedGemeinde.id);
    const population = propsG.find(p => p.label === "Einwohner").data.find(g => g.gemeinde === selectedGemeinde.id);
    const household = propsG.find(p => p.label === "Haushalte").data.find(g => g.gemeinde === selectedGemeinde.id);
    const settlementArea = propsG.find(p => p.label === "Siedlungsfläche").data.find(g => g.gemeinde === selectedGemeinde.id);
    const forest = propsG.find(p => p.label === "Wald").data.find(g => g.gemeinde === selectedGemeinde.id);

    const infoBox = dom(`<div id="infoBox"></div>`)

    const box = dom(`<div>
                        <table class="table" id="infoTable">
                            <thead>
                                <tr id="infoTableHeader">
                                    <th>${area.gemeinde}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Einwohner:</td>
                                    <td>${population.value}</td>
                                </tr>
                                <tr>
                                    <td>Fläche:</td>
                                    <td>${area.value} km²</td>
                                </tr>
                                <tr>
                                    <td>Siedlungsfläche:</td>
                                    <td>${settlementArea.value} %</td>
                                </tr>
                                <tr>
                                    <td>Waldfläche:</td>
                                    <td>${forest.value} %</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>`);

    infoBox.appendChild(box);
    document.getElementById("infoBox").replaceWith(infoBox);


}



