
export const checkToken = () => {
    //Necesito validar este auth
    if(localStorage.getItem('token')){
        return true
    }else{
        return false
    }
    
     
}