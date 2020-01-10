const canton = {path: cantonsSVG, table: cantonTable, data: undefined};
const gemeinden = {path: gemeindenSVG, table: gemeindenTable, data: undefined};

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

let onFocus = false;

const initGemeindeTooltip = () => {
    const selectElements = document.querySelector(`#gemeinden`);
    const elementsG = selectElements.querySelectorAll('path');
    /* Add MouseOver-Listener to the Gemeinden */
    const descriptionGemeinde = document.getElementById("description");
    elementsG.forEach(e => {

        e.addEventListener('mouseover', event => {
            e.setAttribute("class", "enabled heyo");
            descriptionGemeinde.classList.add("active");
        });

        e.addEventListener('mousemove', event => {
            descriptionGemeinde.style.left = event.pageX + "px";
            descriptionGemeinde.style.top = (event.pageY - 70).toString() + "px";
            descriptionGemeinde.innerHTML = e.id;
        });
        e.addEventListener('mouseout', event => {
            descriptionGemeinde.classList.remove("active");
        });
        e.addEventListener('click', event => {

            elementsG.forEach(p => {
                if (p.classList.contains("activePath")) {
                    console.log("CONTAINS")
                    p.classList.remove("activePath");
                }
            });

            e.setAttribute("class", "activePath");
            displayInfobox(e.id)
        })

    });
}

const gemeindeINIT = () => {
    const table = [];
    gemeinden.table.split("\n").forEach(e => table.push(gemeindeTableToObject(e)));
    gemeinden.data = table;

    initGemeindeTooltip()
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
    element.classList.toggle("active");
    let content = element.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

const openSlidePopup = sliderId => {
    console.log("CLICKED")
    const inputTab = document.getElementById("slider" + sliderId) // element.parentNode.parentNode.childNodes[3];
    const sliderTab = inputTab.parentNode.childNodes[3];
    console.log(inputTab);
    console.log(sliderTab);

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

const lakeBlue = () => {
    const selectElements = document.querySelector(`#gemeinden`);
    const elementsG = selectElements.querySelectorAll('path');

    console.log( propsG[0].data)
    const lakes = [];
    elementsG.forEach(c => {
           if( !propsG[0].data.find(p => p.gemeinde === c.id ) ){
               console.log( c.id)
               c.style.fill = "rgba(43,158,222,0.4)";
           }
    });
};

const initializeData = () => {

    /* Initialize every Data */

    toAnalyseData.forEach(e => dataINITGemeinden(e))

    const dragfield = dom(`<div id="dragfield">`);
    const svg = dom(`<div id="svg">`);

    //console.log(propsG)

    getCategories().forEach(c => {
        const categoryElement = dom(`<button onclick="addCollapse(this)" class="collapsible">${c}</button>`);
        const contentElement = dom(`<div  class="content" id="${c}"></div>`);

        propsG.forEach(prop => {
            if (prop.category === c) {

                const propElement = `
                                     <div class="row">
                                        <div class="column left"> 
                                            <div id="col${prop.id}">  
                                                 
                                                <div class="segment" propname="${prop.label}" id="${prop.id}" title="${prop.description}" draggable="true" onclick="select(this)" ondragstart="drag(event)">     
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
//        addCollapse(categoryElement);
        dragfield.appendChild(categoryElement);
        dragfield.appendChild(contentElement);
    });


    const svgTag = dom(`<svg id="svg" xmlns="http://www.w3.org/2000/svg" style="width: 100%" version="1.2" baseProfile="tiny" viewBox="-340 -150 1350 700" stroke-linecap="round" stroke-linejoin="round">  
                                            ${gemeindenSVG} 
                                   </svg>`);

    svg.appendChild(svgTag);

    document.getElementById("dragfield").replaceWith(dragfield);
    document.getElementById("svg").replaceWith(svg);

    // cantonINIT();
    gemeindeINIT();

    lakeBlue();

    const allSliders = document.querySelectorAll(".range-slider");
    allSliders.forEach(slider => setSliderValue(slider.childNodes[5]))

};


initializeData();
