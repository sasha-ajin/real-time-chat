import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  private blacklistedTokens = new Set<string>();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signOut(token: string): void {
    this.blacklistedTokens.add(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }

  async signUp(dto: SignUpDto): Promise<{ access_token: string }> {
    const existingByUsername = await this.usersService.findOne(dto.username);
    if (existingByUsername) {
      throw new ConflictException('Username already exists');
    }

    const existingByEmail = await this.usersService.findByEmail(dto.email);
    if (existingByEmail) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });

    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
