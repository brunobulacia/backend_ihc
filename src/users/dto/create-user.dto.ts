import { User } from '@prisma/client';

export type CreateUserDto = Omit<User, 'createdAt' | 'updatedAt' | 'isActive'>;
