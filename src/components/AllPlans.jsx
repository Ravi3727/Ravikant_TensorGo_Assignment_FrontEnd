import React, { useEffect, useState } from 'react';
import PlainPlanCard from './PlainPlanCard';
import axios from 'axios';
const AllPlans = () => {
    // const data = {
    //     "success": true,
    //     "message": "Plans retrieved successfully",
    //     "data": [
    //         {
    //             "_id": "6789ed8ea9ec3bf217c9b171",
    //             "name": "Plane one",
    //             "description": "hello jee",
    //             "price": 3999,
    //             "duration": "1 year",
    //             "maxUsers": 5,
    //             "features": [
    //                 "5 user",
    //                 "unlimited excess",
    //                 "life time excess"
    //             ],
    //             "__v": 0
    //         },
    //         {
    //             "_id": "6789eddaa9ec3bf217c9b173",
    //             "name": "Premium",
    //             "description": "premium plan",
    //             "price": 4999,
    //             "duration": "1 year",
    //             "maxUsers": 10,
    //             "features": [
    //                 "life time excess",
    //                 "more than 10 users"
    //             ],
    //             "__v": 0
    //         }
    //     ]
    // };
    const [plans, setPlans] = useState();
    const urlPlan = "http://localhost:3000/ravi/v1/plan";
    const getPlans = async () => {
        try {
            // const userId = localStorage.getItem('ID');
            // console.log(userId);
            const response = await axios.get(urlPlan);
            // console.log(response);
            console.log("get planes ", response.data.data);
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
