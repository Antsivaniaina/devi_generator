import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';
import Swal from 'sweetalert2';
import { exportToPdf } from './src/utils/pdfExport.js';
import { setupImageUpload } from './src/utils/imageHandler.js';
import { calculateRowTotal } from './src/utils/calculations.js';
import { addColumn, deleteColumn, toggleNotes } from './src/utils/tableManager.js';
import { setupAnimations, addRowAnimation, deleteRowAnimation } from './src/utils/animations.js';
import './src/styles/main.scss';

document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('quoteTable');
    setupAnimations();

    // Add column management buttons
    document.getElementById('addColumn').addEventListener('click', () => {
        addColumn(table);
    });

    document.getElementById('deleteColumn').addEventListener('click', () => {
        deleteColumn(table);
    });

    // Toggle notes section
    document.getElementById('toggleNotes').addEventListener('click', toggleNotes);

    // Add new row with animation
    document.getElementById('addRow').addEventListener('click', () => {
        const newRow = document.createElement('tr');
        const columnCount = table.querySelector('thead tr').children.length;
        
        let cells = '';
        for (let i = 0; i < columnCount - 1; i++) {
            cells += '<td contenteditable="true"></td>';
        }
        
        newRow.innerHTML = `
            ${cells}
            <td>
                <input type="file" class="image-upload" accept="image/*" style="display: none;">
                <img src="" class="cell-image" style="display: none;">
                <button class="btn btn-sm btn-secondary upload-btn">+</button>
            </td>
        `;
        
        table.querySelector('tbody').appendChild(newRow);
        setupImageUpload(newRow);
        addRowAnimation(newRow);
    });

    // Delete row with animation
    document.getElementById('deleteRow').addEventListener('click', async () => {
        const tbody = table.querySelector('tbody');
        if (tbody.children.length > 1) {
            const lastRow = tbody.lastElementChild;
            await deleteRowAnimation(lastRow);
            tbody.removeChild(lastRow);
        }
    });

    // Export to PDF with confirmation
    document.getElementById('exportPdf').addEventListener('click', async () => {
        const result = await Swal.fire({
            title: 'Exporter en PDF',
            text: 'Voulez-vous inclure les notes dans le PDF ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
        });

        const element = document.querySelector('.card');
        if (!result.isConfirmed) {
            element.querySelector('.notes-section')?.classList.add('d-none');
        }
        
        await exportToPdf(element);
        
        if (!result.isConfirmed) {
            element.querySelector('.notes-section')?.classList.remove('d-none');
        }
    });

    // Setup existing rows
    document.querySelectorAll('tr').forEach(setupImageUpload);

    // Calculate totals
    table.addEventListener('input', (e) => {
        if (e.target.tagName === 'TD') {
            calculateRowTotal(e.target.parentElement);
        }
    });
});