/** @format */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import OffcanvasExample from './component/OffcanvasExample';
import { Notification } from './component/Notification';
import MessageConfiguration from './component/MessageConfiguration';
import { Home } from './component/Home';
function App() {
  return (
    <div className="App">
      <OffcanvasExample />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Notification" element={<Notification />} />
          <Route exact path="/Home" element={<Home />} />{' '}
          <Route
            path="/MessageConfiguration"
            element={<MessageConfiguration />}
          />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
