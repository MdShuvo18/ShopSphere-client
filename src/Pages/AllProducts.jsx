import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Shared/useAxiosPublic";
import { useState } from "react";

const AllProducts = () => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [brand, setBrand] = useState(null);
    const [category, setCategory] = useState(null);
    const [sortOrder, setSortOrder] = useState(''); // State for sorting
    const itemsPerPage = 10;

    // Fetch products based on search, pagination, and sorting
    const { data: products = [] } = useQuery({
        queryKey: ['products', search, currentPage, sortOrder],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products`, {
                params: {
                    page: currentPage,
                    size: itemsPerPage,
                    search,
                    sort: sortOrder,
                }
            });
            return res.data;
        }
    });

    // Fetch total product count
    const { data: items = {} } = useQuery({
        queryKey: ['itemsCount'],
        queryFn: async () => {
            const res = await axiosPublic.get('/productsCount');
            return res.data;
        }
    });

    // Calculate total pages for pagination
    const totalPages = Math.ceil(items.count / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Handle pagination navigation
    const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.search.value);
    };

    // Handle sorting selection
    const handleSort = (e) => {
        setSortOrder(e.target.value);
    };

    // Filter products by selected brand and category
    const filteredProducts = products.filter(product => {
        return (!brand || product.brand.toLowerCase() === brand) &&
            (!category || product.category.toLowerCase() === category);
    });

    return (
        <div className="space-y-5">
            {/* Search, Filter, and Sort Section */}
            <div className="flex items-center space-x-4">
                <form onSubmit={handleSearch}>
                   <div className="flex ">
                   <input
                        name="search"
                        type="text"
                        placeholder="Search here"
                        className="input input-bordered input-md w-full max-w-xs"
                    />
                    <input type="submit" value="Search" className="btn ml-2" />
                   </div>
                </form>
              

                    {/* Brand Filter */}
                    <div className="dropdown">
                        <button tabIndex={0} className="btn m-1">Brand Name</button>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {products.map(product => (
                                <li key={product._id}>
                                    <a onClick={() => setBrand(product.brand.toLowerCase())}>
                                        {product.brand}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Category Filter */}
                    <div className="dropdown">
                        <button tabIndex={0} className="btn m-1">Category</button>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {products.map(product => (
                                <li key={product._id}>
                                    <a onClick={() => setCategory(product.category.toLowerCase())}>
                                        {product.category}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sorting Options */}
                    <div className="dropdown">
                        <select onChange={handleSort} className="select select-bordered">
                            <option value="">Sort By</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="date-desc">Date Added: Newest First</option>
                        </select>
                    </div>
                
            </div>

            {/* Products Grid */}
            <div className="grid lg:grid-cols-2 gap-5 justify-items-center">
                {filteredProducts.map(product => (
                    <div key={product._id} className="card card-compact bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img className="h-[250px] w-[370px]" src={product.productImage} alt={product.productName} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.productName}</h2>
                            <p>{product.description}</p>
                            <p>Category: {product.category}</p>
                            <p>Price: ${product.price}</p>
                            <h1>Brand: {product.brand}</h1>
                            <p>Date : {product.creationDateTime}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="text-center">
                <button onClick={handlePrev} className="btn btn-success">Prev</button>
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`join-item btn btn-outline btn-square ml-2 ${currentPage === page && "text-orange-600 bg-amber-200"}`}
                    >
                        {page}
                    </button>
                ))}
                <button onClick={handleNext} className="btn btn-success ml-2">Next</button>
            </div>
        </div>
    );
};

export default AllProducts;
