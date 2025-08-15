import React, { useState } from "react";
import { authFetch } from './authFetch';

const Inputs = ({ onClientAdded, onClientDeleted, username }) => {
    const [form, setForm] = useState({ phone: "", email: "", name: "", gymName: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authFetch("http://localhost:5000/clients", {
                method: "POST",
                body: JSON.stringify(form)
            });
            setMessage("Checked in successfully!");
            onClientAdded && onClientAdded();
        } catch {
            setMessage("Check-in failed.");
        }
        setForm({ phone: "", email: "", name: "", gymName: "" });
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await authFetch("http://localhost:5000/clients/checkout", {
                method: "POST",
                body: JSON.stringify({ name: form.name, gymName: form.gymName })
            });
            setMessage("Checked out successfully!");
            onClientDeleted && onClientDeleted();
        } catch {
            setMessage("Check-out failed.");
        }
        setForm({ phone: "", email: "", name: "", gymName: "" });
    };

    return (
        <form className="client-form" onSubmit={handleSubmit}>
            <div className="client">
                <div className="client-inputs">
                    <h3>Welcome {username} </h3>
                    <input type="text" id="gymName" placeholder="Gym-Name" value={form.gymName} onChange={handleChange} />
                    <button type="submit" id="submit" className="client-button">Check In</button>
                    <button type="button" id="checkout" className="client-checkOut" onClick={handleDelete}>Check out</button>
                    {message && <div className="client-message">{message}</div>}
                </div>
            </div>
        </form>
    );
};

export default Inputs;