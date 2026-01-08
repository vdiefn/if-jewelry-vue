export const SET_COOKIES = (token:string, expired:number) => {
  document.cookie =`hexToken=${token}; path=/admin; expires=${new Date(expired)}`
}

export const DELETE_COOKIES = () => {
  document.cookie = "hexToken=; path=/admin;"
}

export const GET_COOKIES = (tokenName:string) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${tokenName}=`))
    ?.split("=")[1]?? null
}