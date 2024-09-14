import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { WorkoutForm } from "./createWorkout";

export const FormModal = ()=> {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Activity
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <WorkoutForm/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
