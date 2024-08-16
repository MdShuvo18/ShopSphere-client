import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Shared/useAxiosPublic";
import { useState } from "react";




const AllProducts = () => {
    const axiosPublic = useAxiosPublic()
    const { data: products = [], } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products')
            // console.log(res.data)
            return res.data
        }
    })
    const { data: items = [], } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = await axiosPublic.get('/productsCount')
            // console.log(res.data)
            return res.data
        }
    })
    // console.log(typeof (items.count))
    const itemsPerPage = 6;
    const totalPages = Math.ceil(items.count / itemsPerPage);
    const pages = []
    for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1)
    }
    // console.log(pages)
    const [currentPage, setCurrentPage] = useState(1)
    // handle prev
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // handle next
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }
    // console.log(currentPage)


    return (
        <div>
            <div className="grid grid-cols-3 gap-5 justify-items-center">
                {products.map((product) => (
                    <div key={product._id} className="card card-compact bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img src={product.productImage} alt="" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.productName}</h2>
                            <p>{product.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center">
                <p>Current Page : {currentPage}</p>
                <button onClick={handlePrev} className="btn btn-success">Prev</button>
                {
                    pages.map(page => <div onClick={() => setCurrentPage(page)} key={page} className="join gap-2">
                        {/* <input
                            className={`join-item btn btn-outline btn-square ml-2 ${currentPage===page && "text-orange-200"}`}
                            type="radio"
                            name="options"
                            aria-label={page}
                        /> */}
                        <button className={`join-item btn btn-outline btn-square ml-2 ${currentPage === page && "text-orange-600 bg-amber-200"}`}>
                            {page}
                        </button>

                    </div>)
                }
                <button onClick={handleNext} className="btn btn-success ml-2">Next</button>
            </div>
        </div>
    );
};

export default AllProducts;