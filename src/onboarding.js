const steps = [
    {
        nr: 1,
        img: "step1.gif",
        text: "Setzen Sie als erstes die gewünschten Werte der Properties, welche Sie analysieren möchten"
    },
    {nr: 2, img: "step2.gif", text: "Ziehen Sie die die gewünschten Properties in die Filterzone"},
    {
        nr: 3,
        img: "step3.gif",
        text: "Mit dem Klick auf eine der gefundenen Gemeinden in der rechten Tabelle, zoomt man zu der Gemeinde hin"
    },
    {
        nr: 4,
        img: "step4.gif",
        text: "Mit dem Klick auf die selektierte Gemeinde gelangt man wieder auf die Gesamtübersicht der Karte"
    }
]

let stepCounter = 0;

const showOnboarding = () => {
    document.getElementById("onboarding-background").style.visibility = 'visible';
    document.getElementById("onboarding").style.visibility = 'visible';
    next();
}


const closeOnboarding = () => {
    document.getElementById("onboarding-background").style.visibility = 'hidden';
    document.getElementById("onboarding").style.visibility = 'hidden';
}

const next = () => {

    stepCounter++;

    if (stepCounter > steps.length) {
        closeOnboarding();
        return;
    }

    const step = steps.find(s => s.nr === stepCounter)
    document.getElementById("description-title").innerText = "Schritt " + step.nr;
    document.getElementById("description-gif").innerHTML = `<img class="gif" src="assets/${step.img}">`
    document.getElementById("description-txt").innerHTML = `<p class="txt">${step.text}</p>`

    if (stepCounter == steps.length) {
        document.getElementById("next").innerText = "Starten";
    }
};
