const canton = {path: cantonsSVG, table: cantonTable, data: undefined};
const gemeinden = {path: gemeindenSVG, table: gemeindenTable, data: undefined};

const toAnalyseData = [
    {
        label: 'Einwohner',
        category: "Bevölkerung",
        table: population,
        valueType: "amount",
        description: "Anzahl Einwohner"
    },
    {
        label: 'Alter1',
        category: "Altersverteilung",
        table: age0_19,
        valueType: "percent",
        description: "Altersverteilung in % der 0-19 jährigen"
    },
    {
        label: 'Alter2',
        category: "Altersverteilung",
        table: age20_64,
        valueType: "percent",
        description: "Altersverteilung in % der 20-64 jährigen"
    },
    {
        label: 'Alter3',
        category: "Altersverteilung",
        table: age20_64,
        valueType: "percent",
        description: "Altersverteilung in % der 64 und mehr jährigen"
    },
    {
        label: 'Landwirtschaft',
        category: "Fläche",
        table: agriculture,
        valueType: "percent",
        description: "Landwirtschaftsfläche in %"
    },
    {label: 'Gesamtfläche', category: "Fläche", table: area, valueType: "km2", description: "Gesamtfläche in km2"},
    {
        label: 'Haushaltsgrösse',
        category: "Haushalte",
        table: average_household_size,
        valueType: "amount",
        description: "Durchschnittliche Haushaltsgrösse in Personen"
    },
    {
        label: 'Geburtenziffer',
        category: "Bevölkerungsbewegung",
        table: birth,
        valueType: "percent",
        description: "Bevölkerungsbewegung in % - Rohe Geburtenziffer"
    },
    {
        label: 'Sterbeziffer',
        category: "Bevölkerungsbewegung",
        table: death,
        valueType: "percent",
        description: "Bevölkerungsbewegung in % - Rohe Sterbeziffer"
    },
    {
        label: 'Scheidungsziffer',
        category: "Bevölkerungsbewegung",
        table: divorce,
        valueType: "percent",
        description: "Bevölkerungsbewegung in % - Rohe Scheidungsziffer"
    },
    {
        label: 'Beschäftigte',
        category: "Wirtschaft",
        table: employee,
        valueType: "amount",
        description: "Beschäftigte total"
    },
    {
        label: 'Ausländer',
        category: "Bevölkerung",
        table: foreigner,
        valueType: "percent",
        description: "Ausländer in %"
    },
    {label: 'Wald', category: "Fläche", table: forest, valueType: "percent", description: "Wald und Gehölze in %"},
    {
        label: 'Haushalte',
        category: "Haushalte",
        table: household,
        valueType: "amount",
        description: "Anzahl Privathaushalte"
    },
    {
        label: 'Heiratsziffer',
        category: "Bevölkerungsbewegung",
        table: marriage,
        valueType: "percent",
        description: "Bevölkerungsbewegung in % - Rohe Heiratsziffer"
    },
    {
        label: 'Bevölkerungsdichte',
        category: "Bevölkerung",
        table: population_density,
        valueType: "amount",
        description: "Bevölkerungsdichte pro km2"
    },
    {
        label: 'Bevölkerungsveränderungen',
        category: "Bevölkerung",
        table: population_mutation,
        valueType: "percent",
        description: "Veränderung der Einwohner in %"
    },
    {
        label: 'Sektor1',
        category: "Wirtschaft",
        table: sektor_1,
        valueType: "amount",
        description: "Beschäftigte im 1. Sektor"
    },
    {
        label: 'Sektor2',
        category: "Wirtschaft",
        table: sektor_2,
        valueType: "amount",
        description: "Beschäftigte im 2. Sektor"
    },
    {
        label: 'Sektor3',
        category: "Wirtschaft",
        table: sektor_3,
        valueType: "amount",
        description: "Beschäftigte im 3. Sektor"
    },
    {
        label: 'Siedlungsfläche',
        category: "Fläche",
        table: settlement_area,
        valueType: "percent",
        description: "Siedlungsfläche in %"
    },
    {label: 'Solzialhilfe', category: "Soziales", table: socialcare, valueType: "rate", description: "Sozialhilfequote"}
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
    let max = 0, min = Number.MAX_VALUE;
    prop.table.split("\n").forEach(data => {
        const [gemeinde, value] = data.split(";");
        table.push({
            gemeinde,
            value,
        })
        if (value > max) max = value;
        if (value < min) min = value;
        values.push(parseFloat(value));
    });

    // const max = Number.MAX_VALUE;
    // const min = values.reduce( (a,b) => Math.min(a,b) );

    //console.log(max);
    //console.log(min);

    propsG.push({
        id: "p" + propID++,
        active: false,
        label: prop.label,
        category: prop.category,
        description: prop.description,
        data: table,
        amount: table.length,
        gemeinde: {},
        valueTye: prop.valueType,
        maxmin: {max: undefined, min: undefined},
        value: {first: undefined, second: undefined}
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

    getCategories().forEach(c => {
        const categoryElement = dom(`<button class="collapsible">${c}</button>`);
        const contentElement = dom(`<div class="content" id="${c}"></div>`)

        propsG.forEach(prop => {
            if (prop.category === c) {
                const propElement = dom(`<div class="segment" id="${prop.id}" title="${prop.description}" draggable="true" onclick="select(this)" ondragstart="drag(event)">
                                                            <p class="propLabel">${prop.label}</p>
                                                    </div>`);
                contentElement.appendChild(propElement);
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
