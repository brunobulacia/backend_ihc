import { Injectable } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DireccionService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDireccionDto: CreateDireccionDto) {
    return this.prismaService.direccion.create({
      data: createDireccionDto,
    });
  }

  findAll() {
    return this.prismaService.direccion.findMany();
  }

  findOne(id: string) {
    return this.prismaService.direccion.findUnique({
      where: { id },
    });
  }

  update(id: string, updateDireccionDto: UpdateDireccionDto) {
    return this.prismaService.direccion.update({
      where: { id },
      data: updateDireccionDto,
    });
  }
}
