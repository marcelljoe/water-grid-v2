// define menu list
interface MenuList {
  id: number;
  name: string;
  path: string;
  icon: string;
}

// define menu data
export interface MenuData {
  menu: MenuList;
  subMenu: MenuList[];
}

// define hooks menu
export interface HooksMenu {
  data: MenuData[];
  isLoading: boolean;
}
