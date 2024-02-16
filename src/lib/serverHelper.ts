// import * as crypto from "crypto";
// import { getLoginSession } from '@/lib/auth';;
import { exeQuery } from './db';
import { compare, hash } from 'bcryptjs';
const saltOrRounds = 10;
import dayjs from 'dayjs';

export const intOrZ = (value: string): number => {
  return value ? parseInt(value) : 0;
};

export const chartType: any = {
  CHART: 1,
  DATA: 2,
  ALL: 3
};

export const chartCondition: any = {
  DAILY: 1,
  WEEKLY: 2,
  MONTHLY: 3,
  HOURLY: 4
};

export async function verifyPwrd(password: string | undefined, hshPassword: string) {
  const isValid = await compare(password ? password : '', hshPassword);
  return isValid;
}

export const sortMenu = async (menu: any) => {
  let a = [];
  let tempHeader = null;
  let tempHeaderIndex = 0;
  let tempLevel = 0;
  let tempData = [];
  let pushCount: any = null;

  for (let index = 0; index < menu.length; index++) {
    const menu_header = menu[index].menu_header;
    const level = parseInt(menu[index].level);
    const sub = menu[index].sub;

    if (tempHeader != menu_header && tempHeader != sub) {
      tempHeader = menu_header;
      tempLevel = level;
      tempData = [];
      tempHeaderIndex = pushCount == null ? 0 : pushCount + 1;

      if (sub == 0) {
        a.push(menu[index]);
        pushCount = pushCount == null ? 0 : pushCount + 1;
      }
    }

    if (tempHeader == sub) {
      tempData.push(menu[index]);
    }

    if ((tempHeader != menu_header && tempHeader != null) || index == menu.length - 1) {
      Object.assign(a[pushCount], { [`subMenu${tempLevel + 1}`]: tempData });
    }
  }

  return a;
};

