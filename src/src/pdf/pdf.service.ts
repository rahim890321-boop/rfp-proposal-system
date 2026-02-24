import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfService {
  async generateProposalPdf(proposalName: string, summary: string, qa: any[]): Promise<string> {
    try {
      const doc = new PDFDocument();
      const fileName = `proposal-${Date.now()}.pdf`;
      const filePath = path.join(__dirname, '..', '..', 'uploads', 'pdfs', fileName);

      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      doc.fontSize(25).text('Project Proposal', { align: 'center' });
      doc.moveDown();
      doc.fontSize(18).text(`Proposal Name: ${proposalName}`);
      doc.moveDown();
      doc.fontSize(14).text('RFP Summary:', { underline: true });
      doc.fontSize(12).text(summary);
      doc.moveDown();
      
      doc.fontSize(14).text('Questions & Answers:', { underline: true });
      qa.forEach((item, index) => {
        doc.fontSize(12).text(`${index + 1}. ${item}`);
      });

      doc.end();
      return `/uploads/pdfs/${fileName}`;
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate PDF');
    }
  }
        }
