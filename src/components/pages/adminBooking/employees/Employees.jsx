import React from "react";
import SearchForm from "./searchForm/SearchForm";
import OneEmployee from "./oneEmployee/OneEmployee";
import {Route, Routes} from "react-router-dom";

function Employees(props) {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SearchForm/>}/>
        <Route path='/:id' element={<OneEmployee/>}/>
      </Routes>
    </div>
  );
}

export default Employees;
