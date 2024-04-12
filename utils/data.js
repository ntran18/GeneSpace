function isInteger(value) {
    return /^\d+$/.test(value);
}

export const preprocessingData = (data) => {
    if (checkingDuplicate(data)) {
        data = cleanDuplicateTranscriptionFactors(data);
    }

    const sourceGenes = data[0].slice(1).map((gene) => gene.trim());
    const nodes = sourceGenes.slice();
    const edges = [];

    data.forEach((row, i) => {
        if (!(row[0] === undefined && isInteger(row[0]))) {
            const targetGene = row[0].trim();

            for (let j = 1; j < row.length; j++) {
                const sourceGene = sourceGenes[j - 1];
                const weight = parseInt(row[j]);

                if (weight === 1) {
                    edges.push([sourceGene, targetGene]);
                    if (!nodes.includes(targetGene)) {
                        nodes.push(targetGene);
                    }
                }
            }
        }
    });
    return convertNodesAndEdgesToObject(nodes, edges);
};

export const convertNodesAndEdgesToObject = (nodesData, edgesData) => {
    const nodes = nodesData.map((label, index) => ({
        id: index,
        label,
    }));

    console.log("Nodes", nodes);

    const edges = edgesData.map(([fromLabel, toLabel]) => ({
        from: nodes.findIndex((node) => node.label === fromLabel),
        to: nodes.findIndex((node) => node.label === toLabel),
    }));

    console.log("Edges", edges);
    return { nodes, edges };
};

function checkingDuplicate(data) {
    const uniqueGenes = new Set();

    for (let i = 1; i < data.length; i++) {
        if (data[i][0] === undefined || isInteger(data[i][0])) {
            continue;
        }
        const gene = data[i][0].trim();
        if (uniqueGenes.has(gene)) {
            return true;
        }
        uniqueGenes.add(gene);
    }
    return false;
}

function cleanDuplicateTranscriptionFactors(data) {
    const uniqueGenes = {};

    for (let i = 1; i < data.length; i++) {
        if (data[i][0] === undefined || isInteger(data[i][0])) {
            continue;
        }
        const gene = data[i][0].trim();

        if (!uniqueGenes[gene]) {
            uniqueGenes[gene] = data[i].slice(1);
        } else {
            for (let j = 1; j < data[0].length; j++) {
                uniqueGenes[gene][j - 1] = Math.max(
                    uniqueGenes[gene][j - 1],
                    data[i][j]
                );
            }
        }
    }

    const combinedTable = [
        data[0],
        ...Object.entries(uniqueGenes).map(([gene, values]) => [
            gene,
            ...values,
        ]),
    ];
    return combinedTable;
}
