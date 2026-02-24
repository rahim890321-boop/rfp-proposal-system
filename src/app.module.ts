import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProposalModule } from './proposal/proposal.module';
import { GeminiModule } from './gemini/gemini.module';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProposalModule,
    GeminiModule,
    PdfModule,
  ],
})
export class AppModule {}
