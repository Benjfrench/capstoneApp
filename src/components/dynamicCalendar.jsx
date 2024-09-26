// import * as React from 'react';
// import dayjs from 'dayjs';
// import Badge from '@mui/material/Badge';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { PickersDay } from '@mui/x-date-pickers/PickersDay';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
// import { Modal, Box, Typography } from '@mui/material';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
// };

// function fetchWorkouts(startDate, endDate) {
//   return fetch(`/api/workouts/byDate?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}`)
//     .then(response => response.json())
//     .then(data => {
//         return data.map(workout => dayjs(workout.completionDate).date());
//       });
// }

// const initialValue = dayjs();

// function ServerDay(props) {
//   const { highlightedDays = [], day, outsideCurrentMonth, onClick, ...other } = props;

//   const isSelected =
//     !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

//   return (
//     <Badge
//       key={props.day.toString()}
//       overlap="circular"
//       badgeContent={isSelected ? '🏋️' : undefined} // Updated badge to indicate a workout
//     >
//       <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} onClick={onClick} />
//     </Badge>
//   );
// }

// export const DynamicCalendar = () => {
//   const requestAbortController = React.useRef(null);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [highlightedDays, setHighlightedDays] = React.useState([]);
//   const [open, setOpen] = React.useState(false);
//   const [workoutDetails, setWorkoutDetails] = React.useState(null);

//   const fetchHighlightedDays = (date) => {
//     const controller = new AbortController();
    
//     const startDate = date.startOf('month');
//     const endDate = date.endOf('month');
    
//     fetchWorkouts(startDate, endDate)
//       .then((daysToHighlight) => {
//         setHighlightedDays(daysToHighlight);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         if (error.name !== 'AbortError') {
//           throw error;
//         }
//       });
  
//     requestAbortController.current = controller;
//   };  

//   React.useEffect(() => {
//     fetchHighlightedDays(initialValue);
//     return () => requestAbortController.current?.abort();
//   }, []);

//   const handleMonthChange = (date) => {
//     if (requestAbortController.current) {
//       requestAbortController.current.abort();
//     }

//     setIsLoading(true);
//     setHighlightedDays([]);
//     fetchHighlightedDays(date);
//   };

//   const handleDayClick = (day) => {
//     fetch(`/api/workouts/byDate?date=${day.format('YYYY-MM-DD')}`)
//       .then(response => response.json())
//       .then(data => {
//         if (data.length > 0) {
//           setWorkoutDetails(data[0]); // Assuming only one workout per day, or modify as needed
//           setOpen(true);
//         } else {
//           setWorkoutDetails(null); // No workouts for this day
//         }
//       });
//   };  

//   const handleClose = () => {
//     setOpen(false);
//     setWorkoutDetails(null);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateCalendar
//         defaultValue={initialValue}
//         loading={isLoading}
//         onMonthChange={handleMonthChange}
//         renderLoading={() => <DayCalendarSkeleton />}
//         slots={{
//           day: (props) => <ServerDay {...props} onClick={() => handleDayClick(props.day)} />,
//         }}
//         slotProps={{
//           day: {
//             highlightedDays,
//           },
//         }}
//       />
      
//       <Modal open={open} onClose={handleClose}>
//         <Box sx={style}>
//           <Typography variant="h6" component="h2">
//             Workout Details
//           </Typography>
//           {workoutDetails ? (
//             <Typography sx={{ mt: 2 }}>
//               {JSON.stringify(workoutDetails)} {/* Replace this with your details display */}
//             </Typography>
//           ) : (
//             <Typography>No workout details available.</Typography>
//           )}
//         </Box>
//       </Modal>
//     </LocalizationProvider>
//   );
// }
