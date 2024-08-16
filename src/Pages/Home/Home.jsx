import AllProducts from "../AllProducts";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <AllProducts></AllProducts>
            <Footer></Footer>
        </div>
    );
};

export default Home;