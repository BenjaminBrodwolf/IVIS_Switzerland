let municipalitiesWithPrecondition = [];


/**
 * @param {Element} element
 * @description tbd
 * */
const checkElementIntersection = element => {
    if (element.firstElementChild === null) {
        return {
            operator: "orOperation",
            element: orOperation(element)
        }
    }

    if (element.firstElementChild.hasChildNodes()) {
        if (element.firstElementChild.firstElementChild === null) {
            return {
                operator: "andOperator",
                element: andOperation(element, element.firstElementChild)
            }
        } else if (element.firstElementChild.firstElementChild.className === "dropped-segment") {
            return {
                operator: "tripleAndOperator",
                element: tripleAndOperation(element, element.firstElementChild, element.firstElementChild.firstElementChild)
            }
        }
    }

}

/**
 * @param {Element} element
 * @return {String}
 * @description tbd
 * */
const orOperation = (element) => element.getAttribute("propname")

/**
 * @param {Element} firstElement
 * @param {Element} secondElement
 * @return {String}
 * @description tbd
 * */
const andOperation = (firstElement, secondElement) => {
    return {
        firstElement: firstElement.getAttribute("propname"),
        secondElement: secondElement.getAttribute("propname"),
    };
}

/**
 * @param {Element} firstElement
 * @param {Element} secondElement
 * @param {Element} thirdElement
 * @return {String}
 * @description tbd
 * */
const tripleAndOperation = (firstElement, secondElement, thirdElement) => {
    return {
        firstElement: firstElement.getAttribute("propname"),
        secondElement: secondElement.getAttribute("propname"),
        thirdElement: thirdElement.getAttribute("propname"),
    };
}


/**
 * @description tbd
 * */
const colorMap = () => {
    const selectElements = document.querySelector(`#municipalities`);
    const elementsG = selectElements.querySelectorAll('path');
    elementsG.forEach(c => c.style.fill = 'rgb(0, 0, 0)');
    municipalitiesWithPrecondition = searchMunicipalitiesWithPrecondition();
    municipalitiesWithPrecondition.forEach(c => {
        c.style.fill = '#FF5757';
    })
    lakeBlue();
    createHtmlList();
}

/**
 * @return {Array}
 * @description tbd
 * */
const getPreconditions = () => {
    const filterBox = document.getElementById("zone");
    let listWithPrecondition = []

    for (let i = 0; i < filterBox.children.length; i++) {
        const filterObject = checkElementIntersection(filterBox.children[i]);
        listWithPrecondition.push({
            filterOperator: filterObject.operator,
            filterProperty: filterObject.element,
        });
    }
    return listWithPrecondition;
}

/**
 * @return {Array}
 * @description tbd
 * */
const searchMunicipalitiesWithPrecondition = () => {
    const selectElements = document.querySelector(`#municipalities`);
    const elementsG = selectElements.querySelectorAll('path');

    const conditionFulfilledMunicipalities = [];
    const preconditions = getPreconditions();
    elementsG.forEach(c => {
        preconditions.forEach(pc => {
            if (checkMunicipality(c, pc)) {
                conditionFulfilledMunicipalities.push(c);
            }
        })
    });

    return conditionFulfilledMunicipalities;
}

/**
 * @param {Element} checkedMunicipality
 * @param {Object} precondition
 * @return {boolean}
 * @description tbd
 * */
const checkMunicipality = (checkedMunicipality, precondition) => {
    let fulfillPrecondition = false;

    if (precondition.filterOperator === "andOperator") { //when its a and-operator
        const prop1 = propsG.find(p => p.label === precondition.filterProperty.firstElement);
        if (prop1.data.find(p => p.municipality === checkedMunicipality.id && (prop1.value.low <= p.value && prop1.value.high >= p.value))) {
            const prop2 = propsG.find(p => p.label === precondition.filterProperty.secondElement);
            if (prop2.data.find(p => p.municipality === checkedMunicipality.id && (prop2.value.low <= p.value && prop2.value.high >= p.value))) {
                fulfillPrecondition = true;
            }
        } else {
            fulfillPrecondition = false
        }

    } else if (precondition.filterOperator === "tripleAndOperator") { //when its a triple-and-operation
        const prop1 = propsG.find(p => p.label === precondition.filterProperty.firstElement);
        if (prop1.data.find(p => p.municipality === checkedMunicipality.id && (prop1.value.low <= p.value && prop1.value.high >= p.value))) {
            const prop2 = propsG.find(p => p.label === precondition.filterProperty.secondElement);
            if (prop2.data.find(p => p.municipality === checkedMunicipality.id && (prop2.value.low <= p.value && prop2.value.high >= p.value))) {
                const prop3 = propsG.find(p => p.label === precondition.filterProperty.thirdElement);
                if (prop3.data.find(p => p.municipality === checkedMunicipality.id && (prop3.value.low <= p.value && prop3.value.high >= p.value))) {
                    fulfillPrecondition = true;
                }
            }
        } else {
            fulfillPrecondition = false
        }
    } else { //when its a or-operator
        const prop = propsG.find(p => p.label === precondition.filterProperty);

        if (prop.data.find(p => p.municipality === checkedMunicipality.id && (prop.value.low <= p.value && prop.value.high >= p.value))) {
            fulfillPrecondition = true;
        } else {
            fulfillPrecondition = false
        }
    }
    return fulfillPrecondition;
}


/**
 * @description tbd
 * */
const createHtmlList = () => {

    const distinctedMunicipalities = [];
    municipalitiesWithPrecondition.forEach(g => {
        if (!distinctedMunicipalities.find(dg => dg === g.id)) {
            distinctedMunicipalities.push(g.id);
        }
    })

    distinctedMunicipalities.sort();

    let municipalityListTable = `<div id="foundMunicipalities"><h4 scope="col">Gefundene Gemeinde: ${distinctedMunicipalities.length}</h4></div>
                        <div id="foundMunicipalitiesTable" class="municipalityScrollable">
                             <table>
                                <tbody>`;

    distinctedMunicipalities.forEach(c => {
        municipalityListTable += `<tr>
                                     <td id="listElement${c}" class="municipalityList" onclick="zoomToMunicipality('${c}'); displayInfobox( '${c}' )"> <div> <p style="float: left">${c} </p>  <p id="goBack${c}" style="display: none" class="goBack">Zurück</p> </div></td> 
                                 </tr>`;
    });

    municipalityListTable += `    </tbody>
                      </table>
                   </div>`;

    document.getElementById('table').innerHTML = municipalityListTable;
}



