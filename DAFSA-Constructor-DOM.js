const constructDafsaBtn = document.getElementById('construct-dafsa');
const exampleBtn = document.getElementById('exampleBtn')
const dafsaResult = document.getElementById('dafsa-result');
const userInput = document.getElementById('dafsa-language');

constructDafsaBtn.addEventListener('click', () => {
    const language = userInput.value;
    let trie = constructDafsa(language);
    d3.select("#dafsa-result").graphviz().renderDot(toDotString(trie));
});

exampleBtn.addEventListener('click', () => {
    const language = "aa, aab, aaab, aba, abab, ba, baab, bab, bba, bbab";
    userInput.value = language;
    let trie = constructDafsa(language);
    d3.select("#dafsa-result").graphviz().renderDot(toDotString(trie));
});