import React, { useState, useEffect } from "react";
import { FaCalendar, FaClock } from "react-icons/fa";
function DigitalClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="text-sm text-blue-400 p-2 ">
      <div className="flex gap-2 items-center">
        <FaCalendar size={14} />
        {currentTime.toDateString()}
      </div>
      <div className="flex gap-2  items-center ">
        <FaClock size={14} />
        {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default DigitalClock;
