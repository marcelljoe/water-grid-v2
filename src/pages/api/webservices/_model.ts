import { exeQuery } from '../../../lib/db';

export const getLinks = (deptId: number) => {
  if (deptId == 1 || deptId == 3) {
    const syntax = `SELECT E.id, E.name, E.description, E.url, E.img_url, C.id AS "divId"
    FROM "access" C
    JOIN access_det D ON C.id = D."accessId"
    JOIN web_services E ON D."menuId" = E.id
     ORDER BY E.id`;

    return exeQuery(syntax, []);
  } else {
    const syntax = `SELECT E.id, E.name, E.description, E.url, E.img_url, C.id AS "divId"
    FROM "access" C
    JOIN access_det D ON C.id = D."accessId"
    JOIN web_services E ON D."menuId" = E.id
     WHERE C.id = $1
     ORDER BY E.id`;

    return exeQuery(syntax, [deptId]);
  }
};

export const getDvsns = () => {
  const syntax = `SELECT id, description AS name FROM access WHERE status = 1 ORDER BY id ASC`;
  return exeQuery(syntax, []);
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
