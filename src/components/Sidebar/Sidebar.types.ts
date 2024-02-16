import { Menu } from '@/lib/services/session';

// define sidebar submenu type
type SubMenu = {
  id: number;
  name: string;
  path: string;
};

// define props list interface
export interface PropsList {
  menu: Menu;
  currRoute: string;
  count: number;
  countExternal: number;
  countDisposition: number;
  countInternalInbox?: number | undefined;
  countInternalOutgoing?: number | undefined;
  countExternalInbox?: number | undefined;
  countExternalOutgoing?: number | undefined;
}
