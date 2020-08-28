const getFacetSum = (moduleClass, facetPosition, posInContainer = 0) => {
    const facetDropArea = document.querySelector(`.${moduleClass} .facet-drop-area`);
    const container = facetDropArea.children[facetPosition];

    const facet = container.querySelectorAll('.facet')[posInContainer]
        .querySelectorAll('.tree-leaf .focus-count');
    return Array.from(facet)
        .reduce((sum, countSpan) => sum + Number(countSpan.innerText), 0);
};

export default getFacetSum;
