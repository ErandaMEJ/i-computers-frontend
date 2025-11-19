import { useState } from "react"
import { addToCart, getCart, getCartTotal } from "../utils/cart"
import { FaCaretSquareUp } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function CartPage (){
    const [cart, setCart] = useState(getCart())
    return(
        <div className="w-full flex flex-col items-center p-[20px]">
           {
               cart.map(
                (item)=>{
                    return(
                        
                        <div className="w-[55%] h-[150px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between">
                            <img src={item.image} className="h-full aspect-square object-cover"/>
                            <div className="flex flex-col justify-center pl-4 w-[300px]">
                                <h1 className="text-2xl font-semibold relative hover:[&_.tooltip]:opacity-100">
                                    <span className="opacity-0 tooltip italic text-sm absolute bottom-[-25px] bg-accent text-white px-2 rounded-2xl">{item.name}</span>
                                    {
                                        item.name.length > 20 ? 
                                        item.name.substring(0, 20)+"..." : item.name
                                    }
                                </h1>
                                {
                                    item.labelledPrice > item.price && 
                                    <h2 className="text-lg line-through decoration-gold/70 decoration-2 mr-2">
                                        LKR. {item.labelledPrice.toFixed(2)}
                                    </h2>
                                }
                                <h2 className="text-xl text-accent font-semibold mt-2">
                                    LKR. {item.price.toFixed(2)}
                                </h2>
                                <h3 className="text-lg mt-2">{item.productID}</h3>

                            </div>
                            <div className="h-full flex flex-row items-center gap-4">
                                <div className="h-full flex flex-col justify-center items-center">
                                    <FaCaretSquareUp
                                        onClick={
                                            ()=>{
                                                addToCart(item, 1)
                                                const newCart = getCart()
                                                setCart(newCart)
                                            }
                                        } 
                                    className="text-2xl cursor-pointer hover:text-secondary/70 transition" />
                                    <span className="text-lg">{item.quantity}</span>
                                    <FaCaretSquareUp 
                                        onClick={
                                            ()=>{
                                                addToCart(item, -1)
                                                const newCart = getCart()
                                                setCart(newCart)
                                            }
                                        }
                                    className="rotate-180 text-2xl cursor-pointer hover:text-secondary/70 transition"/>

                                </div>
                                <span className="pr-4 text-lg font-semibold w-[150px] text-right">
                                    LKR. {(item.price * item.quantity).toFixed(2)}
                                </span>

                            </div>
                        </div>    
                    )
                }
               )
           }
           <div className="w-[55%] h-[150px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between items-center">
                <Link
                    to="/checkout" className="self-center ml-4 px-6 py-3 rounded bg-accent text-white hover:bg-accent/80 transition"
                    state={
                        cart
                    }>
                       Checkout
                </Link>
                                
                                <span className="pr-3 text-xl font-bold min-w-[150px] text-right">
                                    LKR. {getCartTotal().toFixed(2)}
                                </span>

                    
           </div>
        </div>
    )
}
    
       