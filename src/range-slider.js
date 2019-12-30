const percentSign = valuetype => (valuetype === "percent") ? "%" : "";


const setDomSlider = (max, min , valuetype, id) =>  `<div class='multi-range' propID='${id}' valuetype='${valuetype}' min='${min}' max='${max}' style="--width:150px; --low:0%; --high:100%">
                                                        <div class="range-bg"></div>
                                                        <span class="fst-value">${min}</span>
                                                        <input type='range' value='0' level="low" oninput='setValue(this)'/>
                                                        <span class="snd-value">${max}</span>
                                                        <input type='range' value='100' level="high" oninput='setValue(this)'/>
                                                        <div class='min-max'>
                                                            <span>${min}${percentSign(valuetype)}</span>
                                                            <span>${max}${percentSign(valuetype)}</span>
                                                        </div>
                                                    </div>`;


const setValue = (input) => {

    const masterNode = input.parentNode;
    const firstInput = masterNode.childNodes[5];
    const secondInput = masterNode.childNodes[9];
    const low = parseInt(masterNode.style.getPropertyValue("--low").split("%")[0], 10);
    const high = parseInt(masterNode.style.getPropertyValue("--high").split("%")[0], 10);
    // console.log(low + " -- " + high)
    if (high <= low) {
        const temp = firstInput.getAttribute("level");
        firstInput.setAttribute("level", secondInput.getAttribute("level"));
        secondInput.setAttribute("level", temp);
    }
    masterNode.style.setProperty(`--${input.getAttribute("level")}`, input.value + "%");



    // set the correct value for data-filtering
    const id = masterNode.getAttribute("propID");
    const prop = propsG.find(prop => prop.id === id);

    const difference = parseInt(masterNode.getAttribute("min"), 10);
    const max = parseInt(masterNode.getAttribute("max"), 10) - difference;

    console.log("test max : " + parseInt(masterNode.getAttribute("max"),10) )
    console.log("difference: " + difference)
    console.log("max: " + max)


    prop.value.low = (low === 0) ? difference : (low / 100 * max) + difference ;
    prop.value.high = (high / 100 * max) + difference;

    console.log("name: " + prop.label)
    console.log("low: " + prop.value.low)
    console.log("high: " + prop.value.high)



    // Tooltip
    const valueType = masterNode.getAttribute("valuetype");
    console.log(valueType)

    const fstTooltip = masterNode.childNodes[3];
    const sndTooltip = masterNode.childNodes[7];
    if (fstTooltip.nextElementSibling.getAttribute("level") === "low") {
        if (valueType === "percent"){
            fstTooltip.innerText = fstTooltip.nextElementSibling.value + "%";
            sndTooltip.innerText = sndTooltip.nextElementSibling.value + "%";
        } else {
            fstTooltip.innerText = Math.round( prop.value.low );
            sndTooltip.innerText = Math.round( prop.value.high );
        }

    } else {
        if (valueType === "percent"){
            fstTooltip.innerText = sndTooltip.nextElementSibling.value + "%";
            sndTooltip.innerText = fstTooltip.nextElementSibling.value + "%";
        } else {
            fstTooltip.innerText = Math.round( prop.value.high );
            sndTooltip.innerText = Math.round( prop.value.low );
        }

    }

    setTooltipPosition(masterNode, fstTooltip, low, "--first");
    setTooltipPosition(masterNode, sndTooltip, high, "--second");

    document.getElementById("slider-button").innerText= Math.round( prop.value.low ) + " bis " + Math.round( prop.value.high );

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
