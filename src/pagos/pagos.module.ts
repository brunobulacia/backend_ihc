import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PagosController],
  providers: [PagosService],
  imports: [PrismaModule],
  exports: [PagosService],
})
export class PagosModule {}
