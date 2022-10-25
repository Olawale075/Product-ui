import React from 'react'
import DropTextBox from '../element/DropTextBox';
import '../assets/styles/dropdown.css';

const MessageConfiguration = () => {
  return (
    <div>
      <h2 className="text-center">Message Configuration</h2>{' '}
      <div className="dropdown2">
      <DropTextBox />   
      </div>
    </div>
  );
}

export default MessageConfiguration