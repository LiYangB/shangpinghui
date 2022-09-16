import {v4 as uuidv4} from "uuid"

// 随机生成一个字符串,作为游客id
export const getUUID=()=>{
    let uuid_token=localStorage.getItem("UUIDTOKEN")
    if(!uuid_token){
        uuid_token=uuidv4();
        localStorage.setItem("UUIDTOKEN",uuid_token)
    }
    return uuid_token
}