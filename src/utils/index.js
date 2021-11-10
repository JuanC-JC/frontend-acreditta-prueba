import data from '../backend/data.json'

export const simulateQuery = () =>{

  return new Promise((res,rej)=>{

    const time = Math.random() * 2

    setTimeout(()=>{
      res(data)
    },time)
  })
}


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


export const applyFilters = (list,filters,elementsPerPage, page)=>{

  
  let data = [...list]
  
  //apply filters
  if(filters.orderOption.name){
    data = sortByValues(data,filters.orderOption.name,filters.orderOption.type)
  }


  const lengthData = Math.ceil((data.length - 1) / elementsPerPage)
  //send data filtered only the currentPage
  
  const init = (page * elementsPerPage) - elementsPerPage
  const filtered = data.splice(init,20)

  return [filtered,lengthData]
  
}


export const getPowerstats = (list) =>{

  return new Set(Object.keys(list[0].powerstats))
}

export const getOptions = async (list,parameter) =>{

  const data = [...list]

  if(parameter === 'weight' || parameter === 'height'){

    return new Set(data.map(pj=>pj.appearance[parameter][1]))
  }else{
    return new Set(data.map(pj=>pj.appearance[parameter]))

  }

}

export const buildPagination = (pages,currentPage,pagination)=>{

  //pagination are elements by index components

  //pages, total of pages

  //currentPage actually page in pagination

  //if pages are minus than pagination example have 7 pages and the pagination has 10 elements, only returns 1 to 7
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