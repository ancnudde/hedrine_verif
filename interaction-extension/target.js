function fill(selector, value) {

    const input =
        document.querySelector(selector);

    if (!input)
        return;

    input.value = value;

    input.dispatchEvent(
        new Event("input", {
            bubbles: true
        })
    );

    input.dispatchEvent(
        new Event("change", {
            bubbles: true
        })
    );

}

chrome.runtime.onMessage.addListener(async message => {

    if (message.action !== "fillForm")
        return;

    const result =
        await chrome.storage.local.get("interaction");

    const d = result.interaction;

    if (!d)
        return;

    fill("#herb", d.herb.herb_vernacular_name);

    fill("#species", d.herb.herb_species);

    fill("#target", d.target);

    fill("#drug", d.drug.drug_commercial_name);

    fill("#doi", d.metadata.doi);

    fill("#title", d.metadata.title);

});