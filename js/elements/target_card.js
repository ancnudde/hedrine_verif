class TargetCard extends HTMLElement {
    constructor() {
        super();
    }

    set target(value) {
        this._target = value;
        this.classList.add(`card-${value}`)
        this.render();
    }

    render() {

        this.innerHTML = `
        <div class="target-title">
            <span>${this._target.replaceAll('_', ' ')}</span>
            <navigation-box></navigation-box>
        </div>
        <div class="articles-bloc">
        </div>
        `;
    }

    appendArticles(articles) {
        const bloc = this.querySelector('.articles-bloc');
        articles.forEach((article, i) => {
            const dataCard = new ActivityCard();
            dataCard.data = article
            if (i != 0) {
                dataCard.classList.add('hidden')
            }
            bloc.appendChild(dataCard)
        });
        const navigationBox = this.querySelector('navigation-box')
        navigationBox.maxPage = articles.length;

    }
}

customElements.define("target-card", TargetCard);