
import { useEffect, useState } from "react";

function Home() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/clients", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });


        if (!res.ok) {
            let errorMessage = "Failed to fetch clients.";
            try {
                const err = await res.json();
                errorMessage = err.message || errorMessage;
            } catch {
                errorMessage = "Failed to fetch clients. Invalid response.";
            }
            throw new Error(errorMessage);
        }
        const data = await res.json();
        setClients(data);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    console.log(clients);
    return (
        <>

            <header className="home-header">
                <h1>Home</h1>
            </header>
            <div className="home-container">
                <main className="home-content">

                    <h1 className="home-timer">{time}</h1>

                </main>
            </div>
        </>
    );
}

export default Home;