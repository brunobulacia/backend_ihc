import { Module } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { DireccionController } from './direccion.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DireccionController],
  providers: [DireccionService],
  imports: [PrismaModule],
})
export class DireccionModule {}
