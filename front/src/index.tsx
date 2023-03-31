import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {Navigation} from "./components/header";

import {CreateQuiz} from "./pages/create/page";
import {Home} from "./pages/home/page";

import './index.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Navigation/>
        <main>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/create"} element={<CreateQuiz/>}/>
            </Routes>
        </main>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
