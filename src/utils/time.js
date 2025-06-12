export const getTime = () => {
    let message = ""
    let hours = new Date().getHours()
    if(hours <= 10) {
            message = "早安"
        } else if(hours <= 18){
            message = "午安"
        } else {
            message = "晚安"
        }
        return message
}