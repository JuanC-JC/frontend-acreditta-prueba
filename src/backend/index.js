const fetch = require('node-fetch')
const fs = require('fs')
const os = require('path')
const path = require('path')
const token = 2376169992528422	

const dataPath = path.resolve(__dirname,'data.json')

const getAll = async ()=>{

  let counter = 513

  const data = await fs.promises.readFile(path.resolve(__dirname,'data.json'),'utf-8')

  const list = [...JSON.parse(data)]

  while (counter){
    
    try{
      
      const data = await  fetch(`https://superheroapi.com/api/${token}/${counter}`)
    
      const response = await data.json()

      if(response.response === 'success'){
        counter++
        list.push(response)
      }else{
        counter = false
      }
    
      console.log(counter)

    }catch(error){
      counter = false
      console.log(error)
    }

  }

  fs.writeFileSync(path.resolve(__dirname,'data.json'),JSON.stringify(list), { encoding: "utf8", flag: "w" })

}

const getData = async () =>{
  const file = await fs.promises.readFile(dataPath,'utf-8')

  const data = JSON.parse(file)

  return data

}


//organizar por valores
const getOptions = async (parameter) =>{
  const data = await getData()

  if(parameter === 'weight' || parameter === 'height'){

    return new Set(data.map(pj=>pj.appearance[parameter][1]))
  }else{
    return new Set(data.map(pj=>pj.appearance[parameter]))

  }

}

const searchByName = async(text) =>{

}

const sortByValues = async(parameter,orderType) =>{

  const data = await getData()

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


//Preguntar si ordenamos o filtramos segun apareciencias

//Si es ordenar entonces unas serian por abc y otras por factor numerico

(async ()=>{


  //are normall options
  console.log(await getOptions('gender'))
  console.log(await getOptions('race'))
  console.log(await getOptions('eye-color'))
  console.log(await getOptions('hair-color'))

  console.log(await getOptions('height'))
  // console.log(await getOptions('hair-color'))
})()