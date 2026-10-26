class NavigationBox extends HTMLElement {
    constructor() {
        super();
        this._currentPage = 0;
        this._maxPage = 0;
    }

    set maxPage(value) {
        this._maxPage = value;
        this._currentPage = 0;
        this.render();
        this.querySelector('.navigation-box__navigation-display__current-page').value = 1;
        this.attachNavigation();
    }

    get currentPage() {
        return this._maxPage;
    }

    attachNavigation() {
        const currentPage =
            this.querySelector('.navigation-box__navigation-display__current-page');

        const navigationButtons =
            this.querySelectorAll('.navigation-box__navigation-button');

        const parentCard = this.closest('target-card');

        const cards = parentCard.querySelectorAll('activity-card');

        navigationButtons[0].addEventListener('click', () => {
            currentPage.stepDown();
            currentPage.dispatchEvent(
                new Event('input', { bubbles: true })
            );
        });

        navigationButtons[1].addEventListener('click', () => {
            currentPage.stepUp();
            currentPage.dispatchEvent(
                new Event('input', { bubbles: true })
            );
        });

        currentPage.addEventListener('input', (event) => {
            const newIndex = Number(event.target.value) - 1;

            if (newIndex < 0 || newIndex >= cards.length) {
                return;
            }

            cards[this._currentPage]?.classList.add('hidden');

            this._currentPage = newIndex;

            cards[this._currentPage]?.classList.remove('hidden');
        });
    }




    render() {

        this.innerHTML = `
        <button class="navigation-box__navigation-button">
            <div class="navigation-box__navigation-button__arrow 
                navigation-box__navigation-button__arrow--left">
            </div>
        </button>
        <input class="navigation-box__navigation-display__current-page"
            type="number" min="1" step="1" max="${this._maxPage}" pattern="\d+">
        <div class="navigation-box__navigation-display__max-page">/${this._maxPage}</div>
        <button class=" navigation-box__navigation-button">
            <div
                class="navigation-box__navigation-button__arrow navigation-box__navigation-button__arrow--right">
            </div>
        </button>
        `;
    }
}

customElements.define("navigation-box", NavigationBox);