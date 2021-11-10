import {
  setData,
  errorData,
  sortData,
  filterData,
  setPage,
  setFilter,
  paginationQuantity,
  loadingData
} from "../types";
import { applyFilters, sortByValues,getPowerstats } from "../utils";


const reducer = (state, action) => {
  switch (action.type) {
    case setData:
      return {
        ...state,
        characters: action.payload,
        loading: false,
        error: null,
        pages: Math.ceil((action.payload.length - 1) / state.elementsPerPage),
        powerstatsOptions: [...getPowerstats(action.payload)]
      };
    case loadingData:
      return {
        ...state,
        loading: true,
      };
    case setPage:
      return {
        ...state,
        currentPage: parseInt(action.payload),
        loading: true,
      };
    case paginationQuantity:
      return {
        ...state,
        paginationQuantity: action.payload,
      };
    case setFilter:
      return {
        ...state,
        filters: {
          ...state.filters,
        },
        loading: false
      };
    case filterData:
      return {
        ...state,
        loading:false,
        filteredData: applyFilters(
          state.characters,
          state.filters,
          state.elementsPerPage,
          state.currentPage
        ),
      };
    case errorData:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case sortData:
      return {
        ...state,
        characters: sortByValues(state.characters, "intelligence"),
      };
    default:
      return state;
  }
};

export default reducer;
