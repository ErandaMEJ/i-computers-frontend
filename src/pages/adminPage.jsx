import { Link, Route, Routes } from "react-router-dom";
import { HiClipboardList } from "react-icons/hi";
import { FaBoxes, FaUserFriends } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

export default function AdminPage(){
    return(
        <div className="w-full h-full max-h-full  flex bg-accent">
            <div className="w-[300px] bg-accent h-full">
                <div className="w-full h-[100px] flex items-center text-primary ">
                    <img src="/logo.png" className="h-full" alt="logo"/>
                    <h1 className="text-2xl">Admin</h1>
                </div>

                <div className="w-full h-[400px] text-white text-2xl flex flex-col ">
                    <Link to="/admin" className="w-full flex items-center h-[50px] gap-[10px]"><HiClipboardList />Orders</Link>
                    <Link to="/admin/products" className="w-full flex items-center h-[50px] gap-[10px]"><FaBoxes />Products</Link>
                    <Link to="/admin/users" className="w-full flex items-center h-[50px] gap-[10px]"><FaUserFriends />Users</Link>
                    <Link to="/admin/reviews" className="w-full flex items-center h-[50px] gap-[10px]"><MdRateReview />Reviews</Link>
                </div>

            </div>
            <div className="w-[calc(100%-300px)] h-full max-h-full border-[10px] bg-primary border-accent rounded-3xl  overflow-y-scroll text-4xl">
                <Routes path="/">
                    <Route path="/" element={<h1>Orders</h1>}/>
                    <Route path="/products" element={<h1>Products</h1>}/>
                    <Route path="/users" element={<h1>Users</h1>}/>
                    <Route path="/reviews" element={<h1>Reviews</h1>}/>
                </Routes>                
            </div>
            
        </div>
    );
}