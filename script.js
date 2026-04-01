/**
 * Utility function for MusicInfo.js to facilitate creating maps from expressions.md
 * 
 * @param {string} expressions_md text fetched from expressions.md
 * @param {string} label ##ABC above the table to fetch
 * @return {Map<string, string>} abbreviation -> full name
 */
function getSetMap(expressions_md, label) {
    expressions_md = expressions_md.slice(expressions_md.indexOf(label));
    for(let i = 0; i < 4; i++)
        expressions_md = expressions_md.slice(expressions_md.indexOf("\n") + 1);
    // TODO
}