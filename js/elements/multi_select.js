class MultiSelect extends HTMLElement {

    constructor() {
        super();

        this.options = [];
        this.selected = new Set();

        const optionElements = Array.from(
            this.querySelectorAll("option")
        );

        this.options = optionElements.map(option => ({
            value: option.value,
            label: option.textContent.trim()
        }));

        // Now we can replace the contents
        this.innerHTML = `
        <div class="selected-box">
            <span class="placeholder">
                Select errors...
            </span>
        </div >
    
        <div class="dropdown"></div>
`;

        this.selectedBox = this.querySelector(".selected-box");
        this.dropdown = this.querySelector(".dropdown");

        this.selectedBox.addEventListener("click", () => {
            this.dropdown.classList.toggle("open");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (event) => {

            if (!this.contains(event.target)) {
                this.dropdown.classList.remove("open");
            }

        });
    }

    connectedCallback() {
        this.renderOptions();
        this.renderSelected();
    }

    renderOptions() {

        this.dropdown.innerHTML = "";

        this.options.forEach(option => {

            const element = document.createElement("div");

            element.className = "option";

            if (this.selected.has(option.value)) {
                element.classList.add("selected");
            }

            element.textContent = option.label;

            element.addEventListener("click", (event) => {

                event.stopPropagation();

                this.toggleOption(option.value);

            });

            this.dropdown.appendChild(element);
        });
    }

    toggleOption(value) {

        if (this.selected.has(value)) {
            this.selected.delete(value);
        } else {
            this.selected.add(value);
        }

        this.renderOptions();
        this.renderSelected();

        this.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    values: this.value
                }
            })
        );
    }

    renderSelected() {

        this.selectedBox.innerHTML = "";

        if (this.selected.size === 0) {

            const placeholder = document.createElement("span");

            placeholder.className = "placeholder";
            placeholder.textContent = "Select errors...";

            this.selectedBox.appendChild(placeholder);

            return;
        }

        this.selected.forEach(value => {

            const option = this.options.find(
                option => option.value === value
            );

            if (!option) return;

            const tag = document.createElement("span");

            tag.className = "tag";
            tag.textContent = option.label;

            const removeButton = document.createElement("button");

            removeButton.className = "remove";
            removeButton.textContent = "×";
            removeButton.type = "button";

            removeButton.addEventListener("click", event => {

                event.stopPropagation();

                this.toggleOption(value);

            });

            tag.appendChild(removeButton);

            this.selectedBox.appendChild(tag);
        });
    }

    get value() {
        return Array.from(this.selected);
    }

    set value(values) {

        this.selected = new Set(values);

        this.renderOptions();
        this.renderSelected();
    }
}

customElements.define("multi-select", MultiSelect);
