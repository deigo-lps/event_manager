const getUniqueId = () =>{
  return `${Date.now()}${Math.floor(Math.random() * 10000)}`
}

export default getUniqueId