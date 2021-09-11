import { CustomResponse } from "../interfaces/CustomResponse"

export const failResponse = (msg: string, data: Object): CustomResponse => {
  return {
    "status" : 400,
    "msg" : msg,
    "data" : data
  }
}

export const successReponse = (msg: string, data: Object): CustomResponse => {
  return {
    "status" : 200,
    "msg" : msg,
    "data" : data
  }
}
