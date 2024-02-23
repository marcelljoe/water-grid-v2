import { INITIAL_STATE } from './context';
import { actions } from './action';
import { Action, InitialState } from '@/lib/interfaces/context';

const actionTypes = (state: InitialState, { type, payload }: Action) => {
  switch (type) {
    case actions.CLEAR_STATE:
      return INITIAL_STATE;

    case actions.UPDATE_MODAL:
      return {
        ...state,
        modal: {
          session: {
            show: payload.session.show
          },
          delete: {
            show: payload.delete.show
          },
          base: {
            show: payload.base.show,
            type: payload.base.type,
            message: payload.base.message,
            direction: payload.base.direction
          }
        }
      };

    case actions.UPDATE_NAVBAR:
      return {
        ...state,
        openNavbar: {
          show: payload.show
        }
      };

    case actions.UPDATE_PAGINATION:
      return {
        ...state,
        pagination: {
          currentPage: payload.currentPage,
          limit: payload.limit,
          sort: payload.sort,
          search: payload.search,
          startDate: payload.startDate,
          endDate: payload.endDate,
          rowPerPage: payload.rowPerPage
        }
      };

    case actions.UPDATE_NOTIFICATION:
      return {
        ...state,
        notification: {
          show: payload.show,
          type: payload.type,
          position: {
            horizontal: payload.position.horizontal,
            vertical: payload.position.vertical
          },
          message: payload.message
        }
      };
    case actions.UPDATE_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          key: payload.key,
          column: payload.column,
          direction: payload.direction,
          status: payload.status,
          startDate: payload.startDate,
          endDate: payload.endDate,
          statusLetter: payload.statusLetter
        }
      };
    case actions.UPDATE_DIALOG:
      return {
        ...state,
        dialog: {
          ...state.dialog,
          show: payload.show,
          image: payload.image,
          content: payload.content,
          title: payload.title,
          type: payload.type,
          onOk: payload.onOk,
          onCancel: payload.onCancel,
          onClose: payload.onClose
        }
      };
    case actions.UPDATE_LINK_DISPLAY:
      return {
        ...state,
        links: {
          ...state.links,
          data: payload.data,
          key: payload.key,
          preset: payload.preset
        }
      };

    default:
      return state;
  }
};

export const reducer = (state: InitialState, { type, payload }: Action) => {
  const result = actionTypes(state, { type, payload });

  return result;
};
