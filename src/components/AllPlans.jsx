import React, { useContext, useEffect, useState } from 'react';
import PlainPlanCard from './PlainPlanCard';
import axios from 'axios';
const AllPlans = () => {
    const [plans, setPlans] = useState();
    const urlPlan = "http://localhost:3000/ravi/v1/plan";
    const getPlans = async () => {
        try {
            const response = await axios.get(urlPlan);
            // console.log(response);
            // console.log("get planes ", response.data.data);
            setPlans(response.data.data);
        } catch (error) {
            console.error('Error fetching Plans:', error);
        }
    }

    useEffect(() => {
        getPlans();
    }, []);


    return (
        <div className="container mx-auto p-4 bg-customBlue min-h-screen rounded-b-lg">
            <h1 className='text-orange-500 text-3xl font-bold text-center'>
                All Available Plans 
            </h1>
           <PlainPlanCard plans={plans}/>
        </div>
    );
};

export default AllPlans;
