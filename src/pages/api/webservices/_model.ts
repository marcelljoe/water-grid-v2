import { exeQuery } from '../../../lib/db';
import { IInsert } from '../../../lib/interfaces/common/common.interface';

export const getLinks = (deptId: number) => {
  const syntax = `SELECT E.id, E.name, E.description, E.url, E.img_url
    FROM "access" C
    JOIN access_det D ON C.id = D."accessId"
    JOIN web_services E ON D."menuId" = E.id
     WHERE C.id = $1
     ORDER BY E.id`;

  return exeQuery(syntax, [deptId]);
};

export const startTransaction = () => {
  return exeQuery('START TRANSACTION', []);
};

export const commitTransaction = () => {
  return exeQuery('COMMIT', []);
};

export const rollback = () => {
  return exeQuery('ROLLBACK', []);
};
