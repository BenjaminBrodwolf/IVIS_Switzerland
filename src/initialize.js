const canton = {path: cantonsSVG, table: cantonTable, data: undefined};
const gemeinden = {path: gemeindenSVG, table: gemeindenTable, data: undefined};

const toAnalyseData = [
    {
        label: 'Einwohner',
        category: "Bevölkerung",
        table: population,
        dataType: "amount",
        description: "Anzahl Einwohner"
    },
    {
        label: 'Alter1',
        category: "Altersverteilung",
        table: age0_19,
        dataType: "percent",
        description: "Altersverteilung in % der 0-19 jährigen"
    },
    {
        label: 'Alter2',
        category: "Altersverteilung",
        table: age20_64,
        dataType: "percent",
        description: "Altersverteilung in % der 20-64 jährigen"
    },
    {
        label: 'Alter3',
        category: "Altersverteilung",
        table: age20_64,
        dataType: "percent",
        description: "Altersverteilung in % der 64 und mehr jährigen"
    },
    {
        label: 'Landwirtschaft',
        category: "Fläche",
        table: agriculture,
        dataType: "percent",
        description: "Landwirtschaftsfläche in %"
    },
    {label: 'Gesamtfläche', category: "Fläche", table: area, dataType: "km2", description: "Gesamtfläche in km2"},
    {
        label: 'Haushaltsgrösse',
        category: "Haushalte",
        table: average_household_size,
        dataType: "amount",
        description: "Durchschnittliche Haushaltsgrösse in Personen"
    },
    {
        label: 'Geburtenziffer',
        category: "Bevölkerungsbewegung",
        table: birth,
        dataType: "percent",
        description: "Bevölkerungsbewegung in % - Rohe Geburtenziffer"
    },
    {
        label: 'Sterbeziffer',
        category: "Bevölkerungsbewegung",
        table: death,
        dataType: "percent",
        description: "Bevölkerungsbewegung in % - Rohe Sterbeziffer"
    },
    {
        label: 'Scheidungsziffer',
        category: "Bevölkerungsbewegung",
        table: divorce,
        dataType: "percent",
        description: "Bevölkerungsbewegung in % - Rohe Scheidungsziffer"
    },
    {
        label: 'Beschäftigte',
        category: "Wirtschaft",
        table: employee,
        dataType: "amount",
        description: "Beschäftigte total"
    },
    {
        label: 'Ausländer',
        category: "Bevölkerung",
        table: foreigner,
        dataType: "percent",
        description: "Ausländer in %"
    },
    {label: 'Wald', category: "Fläche", table: forest, dataType: "%", description: "Wald und Gehölze in %"},
    {
        label: 'Haushalte',
        category: "Haushalte",
        table: household,
        dataType: "amount",
        description: "Anzahl Privathaushalte"
    },
    {
        label: 'Heiratsziffer',
        category: "Bevölkerungsbewegung",
        table: marriage,
        dataType: "percent",
        description: "Bevölkerungsbewegung in % - Rohe Heiratsziffer"
    },
    {
        label: 'Bevölkerungsdichte',
        category: "Bevölkerung",
        table: population_density,
        dataType: "amount",
        description: "Bevölkerungsdichte pro km2"
    },
    {
        label: 'Bevölkerungsveränderungen',
        category: "Bevölkerung",
        table: population_mutation,
        dataType: "percent",
        description: "Veränderung der Einwohner in %"
    },
    {
        label: 'Sektor1',
        category: "Wirtschaft",
        table: sektor_1,
        dataType: "amount",
        description: "Beschäftigte im 1. Sektor"
    },
    {
        label: 'Sektor2',
        category: "Wirtschaft",
        table: sektor_2,
        dataType: "amount",
        description: "Beschäftigte im 2. Sektor"
    },
    {
        label: 'Sektor3',
        category: "Wirtschaft",
        table: sektor_3,
        dataType: "amount",
        description: "Beschäftigte im 3. Sektor"
    },
    {
        label: 'Siedlungsfläche',
        category: "Fläche",
        table: settlement_area,
        dataType: "percent",
        description: "Siedlungsfläche in %"
    },
    {
        label: 'Solzialhilfe',
        category: "Soziales",
        table: socialcare,
        dataType: "rate",
        description: "Sozialhilfequote"
    }
];

const propsGemeindeObject = {
    id: undefined,
    active: false,
    label: undefined,
    table: undefined,
    data: undefined,
    amount: undefined,
    gemeinde: {},
    maxmin: {max: undefined, min: undefined},
    value: {first: undefined, second: undefined}
};

const propsG = [];

