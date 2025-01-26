import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spin from "../../Spin";
import { AppContext } from "../../context/AppContext";

const url = "http://localhost:3000/ravi/v1/users/login";

function LoginForm() {
    const { setUser } = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const handelAdmin = (user) => {
        if (user === "User") {
            setIsSuperAdmin(false);
        } else {
            setIsSuperAdmin(true);
        }
    }
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        isSuperAdmin: isSuperAdmin,
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post(url, formData);

            if (response.data.success === true) {
                const userData = response.data.data.loggedInUser;
                setUser(userData);
                localStorage.setItem("ID", userData._id);
                localStorage.setItem("isSuperAdmin", userData.isSuperAdmin);
                localStorage.setItem("isAdmin", userData.isAdmin);
                localStorage.setItem("email",userData.email);
                localStorage.setItem("username",userData.username);
                navigate(`/`);
                setLoading(false);
            }else{
                setErrorMessage(response.data.message);
                setLoading(false);
                alert("Error: " + response.data.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            if (axios.isAxiosError(error) && error.response) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(error.response.data, "text/html");
                const preElement = doc.querySelector("pre");

                if (preElement) {
                    const preText = preElement.textContent || "";
                    const match = preText.match(
                        /Error: (Invalid password|User does not exist)/
                    );
                    if (match) {
                        setErrorMessage(match[1]);
                    } else {
                        setErrorMessage("An unknown error occurred.");
                    }
                } else {
                    setErrorMessage("An unknown error occurred.");
                }
            } else {
                setErrorMessage("An unknown error occurred.");
            }
            setLoading(false);
        }
    };

    return (
        <>
            <div className="max-w-md w-full space-y-8 shadow-xl bg-customBlue border-1 rounded-md p-2 backdrop-filter backdrop-blur-lg select-none">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Login to TensorGo 
                    </h2>
                </div>
                {errorMessage && (
                    <div className="text-red-500 text-center">{errorMessage}</div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-2 p-2">

                        {/* Admin Toggle  */}
                        <div className="flex justify-between w-36 h-10 rounded-xl">
                            <div className="w-18 h-10 bg-orange-500 flex justify-center items-center text-white font-semibold p-2 hover:bg-orange-600 rounded-s-2xl">
                                <button onClick={() => handelAdmin("User")} >
                                    User
                                </button>
                            </div>

                            <div className="w-18 text-md h-10 bg-orange-500 flex justify-center items-center text-white font-semibold p-1 hover:bg-orange-600 rounded-e-2xl">
                                <button onClick={() => handelAdmin("superAdmin")} >
                                    Super Admin
                                </button>
                            </div>
                        </div>


                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        {loading ? (
                            <button className='bg-blue-500 w-20 text-white font-semibold p-1 rounded-lg mt-2 hover:bg-blue-600'>
                                {loading ? <Spin /> : "please wait..."}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mb-1 p-2"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </form>

                <div>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Create an account{" "}
                        <a
                            href="/signup"
                            className="font-medium text-indigo-600 hover:text-indigo-500 underline"
                        >
                            SignUp
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default LoginForm;