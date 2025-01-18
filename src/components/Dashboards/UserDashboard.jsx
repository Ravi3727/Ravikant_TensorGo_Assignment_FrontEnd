import React, { useEffect, useState } from 'react'
import axios from "axios";
import PlanCard from './planDisplay';
import OrganizationDisplay from './orgDisplay';
import NormalOrganizationDisplay from './NormalUserOrgDisplay';
import UnpaidUser from './UnpaidUser';
function UserDashboard() {
    const [tab, setTab] = useState('organizations');
    const [organization, setOrganization] = useState();
    const [plans, setPlans] = useState();
    const urlOrg = "http://localhost:3000/ravi/v1/org";
    const urlOrgByUser = "http://localhost:3000/ravi/v1/orgbyid";
    const urlPlan = "http://localhost:3000/ravi/v1/plan";
    const [OrgByUserID,getOrgByUserID] = useState();
    const isSuperAdmin = localStorage.getItem('isSuperAdmin') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const username = localStorage.getItem('username');
    const getOrganization = async () => {
        try {
            const userId = localStorage.getItem('ID');
            // console.log(userId);
            const response = await axios.get(`${urlOrg}?userId=${userId}`);
            // console.log(response);
            console.log("get org  ", response.data.data);
            setOrganization(response.data.data);
        } catch (error) {
            console.error('Error fetching organizations:', error);
        }
    }

    const getPlans = async () => {
        try {
            // const userId = localStorage.getItem('ID');
            // console.log(userId);
            const response = await axios.get(`${urlPlan}`);
            // console.log(response);
            console.log("get planes ", response.data.data);
            setPlans(response.data.data);
        } catch (error) {
            console.error('Error fetching Plans:', error);
        }
    }

    const getOrgsWithUserId = async (userId) => {
        const response = await axios.get(`${urlOrgByUser}?userId=${userId}`);
        getOrgByUserID(response.data.data);
        console.log("filter by user Id ",response.data.data);
    }


    useEffect(() => {
        const userId = localStorage.getItem('ID');
        if (isSuperAdmin) {
            getOrganization();
            getPlans();
        }
        if(isAdmin) {
            getOrgsWithUserId(userId); 
        }
    }, [isSuperAdmin, isAdmin]);


    const handleClick = (value) => {
        setTab(value);
    }


    return (
        <>
            <div className='w-full min-h-screen rounded-b-lg bg-customBlue '>
                <div className='w-full h-12 text-white flex justify-center items-center space-y-5'>
                    <h1 className="text-4xl font-bold text-center mb-8 mt-4">Welcome {username}</h1>
                </div>

                {/* Super Admin */}

                {isSuperAdmin && (
                    <>
                        <div className="w-full h-12 text-white flex justify-evenly items-center">
                            {/* Organizations Button */}
                            <div className="flex flex-col gap-2 justify-evenly items-center font-semibold">
                                <button
                                    onClick={() => handleClick('organizations')}
                                    className="hover:text-orange-500 text-xl"
                                >
                                    Organizations
                                </button>
                                <div className="w-36 h-[2px] bg-yellow-400"></div>
                            </div>

                            {/* Plans Button */}
                            <div className="flex flex-col gap-2 justify-evenly items-center font-semibold">
                                <button
                                    onClick={() => handleClick('Plans')}
                                    className="hover:text-orange-500 text-xl"
                                >
                                    Plans
                                </button>
                                <div className="w-16 h-[2px] bg-yellow-400"></div>
                            </div>
                        </div>

                        <div className="w-full h-full">
                            {tab === 'organizations' && (
                                <div className="w-full mx-auto h-full text-white flex flex-col justify-center items-center">
                                    <div className="w-full">
                                        <OrganizationDisplay organization={organization} />
                                    </div>
                                </div>
                            )}
                            {tab === 'Plans' && (
                                <div className="w-full h-full text-white flex flex-col justify-center items-center">
                                    <div>
                                        <PlanCard plans={plans} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </>)}

                {/* Admin  */}
                {
                    (isAdmin && !isSuperAdmin )&& (
                        <div className='w-full mx-auto h-full text-white flex flex-col justify-center items-center'>
                            <div className='w-full'>
                                <NormalOrganizationDisplay organization={OrgByUserID} />
                            </div>
                        </div>
                    )
                }



                {/* Normal User */}
                {
                    !isSuperAdmin && !isAdmin && (
                        <div className='w-full mx-auto h-full text-white flex flex-col justify-center items-center'>
                            <div className='w-full'>
                                <UnpaidUser />
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default UserDashboard