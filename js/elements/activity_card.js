class ActivityCard extends HTMLElement {
    constructor() {
        super();
    }

    set data(value) {
        this._data = value;
        this.render();
    }

    get data() {
        return this._data;
    }

    showToast(message, event) {
        const toast = document.createElement("div");
        toast.className = "activity-card-toast";
        toast.textContent = message;

        const rect = this.getBoundingClientRect();

        toast.style.left = `${event.clientX - rect.left}px`;
        toast.style.top = `${event.clientY - rect.top}px`;

        this.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add("show"));

        setTimeout(() => {
            toast.classList.remove("show");
            toast.addEventListener("transitionend", () => toast.remove(), { once: true });
        }, 1000);
    }

    render() {
        if (!this._data) return;

        const d = this._data;

        const authors = d.metadata.authors
            .map(a => `${a.first_name} ${a.last_name}`)
            .join(", ");

        this.innerHTML = `

                <div class="title-bloc">
                    <div class="title-bloc__title">${d.metadata.title}</div>
                    <span class="title-bloc__badge title-bloc__badge--${d.metadata.article_type.replaceAll("_", "-")}">
                        ${d.metadata.article_type.replaceAll("_", " ")}
                    </span>
                    `
        if (this._data.babine) {
            this.innerHTML += `
                    <div class="babine-score babine-score--${d.babine}">
                    Babine Score: ${d.babine}
                    </div>
                </div>`
        }


        this.innerHTML += `
        <div class="metadata-bloc">

                        <div class="metadata-bloc__metadata-title">
                        ${d.metadata.journal.full_name}
                        </div><br>
                        <div class="metadata-bloc__metadata-author">
                        ${authors}
                        </div>
                </div>
    
                    <p>
                        DOI:
                        <a class="doi"
                            href="https://doi.org/${d.metadata.doi}"
                            target="_blank">
                            ${d.metadata.doi}
                        </a>
                    </p>


                <details class="summary-box" open>
                    <summary class="summary-box__summary-title">Initial Hedrine text</summary>
                    <textarea class="summary-box__summary-text initial-hedrine-text"></textarea>
                    <div class="summary-box__copy-button" title="copy">
                        <img class="summary-box__copy-button__copy-icon" 
                            src="../../assets/copy.svg"></img>
                    </div>
                </details>

                <h3>Interaction Summary</h3>

                <details class="summary-box" open>
                    <summary class="summary-box__summary-title">English summary</summary>
                    <textarea class="summary-box__summary-text english-summary-text">${d.translations.english_text.trimStart()}</textarea>
                    <div class="summary-box__copy-button" title="copy">
                        <img class="summary-box__copy-button__copy-icon" 
                            src="../../assets/copy.svg"></img>
                    </div>

                </details>

                <details class="summary-box" open>
                    <summary class="summary-box__summary-title">French summary</summary>
                    <textarea class="summary-box__summary-text french-summary-text">${d.translations.french_text.trimStart()}</textarea>
                    <div class="summary-box__copy-button" title="copy">
                        <img class="summary-box__copy-button__copy-icon" 
                            src="../../assets/copy.svg"></img>
                    </div>

                </details>

                <h3>Herb</h3>

                <div class="grid">
                    <div class="field">
                        <span class="label">Common name</span>
                        <input type="text" class="field__text" data-part="herb" data-field="herb_vernacular_name" data-name="Common name" />
                    </div>

                    <div class="field">
                        <span class="label">Species</span>
                        <input type="text" class="field__text" data-part="herb" data-field="herb_species" data-name="Species" />
                    </div>

                    <div class="field">
                        <span class="label">Active molecule</span>
                        <input type="text" class="field__text" data-part="herb" data-field="herbal_molecule" data-name="Active molecule" />
                    </div>

                    <div class="field">
                        <span class="label">Preparation</span>
                        <input type="text" class="field__text" data-part="herb" data-field="herb_preparation_process" data-name="Preparation" />
                    </div>

                    <div class="field">
                        <span class="label">Plant part</span>
                        <input type="text" class="field__text" data-part="herb" data-field="herb_part" data-name="Plant part" />
                    </div>

                    <div class="field">
                        <span class="label">Effect</span>
                        <input type="text" class="field__text" data-part="herb" data-field="herb_effect" data-name="Herb effect" />
                    </div>
                </div>

                <h3>Drug</h3>

                <div class="grid">
                    <div class="field">
                        <span class="label">Commercial names</span>
                        <input type="text" class="field__text" data-part="drug" data-field="drug_commercial_name" data-name="Commercial names" />
                    </div>

                    <div class="field">
                        <span class="label">INN</span>
                        <input type="text" class="field__text" data-part="drug" data-field="drug_INN" data-name="INN" />
                    </div>

                    <div class="field">
                        <span class="label">Effect</span>
                        <input type="text" class="field__text" data-part="drug" data-field="drug_effect" data-name="Drug effect" />
                    </div>

                    <div class="field">
                        <span class="label">Target</span>
                        <input type="text" class="field__text" data-field="target" data-name="Target" />
                    </div>
                </div>

                <div class="errors-box">
                    <div class="errors-box--grid">
                        <div class="errors-box__errors-section">
                              <label for="target">Target is correct</label>
                            <input type="checkbox" id="target" name="target" class="errors-box__errors-section__error-element" checked />
                        </div>
                        <div class="errors-box__errors-section">
                              <label for="study">Study type is correct</label>
                            <input type="checkbox" id="study" name="study" class="errors-box__errors-section__error-element" checked />
                        </div>
                        <div class="errors-box__errors-section">
                              <label for="herb">Herb is correct</label>
                            <input type="checkbox" id="herb" name="herb" class="errors-box__errors-section__error-element" checked />
                        </div>
                        <div class="errors-box__errors-section">
                              <label for="drug">Drug is correct</label>
                            <input type="checkbox" id="drug" name="drug" class="errors-box__errors-section__error-element" checked />
                        </div>
                        <div class="errors-box__errors-section">
                              <label for="Babine">Manual Babine score</label>
                            <input type="text" id="babine" name="babine" class="errors-box__errors-section__error-element errors-box__errors-section__error-element--text" checked />
                        </div>
                    </div>

                    <multi-select id="error-types"> 
                    <option value="reference"> Other references considered as current </option> 
                    <option value="bibliography"> Information in bibliography is used as information from the text </option> 
                    <option value="syntax"> Added markdown synthax (*, ...) </option> 
                    <option value="entity"> Entity not understood </option> 
                    <option value="individualization"> Lack of individualisation </option> 
                    <option value="standardisation"> Lack of standardisation </option> 
                    <option value="incongruence"> Incongruent conclusions and content in summary </option> 
                    <option value="description"> Inadequate description level </option> 
                    <option value="missing_babine"> Missing Babine score </option> 
                    <option value="babine_score"> Wrong Babine score </option> 
                    </multi-select>

                    <textarea class="errors-box__other-errors">Other errors:</textarea>

                    <div class="errors-box__export-button" title="export">Export errors</div>
                </div>
        `;


        const copyButtons = this.querySelectorAll('.summary-box__copy-button');
        copyButtons.forEach((copyButton) => {
            copyButton.addEventListener('click', async (event) => {
                console.log(copyButton.parentElement)
                const text = copyButton.parentElement.querySelector('.summary-box__summary-text').innerText;
                await navigator.clipboard.writeText(text);

                this.showToast("Copied to clipboard ✓", event);
            })
        })
        this.querySelectorAll('.field__text').forEach((input) => {
            const original = input.dataset.part
                ? this._data[input.dataset.part][input.dataset.field]
                : this._data[input.dataset.field];

            input.value = original;
            input.dataset.original = original;

            input.addEventListener('input', () => {
                input.classList.toggle('field__text--error', input.value !== input.dataset.original);
            });
        })

        const exportButton = this.querySelector('.errors-box__export-button');
        exportButton.addEventListener('click', (event) => {
            const errors = this.collectErrors();

            const blob = new Blob(
                [JSON.stringify(errors, null, 4)],
                { type: "application/json" }
            );
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `errors_${d.metadata.doi.replaceAll("/", "_")}.json`;
            link.click();
            URL.revokeObjectURL(url);

            this.showToast("Errors exported ✓", event);
        })
    }

    collectErrors() {
        const checkboxes = {};
        this.querySelectorAll('.errors-box__errors-section').forEach((section) => {
            const input = section.querySelector('input[type="checkbox"]');
            if (input) {
                checkboxes[input.id] = input.checked;
            }
        });

        const multiSelect = this.querySelector('#error-types');
        const errorTypes = multiSelect.value.map((value) => {
            const option = multiSelect.options.find((option) => option.value === value);
            return option ? option.label : value;
        });

        const fields = {};
        this.querySelectorAll('.field__text').forEach((input) => {
            fields[input.dataset.name] = {
                initial_value: input.dataset.original,
                value: input.value,
                error: input.value !== input.dataset.original
            };
        });

        return {
            doi: this._data.metadata.doi,
            checks: checkboxes,
            manual_babine_score: this.querySelector('.errors-box__errors-section input[type="text"]').value,
            initial_hedrine_text: this.querySelector('.initial-hedrine-text').value,
            english_summary: this.querySelector('.english-summary-text').value,
            french_summary: this.querySelector('.french-summary-text').value,
            herb_drug_fields: fields,
            error_types: errorTypes,
            other_errors: this.querySelector('.errors-box__other-errors').value
        };
    }
}

customElements.define("activity-card", ActivityCard);