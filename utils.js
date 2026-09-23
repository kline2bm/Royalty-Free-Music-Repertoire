/**
 * TODO
 * @param {string} url 
 * @param {(_: string) => any} then 
 * @param {(_: Error) => any} onError 
 */
function fetchText(url, then, onError = console.error) {
    fetch(url)
    .then(resp => resp.text())
    .then(text => then(text))
    .catch(onError)
}

/**
 * TODO
 * @param {string} url 
 * @param {(_: string[]) => any} then 
 * @param {(_: Error) => any} onError 
 */
function fetchLines(url, then, onError = console.error) {
    fetchText(url, text => then(text.split("\n")), onError);
}

/**
 * Utility function for MusicInfo.js to facilitate creating maps from expressions.md
 * 
 * @param {string} expressions_md text fetched from expressions.md
 * @param {string} label ## ABC above the table to fetch
 * @return {Map<string, string>} abbreviation -> full name
 */
function getSetMap(expressions_md, label) {
    expressions_md = expressions_md.slice(expressions_md.indexOf(label));
    for(let i = 0; i < 4; i++)
        expressions_md = expressions_md.slice(expressions_md.indexOf("\n") + 1);
    expressions_md = expressions_md.slice(0, expressions_md.indexOf("\n\n"));
    var map = new Map();
    for(line of expressions_md.split("\n")) {
        var split = line.split("|");
        map.set(split[1], split[2]/*.replaceAll("\\", "")*/);
    }
    return map;
}