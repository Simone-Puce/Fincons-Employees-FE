import { useEffect, useState } from "react"

const UserDetailsInput = ({ data , updatingData}: { data: any, updatingData : boolean }) => {
    const [inputType, setInputType] = useState<string>("text")
    
    useEffect(()=>{

    },[])

  
    return (
        <>
        {
            !updatingData ? (<></>) : ( 
                <>
                {
                Array.isArray(data[1]) ? (
                        <></>
                ) : (
                    <div className="d-flex justify-content-center w-75 " >
                        <input
                            type={inputType}
                            className="form-control text-center m-1"
                            placeholder={data[1]}
                            disabled = {updatingData}
                        />
                    </div>
                )
            }</>)

        }
           
        </>
    )
}

export default UserDetailsInput