export const numberFormat = (value: number, mode: number) => {
  return mode === 2
    ? value - 1
    : (value + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
};

// export const weekRange = (date: string) => {
//     let currentDate = dayjs(date)
//     let weekStart = currentDate.startOf("isoWeek").format('DD MMM YYYY');
//     let weekEnd = currentDate.endOf("isoWeek").format('DD MMM YYYY');
//     return weekStart + ' - ' + weekEnd
// };

export const pageCheck = async (username: string, path: string) => {
  // const sessionDec = JSON.parse(await cryptoDecrypt(session.user));
  // const path = page.substring(1)

  const syntax = `SELECT A.id menu_header, A.description menu, A.path, A.level, A.header sub, B.m_insert, B.m_update, B.m_delete, B.m_view, C.id AS role
    FROM menu A,
        access_det B,
        access C,
        user_mobile D
    WHERE A.id = B."menuId"
        AND B."accessId" = C.id
        AND C.id = D."accessId"
        AND D.username = $1 AND A.path = $2 AND B.m_view = 1`;

  const result: any = await exeQuery(syntax, [username, path]);

  if (result.length < 1) {
    return [];
  }

  return result;
};

export const pagination = async (page: number, row: number, totalRow: number) => {
  //MySQL
  // const dataPerPage = row;
  // const totalPage = Math.ceil(totalRow / dataPerPage);
  // const currentPage = page == 0 ? 1 : page;
  // const firstData = dataPerPage * currentPage - dataPerPage;

  // return {
  //     query: `LIMIT ${firstData},${dataPerPage}`,
  //     dataPerPage: dataPerPage,
  //     totalPage: totalPage,
  //     currentPage: currentPage,
  //     totalData: totalRow,
  // };

  // Postgre
  const dataPerPage = row;
  const totalPage = Math.ceil(totalRow / dataPerPage);
  const currentPage = page == 0 ? 1 : page;
  const firstData = dataPerPage * currentPage - dataPerPage;

  return {
    query: `LIMIT ${dataPerPage} OFFSET ${firstData}`,
    dataPerPage: dataPerPage,
    totalPage: totalPage,
    currentPage: currentPage,
    totalData: totalRow
  };
};

export const paginationMongo = async (page: number, row: number, totalRow: number) => {
  const dataPerPage = row;
  const totalPage = Math.ceil(totalRow / dataPerPage);
  const currentPage = page == 0 ? 1 : page;
  const firstData = dataPerPage * currentPage - dataPerPage;

  return {
    limit: dataPerPage,
    skip: firstData,
    dataPerPage: dataPerPage,
    totalPage: totalPage,
    currentPage: currentPage,
    totalData: totalRow
  };
};

export const formatNumber = (number: number) => {
  if (number === undefined || number === null) {
    return null;
  } else {
    //   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let nf = new Intl.NumberFormat('en-US');
    return nf.format(number);
  }
};

export const hashPassword = async (string: string | undefined) => {
  const hashPassword = await hash(string ? string : '', saltOrRounds);
  return hashPassword;
};

export const changePhone = async (hp: string, pulsa?: boolean) => {
  const phone = hp.replace(/\D/g, '');
  if (pulsa && phone.substring(0, 2) == '62') {
    return `0${phone.substring(2)}`;
  }

  if (phone.length < 6 || phone.length >= 15) {
    return '';
  } else {
    if (phone.substring(0, 2) == '62') {
      return phone;
    } else if (phone.substring(0, 2) == '08') {
      return `62${phone.substring(1)}`;
    } else {
      return '';
    }
  }
};

export const getGeneralParameterById = (id: number) => {
  let syntax = `SELECT description, param FROM general_parameter WHERE status = 1 AND id = ?`;
  return exeQuery(syntax, [id]);
};

export const parsingIdentity = async (
  identity: string
): Promise<{
  identity: string;
  idType: number;
  province: string;
  regency: string;
  district: string;
  gender: string;
  birthdate: string;
  age: string;
}> => {
  const clearIdentity = identity.replace(/\D/g, '');
  if (clearIdentity.length != 16) {
    return {
      identity: clearIdentity,
      idType: 0,
      province: '0',
      regency: '0',
      district: '0',
      gender: '',
      birthdate: '0000-00-00',
      age: '0'
    };
  } else {
    const codeAre = clearIdentity.substring(0, 6);
    const codeProvince = clearIdentity.substring(0, 2);
    const codeRegncy = clearIdentity.substring(0, 4);
    const codeDistrict = clearIdentity.substring(0, 6);
    const bornDate =
      parseInt(clearIdentity.substring(6, 8)) > 40
        ? parseInt(clearIdentity.substring(6, 8)) - 40
        : clearIdentity.substring(6, 8);
    const gender =
      clearIdentity == ''
        ? ''
        : parseInt(clearIdentity.substring(6, 8)) > 40
          ? 'F'
          : parseInt(clearIdentity.substring(6, 8)) < 40
            ? 'M'
            : '';
    const yearNow = String(new Date().getFullYear()).substring(2, 4);
    const bornYear = parseInt(clearIdentity.substring(10, 12)) > parseInt(yearNow) ? 19 : 20;
    let birthDate =
      clearIdentity.length < 16 || parseInt(clearIdentity.substring(8, 10)) > 12 || (bornDate as number) > 31
        ? '0000-00-00'
        : bornYear + clearIdentity.substring(10, 12) + '-' + clearIdentity.substring(8, 10) + '-' + bornDate;
    birthDate = dayjs(birthDate).isValid() ? birthDate : '0000-00-00';
    // const ages = dayjs(birthDate, "YYYY").fromNow().replace(" years ago" || " months ago" || " days ago", "");
    const ages = dayjs(birthDate).isValid() ? dayjs().diff(birthDate, 'years', false).toString() : 'Invalid date';
    const age = ages === 'Invalid date' ? '0' : ages.length > 2 ? '0' : birthDate == null ? '0' : ages;
    const area: any = await exeQuery(
      `SELECT province.name province,city.name regency,district.name district FROM province,city,district WHERE province.id = city."provinceId" AND city.id = district."cityId" AND district.code= $1`,
      [codeAre]
    );
    if (area.length < 1 || birthDate == '0000-00-00') {
      return {
        identity: clearIdentity,
        idType: 0,
        province: '0',
        regency: '0',
        district: '0',
        gender: gender,
        birthdate: birthDate,
        age: age
      };
    } else {
      return {
        identity: clearIdentity,
        idType: 1,
        province: codeProvince,
        regency: codeRegncy,
        district: codeDistrict,
        gender: gender,
        birthdate: birthDate,
        age: age
      };
    }
  }
};

export const csvMaker = (data: any) => {
  const items = data;
  const replacer = (key: string, value: any) => (value === null ? '' : value); // specify how you want to handle null values here
  const header = Object.keys(items[0]);
  const csv = [
    header.join(';'), // header row first
    ...items.map((row: any) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'))
  ].join('\r\n');

  return csv;
};

export const titleCase = (str: any) => {
  if (/[A-Z]/.test(str)) {
    let strg = str.replace(/([A-Z])/g, ' $1');
    let splitStr = strg.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  } else {
    let strg = str.replace(/_/g, ' ');
    let splitStr = strg.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }
};

export const loadExcel = (file: string) => {
  // return new Promise((resolve, reject) => {
  //     var wb = XLSX.readFile(file);
  //     const data: any = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
  //     let jsonData: any = []
  //     for (let index = 0; index < data.length; index++) {
  //         let obj: any = {}
  //         for (let index2 = 0; index2 < data[index].length; index2++) {
  //             obj[data[0][index2].replace(/\s/g, '')] = data[index][index2]
  //         }
  //         if (index > 0) {
  //             jsonData.push(obj)
  //         }
  //     }
  //     resolve(jsonData)
  // })
};
