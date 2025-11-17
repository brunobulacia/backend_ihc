import { Module } from '@nestjs/common';
import { CarritosService } from './carritos.service';
import { CarritosController } from './carritos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CarritosController],
  providers: [CarritosService],
  imports: [PrismaModule],
  exports: [CarritosService],
})
export class CarritosModule {}
