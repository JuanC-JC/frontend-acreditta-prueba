import {
  setData,
  errorData,
  filterData,
  setPage,
  paginationQuantity,
  filterOption,
  sortOption,
  setSearch
} from "../types";

/**
 * 
 * @param array payload 
 * @returns Ejecucion - reducer para agregar data inicial (array - lista de personajes)
 */
export const addData = (payload) => ({
  type: setData,
  payload,
});


/**
 * 
 * @param boolean payload 
 * @returns Ejecucion - reducer modificar el estado de error de la solicitud de data
 */
export const SetErrorData = (payload) => ({
  type: errorData,
  payload,
});

/**
 * 
 * @param payload number
 * @returns Ejecucion - reducer modifica el estado de la pagina actual
 */
export const setCurrentPage = (payload) => ({
  type: setPage,
  payload,
});

/**
 * 
 * @param payload object - { name: parametro powerStat , type: 'asc' || 'desc'}
 * @returns Ejecucion - reducer modifica el estado de la  opcion de ordenamiento
 * en state.filters.orderOption para una propiedad de manera ascendente o descendente
 */
export const setSortOption = (payload) => ({
  type: sortOption,
  payload
})


/**
 * 
 * @returns Ejecucion - reducer efectua el filtro de los datos en base al estado de 
 * state.filters
 */
export const applyFilterData = () => ({
  type: filterData,
});


/**
 * @param payload string - texto de busqueda como filtro
 * @returns Ejecucion - reducer modifica el estado del filtro de texto dentro de 
 * state.filters
 */
export const setSearchOption = (payload) => ({
  type:setSearch,
  payload
})


/**
 * @param payload object - { type: nombre de la propiedad de apariencia, value: nombre del valor }
 * @returns Ejecucion - reducer modifica el estado de filtro para state.filters.filterOptions
 */
export const setFilterOption = (payload) => ({
  type:filterOption,
  payload
})

/**
 * @param payload number - cantidad de paginas disponibles para el bloque de paginacion
 * @returns Ejecucion - reducer modifica el estado de state.paginationQuantity
 */
export const setPaginationQuantity = (payload) => ({
  type: paginationQuantity,
  payload,
});
