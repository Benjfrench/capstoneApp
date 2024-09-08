// src/containers/ContextWork.jsx
import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';

export const ContextWork = () => {
  const [dob, setDob] = useState('');
  const { setDateOfBirth, age } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDateOfBirth(dob);
  };

  return (
    <div>
      <h2>Age Verification</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your Date of Birth:
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {age !== null && <p>Your age is: {age}</p>}
    </div>
  );
};
