import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import Badge from "@mui/material/Badge";
import dayjs from "dayjs";

export const CustomMonthLayout = ({ onDayClick }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [activities, setActivities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const requestAbortController = useRef(null);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    onDayClick(newDate, activities[newDate.format("YYYY-MM-DD")] || null);
  };

  const handleAddActivity = () => {
    if (!selectedDate) return;

    const activityText = `Activity for ${selectedDate.format("YYYY-MM-DD")}`;
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    setActivities({
      ...activities,
      [formattedDate]: activityText,
    });
  };

  // Function to check if a day should be highlighted
  const shouldHighlightDay = (day) => {
    const formattedDay = day.format("YYYY-MM-DD");
    return activities[formattedDay] !== undefined;
  };

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    requestAbortController.current = controller;

    // Simulate fetching data with a delay
    setIsLoading(true);
    setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const randomDaysToHighlight = [1, 2, 3].map(() =>
        Math.round(Math.random() * daysInMonth)
      );

      // Update the activities object with random activities for demo purposes
      const newActivities = { ...activities };
      randomDaysToHighlight.forEach((day) => {
        const formattedDay = date.date(day).format("YYYY-MM-DD");
        newActivities[formattedDay] = `Random activity for ${formattedDay}`;
      });
      setActivities(newActivities);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    // Fetch highlighted days when the component mounts
    fetchHighlightedDays(dayjs());

    return () => {
      // Abort any in-progress requests on unmount
      requestAbortController.current?.abort();
    };
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setActivities({}); // Clear activities before refetching
    fetchHighlightedDays(date);
  };

  return (
    <div>Calendar</div>
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <div>
    //     <DateCalendar
    //       value={selectedDate}
    //       onChange={handleDateChange}
    //       showDaysOutsideCurrentMonth
    //       fixedWeekNumber={6}
    //       onMonthChange={handleMonthChange}
    //       loading={isLoading}
    //       renderLoading={() => <div>Loading...</div>}
    //       renderDay={(day, _value, DayComponentProps) => {
    //         const formattedDay = day.format("YYYY-MM-DD");
    //         const isSelected = shouldHighlightDay(day);
    //         return (
    //           <Badge
    //             key={day.toString()}
    //             overlap="circular"
    //             badgeContent={isSelected ? "🌟" : undefined} // Highlight with a star badge
    //           >
    //             <PickersDay {...DayComponentProps} day={day} />
    //           </Badge>
    //         );
    //       }}
    //     />

    //     {/* Button to add an activity for the selected date */}
    //     <button onClick={handleAddActivity} disabled={!selectedDate}>
    //       Add Activity
    //     </button>
    //   </div>
    // </LocalizationProvider>
  );
};
