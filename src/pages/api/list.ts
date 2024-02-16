export const sortMenus = async (type: string | number, datas: any) => {
  let sort = 0;
  let tempLevel = 0;
  let tempHeader = null;
  let menu = [];
  let tempMenu: any = {};
  const data = datas;

  for (let index = 0; index < data.length; index++) {
    const level = data[index].level;
    const header = data[index].menu_header;

    tempLevel = parseInt(level);
    tempHeader = header;
    tempMenu = [];

    Object.assign(data[index], { [`key`]: header });

    if (data[index].sub == 0) {
      tempMenu = data[index];
    }

    if (data[index].sub != 0) {
      continue;
    }

    for (let j = 0; j < data.length; j++) {
      let subMenu = [];
      const headDTL = data[j].sub;
      if (header == headDTL && headDTL != 0) {
        if (!tempMenu.children) {
          Object.assign(tempMenu, { [`children`]: [] });
        }

        tempMenu[`children`].push({ ...data[j], key: data[j].sort });
      }

      if (j == data.length - 1) {
        menu.push(tempMenu);
      }
    }
  }

  return { access: menu, rawAccess: data };
};
