import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Pages/Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";




const Login = () => {
    const auth = getAuth(app)
    const googleprovider = new GoogleAuthProvider()
    const gitHubProvider = new GithubAuthProvider()
    const { signIn } = useContext(AuthContext)
    const [logUser, setLogUser] = useState('');
    const [success, setSuccess] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const location = useLocation()
    // console.log(location)
    const navigate = useNavigate()

    const handleGoogleSignIn = () => {
        // e.preventDefault()
        signInWithPopup(auth, googleprovider)
            .then(() => {
                toast.success("Google Login successfully")
                window.location.href = "/"
                // navigate(location?.state ? location.state : '/')
                // const user = result.user;
                // console.log(user);
            })
            .catch(error => {
                console.log(error.message)
            })
    }

   

    const hadnleLogin = (e) => {
        e.preventDefault()
        // console.log('ok')
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");
        // console.log(email, password)
        setLogUser('');
        setSuccess('');

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            setSuccess(<p className="text-red-700">Password must be at least 6 characters or longer</p>);
            return;
        } else if (!/[A-Z]/.test(password)) {
            toast.error('Password must contain at least one UpperCase characters')
            setSuccess(<p className="text-red-700">Password must be at least one UpperCase characters</p>);
            return;
        } else if (!/[a-z]/.test(password)) {
            toast.error('Password must contain at least one LowerCase characters')
            setSuccess(<p className="text-red-700">Password must be at least one lowerCase characters</p>);
            return;
        }
        signIn(email, password)
            .then(() => {
                // console.log(result.user)
                toast.success("login success")
                setSuccess('Login Successful')
                navigate(location?.state ? location.state : '/')
                // const user ={email}
                // axios.post('https://blog-website-server-eight.vercel.app/jwt',user,{withCredentials:true})
                // .then(res=>{
                //     // console.log(res.data)
                //     if(res.data.success){
                //         navigate(location?.state ? location.state : '/')
                //     }
                // })
            })
            .catch(error => {
                console.log(error.message);
                toast.error("Invalid mail or password")
            })


    }


    


    return (
       <div>
        <Navbar></Navbar>
         <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                {/* <div className="w-1/2 items-center mr-12">
                    <img className="rounded" src="https://i.ibb.co/JK3TJtt/login-concept-illustration-114360-757.jpg" alt="" />
                </div> */}
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={hadnleLogin} className="card-body">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input

                                type={showPasswords ? "text" : "password"}
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                 />

                            <span className="absolute top-14 right-7" onClick={() => { setShowPasswords(!showPasswords) }}>
                                {
                                    showPasswords ? <IoEye /> : <IoMdEyeOff />
                                }
                            </span>


                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline btn-success">Login</button>
                        </div>
                        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-primary">SignIn With Google <FcGoogle /></button>
                      
                    </form>
                    {
                        logUser && <p className="text-lg text-center text-red-700">{logUser}</p>
                    }
                    {

                        success && <p className="text-lg text-center text-green-700">{success}</p>
                    }
                    <p className="my-4 text-center"> New to Here :
                        <Link className="text-orange-700 font-bold" to='/signup'>Sign Up</Link>
                    </p>
                </div>
            </div>
            
        </div>
        <Footer></Footer>
       </div>
    );
};

export default Login;