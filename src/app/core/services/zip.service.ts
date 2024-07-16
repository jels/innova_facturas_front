import { Injectable } from '@angular/core';
import JSZip from 'jszip';

@Injectable({
  providedIn: 'root',
})
export class ZipService {
  async compressCsvFile(csvBlob: Blob, fileName: string): Promise<Blob> {
    const zip = new JSZip();
    zip.file(fileName, csvBlob);
    const zipContent = await zip.generateAsync({ type: 'blob' });
    return zipContent;
  }
}
