/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';


interface UserData{
  id: string,
  name: string,
  email: string,
  mobileNo: string,
  address: string
}

@Injectable()
export class PdfService {
  async generatePdfForUser(userData: UserData, pdfPath: string): Promise<Buffer> {
    console.warn('INSIDE PDF SERIVCE')
    const templatePath = 'src/pdf/html-template.html';
    const htmlContent = this.replacePlaceholdersInTemplate(templatePath, userData);
    return this.generatePdfFromHtml(htmlContent, pdfPath);
  }

  private replacePlaceholdersInTemplate(templatePath: string, userData: UserData): string {
    console.warn('INSIDE REPLACE HTML')
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');
    htmlContent = htmlContent.replace('{{name}}', userData.name);
    htmlContent = htmlContent.replace('{{email}}', userData.email);
    htmlContent = htmlContent.replace('{{mobile}}', userData.mobileNo);
    htmlContent = htmlContent.replace('{{address}}', userData.address);
    console.warn('INSIDE CONTT ',htmlContent)
    return htmlContent;
  }

  private async generatePdfFromHtml(htmlContent: string, pdfPath: string): Promise<any> {
    console.warn('INSIDE GEN HTML')
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      timeout: 0, // Set no timeout
    });
    const page = await browser.newPage();
    try{
      await page.setContent(htmlContent, {waitUntil:'networkidle0',timeout: 0});
      await page.pdf({path: pdfPath, format: 'A4', timeout: 0});
      await browser.close();
      console.log('PATHHH ',pdfPath)
      return pdfPath; 
    }
    catch(err){
      await browser.close();
      throw err;
    }
  }

}
