import {
  setData,
  errorData,
  filterData,
  setPage,
  paginationQuantity,
  loadingData,
  filterOption,
  sortOption,
  setSearch
} from "../types";


export const addData = (payload) => ({
  type: setData,
  payload,
});

export const setLoading = (payload) => ({
  type: loadingData,
  payload,
});

export const SetErrorData = (payload) => ({
  type: errorData,
  payload,
});

export const setCurrentPage = (payload) => ({
  type: setPage,
  payload,
});

export const setSortOption = (payload) => ({
  type: sortOption,
  payload
})

export const applyFilterData = (payload) => ({
  type: filterData,
  payload,
});

export const setSearchOption = (payload) => ({
  type:setSearch,
  payload
})

export const setFilterOption = (payload) => ({
  type:filterOption,
  payload
})

export const setFilterData = (payload) => (dispatch) =>{

  dispatch(setLoading(true))

  setTimeout(() => {
    dispatch(applyFilterData())
  }, 100);
}

export const setPaginationQuantity = (payload) => ({
  type: paginationQuantity,
  payload,
});
