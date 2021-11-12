import data from '../backend/data.json'

export const simulateQuery = () =>{

  return new Promise((res,rej)=>{

    const time = Math.random() * 2

    setTimeout(()=>{
      res(data)
    },time)
  })
}

/**
 * Ordernar elementos por la propiedad name
 * @param list array - lista de personajes
 * @param orderType string 'desc' por defecto
 * @return data nueva lista con los elementos ordenados
 */
export const sortByName = (list,orderType)=>{
  const data = [...list]


  data.sort((a,b)=>{
    
    const firstPair = a.name
    const secondPair = b.name
  
    if(orderType === 'asc'){
        
      if(firstPair > secondPair){
        return 1
      }else if(firstPair < secondPair){
        return -1
      }else{
        return 0
      }
    }else{
      if(firstPair < secondPair){
        return 1
      }else if(firstPair > secondPair){
        return -1
      }else{
        return 0
      }
  
    }
  })

  return data
}

/**
 * Ordernar elementos por una propiedad definida
 * @param list array - lista de personajes
 * @param parameter string - nombre de la propiedad base como filtro
 * @return data nueva lista con los elementos ordenados
 */
export const sortByValues = (list,parameter,orderType) =>{

  const data = [...list]

  data.sort((a,b)=>{

    const firstPair = a.powerstats[parameter] !== "null" ? parseInt(a.powerstats[parameter]) : 0
    const secondPair = b.powerstats[parameter]  !== "null"  ? parseInt(b.powerstats[parameter]) : 0

    if(orderType === 'asc'){
      
      if(firstPair > secondPair){
        return 1
      }else if(firstPair < secondPair){
        return -1
      }else{
        return 0
      }
    }else{
      if(firstPair < secondPair){
        return 1
      }else if(firstPair > secondPair){
        return -1
      }else{
        return 0
      }

    }

  })

  return data

}

/**
 * Aplicar los diferentes filtros 
 * @param list array - lista de personajes
 * @param filters object
 * @param elementsPerPage number
 * @param page number
 * @return data una lista con un length = elementsPerPage 
 */
export const applyFilters = (list,filters,elementsPerPage, page)=>{

  let data = [...list]


  //apply filters
  if(filters.orderOption.name){
    data = sortByValues(data,filters.orderOption.name,filters.orderOption.type)
  }else{
    
    data = sortByName(data,filters.orderOption.type)
  }



  Object.entries(filters.filterOptions).forEach(filter=>{

    const filterName = filter[0]
    const filterList = filter[1]

    if(filterList.length>0){
      if(filterName === 'height' || filterName === 'weight'){
        data = data.filter(character=>  filterList.includes(character.appearance[filterName][0]) )
      }else{
        data = data.filter(character=>  filterList.includes(character.appearance[filterName]) )
      }
    }

  })


  if(filters.search){

    data = data.filter(c => c.name.toLowerCase().includes(filters.search.toLowerCase()))

  }
  
  const lengthData = Math.ceil((data.length - 1) / elementsPerPage)

  
  const init = (page * elementsPerPage) - elementsPerPage
  const filtered = data.splice(init,20)

  return [filtered,lengthData]
  
}

/**
 * Obtener una lista con unicos tipos de powerStats
 * @param list array - lista de personajes
 * @return data - lista de powerstats unicos
 */
export const getPowerstats = (list) =>{

  return [...new Set(Object.keys(list[0].powerstats))]
}

/**
 * Obtener una lista con tipos unicos en base a un parametro de apariencia
 * @param list array - lista de personajes
 * @param parameter parametro de apariencia
 * @return data - lista de tipos unicos
 */
export const getOptions = async (list,parameter) =>{

  const data = [...list]

  if(parameter === 'weight' || parameter === 'height'){

    return new Set(data.map(pj=>pj.appearance[parameter][1]))
  }else{
    return new Set(data.map(pj=>pj.appearance[parameter]))

  }

}


/**
 * Construccion de paginacion
 * @param list array - lista de personajes
 * @return objeto - { parametroApariencia: [...tipos unicos de apariencia para el parametro] }
 */
export const getAppearanceStats = (list)=>{

  const appearanceKeys = Object.keys(list[0].appearance).map(key=>([key,new Set()]))

  const stats = Object.fromEntries(appearanceKeys)

  list.forEach(character=>{
    
    Object.keys(stats).forEach((stat)=>{

      if(!Array.isArray(character.appearance[stat])){
        stats[stat].add(character.appearance[stat])
      }else{
        stats[stat].add(character.appearance[stat][0])
      }
    })
  })

  Object.keys(stats).forEach((stat)=>{
    stats[stat] = [...stats[stat]]
  })


  return stats
}


/**
 * Construccion de paginacion
 * @param pages number - cantidad maxima de paginas
 * @param currentPage number - pagina base 
 * @param pagination number - cantidad de elementos por bloque de paginacion 
 * @return lista de numeros con la paginacion disponible
 */
 export const buildPagination = (pages,currentPage,pagination)=>{

  if( pages <= pagination){
    return Array.from({length:  pages}, (_, i) => i +1)
  }else{

    let puntoInicial = 1

    if(currentPage<= Math.ceil(pagination/2)){
      puntoInicial = 1
    }

    else if(( pages-currentPage) > Math.floor(pagination/2)){
      puntoInicial = currentPage - (Math.ceil(pagination/2)-1)
    }
    else{
      puntoInicial =  pages - (pagination-1)
    }

    return Array.from({length: pagination}, (_, i) => i + puntoInicial )
  }
}
