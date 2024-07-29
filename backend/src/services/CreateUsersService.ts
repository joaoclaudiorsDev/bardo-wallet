import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

interface CreateUserRequest {
  username: string;
  password: string;
}

class CreateUserService {
  private prisma = new PrismaClient();

  async execute({ username, password }: CreateUserRequest) {
    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new Error('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return user;
  }
}

export { CreateUserService };
