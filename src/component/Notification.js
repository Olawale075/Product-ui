/** @format */
import Button from 'react-bootstrap/Button';
import TableComponents from '../element/TableComponents';
import Dropdowns from '../element/Dropdown';
import '../assets/styles/dropdown.css';
import '../assets/styles/button.css';

export const Notification = () => {
 
  return (
    <>
      <div className="container">
        <h2 className="text-center">Notification Reports</h2>
        <br />
        <br />
        <br />
        <div className="dropdown">
          <Button variant="secondary">Start Date Range – End Date Range</Button>
          <Dropdowns />
        </div>
        <TableComponents />
      </div>
    
    </>
  );
};
