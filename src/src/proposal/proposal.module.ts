import { Module } from '@nestjs/common';
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';
import { GeminiModule } from '../gemini/gemini.module';
import { PdfModule } from '../pdf/pdf.module';

@Module({
  imports: [GeminiModule, PdfModule],
  controllers: [ProposalController],
  providers: [ProposalService],
})
export class ProposalModule {}
