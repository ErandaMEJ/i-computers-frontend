import axios from "axios";
import { PiPlus } from "react-icons/pi";
import { Link, } from "react-router-dom";
import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  
  useEffect (() => {
    if (!loaded){
      axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
        setLoaded(true);
      });
    }
    
  }, [loaded]);

  return (
    <div className="w-full min-h-screen  bg-primary flex flex-col items-center p-10 relative text-secondary">
      <h1 className="text-3xl font-semibold mb-6 text-secondary border-b-2 border-accent pb-2 ">
        User Management
      </h1>

      <div 
        className="w-full max-w-7xl p-2 mb-8 overflow-x-auto  bg-white shadow-xl rounded-2xl ">
        {loaded ? 
        <table 
            className="w-full max-w-7xl text-left justify-center border-separate border-spacing-0 overflow-hidden text-sm  table-auto  ">
          <thead 
              className="sticky top-0 z-10 bg-accent text-white uppercase text-xs  ">
            <tr>
              <th className="py-3 px-4 rounded-tl-2xl">Image</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4 ">First Name</th>
              <th className="py-3 px-4">Last Name</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4"></th>
              
            </tr>
          </thead>
          <tbody className=" bg-white divide-y divide-gray-100 ">
            {users.map((item, index) => {
            return(

              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-accent/10 transition-all "
              >
                <td className="py-3 px-4 align-middle">
                  <img
                    src={item.image}
                    
                    className="w-[38px] h-[38px] rounded-lg object-cover border border-gray-200 shadow-sm "
                  />
                </td>
                <td className="py-3 px-4 font-medium flex flex-row items-center gap-2">
                  
                  {item.email} {item.isEmailVerified? <MdVerified className="text-accent text-xl" /> : ""}

                </td>
                <td className="py-3 px-4 uppercase text-sm tracking-wider ">{item.firstName}</td>
                <td className="py-3 px-4 uppercase text-sm ">
                  {item.lastName}
                </td>
                <td className="py-3 px-4 text-red-900 font-bold text-sm  decoration-1 ">
                  {item.role}
                </td>
                <td className="py-3 px-4 text-sm">
                  {item.isBlocked?"Blocked":"Active"}
                </td>
                <td className="py-3 px-4">
                    <button 
                        className="my-1 flex justify-center items-center font-bold  px-6 py-2 bg-accent/20 text-xs text-accent rounded-2xl text-shadow-accent hover:bg-accent hover:text-white transition-all duration-300"
                        onClick={
                          async ()=>{
                            await axios.put(import.meta.env.VITE_BACKEND_URL + `/users/toggle-block/${item.email}`,{
                              isBlocked: !item.isBlocked
                            },
                            {
                              headers: {
                                Authorization: "Bearer " + localStorage.getItem("token"),
                              }
                            })
                            setLoaded(false)
                          }
                        }
                    >
                      {
                        item.isBlocked?"Unblock User":"Block User"
                      }
                        
                    </button>
                </td>   
              </tr>
            )
            })}
          </tbody>
        </table>:<Loader />}
      </div>

      <Link
        to="/admin/add-product"
        className="fixed right-[30px] bottom-[30px] w-[60px] h-[60px] flex justify-center items-center 
        text-5xl text-white bg-accent rounded-full shadow-lg hover:bg-gold transition-all duration-300 hover:scale-110"
      >
        <PiPlus />
      </Link>
    </div>
  );
}
