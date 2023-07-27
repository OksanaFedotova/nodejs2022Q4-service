import { BadRequestException, NotFoundException } from '@nestjs/common';
import { database } from 'src/main';
import { validate } from 'uuid';

export const checkUser = (id: string) => {
  if (!validate(id)) throw new BadRequestException();
  const user = database.users.filter(({ id: userId }) => userId === id)[0];
  if (!user) throw new NotFoundException();
  return user;
};
