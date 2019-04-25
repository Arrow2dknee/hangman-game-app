
// using async-await
async function getPuzzle(wordCount) {
    
    let response = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`, {});
    if (response.status === 200) {
        const data = await response.json();
        return data.puzzle;
    } else {
        throw new Error(response.statusText);
    }
}

export { getPuzzle as default };