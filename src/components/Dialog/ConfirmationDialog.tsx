import { useContext } from 'react';
import { Dialog, DialogTitle, IconButton, Stack, Button } from '@mui/material';
import { StoreContext } from '@/context/context';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const ConfirmationDialog = () => {
  const { state, actions } = useContext(StoreContext);

  const handleClose = () => {
    actions.UPDATE_DIALOG({
      ...state.dialog,
      show: false
    });
    state.dialog?.onClose();
  };

  const onCancel = () => {
    handleClose();
    state.dialog.onCancel();
  };

  const onOk = () => {
    state.dialog.onOk();
    handleClose();
  };

  return (
    <>
      <Dialog
        open={state.dialog.show}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}
        PaperProps={{ sx: { maxWidth: 360, borderRadius: '20px', padding: '2.5px', background: '#FFF' } }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: '#000',
            position: 'absolute',
            top: 10,
            right: 10
          }}
        >
          <CloseIcon sx={{ width: '1.5rem', height: '1.5rem', padding: 0 }} />
        </IconButton>
        <Stack direction="column" sx={{ padding: '0 25px' }} justifyContent="center" alignItems="center">
          <img src={state.dialog.image} alt="image dialog" width={200} style={{ margin: '40px 0 10px' }} />
          <DialogTitle sx={{ textAlign: 'center', padding: '0', fontSize: '20px', color: '#536580' }}>
            {state.dialog.title}
          </DialogTitle>
          <p style={{ fontSize: '12px', color: '#536580', textAlign: 'center' }}>{state.dialog.content}</p>
        </Stack>
        {state.dialog.type == 'confirmation' ? (
          <Stack style={{ padding: '15px', marginTop: '10px', width: '100%' }} direction="column" spacing={1}>
            <Button className="btn-primary" fullWidth variant="contained" onClick={onOk}>
              Ya
            </Button>
            <Button className="btn-secondary" fullWidth variant="contained" onClick={onCancel}>
              Tidak
            </Button>
          </Stack>
        ) : (
          <Stack style={{ padding: '15px', marginTop: '10px', width: '100%' }} direction="column" spacing={1}>
            <Button className="btn-primary" fullWidth variant="contained" onClick={handleClose}>
              Tutup
            </Button>
          </Stack>
        )}
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
