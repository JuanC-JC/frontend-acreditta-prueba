import {setData,errorData, sortData, filterData, setPage, paginationQuantity} from '../types'

export const addData = payload => ({
  type:setData,
  payload
})

export const SetErrorData = payload => ({
  type:errorData,
  payload
})

export const setSortData = payload => ({
  type: sortData,
  payload
})

export const setCurrentPage = payload => ({
  type: setPage,
  payload
})

export const applyFilterData = payload => ({
  type: filterData,
  payload
})


export const setPaginationQuantity = payload =>({
  type: paginationQuantity,
  payload
})

