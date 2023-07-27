import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../components/page/login/Login';
import ItemPage from '../components/page/item/Item';
import HomePage from '../components/page/home/Home';
import PurchasePage from '../components/page/purchase/Purchase';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path='item' element={<ItemPage/>}/>
        <Route path='home' element={<HomePage/>}/>
        <Route path='purchase/:id' element={<PurchasePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

