export function setupAnimations() {
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            e.target.classList.add('animate__animated', 'animate__pulse');
        });
        btn.addEventListener('mouseleave', (e) => {
            e.target.classList.remove('animate__animated', 'animate__pulse');
        });
    });

    // Add cell highlight animation
    document.querySelectorAll('[contenteditable="true"]').forEach(cell => {
        cell.addEventListener('focus', (e) => {
            e.target.classList.add('cell-focus');
        });
        cell.addEventListener('blur', (e) => {
            e.target.classList.remove('cell-focus');
        });
    });
}

export function addRowAnimation(row) {
    row.classList.add('animate__animated', 'animate__fadeInDown');
    row.addEventListener('animationend', () => {
        row.classList.remove('animate__animated', 'animate__fadeInDown');
    });
}

export function deleteRowAnimation(row) {
    row.classList.add('animate__animated', 'animate__fadeOutUp');
    return new Promise(resolve => {
        row.addEventListener('animationend', () => resolve(), { once: true });
    });
}