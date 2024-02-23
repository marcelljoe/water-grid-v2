import React from 'react';
import { Action, Modal, Pagination, Notification, Navbar, IDialog } from '@/lib/interfaces/context';
import { IFilter, ILinks } from '@/lib/interfaces/common';

export const actions = {
  CLEAR_STATE: 'CLEAR_STATE',
  UPDATE_MODAL: 'UPDATE_MODAL',
  UPDATE_NAVBAR: 'UPDATE_NAVBAR',
  UPDATE_PAGINATION: 'UPDATE_PAGINATION',
  UPDATE_NOTIFICATION: 'UPDATE_NOTIFICATION',
  UPDATE_FILTER: 'UPDATE_FILTER',
  UPDATE_DIALOG: 'UPDATE_DIALOG',
  UPDATE_LINK_DISPLAY: 'UPDATE_LINK_DISPLAY'
};

export const useActions = (dispatch: React.Dispatch<Action>) => ({
  CLEAR_STATE: () => dispatch({ type: actions.CLEAR_STATE, payload: {} }),
  UPDATE_MODAL: (value: Modal) => dispatch({ type: actions.UPDATE_MODAL, payload: value }),
  UPDATE_NAVBAR: (value: Navbar) => dispatch({ type: actions.UPDATE_NAVBAR, payload: value }),
  UPDATE_PAGINATION: (value: Pagination) => dispatch({ type: actions.UPDATE_PAGINATION, payload: value }),
  UPDATE_NOTIFICATION: (value: Notification) => dispatch({ type: actions.UPDATE_NOTIFICATION, payload: value }),
  UPDATE_FILTER: (value: IFilter) => dispatch({ type: actions.UPDATE_FILTER, payload: value }),
  UPDATE_DIALOG: (value: IDialog) => dispatch({ type: actions.UPDATE_DIALOG, payload: value }),
  UPDATE_LINK_DISPLAY: (value: ILinks) => dispatch({ type: actions.UPDATE_LINK_DISPLAY, payload: value })
});
