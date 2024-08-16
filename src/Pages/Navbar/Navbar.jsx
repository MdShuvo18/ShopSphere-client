import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { CgProfile } from "react-icons/cg";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [hoverName, setHoverName] = useState("");
    useEffect(() => {
        if (user) {
            setHoverName(user.displayName)
        } else {
            setHoverName("")
        }
    }, [user])
  const links=<>
     <li><a><Link to='/'>Home</Link></a></li>
    </>
     const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success("Sign out successfully")
            })
            .catch()
    }
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                           {links}
                        </ul>
                    </div>
                    <div className="flex flex-row items-center">
                        <img className="w-16 h-16" src="/public/Orange and Gray Tag Cart Virtual Shop Logo.png" alt="" />
                        <a className="btn btn-ghost text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">ShopSphere</a>

                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                       {links}
                    </ul>
                </div>
                <div className="navbar-end">
                {
                        user ? (
                            <div className="lg:tooltip" data-tip={hoverName}>
                                {
                                    user.photoURL ? (

                                        <img src={user.photoURL} className="w-10 h-10 rounded-full" alt={user.displayName} />

                                    ) : (
                                        <CgProfile></CgProfile>
                                    )
                                }

                            </div>

                        ) : (
                            <CgProfile></CgProfile>
                        )}
                    {
                        user
                            ? <button onClick={handleSignOut} className="btn btn-success bg-green-700 btn-outline text-black border-none">Sign Out</button>
                            : <div>
                                <div className="flex flex-row gap-1">
                                    <Link to='/login'> <button className="btn btn-success bg-green-700 btn-outline text-white border-none">Login</button></Link>
                                    <Link to='/signup'> <button className="btn btn-outline btn-success bg-orange-200 text-white border-none">Register</button></Link>
                                </div>
                            </div>
                    }
                </div>
            </div>
            <ToastContainer position="top-right" autoClose="2000"></ToastContainer>
        </div>
    );
};

export default Navbar;