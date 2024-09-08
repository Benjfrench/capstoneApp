import React, { useState, useEffect } from "react";

export const useCustomHook = (passsedInValue) => {
  // our custom hook still uses useState internally
  const [value, setValue] = useState(passsedInValue);

  // custom hook will listen in to changes to this passed in value, and do something
  useEffect(() => {
    if (passsedInValue !== value) {
      setValue(passsedInValue);
    }
  }, [value]);

  // returns anything we want to allow the component to use our hook,
  // in this case we're returning the value, but we could also return a function if we wanted
  // this hook to control a function as well

  return [value];
};
