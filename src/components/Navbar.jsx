import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useCart } from '../Context';
import { IoCartOutline } from "react-icons/io5";
function Navbar() {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("ID");
    const user = storedUser ? storedUser : null;
    const cart = useCart();

    // console.log("cart", cart);
    const logoutUser = async () => {
        try {
            localStorage.removeItem("ID");
            localStorage.removeItem("isSuperAdmin");
            localStorage.removeItem("isAdmin");
            localStorage.removeItem("email");
            localStorage.removeItem("username");
            const Token = localStorage.getItem("accessToken");
            localStorage.removeItem("accessToken");
            console.log("Token1", Token);
            const url = `http://localhost:3000/ravi/v1/users/logout`;
            const response = await axios.post(
                url,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                    },
                    withCredentials: true,
                }
            );

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


            <div className='flex w-[32%] justify-between items-center'>
                <a href="/dashboard" >
                    <div className='bg-orange-500 hover:bg-orange-600 p-2  w-22 h-10 border-1 rounded-lg'>
                        Dashboard
                    </div>
                </a>
                <div className="flex justify-between items-center">
                    {(user === null) && <button className='bg-orange-500 hover:bg-orange-600 p-2 border-1 rounded-lg'>
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

                <a href="/history">
                    <button
                        className="bg-orange-500 p-2 border-1 rounded-lg"
                    >
                        History
                    </button>
                </a>


                <div>
                    <a href="/cart">
                        <div className='relative  p-1 mr-10 upper hover:scale-105 transition duration-200'>
                            <h1 className='absolute -top-1 left-7 text-xl h-6 w-6 bg-red-500  rounded-full text-white font-extrabold z-50 '>{cart?.items?.length || 0}</h1>
                            <div className='text-5xl'>
                                <IoCartOutline />
                            </div>
                        </div>
                    </a>
                </div>

            </div>
        </nav>
    )
}
export default Navbar