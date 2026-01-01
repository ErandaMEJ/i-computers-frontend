import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import ProductCard from "../components/productCard";


export default function ProductPage() {

   
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    

    useEffect(() => {

        if(!loaded){
            
        axios.get(import.meta.env.VITE_BACKEND_URL + "/products")
        .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setLoaded(true);
      });
        }

    },[])

    return(
        <div className="w-full h-[calc(100vh-100px)] ">
            {
              !loaded? 
                (<Loader/>)
                :(
                <div className="w-full flex justify-center p-4 flex-row flex-wrap ">
                    {/* Search Bar */}
                    <div className="w-full h-[100px] sticky top-0 bg-white flex justify-center items-center z-10 text-2xl font-normal text-secondary">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-1/2 p-2 rounded-2xl outline-none border border-gray-300"                           
                            onChange={async (e) =>{

                                if (e.target.value == ""){
                                    setLoaded(false)
                                    
                                    await axios
                                        .get(import.meta.env.VITE_BACKEND_URL + "/products")
                                        .then((response) => {
                                            console.log(response.data);
                                            setProducts(response.data);
                                            setLoaded(true);
                                        });
                                    setLoaded(true);
                                } else {
                                    await axios
                                        .get(
                                            import.meta.env.VITE_BACKEND_URL +
                                            "/products/search/" +
                                            e.target.value
                                        )
                                        .then((response) => {
                                            console.log(response.data);
                                            setProducts(response.data);
                                        })
                                    setLoaded(true);
                                }
                            }}
                        />
                                   
                    </div>
                        
                   {/* Product Grid */}
                    {products.map((item) => (
                        <ProductCard key={item.productID} product={item} />
                    ))}

                    {/* Empty State */}
                    {products.length === 0 && (
                        <div className="mt-16 text-center text-gray-500 text-lg tracking-wide">
                            No products found.
                        </div>
                    )}
                    
                </div>
            )}

        </div>
    )
}