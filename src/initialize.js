const municipalities = {path: municipalitiesSVG, table: municipalitiesTable, data: undefined}; // municipality path

// data
const toAnalyseData = [
    {
        label: 'Einwohner',
        category: "Bevölkerung",
        table: population,
        dataType: "integer",
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
    {
        label: 'Gesamtfläche',
        category: "Fläche",
        table: area,
        dataType: "km2",
        description: "Gesamtfläche in km2"
    },
    {
        label: 'Haushaltsgrösse',
        category: "Haushalte",
        table: average_household_size,
        dataType: "float",
        description: "Durchschnittliche Haushaltsgrösse in Personen"
    },
    {
        label: 'Geburten',
        category: "Bevölkerungsbewegung",
        table: birth,
        dataType: "percent",
        description: "Bevölkerungsbewegung in % - Rohe Geburtenziffer"
    },
    {
        label: 'Tode',
        category: "Bevölkerungsbewegung",
        table: death,
        dataType: "percent",
        description: "Bevölkerungsbewegung in % - Rohe Sterbeziffer"
    },
    {
        label: 'Scheidungen',
        category: "Bevölkerungsbewegung",
        table: divorce,
        dataType: "percent",
        description: "Bevölkerungsbewegung in % - Rohe Scheidungsziffer"
    },
    {
        label: 'Beschäftigte',
        category: "Wirtschaft",
        table: employee,
        dataType: "integer",
        description: "Beschäftigte total"
    },
    {
        label: 'Ausländer',
        category: "Bevölkerung",
        table: foreigner,
        dataType: "percent",
        description: "Ausländer in %"
    },
    {
        label: 'Wald',
        category: "Fläche",
        table: forest,
        dataType: "percent",
        description: "Wald und Gehölze in %"
    },
    {
        label: 'Haushalte',
        category: "Haushalte",
        table: household,
        dataType: "integer",
        description: "Anzahl Privathaushalte"
    },
    {
        label: 'Heirat',
        category: "Bevölkerungsbewegung",
        table: marriage,
        dataType: "percent",
        description: "Bevölkerungsbewegung in % - Rohe Heiratsziffer"
    },
    {
        label: 'Dichte',
        category: "Bevölkerung",
        table: population_density,
        dataType: "integer",
        description: "Bevölkerungsdichte pro km2"
    },
    {
        label: 'Veränderung',
        category: "Bevölkerung",
        table: population_mutation,
        dataType: "percent",
        description: "Veränderung der Einwohner in %"
    },
    {
        label: 'Sektor1',
        category: "Wirtschaft",
        table: sektor_1,
        dataType: "integer",
        description: "Beschäftigte im Agrarsektor"
    },
    {
        label: 'Sektor2',
        category: "Wirtschaft",
        table: sektor_2,
        dataType: "integer",
        description: "Beschäftigte im Industriesektor"
    },
    {
        label: 'Sektor3',
        category: "Wirtschaft",
        table: sektor_3,
        dataType: "integer",
        description: "Beschäftigte im Dienstleistungssektor"
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
        dataType: "float",
        description: "Sozialhilfequote"
    }
];


const propsG = []; //Properties of the municipalities


/**
 * @param {String} data
 * @return {Object}
 * @description Turns a string into an object that contains the name and number of the municipality
 * */
const municipalityTableToObject = data => {
    const [name, municipalityNr] = data.split(";");
    return {
        name,
        municipalityNr,
    }
};

let onFocus = false; // no municipality is focused


/**
 * @description tbd
 * */
const initMunicipalityTooltip = () => {
    const selectElements = document.querySelector(`#municipalities`);
    const elementsG = selectElements.querySelectorAll('path');

    /* Add MouseOver-Listener to the Municipalities */
    const descriptionMunicipality = document.getElementById("description");
    elementsG.forEach(e => {

        e.addEventListener('mouseover', event => {
            e.setAttribute("class", "enabled heyo");
            descriptionMunicipality.classList.add("active");
        });

        e.addEventListener('mousemove', event => {
            descriptionMunicipality.style.left = event.pageX + "px";
            descriptionMunicipality.style.top = (event.pageY - 70).toString() + "px";
            descriptionMunicipality.innerHTML = e.id;
        });
        e.addEventListener('mouseout', event => {
            descriptionMunicipality.classList.remove("active");
        });

    });
}


/**
 * @description Adds a table with municipality-objects to the municipality
 * */
const municipalityINIT = () => {
    const table = [];
    municipalities.table.split("\n").forEach(e => table.push(municipalityTableToObject(e)));
    municipalities.data = table;

    initMunicipalityTooltip()
};

let propID = 1; //Every Propery has an ID, starts at 1

/**
 * @param {String} prop
 * @description creates a property object with all the municipalities and the associated values
 * */
const dataINIT = prop => {

    const table = [];
    const values = [];

    prop.table.split("\n").forEach(data => {
        const [municipality, value] = data.split(";");
        table.push({
            municipality,
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
        municipality: {},
        dataType: prop.dataType,
        boundaries: {min: min, max: max},
        value: {low: min, high: max}
    });

};


/**
 * @return {Array} categories
 * @description returns a list with all categories that exist
 * */
const getCategories = () => {
    const categories = [];
    toAnalyseData.forEach(p => categories.push(p.category))
    return [...new Set(categories)];
}


/**
 * @param {Element} element
 * @description tbd
 * */
const addCollapse = element => {
    element.classList.toggle("active");
    let content = element.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}


/**
 * @return {String} sliderId
 * @description tbd
 * */
const openSlidePopup = sliderId => {
    const inputTab = document.getElementById("slider" + sliderId) // element.parentNode.parentNode.childNodes[3];
    const sliderTab = inputTab.parentNode.childNodes[3];

    if (inputTab.style.display === "none") {
        inputTab.style.display = "block";
        sliderTab.style.display = "none";
    } else {
        inputTab.style.display = "none";
        sliderTab.style.display = "block";
    }

};

const dom = innerString => {
    const tmpl = document.createElement("DIV");
    tmpl.innerHTML = innerString;
    return tmpl.firstChild;
};


/**
 * @description tbd
 * */
const lakeBlue = () => {
    const selectElements = document.querySelector(`#municipalities`);
    const elementsG = selectElements.querySelectorAll('path');

    elementsG.forEach(c => {
        if (!propsG[0].data.find(p => p.municipality === c.id)) {
            c.style.fill = "rgba(43,158,222,0.4)";
        }
    });
};

/**
 * @description tbd
 * */
const initializeData = () => {

    toAnalyseData.forEach(e => dataINIT(e))

    const dragField = dom(`<div id="dragField">`);
    const svg = dom(`<div id="svg">`);


    getCategories().forEach(c => {
        const categoryElement = dom(`<button onclick="addCollapse(this)" class="collapsible">${c}</button>`);
        const contentElement = dom(`<div  class="content" id="${c}"></div>`);

        propsG.forEach(prop => {
            if (prop.category === c) {

                const propElement = `
                                     <div class="row">
                                        <div class="column left"> 
                                            <div id="col${prop.id}">  
                                                 
                                                <div class="segment top-segment" propname="${prop.label}" id="${prop.id}" title="${prop.description}" draggable="true" onclick="select(this)" ondragstart="drag(event)">     
                                                </div> 
                                                
                                            </div>
                                        </div>
                                          <div class="column middleleft"> 
                                           <p class="segmentLabel">                                         
                                               <span class="propLabel">${prop.label}</span> 
                                               <br>
                                               <div class="propDescription">${prop.description}</div>
                                           </p> 
                                        </div> 
                                        <div class="column middleright"> 
                                             <div id="slider${prop.id}" style="display: block" class="tabcontent">     
                                                   ${setDomInputfield(prop.boundaries.max, prop.boundaries.min, prop.dataType, prop.id)}
                                             </div>
                                             
                                              <div style="display: none">
                                                    ${setDomSlider(prop.boundaries.max, prop.boundaries.min, prop.dataType, prop.id)}
                                             </div> 
                                        </div> 
                                        
                                        <div id="toggle${prop.id}" class="column right" >
                                            <label  class="switch">
                                              <input type="checkbox" onclick="openSlidePopup('${prop.id}')">
                                              <span class="slider round"></span>
                                            </label>
                                                                
                                         </div>    
                                     </div>   `;
                contentElement.insertAdjacentHTML("beforeend", propElement);

            }
        });

        dragField.appendChild(categoryElement);
        dragField.appendChild(contentElement);
    });


    const svgTag = dom(`<svg id="svg" xmlns="http://www.w3.org/2000/svg" style="width: 100%" version="1.2" baseProfile="tiny" viewBox="-340 -150 1350 700" stroke-linecap="round" stroke-linejoin="round">  
                                            ${municipalitiesSVG} 
                                   </svg>`);

    svg.appendChild(svgTag);

    document.getElementById("dragField").replaceWith(dragField);
    document.getElementById("svg").replaceWith(svg);

    municipalityINIT();

    lakeBlue();

    const allSliders = document.querySelectorAll(".range-slider");
    allSliders.forEach(slider => setSliderValue(slider.childNodes[5]))

};


initializeData();
