import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePlans() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        duration: "",
        maxUsers: "",
        features: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const url = "http://localhost:3000/ravi/v1/plan";
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            price: Number(formData.price), 
            maxUsers: Number(formData.maxUsers),
            features: formData.features.split(",").map((feature) => feature.trim()), 
        };

        try {
            const response = await axios.post(url, payload);
            console.log("Plan created:", response);
            if (response.data.success) {
                navigate("/plans");
            }
        } catch (error) {
            console.error("Error creating plan:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-customBlue">
            <div className="max-w-md w-full space-y-8 bg-customBlue mx-auto border-1 rounded-md p-2 backdrop-filter backdrop-blur-lg select-none">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Create a Plan
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-2 p-2">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
                    />
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
                    ></textarea>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
                    />
                    <input
                        id="duration"
                        name="duration"
                        type="text"
                        placeholder="Duration (e.g., '1 month')"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
                    />
                    <input
                        id="maxUsers"
                        name="maxUsers"
                        type="number"
                        placeholder="Max Users"
                        value={formData.maxUsers}
                        onChange={handleChange}
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
                    />
                    <input
                        id="features"
                        name="features"
                        type="text"
                        placeholder="Features (comma-separated)"
                        value={formData.features}
                        onChange={handleChange}
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2"
                >
                    {loading ? "Loading..." : "Create Plan"}
                </button>
            </form>
        </div>
        </div>
    );
}

export default CreatePlans;
