import { Controller, Post, Body, Param, Get, NotFoundException, BadRequestException, RequestTimeoutException, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GeminiService } from '../gemini/gemini.service';
import { PdfService } from '../pdf/pdf.service';

@Controller('proposals')
export class ProposalController {
  private proposals = [];

  constructor(
    private readonly geminiService: GeminiService,
    private readonly pdfService: PdfService
  ) {}

  @Post()
  create(@Body() body: { name: string }) {
    const newProposal = {
      id: Math.random().toString(36).substring(7),
      name: body.name,
      status: 'DRAFT',
      documents: [],
      createdAt: new Date(),
    };
    this.proposals.push(newProposal);
    return newProposal;
  }

  @Post(':id/documents')
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadDocuments(@Param('id') id: string, @UploadedFiles() files: Array<Express.Multer.File>) {
    const proposal = this.proposals.find(p => p.id === id);
    if (!proposal) throw new NotFoundException('Proposal not found');
    if (files.length > 10) throw new BadRequestException('Max 10 files');
    files.forEach(file => proposal.documents.push({ filename: file.originalname }));
    return proposal.documents;
  }

  @Post(':id/assess')
  async assess(@Param('id') id: string, @Body() body: { summary: string }) {
    const proposal = this.proposals.find(p => p.id === id);
    if (!proposal) throw new NotFoundException('Proposal not found');
    
    proposal.timerStartedAt = new Date();
    proposal.status = 'ASSESSED';
    proposal.summary = body.summary;

    return {
      questions: ["Budget?", "Timeline?", "Deliverables?"],
      timerStartedAt: proposal.timerStartedAt
    };
  }

  @Post(':id/answer')
  async answer(@Param('id') id: string, @Body() body: { answers: string[] }) {
    const proposal = this.proposals.find(p => p.id === id);
    if (!proposal) throw new NotFoundException('Proposal not found');

    const now = new Date();
    const diff = (now.getTime() - new Date(proposal.timerStartedAt).getTime()) / 1000 / 60;
    
    if (diff > 15) throw new RequestTimeoutException('15 minutes expired');

    const pdfUrl = await this.pdfService.generateProposalPdf(proposal.name, proposal.summary, body.answers);
    return { pdfUrl };
  }
      }
