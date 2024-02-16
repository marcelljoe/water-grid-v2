// import modules
import React from 'react';

// import material modules
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// import context
import { StoreContext } from '@/context/context';

// define snackbar component
const SnackbarComponent: React.FC<{}> = () => {
  // define context
  const { state, actions } = React.useContext(StoreContext);

  // define handle close
  const handleClose = () => {
    actions.UPDATE_NOTIFICATION({
      ...state.notification,
      show: false
    });
  };
  return (
    <Snackbar
      autoHideDuration={5000}
      anchorOrigin={state.notification.position}
      open={state.notification.show}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} variant="filled" severity={state.notification.type}>
        {state.notification.message}
      </Alert>
    </Snackbar>
  );
};

// export base snackbar component
export default React.memo(SnackbarComponent);
