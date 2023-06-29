import React, { useRef } from "react";
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  styled
} from "@mui/material";

const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    borderRadius: 8,
    boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.15)",
    padding: 8
  }
});

export const ReportOrderRDDialog = (props) => {
  const { onClose, open } = props;

  const formikRef = useRef(null);

  const handleConfirm = () => {
    formikRef.current.submitForm();

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Générer un rapport de commande R&D
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ajouter les produits pour lesquels vous souhaitez générer un rapport
          de commande R&D, ainsi que la quantité associé à chaque produit.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Annuler
        </Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Confirmer
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ReportOrderRDDialog;
