const getValuetypeSign = valuetype => {
    let valuesign = "";
    switch (valuetype) {
        case "percent":
            valuesign = "%";
            break;
        case "km2":
            valuesign = "km²";
            break;
    }
    return valuesign;
};

const getDisplayValue = (valueType, lowValue, highValue) => {

    const low = lowValue.toFixed(1);
    const high = highValue.toFixed(1);
    let lowResult = "";
    let highResult = "";

    if (valueType === "float") {
        lowResult = low.split(".")[0];
        highResult = high.split(".")[0];
    } else {
        switch (valueType) {
            case "percent":
                lowResult = low + "%";
                highResult = high + "%";
                break;
            case "km2":
                lowResult = low + "km²";
                highResult = high + "km²";
                break;

            default:
                lowResult = low.split(".")[0] + "";
                highResult = high.split(".")[0] + "";
        }
    }

    return {
        low: () => lowResult,
        high: () => highResult
    }
};

const setDomSlider = (max, min, valuetype, id) => `<div class='range-slider' propID='${id}' valuetype='${valuetype}' min='${min}' max='${max}' style="--width: 180px; --low:0%; --high:100%">
                                                        <div class="range-bg"></div>
                                                        <span class="fst-value">${min}</span>
                                                        <input type='range' step="0.1" value='0' level="low" oninput='setValue(this)' />
                                                        <span class="snd-value">${max}</span>
                                                        <input type='range' step="0.1" value='100' level="high" oninput='setValue(this)'/>
                                                        <div class='min-max'>
                                                            <span>${min}${getValuetypeSign(valuetype)}</span>
                                                            <span>${max}${getValuetypeSign(valuetype)}</span>
                                                        </div>
                                                    </div>`;


const setValue = (input) => {


    const masterNode = input.parentNode;
    const firstInput = masterNode.childNodes[5];
    const secondInput = masterNode.childNodes[9];
    let styleLow = parseInt(masterNode.style.getPropertyValue("--low").split("%")[0], 10);
    let styleHigh = parseInt(masterNode.style.getPropertyValue("--high").split("%")[0], 10);
    // console.log(styleLow + " -- " + styleHigh)
    if (styleHigh <= styleLow) {
        const temp = firstInput.getAttribute("level");
        firstInput.setAttribute("level", secondInput.getAttribute("level"));
        secondInput.setAttribute("level", temp);
    }
    masterNode.style.setProperty(`--${input.getAttribute("level")}`, input.value + "%");


    // set the correct value for data-filtering
    const id = masterNode.getAttribute("propID");
    const prop = propsG.find(prop => prop.id === id);

    const difference = parseFloat(masterNode.getAttribute("min"));
    const max = parseFloat(masterNode.getAttribute("max")) - difference;
    // console.log("test max : " + parseInt(masterNode.getAttribute("max"), 10))
    // console.log("difference: " + difference)
    // console.log("max: " + max)

    styleLow = parseInt(masterNode.style.getPropertyValue("--low").split("%")[0], 10);
    styleHigh = parseInt(masterNode.style.getPropertyValue("--high").split("%")[0], 10);
    let low = ((styleLow === 0) ? difference : (styleLow / 100 * max) + difference);
    let high = ((styleHigh / 100 * max) + difference);
    prop.value.low = low;
    prop.value.high = high;
    // console.log("name: " + prop.label)
    // console.log("low: " + low)
    // console.log("high: " + high)


    // Tooltip
    const fstTooltip = masterNode.childNodes[3];
    const sndTooltip = masterNode.childNodes[7];

    const valueType = masterNode.getAttribute("valuetype");

    const currentValue = getDisplayValue(valueType, low, high)

    fstTooltip.innerText = currentValue.low();
    sndTooltip.innerText = currentValue.high();

    setTooltipPosition(masterNode, fstTooltip, styleLow, "--first");
    setTooltipPosition(masterNode, sndTooltip, styleHigh, "--second");


    masterNode.parentElement.previousElementSibling.innerHTML = `<form class="valForm"> <input  class="valInput" oninput="setValue(this)" type="text" name="low" value="${currentValue.low()}">` + " - " + `<input class="valInput" oninput="setValue(this)" type="text" name="low" value="${currentValue.high()}"></form>`;
};

const setTooltipPosition = (masterNode, tooltip, level, propertyName) => {
    const half_thumb_width = 25 / 2;
    const half_label_width = tooltip.offsetWidth / 2;
    const slider_width = parseInt(masterNode.style.getPropertyValue("--width").split("px")[0], 10);
    const center_position = slider_width / 2;
    const percent_of_range = level / 100; //(parseInt(masterNode.getAttribute("max"), 10) - (parseInt(masterNode.getAttribute("min"), 10)));
    const value_px_position = percent_of_range * slider_width;
    const offset = ((value_px_position - center_position) / center_position) * half_thumb_width;
    const final_label_position = value_px_position - half_label_width - offset;
    tooltip.style.setProperty(propertyName, final_label_position + "px");
}



