import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
onClose() {
throw new Error('Method not implemented.');
}

  pdfSrc: string | ArrayBuffer | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
pdfSrc: string|Uint8Array|undefined; user: any 
},
    private pdfService: UserService
  ) {
    this.loadPdf();
  }

  loadPdf(): void {
    this.pdfService.generatePdf(this.data.user).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.pdfSrc = reader.result as string;
        };
        reader.readAsDataURL(data);
      },
      (error) => {
        console.error('Error generating PDF:', error);
      }
    );
  }

  ngOnInit(): void {
      
  }
  

}
