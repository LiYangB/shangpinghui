export const setToken=(token)=>{
    // 持久化存储token
    localStorage.setItem("TOKEN", token)
}
export const getToken=()=>{
    // 读取token
  return  localStorage.getItem("TOKEN")
}
export const removeToken=()=>{
    // 移除token
    localStorage.removeItem("TOKEN")
}
