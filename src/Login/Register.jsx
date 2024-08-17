import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import Navbar from "../Pages/Navbar/Navbar";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import Footer from "../Pages/Footer/Footer";



const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [register, setRegister] = useState('');
    const [success, setSuccess] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        // console.log(e.currentTarget)
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const password = form.get('password');
        const photo = form.get('photo');
        setRegister('');
        setSuccess('');

        if (password.length < 6) {
            toast.error("password must be at least 6 characters")
            setSuccess(<p className="text-red-700">Password must be at least 6 characters or longer</p>);
            return;
        } else if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one UpperCase characters")
            setSuccess(<p className="text-red-700">Password must be at least one UpperCase characters</p>);
            return;
        } else if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one LowerCase characters")
            setSuccess(<p className="text-red-700">Password must be at least one lowerCase characters</p>);
            return;
        } else if (!/[^A-Za-z0-9]/.test(password)) {
            toast.error("Password must contain at least one special characters")
            setSuccess(<p className="text-red-700">Password must be at least one special characters</p>);
            return;
        } else if (!/\d/.test(password)) {
            toast.error("Password must contain at least one number")
            setSuccess(<p className="text-red-700">Password must be at least one number</p>);
            return;
        }


        // console.log(name, email, password, photo)
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                toast.success('Registered Successfully');
                // setSuccess('Registered Successfully');

                // user profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo
                })
                    .then(() => {

                        window.location.href = '/';
                    })
                    .catch()


            })
            .catch(error => {
                console.log(error.message);
                setRegister(error.message)
            })


    }
    return (
        <div>
            <Navbar></Navbar>
            <div>
                <div className="hero  bg-base-200">
                    <div className="hero-content flex-col">
                        <div className="text-center">
                            <h1 className="text-5xl text-purple-800 font-bold animate__animated  animate__swing">Please Register</h1>

                        </div>
                        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-sky-200">
                            <form onSubmit={handleRegister} className="p-6">
                                <div className="form-control animate__animated  animate__bounceInLeft">
                                    <label className="label">
                                        <span className="label-text ">Your Full Name</span>
                                    </label>
                                    <input type="text" placeholder="Enter Your Name" name='name' className="input input-bordered" required />
                                </div>
                                <div className="form-control animate__animated  animate__bounceInRight">
                                    <label className="label">
                                        <span className="label-text ">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                                </div>


                                <div className="form-control  animate__animated  animate__bounceInLeft">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" placeholder="Photo" name='photo' className="input input-bordered" required />
                                </div>
                                <div className="form-control relative animate__animated  animate__bounceInRight">
                                    <label className="label">
                                        <span className="label-text ">Password</span>
                                    </label>
                                    <input

                                        type={showPasswords ? "text" : "password"}
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered"
                                        required />

                                    <span className="absolute top-14 right-7" onClick={() => { setShowPasswords(!showPasswords) }}>
                                        {
                                            showPasswords ? <IoEye /> : <IoMdEyeOff />
                                        }
                                    </span>


                                </div>
                                <div className="form-control w-full mt-6 animate__animated animate__heartBeat">
                                    <button className="btn btn-primary bg-green-700 text-black border-none font-extrabold">Register</button>
                                </div>
                            </form>

                            <p className="text-center p-2">Already have an account? <Link to='/login' className="text-blue-700">Login</Link></p>
                            {
                                register && <p className="text-lg text-center text-red-700">{register}</p>
                            }
                            {

                                success && <p className="text-lg text-center text-green-700">{success}</p>
                            }
                        </div>
                    </div>

                </div>

            </div>
            <Footer></Footer>
     

        </div>
    );
};

export default Register;