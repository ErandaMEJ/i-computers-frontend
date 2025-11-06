import { useState } from "react";

export default function test(){

    const [count , setCount] = useState(0)

    
    
    return(
        <div className="w-full h-full  flex justify-center items-center">
            <div className="w-[400px] h-[300px] shadow-2xl flex justify-center items-center">
                <button className="w-[100px] h-[50px] bg-red-500 text-white"
                onClick={ ()=>{
                    setCount(100)
                    }}>Decrement  

                </button>

                <h1 className="w-[100px] h-[50px] text-[30px] text-center">{count}</h1>

                <button className="w-[100px] h-[50px] bg-blue-500 text-white" 
                onClick={()=>{
                    console.log("increment")
                    //count = count +1
                    console.log(count)

                    }}>Increment  

                </button>
                </div>
        </div>
    )
}