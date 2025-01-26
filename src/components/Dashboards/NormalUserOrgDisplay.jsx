import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import Spin from "../../Spin";

const NormalOrganizationDisplay = ({ organization }) => {
    const [loading, setLoading] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const [openPopUp, setOpenOpUp] = useState(false);
    const [orgId, setOrgId] = useState('');
    const [planId, setPlanId] = useState('');
    const [email, setEmail] = useState('');
    const [Error, setError] = useState('');
    const [ErrorMSG, setErrorMSG] = useState('');
    const [users, setUsers] = useState();
    const [viewUser, setViewUser] = useState(false);
    const url = "http://localhost:3000/ravi/v1/assign-user-to-plan";
    const getUserregeteredToPlan = "http://localhost:3000/ravi/v1/get-users-by-plan";
    const deleteUrl = "http://localhost:3000/ravi/v1/remove-user-from-plan";


    const getUsersByPlan = async (planId) => {
        try {
            setLoadingUser(true);
            setPlanId(planId);
            const response = await axios.get(`${getUserregeteredToPlan}?planId=${planId}`);
            console.log("get users by plan ", response);
            setUsers(response.data.users);
            setViewUser(true);
            setLoadingUser(false);
        } catch (error) {
            console.error('Error fetching users:', error.response.data.message);
            setErrorMSG(error.response.data.message);
            alert(error.response.data.message);
            setLoadingUser(false);
        }
    }

    const addUserToPlane = async () => {

        console.log("Add user to plan:", planId);
        try {
            setLoading(true);
            const payload = {
                email: email,
                planId: planId,
                organizationId: orgId
            }
            const response = await axios.post(url, payload);
            console.log(response);

        } catch (error) {
            console.error("Error adding user to plan:", error.response?.data.message);
            setError(error.response?.data.message);
            alert(Error);
        } finally {
            setLoading(false);
            setEmail('');
            closePopUp();
        }
    }

    const deleteUserFromPlan = async (email,orgID) => {
        const payload = {
            email: email,
            planId: planId,
            organizationId: orgID
        }

        console.log(payload);
        try {
            const response = await axios.post(deleteUrl,payload);
            console.log("delete user from plan", response);
            getUsersByPlan(planId);
        } catch (error) {
            console.error("Error deleting user from plan:", error);
        }
    }


    const toggleopenPopUp = (id, ID) => {
        setOpenOpUp(true);
        setPlanId(id);
        setOrgId(ID);
    }


    const closePopUp = () => {
        setOpenOpUp(false);
    };

    return (
        <div className="w-full h-full">
            <h1 className="text-3xl font-bold text-center text-orange-500">Organizations</h1>
            {
                !organization || organization?.length === 0 ? (<h2 className="text-2xl my-auto mt-48 flex justify-center items-center  font-semibold text-yellow-500">No Organizations Found</h2>)

                    : (
                        <div className=" text-black">
                            {/* {organization[0].name} */}
                            {organization?.map((org) => (
                                <div key={org?._id} className=" p-2 flex flex-col justify-evenly">
                                    <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
                                        {org.name}
                                    </h2>
                                    <div className="flex w-11/12 mx-auto h-full shadow-lg justify-evenly items-center">
                                        <div className="w-[25%] mb-4 flex flex-col justify-start items-center bg-gray-200 leading-8 rounded-lg p-4 ">
                                            <h3 className="text-xl font-medium text-orange-500">User Info</h3>
                                            <p className="text-gray-800">Name: {org.userId?.fullName || "N/A"}</p>
                                            <p className="text-gray-800">Email: {org.userId?.email || "N/A"}</p>
                                            <p className="text-gray-800">
                                                Username: {org.userId?.username || "N/A"}
                                            </p>
                                            <p className="text-gray-800">
                                                Role: {org.userId?.isSuperAdmin ? "Super Admin" : "Admin"}
                                            </p>
                                        </div>

                                        <div className=" w-[75%]">
                                            <div className="flex justify-evenly items-center p-2">
                                                {org.planId.map((plan) => (

                                                    <div
                                                        key={plan._id}
                                                        className={`${plan.name === "Plus Plan" ? "bg-yellow-300" : (plan.name === 'Basic Plan' ? "bg-orange-700" : "bg-orange-400")} shadow rounded-lg p-4 leading-2 max-w-[250px] min-w-[250px] min-h-[375px] max-h-[375px] overflow-y-auto flex flex-col justify-evenly`}
                                                    >
                                                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                                                            {plan.name}
                                                        </h4>
                                                        <p className="text-gray-800">{plan.description}</p>
                                                        <p className="text-gray-900 font-medium">
                                                            Price: ₹{plan.price}
                                                        </p>
                                                        <p className="text-gray-800">Duration: {plan.duration}</p>
                                                        <p className="text-gray-800">
                                                            Max Users: {plan.maxUsers}
                                                        </p>
                                                        <h5 className="text-sm font-semibold mt-2 text-gray-800">
                                                            Features:
                                                        </h5>
                                                        <ul className="list-disc list-inside text-gray-800">
                                                            {plan.features.map((feature, index) => (
                                                                <li key={index}>{feature}</li>
                                                            ))}
                                                        </ul>


                                                        <div className="">
                                                            <button onClick={() => toggleopenPopUp(plan._id, org._id)} className="bg-customBlue p-2 w-full h-10 text-white rounded-lg ">
                                                                Add Member
                                                            </button>

                                                            <button onClick={() => getUsersByPlan(plan._id)} className="bg-customBlue p-2 w-full h-10 text-white rounded-lg mt-2">
                                                                {loadingUser ? "Loading..." : "View"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {
                                openPopUp && (
                                    <div>
                                        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center'>
                                            <div className='w-[500px] h-[200px] bg-customBlue rounded-lg shadow-lg p-4'>
                                                <h1 className='text-2xl text-white font-semibold text-center'>Enter Member Email ID</h1>
                                                <input type='text' className='w-full font-semibold text-black h-10 border-2 border-gray-300 rounded-lg p-2 mt-6' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <div className='w-full flex justify-between mt-6'>
                                                    <button onClick={closePopUp} className='bg-red-400 p-2 rounded-lg w-20 text-white font-semibold'>Cancel</button>
                                                    <button onClick={addUserToPlane} className='bg-green-400 p-2 rounded-lg w-20 h-12 text-white font-semibold flex justify-center items-center'>
                                                        {
                                                            loading ? <Spin /> : "Submit"
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            }

                            {
                                viewUser && (
                                    <div>
                                        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center'>
                                            <div className='w-[500px] max-h-[450px] overflow-y-hidden bg-customBlue rounded-lg shadow-lg p-4'>
                                                <h1 className='text-2xl text-orange-500 font-semibold text-center'>Users Registered To The Plan</h1>
                                                {
                                                    (ErrorMSG && users.length === 0) ? <p className='text-red-500 text-center font-semibold'>{ErrorMSG}</p> : (<div className='w-full max-h-[250px] min-h-[250px] overflow-y-hidden'>
                                                        {
                                                            users.map((user) => (
                                                                <>

                                                                    <div className="flex w-full justify-evenly items-center">
                                                                        <div key={user.user._id} className='flex justify-between w-10/12 items-center p-2 border-b-2 border-gray-300 text-white mt-4 '>
                                                                            
                                                                            <p>{user.user.username}</p>
                                                                            <p>{user.user.email}</p>
                                                                        </div>

                                                                        <div className="text-red-500 font-semibold mt-4 p-2">
                                                                            <button onClick={() => deleteUserFromPlan(user.user.email,user.organization)}>
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ))
                                                        }
                                                    </div>)
                                                }

                                                <div className='w-full flex justify-between mt-6'>
                                                    <button onClick={() => setViewUser(false)} className='bg-red-400 p-2 rounded-lg w-20 text-white font-semibold'>Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                    )
            }
        </div>
    );
};

NormalOrganizationDisplay.propTypes = {
    organization: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            userId: PropTypes.shape({
                fullName: PropTypes.string,
                email: PropTypes.string,
                username: PropTypes.string,
                isSuperAdmin: PropTypes.bool,
            }),
            planId: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    description: PropTypes.string,
                    price: PropTypes.number.isRequired,
                    duration: PropTypes.string.isRequired,
                    maxUsers: PropTypes.number.isRequired,
                    features: PropTypes.arrayOf(PropTypes.string).isRequired,
                })
            )
        })
    )
};

export default NormalOrganizationDisplay;