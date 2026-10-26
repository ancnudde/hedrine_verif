document
    .getElementById("fill")
    .onclick = async () => {

        const tabs = await chrome.tabs.query({

            active: true,

            currentWindow: true

        });

        chrome.tabs.sendMessage(

            tabs[0].id,

            {

                action: "fillForm"

            }

        );

    };