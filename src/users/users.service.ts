import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.save(createUserDto);
    return user;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(
      {
        id: id,
      },
      {
        nome: updateUserDto.nome,
        email: updateUserDto.email,
        telefone: updateUserDto.telefone,
        sexo: updateUserDto.sexo,
      },
      /*{
        new: true,
      },*/
    );
  }

  async remove(id: number) {
    await this.usersRepository.delete({ id });
  }
}
