import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Shared/useAxiosPublic";



const AllProducts = () => {
    const axiosPublic = useAxiosPublic()
    const { data: products = [], } = useQuery({    
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products')
            console.log(res.data)
            return res.data
        }

    })
    
   

    return (
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
    );
};

export default AllProducts;