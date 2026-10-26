console.log("webapp.js loaded");

window.addEventListener("message", event => {

    if (event.source !== window)
        return;

    if (event.data.type !== "interaction-export")
        return;

    chrome.runtime.sendMessage({

        action: "saveInteraction",

        data: event.data.payload

    });


});