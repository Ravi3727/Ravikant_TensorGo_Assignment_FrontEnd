import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const url = "http://localhost:3000/ravi/v1/plan";

const PlanCard = ({ plans }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    maxUsers: "",
    features: "",
  });
  console.log("plans   ",plans);

  const deletePlan = async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      if (response.data.success) {
        alert("Plan deleted successfully");
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
      alert("Failed to delete plan");
    }
  };

  const openEditModal = (plan) => {
    setCurrentPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      duration: plan.duration,
      maxUsers: plan.maxUsers,
      features: plan.features.join(", "),
    });
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setCurrentPlan(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePlan = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        features: formData.features.split(",").map((feature) => feature.trim()),
      };
      const response = await axios.patch(`${url}/${currentPlan._id}`, updatedData);
      if (response.data.success) {
        // alert("Plan updated successfully");
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating plan:", error);
      alert("Failed to update plan");
    } finally {
      closeEditModal();
    }
  };

  return (
    <div className="p-6 w-[70vw] mt-4">
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-center">Available Plans</h1>
        <a href="/create-plan" target="_blank">
          <button className="bg-orange-500 text-white p-2 rounded-lg">
            Add Plan
          </button>
        </a>
      </div>
      <div className="flex gap-4">
        {plans?.map((plan) => (
          <div
            key={plan._id}
            className="max-w-[320px] mx-auto flex flex-col justify-between rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 bg-orange-400"
          >

            <div> 
            <h2 className="text-xl font-semibold text-gray-900">{plan.name}</h2>
            <p className="text-gray-800 mt-2">{plan.description}</p>
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
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            </div>
            <div className="flex justify-between mt-4 ">
              <button
                className="bg-green-400 p-2 rounded-lg w-16"
                onClick={() => openEditModal(plan)}
              >
                Edit
              </button>
              <button
                className="bg-red-400 p-2 rounded-lg w-16"
                onClick={() => deletePlan(plan._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Plan</h2>
            <form onSubmit={updatePlan}>
              <div className="mb-4">
                <label className="block text-gray-900 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2  bg-gray-200 border rounded-md text-black font-semibold"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-semibold">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-gray-200 p-2 border rounded-md text-black font-semibold"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-200 border rounded-md text-black font-semibold"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-semibold">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-200 border rounded-md text-black font-semibold"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-semibold">Max Users</label>
                <input
                  type="number"
                  name="maxUsers"
                  value={formData.maxUsers}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-200 border rounded-md text-black font-semibold"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-semibold">Features</label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  placeholder="Comma-separated (e.g., feature1, feature2)"
                  className="w-full p-2 bg-gray-200 border rounded-md text-black font-semibold"
                />
              </div>
              <div className="flex justify-center space-x-8">
                <button
                  type="button"
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md font-semibold"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

PlanCard.propTypes = {
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
  ).isRequired,
};

export default PlanCard;
