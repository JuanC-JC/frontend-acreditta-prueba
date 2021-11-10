import {setData,errorData,sortData,filterData, setPage,setFilter,paginationQuantity} from '../types'
import {applyFilters, sortByValues} from '../utils'

const reducer = (state,action) => {
  switch (action.type) {
    case setData:
      return{
        ...state,
        characters:action.payload,
        loading:false,
        error: null,
        pages: Math.ceil( (action.payload.length - 1) / state.elementsPerPage )
      }
    case setPage:
      return{
        ...state,
        currentPage:action.payload,
      }
    case paginationQuantity:
      return{
        ...state,
        paginationQuantity: action.payload
      }
    case setFilter:
      return{
        ...state,
        filters: [...state.filters]
      }
    case filterData:
      return{
        ...state,
        filteredData: applyFilters(state.characters,state.filters,state.elementsPerPage,  state.currentPage)
      }
    case errorData:
      return{
        ...state,
        error:action.payload,
        loading:false
      }
    case sortData:
      return{
        ...state,
        characters: sortByValues(state.characters,'intelligence')
      }   
    default:
      return state
  }
}


export default reducer