const quoteForm = document.getElementById('quoteForm');
const quoteTable = document.getElementById('quoteTable');
const generateExcel = document.getElementById('generateExcel');
const generatePdf = document.getElementById('generatePdf');

quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;

    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const priceCell = document.createElement('td');

    nameCell.textContent = itemName;
    priceCell.textContent = itemPrice;

    row.appendChild(nameCell);
    row.appendChild(priceCell);
    quoteTable.tBodies[0].appendChild(row);

    quoteForm.reset();
});

generateExcel.addEventListener('click', () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(quoteTable);
    XLSX.utils.book_append_sheet(wb, ws, '报价单');
    XLSX.writeFile(wb, '报价单.xlsx');
});

generatePdf.addEventListener('click', () => {
    const quoteTableClone = quoteTable.cloneNode(true);
    const tempTable = document.createElement('table');
    tempTable.appendChild(quoteTableClone.querySelector('thead').cloneNode(true));
    tempTable.appendChild(quoteTableClone.querySelector('tbody').cloneNode(true));
    tempTable.setAttribute('style', 'border-collapse: collapse; width: 100%;');
    
    Array.from(tempTable.querySelectorAll('th, td')).forEach(cell => {
        cell.setAttribute('style', 'border: 1px solid #dee2e6; padding: 15px;');
    });

    const container = document.createElement('div');
    container.appendChild(tempTable);
    container.style.display = 'none';
    document.body.appendChild(container);

    const opt = {
        margin: [15, 5],
        filename: '报价单.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(container).save();

    setTimeout(() => {
        document.body.removeChild(container);
    }, 500);
});
