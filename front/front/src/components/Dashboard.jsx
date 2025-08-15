import React from "react";
import "../App.css"; // Assuming your CSS is here

const Dashboard = ({ gym = [], onGymRemoved }) => {

    const handleRemoveGym = async (gymId) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:5000/gyms/${gymId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                alert("Failed to remove gym.");
                return;
            }
            onGymRemoved && onGymRemoved(gymId);
        } catch (err) {
            alert("Error removing gym.");
        }
    };


    return (
        <div className="dashboard">
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Capacity</th>
                        <th>Occupancy</th>
                    </tr>
                </thead>
                <tbody>
                    {gym.map((gym, idx) => {
                        const occupancyPercent = gym.occupancy
                        const isFull = occupancyPercent >= (gym.capacity / 2);

                        return (
                            <tr key={idx}>

                                <td>{gym.name}
                                    <button
                                        className="dashboard-remove-gym"
                                        type="button"
                                        style={{ marginLeft: "1em" }}
                                        onClick={() => handleRemoveGym(gym._id)}
                                    >
                                        -
                                    </button>
                                </td>

                                <td>{gym.capacity}</td>
                                <td>
                                    <p className={`dashboard-occupancy${isFull ? " dashboard-occupancy-full" : ""}`}>
                                        {gym.occupancy}
                                    </p>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>

    );
};

export default Dashboard;