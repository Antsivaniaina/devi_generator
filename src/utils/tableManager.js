export function addColumn(table) {
    const headerRow = table.querySelector('thead tr');
    const rows = table.querySelectorAll('tbody tr');
    const columnCount = headerRow.children.length;

    // Add header
    const newHeader = document.createElement('th');
    newHeader.contentEditable = true;
    newHeader.textContent = `Colonne ${columnCount}`;
    newHeader.classList.add('animate__animated', 'animate__fadeInRight');
    headerRow.insertBefore(newHeader, headerRow.lastElementChild);

    // Add cells to each row
    rows.forEach(row => {
        const newCell = document.createElement('td');
        newCell.contentEditable = true;
        newCell.classList.add('animate__animated', 'animate__fadeInRight');
        row.insertBefore(newCell, row.lastElementChild);
    });
}

export function deleteColumn(table) {
    const headerRow = table.querySelector('thead tr');
    const rows = table.querySelectorAll('tbody tr');
    const columnCount = headerRow.children.length;

    if (columnCount > 2) { // Keep at least one column plus image column
        const columnToDelete = columnCount - 2; // -2 to avoid deleting image column
        headerRow.children[columnToDelete].remove();
        rows.forEach(row => row.children[columnToDelete].remove());
    }
}

export function toggleNotes() {
    const notesSection = document.querySelector('.notes-section');
    notesSection.classList.toggle('d-none');
}