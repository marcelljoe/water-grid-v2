import { AlertColor } from '@mui/material';
import { IFilter, ILinks, IPagination } from '@/lib/interfaces/common';

export interface Action {
  type: string;
  payload: any;
}

interface ModalShow {
  show: boolean;
}

export interface Navbar extends ModalShow {}

interface ModalBase extends ModalShow {
  type: 'success' | 'error';
  message: string;
  direction?: string;
}

interface NotificationPosition {
  vertical: 'bottom' | 'top';
  horizontal: 'left' | 'center' | 'right';
}

export interface InitialState {
  openNavbar: Navbar;
  modal: Modal;
  pagination: Pagination;
  notification: Notification;
  filter: IFilter;
  dialog: IDialog;
  links: ILinks;
}

export interface Modal {
  session: ModalShow;
  delete: ModalShow;
  base: ModalBase;
}

export interface IDialog {
  show: boolean;
  image: string;
  content: string;
  title: string;
  type: 'warning' | 'success' | 'error' | 'confirmation' | '';
  onOk: () => void | Promise<void>;
  onCancel: () => void | Promise<void>;
  onClose: () => void | Promise<void>;
}

export interface Pagination extends IPagination {}

export interface Notification {
  show: boolean;
  type: AlertColor;
  position: NotificationPosition;
  message: string;
}
