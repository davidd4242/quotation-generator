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
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.autoTable({
        html: '#quoteTable',
        startY: 60,
        headStyles: { fillColor: [242, 242, 242] },
        theme: 'grid',
        styles: { cellPadding: 5 },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 'auto' },
        },
    });
    doc.save('报价单.pdf');
});
