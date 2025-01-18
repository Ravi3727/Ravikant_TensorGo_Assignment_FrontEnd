import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UseMyCart } from '../context';
import cartIcon from '../assets/cartIcon.png'
function Navbar() {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("ID");
    const user = storedUser ? storedUser : null;
    const { cart } = UseMyCart();

    console.log("cart", cart);
    const logoutUser = async () => {
        try {
            localStorage.removeItem("ID");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("isSuperAdmin");
            localStorage.removeItem("isAdmin");
            const Token1 = localStorage.getItem("accessToken");
            const url = `http://localhost:3000/ravi/v1/users/logout`;
            const response = await axios.post(url, Token1, { withCredentials: true });

            if (response.status === 200) {
                console.log("Logged out successfully!");
                // window.location.reload(); 
                navigate("/signin");
            } else {
                // setErrorMessage(response.data.message);
                // setLoading(false);
                alert("Error: " + response.data.message);
            }
        } catch (error) {
            console.error(`Error during logout: ${error.message}`);
        }
    };

    return (
        <nav className="flex bg-customBlue rounded-t-lg justify-between items-center h-16  text-white relative shadow-sm font-mono" role="navigation">
            <a href="/" className="pl-8 text-2xl font-bold text-orange-500">TensorGo</a>
    

            <div className='flex gap-4 '>
                <a href="/dashboard">
                    <div className='bg-orange-500 p-2 mt-1 w-22 h-10 border-1 rounded-lg'>
                        Dashboard
                    </div>
                </a>
                <div className="pr-8 flex gap-2 justify-between items-center">
                    {(user === null) && <button className='bg-orange-500 p-2 border-1 rounded-lg'>
                        <a href="/signin" className="p-4 font-semibold">Login</a>
                    </button>}
                    {user !== null && (
                        <button
                            onClick={logoutUser}
                            className="bg-orange-500 p-2 border-1 rounded-lg"
                        >
                            Logout
                        </button>
                    )}
                </div>

                <div className='relative w-10 h-12 p-1 mr-10 upper'>
                    <h1 className='absolute top-3 left-5 text-lg text-red-600 font-bold z-50'>{cart?.length || 0}</h1>
                    <img src={cartIcon} alt="cart" className='w-full h-full' />
                </div>

            </div>
        </nav>
    )
}
export default Navbar