import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux'
import reducer from './reducers'
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose



const initialState ={
  characters:[],
  pages:0,
  currentPage:1,
  elementsPerPage:20,
  paginationQuantity: window.innerWidth <= 768 ? 5 : 10,
  filteredData:[],
  loading:true,
  error:null,
  filters:[],
}

const store = createStore(
  reducer,
  initialState,
  composeEnhancers()
)

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
  document.getElementById('root')
);
