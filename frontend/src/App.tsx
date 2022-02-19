import * as React from 'react';
import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import AddCollection from './components/AddCollection';
import AddProduct from './components/AddProduct';
import Collection from './components/Collection';
import Collections from './components/Collections';
import Home from './components/Home';
import Product from './components/Product';
import Products from './components/Products';

export default function App() {
  return (
    <Container component="main" sx={{ mt: 4, mb: 4 }}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/collections" element={<Collections />}/>
        <Route path="/collections/new" element={<AddCollection />}/>
        <Route path="/collections/:collectionId" element={<Collection />}/>
        <Route path="/collections/:collectionId/products" element={<Products />}/>
        <Route path="/collections/:collectionId/products/new" element={<AddProduct />}/>
        <Route path="/collections/:collectionId/products/:productId" element={<Product />}/>
      </Routes>
    </Container>
  );
}
