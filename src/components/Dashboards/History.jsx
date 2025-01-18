import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NormalOrganizationDisplay from './NormalUserOrgDisplay';

function History() {
    const urlOrgByUser = "http://localhost:3000/ravi/v1/orgbyid";
    const [OrgByUserID, getOrgByUserID] = useState();
    const isAdmin = localStorage.getItem('isAdmin') === 'true';


    const getOrgsWithUserId = async (userId) => {
        const response = await axios.get(`${urlOrgByUser}?userId=${userId}`);
        getOrgByUserID(response.data.data);
        console.log("filter by user Id ", response.data.data);
    }

    useEffect(() => {
        const userId = localStorage.getItem('ID');
        if (isAdmin) {
            getOrgsWithUserId(userId);
        }
    }, [isAdmin]);

    return (
        <>

            {
                !isAdmin ? <h1 className='text-center text-3xl text-white min-h-screen bg-customBlue flex justify-center items-center'>Brows plans </h1> : (
                <div className='w-full mx-auto min-h-screen bg-customBlue text-white flex flex-col justify-center items-center'>
                    <div className='w-full'>
                        <NormalOrganizationDisplay organization={OrgByUserID} />
                    </div>
                </div>)
            }

        </>
    )
}

export default History