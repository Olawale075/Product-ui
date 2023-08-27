/** @format */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from './component/Login'
import { Notification } from './component/Notification';
import { Home } from './component/Home';
import Templates from './component/Templates';
import Template from './component/Template';
import NewTemplate from './component/NewTemplate';
import DeliveryReport from './component/Report';
import Variable from './services/ProductService';
import AddProductComponent from './component/AddProductComponent';
import ProductComponent from './component/ProductComponent';
import UserView from './component/UserView';
import Shoe from './type/Shoe';
import Cross from './type/Cross';
import ProductService from './services/ProductService';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} /> 
           <Route path="/product" element={<ProductComponent />} />
          <Route path="/allWear.com" element={<UserView />} />
          <Route path="/new-template" element={<NewTemplate />} />
          <Route path="/shoes" element={<Shoe />} />
          <Route path="/templates/:id" element={<Template />} />
          <Route path="/product" element={<ProductComponent />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route exact path="/home" element={<Home />} />{' '}
          <Route path="/product/service" element={<ProductService />} />
          <Route path="/cross" element={<Cross />} />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
