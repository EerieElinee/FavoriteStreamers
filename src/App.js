import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AddStreamer from './components/AddStreamer';
import ViewStreamer from './components/ViewStreamer';
import Update from './components/Update';

function App() {
    return (
        <div className="">
        <BrowserRouter>
            <Routes>
            <Route element={ <Home /> } path="/" default/>
            <Route element={ <AddStreamer /> } path="/streamer/Add" />
            <Route element={ <ViewStreamer /> } path="/streamer/view/:id" />
            <Route element={ <Update /> } path="/streamer/Update/:id" />
            </Routes>
        </BrowserRouter>
        </div>
    );
}

export default App;
