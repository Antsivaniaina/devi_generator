import html2pdf from 'html2pdf.js';

export function exportToPdf(element) {
    // Create a clone of the element to modify for PDF
    const pdfContent = element.cloneNode(true);

    // Apply PDF-specific styling
    pdfContent.style.padding = '5px';
    pdfContent.style.backgroundColor = 'white';

    // Remove buttons and file inputs from PDF
    pdfContent.querySelectorAll('input[type="file"], button').forEach((el) => el.remove());

    // Style the table for PDF
    const table = pdfContent.querySelector('table');
    if (table) {
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginBottom = '10px';

        // Style table cells
        table.querySelectorAll('td, th').forEach(cell => {
            cell.style.border = '1px solid #dee2e6';
            cell.style.padding = '12px';
        });

        // Style headers
        table.querySelectorAll('th').forEach(th => {
            th.style.backgroundColor = '#f8f9fa';
            th.style.fontWeight = 'bold';
        });
    }

    // Style notes section
    const notes = pdfContent.querySelector('#notes');
    if (notes) {
        notes.style.marginTop = '20px';
        notes.style.padding = '15px';
        notes.style.border = '1px solid #dee2e6';
        notes.style.borderRadius = '4px';
    }

    const opt = {
        margin: [15, 15],
        filename: 'Fichier.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'landscape',
            compress: true
        }
    };

    return html2pdf().set(opt).from(pdfContent).save();
}