let gemeindeWithPrecondition = [];

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
        firstElement: firstElement.getAttribute("propname"),
        secondElement: secondElement.getAttribute("propname"),
    };
}

const orOperation = (element) => element.getAttribute("propname")


function colorMapGemeinden() {
    const selectElements = document.querySelector(`#gemeinden`);
    const elementsG = selectElements.querySelectorAll('path');
    elementsG.forEach(c => c.style.fill = 'rgb(0, 0, 0)');
    gemeindeWithPrecondition = searchGemeindenWithPrecondition();
    gemeindeWithPrecondition.forEach(c => {
        c.style.fill = '#FF5757';
    })

    createHtmlList();
}

/*
Sammelt die Objekte mit den Operatoren und Elementen in einer Liste
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
        preconditions.forEach(pc => {
            if (checkGemeinde(c, pc)) {
                gemeindenWithPrecondition.push(c);
            }
        })
    });

    return gemeindenWithPrecondition;
}


/*
Testet einen einzelnen Kanton, ob er die Bedingung erfüllt
 */
function checkGemeinde(checkedGemeinde, pc) {
    let fulfillPrecondition = false;

    if (pc.filterOperator) { //when its a and-operator
        const prop1 = propsG.find(p => p.label === pc.filterProperty.firstElement);
        if (prop1.data.find(p => p.gemeinde === checkedGemeinde.id && (prop1.value.low <= p.value && prop1.value.high >= p.value))) {
            const prop2 = propsG.find(p => p.label === pc.filterProperty.secondElement);
            if (prop2.data.find(p => p.gemeinde === checkedGemeinde.id && (prop2.value.low <= p.value && prop2.value.high >= p.value))) {
                fulfillPrecondition = true;
            }
        } else {
            fulfillPrecondition = false
        }

    } else { //when its a or-operator
        const prop = propsG.find(p => p.label === pc.filterProperty);

        if (prop.data.find(p => p.gemeinde === checkedGemeinde.id && (prop.value.low <= p.value && prop.value.high >= p.value))) {
            fulfillPrecondition = true;
        } else {
            fulfillPrecondition = false
        }
    }
    return fulfillPrecondition;
}


function createHtmlList() {

    const distinctedGemeinden = [];
    gemeindeWithPrecondition.forEach(g => {
        if (!distinctedGemeinden.find(dg => dg === g.id)) {
            distinctedGemeinden.push(g.id);
        }
    })

    distinctedGemeinden.sort();
    //console.log(distinctedGemeinden[0])

    let gemeindeListTable = `<div id="foundGemeinden"><h4 scope="col">Gefundene Gemeinde: ${distinctedGemeinden.length}</h4></div>
                        <div id="foundGemeindenTable" class="scrollable">
                             <table>
                                <tbody>`;

    distinctedGemeinden.forEach(c => {
        gemeindeListTable += `<tr>
                                     <td id="listElement${c}" class="gemeindenList" onclick="zoomToGemeinde('${c}'); displayInfobox( '${c}' )">${c}</td> 
                                 </tr>`;
    });

    gemeindeListTable += `    </tbody>
                      </table>
                   </div>`;

    document.getElementById('table').innerHTML = gemeindeListTable;
}