const cantonTableToObject = data => {
    const [canton, name, nr] = data.split(";");
    return {
        canton,
        name,
        nr,
    }
};
const cantonINIT = () => {
    const table = [];
    canton.table.split("\n").forEach(e => table.push(cantonTableToObject(e)));
    canton.data = table;

    const selectElements = document.querySelector(`#cantons`);
    const elementsG = selectElements.querySelectorAll('g');

    /* Add MouseClick-Listener to the Cantons */
    elementsG.forEach(e => e.addEventListener('click', event => {
        const cantonName = table.filter(e => e.name === event.target.id);
    }));
};

const gemeindeTableToObject = data => {
    const [name, cantonNr] = data.split(";");
    return {
        name,
        cantonNr,
    }
};
const gemeindeINIT = () => {
    const table = [];
    gemeinden.table.split("\n").forEach(e => table.push(gemeindeTableToObject(e)));
    gemeinden.data = table;

    const selectElements = document.querySelector(`#gemeinden`);
    const elementsG = selectElements.querySelectorAll('path');

    /* Add MouseOver-Listener to the Gemeinden */
    elementsG.forEach(e => e.addEventListener('mouseover', event => {
        document.getElementById("infoBox").innerText = e.id;
    }));
};


const dataINITCanton = props => {
    const table = [];
    props.table.split("\n").forEach(data => {
        const [id, name] = data.split(";");
        table.push({
            id,
            canton: id.substring(0, 2),
            name,
        })
    });
    props.data = table;

    for (const canton in props.canton) {
        props.canton[canton] = props.data.filter(e => e.canton === canton).length;
    }
    props.amount = props.data.length;
};

let propID = 1;
const dataINITGemeinden = prop => {
    const table = [];
    const values = [];
    // let max = 0, min = Number.MAX_VALUE;
    prop.table.split("\n").forEach(data => {
        const [gemeinde, value] = data.split(";");
        table.push({
            gemeinde,
            value,
        });
        if (!isNaN(parseFloat(value))) {
            values.push(parseFloat(value));
        }
    });

    const max = values.reduce((a, b) => Math.max(a, b));
    const min = values.reduce((a, b) => Math.min(a, b));

    propsG.push({
        id: "p" + (propID++),
        active: false,
        label: prop.label,
        category: prop.category,
        description: prop.description,
        data: table,
        amount: table.length,
        gemeinde: {},
        dataType: prop.dataType,
        boundaries: {min: min, max: max},
        value: {low: min, high: max}
    });

    //console.log(propsG)
};

const getCategories = () => {
    const categories = [];
    toAnalyseData.forEach(p => categories.push(p.category))
    return [...new Set(categories)];
}

function addCollapse(element) {
    element.addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    })
}

const dom = innerString => {
    const tmpl = document.createElement("DIV");
    tmpl.innerHTML = innerString;
    return tmpl.firstChild;
};

const initializeData = () => {

    /* Initialize every Data */

    toAnalyseData.forEach(e => dataINITGemeinden(e))

    const dragfield = dom(`<div id="dragfield" class="scrollable">`);
    const svg = dom(`<div id="svg">`);

    console.log(propsG)

    getCategories().forEach(c => {
        const categoryElement = dom(`<button class="collapsible">${c}</button>`);
        const contentElement = dom(`<div class="content" id="${c}"></div>`)

        propsG.forEach(prop => {
            if (prop.category === c) {
                const propElement = `
                                                 <div style="display: flex; box-sizing: border-box;"> 
                                                    <div style="flex: 20%;">
                                                        <div class="segment" id="${prop.id}" title="${prop.description}" draggable="true" onclick="select(this)" ondragstart="drag(event)">
                                                                <p class="propLabel">${prop.label}</p>
                                                                
                                                        </div>  
                                                    </div>
                                                    <div style="flex: 80%; align-content: flex-end">
                                                        ${setDomSlider(prop.boundaries.max, prop.boundaries.min, prop.dataType)}
                                                    </div>
                                                 </div>   
                                        `;
                contentElement.insertAdjacentHTML("beforeend", propElement);

                // contentElement.appendChild(dom(setDomSlider));
            }
        });
        addCollapse(categoryElement);
        dragfield.appendChild(categoryElement);
        dragfield.appendChild(contentElement)
    })

    const svgTag = dom(`<svg xmlns="http://www.w3.org/2000/svg" style="width: 100%" version="1.2" baseProfile="tiny" viewBox="0 0 800 507" stroke-linecap="round" stroke-linejoin="round">  
                                            ${gemeindenSVG} + ${cantonsSVG}
                                   </svg>`);

    svg.appendChild(svgTag);

    document.getElementById("dragfield").replaceWith(dragfield);

    document.getElementById("svg").replaceWith(svg);

    cantonINIT();
    gemeindeINIT();

};

initializeData();
