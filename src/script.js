let gemeindeWithPrecondition = [];


function resetAll() {
    propsG.forEach(p => {
        if (p.active) {
            putItBack(p.id);
            p.active = false;
        }
    })
}

let focusedSegment = null;

function resetSelected() {
    putItBack(focusedSegment.id);
    //putItBack(focusedSegment.id.firstChild);
    propsG.find(p => p.id === focusedSegment.id).active = false;
    focusedSegment = null;
    document.getElementById("resetSelButton").style.visibility = 'hidden';
}

function select(element) {
    if (propsG.find(p => p.id === element.id).active) {
        document.getElementById("resetSelButton").style.visibility = 'visible';
        propsG.forEach(p => {
            focusedSegment = element;
            if (focusedSegment.id === p.id) {
                if (checkElementIntersection(focusedSegment).operator === false) {
                    document.getElementById(p.id).style.borderColor = "rgb(255,0,0)";
                } else {
                    document.getElementById(p.id).style.borderColor = "rgb(255,0,0)";
                    document.getElementById(focusedSegment.firstElementChild.id).style.borderColor = "rgb(255,0,0)";
                }
            } else {
                document.getElementById(p.id).style.borderColor = "rgb(0,0,0)";
            }
        })
    }
}

function putItBack(node) {
    const content = propsG.find(p => p.id === node);
    console.log(node)
    if (node) {
        console.log(content.category);
        const contentField = document.getElementById(content.category);
        const segment = document.getElementById(node);

        for (let i = 0; i < segment.children.length; i++) {
            contentField.appendChild(segment.children[i]);
        }

        contentField.appendChild(segment);
        segment.style.height = "3em";
        segment.style.width = "3em";
        segment.style.backgroundColor = '#ffd311';
        segment.style.borderColor = 'rgb(0, 0, 0)';
        segment.innerHTML = "";
        const propLabel = dom(`<p class="propLabel">${segment.title}</p>`);
        segment.appendChild(propLabel)


        colorMapGemeinden();
    }


    /*const dragfield = document.getElementById("dragfield");
    const segment = document.getElementById(node);

    for (let i = 0; i < segment.children.length; i++) {
        dragfield.appendChild(segment.children[i]);
    }

    dragfield.appendChild(segment);
    segment.style.height = "3em";
    segment.style.width = "3em";
    segment.style.backgroundColor = '#ffd311';
    segment.style.borderColor = 'rgb(0, 0, 0)';
    segment.innerHTML = "";
    const propLabel = dom(`<p class="propLabel">${segment.title}</p>`);
    segment.appendChild(propLabel)
    //colorMapCanton();
    colorMapGemeinden();
    createHtmlList();*/
}



/*
Es wird getestet ob es ein UND-Operator (true) oder ODER-Operator ist (false) und speichert dieser
boolean mit dem Element zusammen in ein Objekt
 */
function checkElementIntersection(element) {
    if (element.firstElementChild === null) {
        return {
            operator: false,
            element: orOperation(element)
        }
    }
    return {
        operator: true,
        element: andOperation(element, element.firstElementChild)
    }
}

/*
Getter Methoden
 */
function andOperation(firstElement, secondElement) {
    return {
        firstElement: firstElement.title,
        secondElement: secondElement.title,
    };
}

function orOperation(element) {
    return element.title
}

function colorMapGemeinden() {
    const selectElements = document.querySelector(`#gemeinden`);
    const elementsG = selectElements.querySelectorAll('path');
    elementsG.forEach(c => c.style.fill = 'rgb(0, 0, 0)');
    gemeindeWithPrecondition = searchGemeindenWithPrecondition();
    gemeindeWithPrecondition.forEach(c => {
        c.style.fill = 'rgb(255,0,0)';
    })

    createHtmlList();
}
/*
Sammelt die Objekte mit den Operatore und Elementen in einer Liste
*/
function getPreconditions() {
    const filterBox = document.getElementById("zone");
    let listWithPrecondition = []

    for (let i = 0; i < filterBox.children.length; i++) {
        listWithPrecondition.push({
            filterOperator: checkElementIntersection(filterBox.children[i]).operator,
            filterProperty: checkElementIntersection(filterBox.children[i]).element,
        });
    }

    return listWithPrecondition;
}
/*
Gibt Liste zurück von Kantonen die eingefärbt werden
 */
function searchGemeindenWithPrecondition() {
    const selectElements = document.querySelector(`#gemeinden`);
    const elementsG = selectElements.querySelectorAll('path');

    const gemeindenWithPrecondition = [];
    const preconditions = getPreconditions();

    elementsG.forEach(c => {
        if (checkGemeinde(c, preconditions)) {
            gemeindenWithPrecondition.push(c);
        }
    });

    return gemeindenWithPrecondition;
}


/*
Testet einen einzelnen Kanton, ob er die Bedingung erfüllt
 */
function checkGemeinde(checkedGemeinde, preconditions) {
    let fulfillPrecondition = false;

    console.log("checkGemeinde ---------------")
    preconditions.forEach(pc => {
        if (pc.filterOperator) {


            const prop1 = propsG.find(p => p.label === pc.filterProperty.firstElement);
            if (prop1.data.find(p => p.gemeinde === checkedGemeinde.id && (prop1.value.low < p.value && prop1.value.high > p.value))) {
                const prop2 = propsG.find(p => p.label === pc.filterProperty.secondElement);
                if (prop2.data.find(p => p.gemeinde === checkedGemeinde.id && (prop2.value.low < p.value && prop2.value.high > p.value))) {
                    fulfillPrecondition = true;
                }

            } else {
                fulfillPrecondition = false
            }
        } else {
            const prop = propsG.find(p => p.label === pc.filterProperty);

            if (prop.data.find(p => p.gemeinde === checkedGemeinde.id && (prop.value.low <= p.value && prop.value.high >= p.value))) {
                fulfillPrecondition = true;
            } else {
                fulfillPrecondition = false
            }

        }
    });
    return fulfillPrecondition;
}


function createHtmlList() {

    let result = `         <div class="scrollable">
                             <table class="table table-hover">
                                 <thead>
                                      <tr>
                                         <th scope="col">Gefundene Orte: ${gemeindeWithPrecondition.length}</th> 
                                     </tr>
                                 </thead>
                             <tbody>`;


    gemeindeWithPrecondition.forEach(c => {
        result += `<tr>
                          <td> ${c.id} </td> 
                       </tr>`;
    });

    result += `    </tbody>
                      </table>
                   </div>`;

    document.getElementById('table').innerHTML = result;
}






