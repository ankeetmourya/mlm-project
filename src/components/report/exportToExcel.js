// src/utils/exportToExcel.js
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data, fileName = 'data.xlsx') => {
  // Convert JSON data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook and add the worksheet to it
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Write the workbook to a binary string
  const workbookBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Create a Blob from the binary string and save it as a file
  const blob = new Blob([workbookBinary], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
};
