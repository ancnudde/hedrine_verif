chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "saveInteraction") {

        console.log("Background received:", message);

        chrome.storage.local.set({

            interaction: message.data

        });

    }

});