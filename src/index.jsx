import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose



const initialState ={
  characters:[],
  pages:0,
  powerstatsOptions:[],
  currentPage:1,
  elementsPerPage:20,
  appearanceOptions:{},
  paginationQuantity: window.innerWidth <= 768 ? 5 : 10,
  filteredData:[],
  loading:true,
  error:null,
  filteredPages: 0,
  filters:{
    search:null,
    orderOption:{name:'',type:'asc'}, //order {name,type}
    filterOptions:{}, // filter
  },
}

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
)

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
  document.getElementById('root')
);
