import {
  setData,
  errorData,
  sortData,
  filterData,
  setPage,
  paginationQuantity,
  loadingData,
  sortOption,
  filterOption
} from "../types";

import { applyFilters, sortByValues,getPowerstats, getAppearanceStats } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case setData:

    const appearanceOptions = getAppearanceStats(action.payload)

    const appearanceFilters = Object.fromEntries(Object.keys(appearanceOptions).map(key=>[key,[]]))

      return {
        ...state,
        characters: action.payload,
        loading: false,
        error: null,
        pages: Math.ceil((action.payload.length - 1) / state.elementsPerPage),
        filteredPages: Math.ceil((action.payload.length - 1) / state.elementsPerPage),
        powerstatsOptions: getPowerstats(action.payload),
        appearanceOptions: appearanceOptions,
        filters:{
          ...state.filters,
          filterOptions: appearanceFilters
        }
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
    case sortOption:
      return{
        ...state,
        filters:{
          ...state.filters,
          orderOption: action.payload
        },
      };
    case filterOption:

      const indexOption = state.filters.filterOptions[action.payload.type].indexOf(action.payload.value)

      const newFilters = [
        ...state.filters.filterOptions[action.payload.type]
      ]

      if(action.payload.checked){
        newFilters.push(action.payload.value)
      }else{
        newFilters.splice(indexOption,1)
      }

      return {
        ...state,
        filters: {
          ...state.filters,
          filterOptions:{
            ...state.filters.filterOptions,
            [action.payload.type] : newFilters
          }
        },
      };
    case filterData:

      const [filteredData,filteredPages] = applyFilters(
          state.characters,
          state.filters,
          state.elementsPerPage,
          state.currentPage
        )

      return {
        ...state,
        loading:false,
        filteredData: filteredData,
        filteredPages: filteredPages,
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


export default reducer
