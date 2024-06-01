/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { PdfService } from "./pdf.service";
import { Response } from "express";
import * as  path from "path";
import * as fs from 'fs';

interface UserData{
    _id: string,
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
            const pdfPath = `src/user-details/${userData.name}.pdf`;
            const pdfBuffer = await this.pdfService.generatePdfForUser(userData, pdfPath);
            res.set({
              'Content-Type': 'application/pdf',
              'Content-Disposition': `attachment; filename=${userData.name}.pdf`,
              'Content-Length': pdfBuffer.length,
            });
            res.end(pdfBuffer); 
        } catch (error) {
        //   res.status(500).send('Error generating PDF');
          res.status(500).send(error);
        }
      }

      @Get('download/:filename')
      downloadPdf(@Param('filename') filename: string, @Res() res: Response) {
        const rootDir = path.resolve(__dirname,'..','..');
        const pdfDirectory = '/src/user-details/'; 
        const filePath = `${rootDir}${pdfDirectory}${filename}`;
        if (fs.existsSync(filePath)) {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
          console.log("FILEE PATHH ",filePath)
          res.sendFile(filePath);
        } else {
        res.status(404).send('File not found');
      }
  }
    
}