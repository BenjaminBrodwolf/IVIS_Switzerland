const canton = {path: cantonsSVG, table: cantonTable, data: undefined};
const gemeinden = {path: gemeindenSVG, table: gemeindenTable, data: undefined};

const toAnalyseData = [
    {label: 'Bevölkerung',                  table: population,              valueType: "amount"},
    {label: 'Alter1',                       table: age0_19,                 valueType: "percent"},
    {label: 'Alter2',                       table: age20_64,                valueType: "percent"},
    {label: 'Alter3',                       table: age20_64,                valueType: "percent"},
    {label: 'Landwirtschaft',               table: agriculture,             valueType: "percent"},
    {label: 'Fläche',                       table: area,                    valueType: "km2"},
    {label: 'Haushaltsgrösse',              table: average_household_size,  valueType: "amount"},
    {label: 'Geburtenziffer',               table: birth,                   valueType: "percent"},
    {label: 'Sterbeziffer',                 table: death,                   valueType: "percent"},
    {label: 'Scheidungsziffer',             table: divorce,                 valueType: "percent"},
    {label: 'Beschäftigte',                 table: employee,                valueType: "amount"},
    {label: 'Ausländer',                    table: foreigner,               valueType: "percent"},
    {label: 'Wald',                         table: forest,                  valueType: "percent"},
    {label: 'Haushalte',                    table: household,               valueType: "amount"},
    {label: 'Heiratsziffer',                table: marriage,                valueType: "percent"},
    {label: 'Bevölkerungsdichte',           table: population_density,      valueType: "amount"},
    {label: 'Bevölkerungsveränderungen',    table: population_mutation,     valueType: "percent"},
    {label: 'Sektor1',                      table: sektor_1,                valueType: "amount"},
    {label: 'Sektor2',                      table: sektor_2,                valueType: "amount"},
    {label: 'Sektor3',                      table: sektor_3,                valueType: "amount"},
    {label: 'Siedlungsfläche',              table: settlement_area,         valueType: "percent"},
    {label: 'Solzialhilfe',                 table: socialcare,              valueType: "rate"}
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

    console.log(values)
    // const max = Number.MAX_VALUE;
    // const min = values.reduce( (a,b) => Math.min(a,b) );

    console.log(max);
    console.log(min);

    propsG.push({
        id: "p" + propID++,
        active: false,
        label: prop.label,
        data: table,
        amount: table.length,
        gemeinde: {},
        valueTye: prop.valueType,
        maxmin: {max: undefined, min: undefined},
        value: {first: undefined, second: undefined}
    });

    console.log(propsG)
};

const dom = innerString => {
    const tmpl = document.createElement("DIV");
    tmpl.innerHTML = innerString;
    return tmpl.firstChild;
};

const initializeData = () => {


    /* Initialize every Data */

    toAnalyseData.forEach(e => dataINITGemeinden(e))

    const dragfield = dom(`<div class="scrollable"  id="dragfield">`);
    const svg = dom(`<div id="svg">`);

    propsG.forEach(prop => {
        const propElement = dom(`<div class="segment" id="${prop.id}" draggable="true" onclick="select(this)" ondragstart="drag(event)">
                                                <p class="propLabel">${prop.label}</p>
                                            </div>`)
        dragfield.appendChild(propElement);
    });

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
