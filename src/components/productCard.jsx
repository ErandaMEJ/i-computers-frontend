import { Link } from "react-router-dom";
import StarRating from "./starRating";

export default function ProductCard(props){

    const product = props.product

    return (
        <Link to={"/overview/"+product.productID} className="w-[300px] h-[400px] shadow-2xl m-4 cursor-pointer relative hover:[&_.buttons]:opacity-100 hover:[&_.primary-image]:opacity-0 ">
            <div className="w-full h-[250px] bg-red-900 relative">
                 <img 
                    src={product.images[1]} 
                    className="w-full h-full absolute bg-white object-cover" />
                <img 
                    src={product.images[0]} 
                    className="w-full h-full absolute bg-white primary-image transition-opacity duration-400" />
            </div>

                <div className="w-full h-[150px] p-2 flex flex-col justify-evenly">
                    <h1 className="text-center text-lg ">{product.name}</h1>
                    <div className="flex items-center justify-between mt-2">
                        <StarRating value={product?.rating ?? 0} showValue={false} size={14} />
                        <span className="text-xs text-secondary/60">
                            ({product?.numReviews ?? 0})
                        </span>
                        </div>
                    <div className="w-full flex flex-col items-center">
                        {
                            product.labelledPrice > product.price &&
                                <h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2">
                                    LKR. {product.labelledPrice.toFixed(2)}
                                </h2>                                
                        }
                        <h2 className="text-secondary text-2xl">
                            LKR. {product.price.toFixed(2)}
                        </h2>
                            {/* ⭐ Rating + numReviews */}
                            <p className="text-xs text-gray-500 mt-1">
                                Rating: {(product.rating ?? 0).toFixed(1)} (
                                {product.numReviews ?? 0})
                            </p>
                    </div>
                </div>

                <div className="w-full h-[150px] bottom-0 opacity-0 absolute buttons bg-white flex flex-row gap-4 justify-center items-center transition-opacity duration-400">
                    {/* <Link to="/cart" className="w-[150px] h-[50px] border-2 font-semibold border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-200 text-center flex justify-center items-center">Add to cart</Link> */}
                    <button 
                        
                        className="w-[150px] h-[50px] border-2 font-semibold border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-200 text-center flex justify-center items-center">
                        View Details
                    </button>
                  
                </div>

        </Link>
    );
}