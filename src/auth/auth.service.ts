import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    hashData(data: string) {
        return bcrypt.hash(data, 10);
    }

    async login(dto: AuthDto) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    email: dto.email
                }
            });

            if (await bcrypt.compare(dto.password, user.password)) {
                return this.authToken(user.id, user.email);
            }

            throw new ForbiddenException('Incorect credentials');
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
                throw new ForbiddenException('Incorect credentials');
            }
            throw err;
        }
    }

    async register(dto: AuthDto) {
        const hash = await this.hashData(dto.password);

        try {
            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash
                }
            });

            return this.authToken(newUser.id, newUser.email);
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
                throw new ForbiddenException('Email in use');
            }
            throw err;
        }
    }

    async authToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        };

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '10m',
                secret: this.config.get('JWT_SECRET')
            }
        );

        return { access_token: token };
    }
}
