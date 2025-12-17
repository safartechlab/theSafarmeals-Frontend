import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Baseurl } from "../../Baseurl"
import {initiallogin} from "../slice/AuthSlice"

const Authprovider = ({children})=>{
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    if(token){
        useEffect(()=>{
            const getverify = async() =>{
                try{
                    const config = {
                        heasers:{
                            authorization :`${token}`
                        }
                    }

                    const res = await axios.post(`${Baseurl}user/verify-auth`,{},config)
                    
                    console.log(res.data)
                    if(res.data.status){
                        dispatch(initiallogin(res.data.data.data))
                    }
                    else{
                        localStorage.removeItem('token')
                    }
                }
                catch(error) {
                    console.log(error);
                }
            }
            getverify()
        },[dispatch])
    }

    return(
        <>
            {children}
        </>
    )
}

export default Authprovider