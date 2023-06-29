import Button from "@mui/material/Button";
import { useState } from "react";
import ReportOrderRDDialog from "./components/ReportOrderRDDialog";

const App = () => {
  const [openOrderReportRDDialog, setOpenOrderReportRDDialog] = useState<
    boolean
  >(false);

  const toggleOrderReportRDDialog = () =>
    setOpenOrderReportRDDialog(!openOrderReportRDDialog);

  return (
    <div>
      <Button variant="outlined" onClick={toggleOrderReportRDDialog}>
        Générer un rapport de commande R&D
      </Button>
      <ReportOrderRDDialog
        open
        // open={openOrderReportRDDialog}
        onClose={toggleOrderReportRDDialog}
      />
    </div>
  );
};

export default App;
