import { Module } from '@nestjs/common';
import { ConductoresService } from './conductores.service';
import { ConductoresController } from './conductores.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ConductoresController],
  providers: [ConductoresService, PrismaService],
  exports: [ConductoresService],
})
export class ConductoresModule {}
