import { PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function AdminProductPage(){
    return(
        <div className="w-full h-full flex justify-center items-center  relative">
            Product Page

            <Link to="/admin/add-product" className=" absolute right-[20px] bottom-[20px] w-[50px] h-[50px] flex justify-center items-center text-6xl border-[2px] rounded-full hover:text-white hover:bg-secondary"><PiPlus/></Link>
        </div>
    )
}