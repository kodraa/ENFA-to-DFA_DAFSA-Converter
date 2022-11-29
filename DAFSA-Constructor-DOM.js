const constructDafsaBtn = document.getElementById('construct-dafsa');
const dafsaResult = document.getElementById('dafsa-result');
const userInput = document.getElementById('dafsa-language');

constructDafsaBtn.addEventListener('click', () => {
    const language = userInput.value;
    constructDafsa(language);
});