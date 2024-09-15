import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { WorkoutForm } from "./createWorkout";
import "../App.css";

export const FormModal = ()=> {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Activity
        </Button>
        <Dialog 
        open={open} 
        onClose={handleClose}
        sx={{ 
          '& .MuiDialog-paper': {
            width: "80%",
            height: "80%",
            padding: '20px', // Adjust padding of the modal content
            borderRadius: '10px', // Adjust border radius
            backgroundColor: '#f0f0f0', // Adjust background color
          }
        }}
        >
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
