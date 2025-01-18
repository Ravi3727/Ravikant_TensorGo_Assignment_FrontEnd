import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import Spin from "../../Spin";

const UnpaidUser = () => {
    const [loading, setLoading] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const [organization, setOrganization] = useState([]);
    const [orgId, setOrgId] = useState('');
    const [planId, setPlanId] = useState('');
    const [ErrorMSG, setErrorMSG] = useState('');
    const [users, setUsers] = useState();
    const [viewUser, setViewUser] = useState(false);
    const getUserregeteredToPlan = "http://localhost:3000/ravi/v1/get-users-by-plan";
    const urlOrgByUser = "http://localhost:3000/ravi/v1/get-userplan-by-userId";



    const getUsersPlanByUserId = async (userId) => {
        try {
            // console.log("get org ", userId);
            setLoading(true);
            const response = await axios.get(`${urlOrgByUser}/${userId}`);
            // console.log("get org by user id ", response.data.assignments);
            setOrganization(response.data.assignments);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching organizations:', error);
            setLoading(false);
        }
    };

    const getUsersByPlan = async (planId) => {
        try {
            setLoadingUser(true);
            setPlanId(planId);
            const response = await axios.get(`${getUserregeteredToPlan}?planId=${planId}`);
            // console.log("get users by plan ", response);
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

    useEffect(() => {
        const userId = localStorage.getItem('ID');
        getUsersPlanByUserId(userId);
    }, []);



    // const toggleopenPopUp = (id, ID) => {
    //     setOpenOpUp(true);
    //     setPlanId(id);
    //     setOrgId(ID);
    // }
    // const closePopUp = () => {
    //     setOpenOpUp(false);
    // };

    return (
        <div className="w-full h-full">
            <h1>The plans and organizations that you part of...</h1>
            <h1 className="text-3xl font-bold text-center text-orange-500">Organizations</h1>
            {
                !organization || organization?.length === 0 ? (<h2 className="text-2xl my-auto mt-48 flex justify-center items-center  font-semibold text-yellow-500">No Organizations Found</h2>)

                    : (
                        <div className=" text-black">
                            {/* {organization[0].name} */}
                            {organization?.map((org) => (
                                <div key={org?.organization?._id} className=" p-2 flex flex-col justify-evenly">
                                    <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
                                        {org?.organization?.name}
                                    </h2>
                                    <div className="flex w-11/12 mx-auto h-full shadow-lg justify-evenly items-center">
                                        <div className=" w-[75%]">
                                            <div className="flex justify-evenly items-center p-2">


                                                <div

                                                    className={`${org.plan.name === "Plus Plan" ? "bg-yellow-300" : (org.plan.name === 'Basic Plan' ? "bg-orange-700" : "bg-orange-400")} shadow rounded-lg p-4 leading-2 max-w-[250px] min-w-[250px] min-h-[375px] max-h-[375px] overflow-y-auto flex flex-col justify-evenly`}
                                                >
                                                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                                                        {org.plan.name}
                                                    </h4>
                                                    <p className="text-gray-800">{org.plan.description}</p>
                                                    <p className="text-gray-900 font-medium">
                                                        Price: ₹{org.plan.price}
                                                    </p>
                                                    <p className="text-gray-800">Duration: {org.plan.duration}</p>
                                                    <p className="text-gray-800">
                                                        Max Users: {org.plan.maxUsers}
                                                    </p>
                                                    <h5 className="text-sm font-semibold mt-2 text-gray-800">
                                                        Features:
                                                    </h5>
                                                    <ul className="list-disc list-inside text-gray-800">
                                                        {org?.plan?.features?.map((feature, index) => (
                                                            <li key={index}>{feature}</li>
                                                        ))}
                                                    </ul>


                                                    <div className="">

                                                        <button onClick={() => getUsersByPlan(org.plan._id)} className="bg-customBlue p-2 w-full h-10 text-white rounded-lg mt-2">
                                                            {loadingUser ? "Loading..." : "View"}
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}

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


export default UnpaidUser;



