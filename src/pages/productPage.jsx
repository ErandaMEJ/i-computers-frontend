import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import ProductCard from "../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setLoaded(true);
      });
    }
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-68px)] bg-primary">
      {!loaded ? (
        <div className="w-full flex justify-center items-center py-16">
          <Loader />
        </div>
      ) : (
        <div className="w-full">
          {/* Search Bar */}
          <div className="w-full sticky top-0 z-10 bg-primary/90 backdrop-blur border-b border-secondary/10">
            <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-start sm:items-center justify-between w-full sm:w-auto gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-secondary">
                    Products
                  </h1>
                  <p className="text-xs sm:text-sm text-secondary/60">
                    {products.length} items
                  </p>
                </div>

                <div className="sm:hidden inline-flex items-center rounded-full border border-secondary/10 bg-white/5 px-3 py-1 text-xs text-secondary/70">
                  Search below
                </div>
              </div>

              <div className="w-full sm:max-w-xl">
                <div className="flex items-center gap-2 rounded-2xl border  border-secondary/15 bg-white/5 px-3 py-2 shadow-sm">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-transparent px-2 py-2 outline-none text-secondary placeholder:text-secondary/50 focus:placeholder:text-secondary/40"
                    onChange={async (e) => {
                      if (e.target.value == "") {
                        setLoaded(false);

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
                          });
                        setLoaded(true);
                      }
                    }}
                  />
                  <div className="w-px h-6 bg-secondary/10 " />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto max-w-7xl px-4 py-7">
            {/* ✅ Product Grid: 4 cols (lg) / 5 cols (2xl) */}
            <div
              className="
                grid gap-4 sm:gap-5 lg:gap-6
                grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5
                items-stretch
              "
            >
              {products.map((item) => (
                <div key={item.productID} className="w-full">
                  <ProductCard product={item} />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
              <div className="mt-16 mx-auto max-w-xl text-center">
                <div className="rounded-2xl border border-secondary/10 bg-white/5 p-8 shadow-sm">
                  <h2 className="text-lg font-semibold text-secondary">
                    No products found
                  </h2>
                  <p className="mt-2 text-sm text-secondary/70">
                    Try a different keyword or clear the search box.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}