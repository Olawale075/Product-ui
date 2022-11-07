/** @format */

import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
const DateRange = () => {
    const datePickerRef = useRef(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };
  return (
    <div>
      <div onClick={() => datePickerRef.current.setOpen(true)}>
        <input type="text" value={dayjs(startDate).format('MM/DD/YYYY')} />
        <input
          type="text"
          value={endDate ? dayjs(endDate).format('MM/DD/YYYY') : ''}
        />
      </div>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        ref={datePickerRef}
      />
    </div>
  );
};

export default DateRange;
