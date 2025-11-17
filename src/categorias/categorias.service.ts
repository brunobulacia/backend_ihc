import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriasService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    return this.prismaService.categoria.create({
      data: createCategoriaDto,
    });
  }

  findAll() {
    return this.prismaService.categoria.findMany({
      where: { isActive: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.categoria.findUnique({
      where: { id, isActive: true },
    });
  }

  update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    return this.prismaService.categoria.update({
      where: { id, isActive: true },
      data: updateCategoriaDto,
    });
  }

  remove(id: string) {
    return this.prismaService.categoria.update({
      where: { id, isActive: true },
      data: { isActive: false },
    });
  }
}
