export function calculateRowTotal(row) {
    const cells = row.cells;
    if (cells.length >= 6) {
        // Calculate Metallic total
        const qtyCell = cells[0].textContent;
        const metallicPrice = cells[2].textContent;
        if (!isNaN(qtyCell) && !isNaN(metallicPrice)) {
            cells[3].textContent = (parseFloat(qtyCell) * parseFloat(metallicPrice)).toString();
        }

        // Calculate Aluminum total
        const aluminumPrice = cells[4].textContent;
        if (!isNaN(qtyCell) && !isNaN(aluminumPrice)) {
            cells[5].textContent = (parseFloat(qtyCell) * parseFloat(aluminumPrice)).toString();
        }
    }
}