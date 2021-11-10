import {
  setData,
  errorData,
  sortData,
  filterData,
  setPage,
  paginationQuantity,
  loadingData,
  addFilterOption
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

export const setSortData = (payload) => ({
  type: sortData,
  payload,
});

export const setCurrentPage = (payload) => ({
  type: setPage,
  payload,
});

export const applyFilterData = (payload) => ({
  type: filterData,
  payload,
});

export const setFilterOption = (payload) => ({
  type: addFilterOption,
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
