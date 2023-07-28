import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate } from 'uuid';
interface IObject {
  [key: string]: string | number;
}
export const checkItem = (id: string, db) => {
  if (!validate(id)) throw new BadRequestException();
  const item = db.filter(({ id: itemId }) => itemId === id)[0];
  if (!item) throw new NotFoundException();
  return item;
};

export const setIdToNull = (id: string, db: IObject[], param: string) => {
  db.forEach((item) =>
    item[param] === id ? (item[param] = null) : item[param],
  );
};
