import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Spin from "../../Spin";

function RegistrationForm() {
    const nevigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        fullName: "",
    });

    const handelAdmin = (user) => {
        if (user === "User") {
            setIsSuperAdmin(false);
        } else {
            setIsSuperAdmin(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const url = "http://localhost:3000/ravi/v1/users/register";
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Include isSuperAdmin in the payload
        const payload = {
            ...formData,
            isSuperAdmin,
        };

        try {
            const response = await axios.post(url, payload);
            console.log("register", response);
            if (response.data.success === true) {
                nevigate("/signin");
            }
        } catch (error) {
            console.error("Error registering user: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full space-y-8 shadow-xl bg-customBlue border-1 rounded-md p-2 backdrop-filter backdrop-blur-lg select-none">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                SignUp Todo Calendar
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-2 p-2">
                    <div className="flex justify-between w-32 h-10 rounded-xl">
                        <button
                            type="button"
                            onClick={() => handelAdmin("User")}
                            className={`w-16 h-10 ${
                                !isSuperAdmin ? "bg-orange-600" : "bg-orange-500"
                            } flex justify-center items-center text-white font-semibold p-2 rounded-s-2xl`}
                        >
                            User
                        </button>
                        <button
                            type="button"
                            onClick={() => handelAdmin("superAdmin")}
                            className={`w-16 h-10 ${
                                isSuperAdmin ? "bg-orange-600" : "bg-orange-500"
                            } flex justify-center items-center text-white font-semibold p-2 rounded-e-2xl`}
                        >
                            Super Admin
                        </button>
                    </div>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-orange-500"
                    />
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500"
                    />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500"
                    />
                </div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2"
                >
                    {loading ? "Loading..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
}

export default RegistrationForm;
