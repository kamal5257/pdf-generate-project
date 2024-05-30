/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Res } from "@nestjs/common";
import { PdfService } from "./pdf.service";
import { Response } from "express";

interface UserData{
    id: string,
    name: string,
    email: string,
    mobileNo: string,
    address: string
}

@Controller('pdf')
export class PdfController {
    constructor(private pdfService: PdfService){}

    @Post('generate')
    async generatePdf(@Body() userData: UserData, @Res() res: Response) {
        try {
            console.warn('INSIDE PDF CONTROLLER')
            const pdfPath = `src/user-details/${userData.id}.pdf`;
          const pdfBuffer = await this.pdfService.generatePdfForUser(userData, pdfPath);
          res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=generated.pdf',
            'Content-Length': pdfBuffer.length,
          });
          res.end(pdfBuffer);
        } catch (error) {
        //   res.status(500).send('Error generating PDF');
          res.status(500).send(error);
        }
      }
    
}