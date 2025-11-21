import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../components/loader"
import ImageSlider from "../components/imageSlider"
import { CgChevronRight } from "react-icons/cg"
import {addToCart, } from "../utils/cart"


export default function ProductOverview() {
    const navigate = useNavigate()
    const params = useParams()
    const [product , setProducts] = useState(null)
    const [status , setStatus] = useState("loading") //loading , success , error

    useEffect(() => {
        if(status == "loading"){
    axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
        .then((response) => {
           
            setProducts(response.data);
            setStatus("success");
         }
        ).catch(
            () => {
                toast.error("Product Not Found");
                setStatus("error");
            }
        )
    }
}, []);
    
    return (
       
            <>
            {status == "loading" && <Loader/>}
            {status == "error" && (<h1 className="text-center mt-10 text-2xl">Error loading product.</h1>)}
            {status == "success" && ( 
                <div className="w-full h-[calc(100vh-100px)] flex pt-[70px] ">
                    
                    <div className="w-1/2 h-full flex justify-center items-center ">
                        <ImageSlider images={product.images}/>
                    </div>

                    <div className="w-1/2 h-full flex flex-col  gap-6 p-5">
                        <h1 className="text-4xl font-semibold">{product.name}</h1>
                        <h2 className="text-lg text-secondary/80 ">{product.productID}</h2> 
                        <h3 className="text-lg text-secondary/80 flex items-center"><CgChevronRight/>{product.category}</h3>
                        <p className="text-md text-justify text-secondary/90 h-32 overflow-y-auto">{product.description}</p>
                        
                        <div className="w-full ">
                                {product.labelledPrice > product.price && (
                                    <h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2 text-xl">
                                        LKR. {product.labelledPrice.toFixed(2)}
                                    </h2>
                                )}
                                <h2 className="text-accent font-semibold text-3xl">
                                    LKR. {product.price.toFixed(2)}
                                </h2>
                        </div>
                        <div className="w-full flex flex-row gap-4 mt-4">
                            <button
                                onClick={()=>{
                                    addToCart(product, 1)
                                }}                              
                                 
                                className="w-1/2 h-12 bg-secondary text-white rounded-2xl hover:bg-secondary/80">
                                    Add to Cart
                            </button>

                            <button
                                onClick={()=>{
                                    navigate("/checkout", {state : [{
                                        productID: product.productID,
                                        name: product.name,
                                        price: product.price,
                                        labelledPrice: product.labelledPrice,                                        
                                        quantity: 1,
                                        image: product.images[0],
                                    }
                                    
                                    ]})
                                }} 
                                className="w-1/2 h-12 bg-accent text-white rounded-2xl hover:bg-accent/80">
                                    Buy Now
                            </button>
                        </div>
                    </div>

                </div>
            )}
            </>
        
    )
}
