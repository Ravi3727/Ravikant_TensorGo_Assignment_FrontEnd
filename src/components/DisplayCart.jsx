import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Spin from "../Spin"
import axios from 'axios';
import { useCart } from '../Context';

function DisplayCart() {

    const [orgName, setOrgName] = useState('');
    const [popUp, setPopUp] = useState(false);
    const [planId, setPlanId] = useState('');
    const [planName, setplanName] = useState('');
    const [amount, setamount] = useState('');
    const [planQuantity, setplanQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [Tab, setTab] = useState('plans');
    const cart = useCart();
    console.log("Diaplay cart  ", cart);

    const totalAmount = cart.items.reduce((total, item) => total + item.price, 0);
    const removeFromCart = (id) => {
        console.log("id", id);
        cart.setItems(cart.items.filter((item) => item.id !== id));
    };
    // const removeCart = (id) => {
    //     removeFromCart(id);
    // }
    const openPopUp = (id, name, price) => {
        setPopUp(true);
        setPlanId(id);
        setplanName(name);
        setamount(price);
        setplanQuantity(1);
    }

    const closePopUp = () => {
        setPopUp(false);
    }


    const checkout = async () => {
        const userId = localStorage.getItem('ID');
        const email = localStorage.getItem('email');
        const payload = {
            planId: planId,
            orgName: orgName,
            userId: userId,
            planName,
            amount,
            planQuantity,
            email
        };

        try {
            setLoading(true);

            const paymentResponse = await axios.post("http://localhost:3000/ravi/v1/payment", payload);
            console.log("Payment response:", paymentResponse);
            if (paymentResponse.data.success) {
                window.location.href = paymentResponse.data.url;
            } else {
                alert("Payment session creation failed. Please try again.");
            }
        } catch (error) {
            console.error("Error initiating payment:", error.response?.data || error.message);
            alert("Failed to initiate payment. Please try again.");
        } finally {
            setLoading(false);
            closePopUp();
        }
    };

    const toggleTab = (tab) => {
        if (tab === 'plans') {
            setTab("plans");
        }
        if (tab === 'history') {
            setTab("history");
        }
    }

    return (
        <>

            <div className='w-full min-h-screen bg-customBlue'>
                <div className="w-[90%] mx-auto">
                    <div className="flex justify-evenly items-center w-full gap-4">
                        <div
                            onClick={() => toggleTab("plans")}
                            className={`cursor-pointer text-white text-3xl font-semibold leading-6 text-center mb-10 ${Tab === "plans" ? "underline" : ""
                                }`}
                        >
                            Your Plans
                        </div>
                        <div
                            onClick={() => toggleTab("history")}
                            className={`cursor-pointer text-white text-3xl font-semibold leading-6 text-center mb-10 ${Tab === "history" ? "underline" : ""
                                }`}
                        >
                            Order History
                        </div>
                    </div>

                    {Tab === "plans" ? (
                        <div className="flex flex-col gap-4">
                            <div className="text-white text-3xl font-semibold leading-6 text-center mb-10">
                                Total Amount: ₹{totalAmount}
                            </div>
                            {cart &&
                                cart.items?.map((plan) => (
                                    <div
                                        key={plan._id}
                                        className={`max-w-[320px] flex flex-col justify-between rounded-lg shadow-md p-4 hover:shadow-lg mx-auto hover:scale-105 transition duration-200 ${plan.name === "Plus Plan"
                                                ? "bg-yellow-300"
                                                : plan.name === "Standard Plan"
                                                    ? "bg-orange-400"
                                                    : "bg-orange-700"
                                            }`}
                                    >
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">{plan.name}</h2>
                                            <p className="text-gray-900 mt-2">{plan.description}</p>
                                            <p className="mt-4 text-gray-800">
                                                <span className="font-bold">Price:</span> ₹{plan.price}
                                            </p>
                                            <p className="text-gray-800">
                                                <span className="font-bold">Duration:</span> {plan.duration}
                                            </p>
                                            <p className="text-gray-800">
                                                <span className="font-bold">Max Users:</span> {plan.maxUsers}
                                            </p>
                                            <div className="mt-4">
                                                <h3 className="font-bold text-gray-800">Features:</h3>
                                                <ul className="list-disc text-start pl-5 text-gray-800">
                                                    {plan.feature.map((feature, index) => (
                                                        <li key={index}>{feature}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="flex w-full justify-evenly items-center gap-4">
                                            <button
                                                onClick={() => openPopUp(plan._id, plan.name, plan.price)}
                                                className="bg-customBlue p-2 rounded-lg w-full text-white font-semibold hover:scale-105 transition duration-200"
                                            >
                                                Buy Now
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(plan.id)}
                                                className="bg-customBlue p-2 rounded-lg w-full text-white font-semibold hover:scale-105 transition duration-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            {popUp && (
                                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
                                    <div className="w-[500px] h-[200px] bg-customBlue rounded-lg shadow-lg p-4">
                                        <h1 className="text-2xl text-white font-semibold text-center">
                                            Enter Organization Name
                                        </h1>
                                        <input
                                            type="text"
                                            className="w-full font-semibold text-black h-10 border-2 border-gray-300 rounded-lg p-2 mt-6"
                                            placeholder="Organization Name"
                                            value={orgName}
                                            onChange={(e) => setOrgName(e.target.value)}
                                        />
                                        <div className="w-full flex justify-between mt-6">
                                            <button
                                                onClick={closePopUp}
                                                className="bg-red-400 p-2 rounded-lg w-20 text-white font-semibold"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={checkout}
                                                className="bg-green-400 p-2 rounded-lg w-20 text-white font-semibold"
                                            >
                                                {loading ? <Spin /> : "Submit"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-white text-center">History</div>
                    )}
                </div>

            </div>

        </>



    )
}
DisplayCart.propTypes = {
    plans: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            duration: PropTypes.string.isRequired,
            maxUsers: PropTypes.number.isRequired,
            features: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
    ),
}

export default DisplayCart