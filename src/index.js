import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import SearchBar from "./components/searchbar.js";
import ProductListItem from "./components/product-list-item.js";
import ProductsDisplay from "./components/products-display";
import Pagination from "./components/pagination.js";


import 'bootstrap/dist/css/bootstrap.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>

  </Provider>,
  document.getElementById('root')
);
