let jsonData;
let articleData;
let cards;
let currentIndex = 0;

function loadJsonData(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject("No file selected.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            try {
                const jsonData = JSON.parse(event.target.result);
                console.log(Object.keys(jsonData).length)
                resolve(jsonData);
            } catch (error) {
                reject("Invalid JSON file.");
            }
        };

        reader.onerror = function () {
            reject("Error reading file.");
        };

        reader.readAsText(file);
    });
}

function loadStudyData(jsonContent) {
    const datas = [];
    for (const [key, val] of Object.entries(jsonContent)) {
        for (const interaction of val) {
            datas.push(interaction);
        }
    }
    return datas
}

function dispatchArticles(articles) {
    const articlesMap = {
        "CLINICAL_STUDY": [],
        "CASE_REPORT": []
    }
    articles.forEach(article => {
        if (["CLINICAL_STUDY", "CASE_REPORT"].includes(article.metadata.article_type)) {
            const articleType = article.metadata.article_type;
            articlesMap[articleType].push(article);
        } else {
            if (!articlesMap[article.target]) {
                articlesMap[article.target] = [];
            }
            articlesMap[article.target].push(article);
        }
    });
    return articlesMap
}


window.onload = function () {

    const cardsBox = document.querySelector('.cards-box');
    const currentPage = document.querySelector('.navigation-box__navigation-display__current-page');

    document.querySelector(".load-button").addEventListener("click", function () {
        document.querySelector(".load-input").click();
    });

    document.querySelector(".load-input").addEventListener("change", async function (e) {
        const file = e.target.files[0];

        try {
            const data = await loadJsonData(file);
            jsonData = data;
            articleData = loadStudyData(jsonData);
        }
        catch {
            console.error(err);
        }
        const articlesMap = dispatchArticles(articleData)
        const targetSelect = document.querySelector('.target-select');
        for (const [target, data] of Object.entries(articlesMap)) {
            const targetOption = new Option(target.replace('_', ' '), target);
            targetSelect.appendChild(targetOption);
            const articleCard = new TargetCard();
            articleCard.target = target;
            cardsBox.appendChild(articleCard);
            articleCard.appendArticles(data);
            articleCard.classList.add('hidden')
        }
        const selectedTarget = document.querySelector('.target-select').value;
        document.querySelector(`.card-${selectedTarget}`).classList.remove('hidden')
        targetSelect.addEventListener('change', function (event) {
            document.querySelector('target-card:not(.hidden)').classList.add('hidden')
            document.querySelector(`.card-${event.target.value}`).classList.remove('hidden')
        })
    });

};