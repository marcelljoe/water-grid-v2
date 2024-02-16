/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { InitialState } from '@/lib/interfaces/context';
import { useActions } from './action';
import { reducer } from './reducer';

export const INITIAL_STATE: InitialState = {
  openNavbar: {
    show: false
  },
  modal: {
    session: {
      show: false
    },
    delete: {
      show: false
    },
    base: {
      show: false,
      type: 'success',
      message: '',
      direction: ''
    }
  },
  pagination: {
    currentPage: 0,
    limit: 10,
    sort: 'ASC',
    search: '',
    startDate: '',
    endDate: '',
    rowPerPage: 10
  },
  notification: {
    show: false,
    type: 'error',
    position: {
      horizontal: 'center',
      vertical: 'top'
    },
    message: ''
  },
  filter: {
    key: '',
    column: '',
    direction: '',
    status: '',
    startDate: '',
    endDate: '',
    statusLetter: ''
  },
  dialog: {
    show: false,
    image: '',
    content: '',
    title: '',
    type: '',
    onOk: () => {},
    onCancel: () => {},
    onClose: () => {}
  }
};

export const StoreContext = React.createContext({
  state: INITIAL_STATE,
  actions: useActions(value => value)
});

export const StoreContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const actions = useActions(dispatch);

  return <StoreContext.Provider value={{ state, actions }}>{children}</StoreContext.Provider>;
  // react-hooks/rules-of-hooks
};
