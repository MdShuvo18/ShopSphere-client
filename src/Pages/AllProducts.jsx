import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Shared/useAxiosPublic";
import { useEffect, useState } from "react";




const AllProducts = () => {
    const axiosPublic = useAxiosPublic()
    const [search, setSearch] = useState('')
    // const [products, setProducts] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [searchItems, setSearchItems] = useState()
    // useEffect(() => {
    //     fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemsPerPage}&search=${search}`)
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [currentPage, search])
    // console.log(products)
    const { data: products = [],refetch } = useQuery({
        queryKey: ['products', search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products?page=${currentPage}&size=${itemsPerPage}&search=${search}`)
            console.log(res.data)
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

    useEffect(() => {
        fetch(`http://localhost:5000/search?search=${search}`)
            .then(res => res.json())
            .then(data => setSearchItems(data))
    }, [search])
    // const { data: searchItems = [] } = useQuery({
    //     queryKey: ['searchItems'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/search?search=${search}`)
    //         console.log(res.data)
    //         return res.data
    //     }
    // })
    // console.log(searchItems)
    // console.log(typeof (items.count))
    const itemsPerPage = 6;
    const totalPages = Math.ceil(items.count / itemsPerPage);
    const pages = []
    for (let i = 1; i < totalPages; i++) {
        pages.push(i)
    }
    // console.log(pages)

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
    // searching related

    const handleSearch = (e) => {
        e.preventDefault()
        const searchItem = e.target.search.value
        // console.log(searchItem)
        setSearch(searchItem)


        // fetch new data here
    }
    return (
        <div className="space-y-5">
            <form onSubmit={handleSearch}>
                <input
                    name="search"
                    type="text"
                    placeholder="search here"
                    className="input input-bordered input-md w-full max-w-xs" />
                <input type="submit" value="Search" className="btn ml-2" />
            </form>
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
                {/* <p>Current Page : {currentPage}</p> */}
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