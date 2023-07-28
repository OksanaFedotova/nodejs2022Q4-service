import { BadRequestException, NotFoundException } from '@nestjs/common';
import { database } from 'src/main';
import { validate } from 'uuid';

export const checkItem = (id: string, db) => {
  if (!validate(id)) throw new BadRequestException();
  const item = db.filter(({ id: itemId }) => itemId === id)[0];
  if (!item) throw new NotFoundException();
  return item;
};
