import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  generateCsv(data: any[]): Blob {
    let csvContent = '';
    data.forEach((row) => {
      const rowData = Object.values(row);
      csvContent += rowData.join(';') + '\n';
    });
    return new Blob([csvContent], { type: 'text/csv' });
  }
}
