import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import ProductCard from "../components/productCard";

export default function ProductPage() {

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        if(!loaded){
            axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setLoaded(true);
      });
        }

    },[])

    return(
        <div className="w-full h-[calc(100vh-100px)]">
            {
                !loaded?<Loader/>:
                <div className="w-full flex justify-center p-4 flex-row flex-wrap">
                    {
                        products.map(
                            (item)=>{
                                return(
                                    <ProductCard key={item.productID} product={item} />
                                )
                            }
                        )
                    }
                    
                </div>
            }

        </div>
    )
}