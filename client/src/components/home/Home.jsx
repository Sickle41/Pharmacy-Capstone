import { useEffect, useState } from "react";
import { getMedications } from "../../managers/medicationManager";
import "./Home.css";

export const Home = () => {
    const [medications, setMedications] = useState([]);
    const [restocks, setRestocks] = useState([]);
    const [expiringMedications, setExpiringMedications] = useState([]);

    useEffect(() => {
        getMedications()
            .then(setMedications);

        // Fetch restocks for the past month
        fetch("/api/restocklog/pastmonth")
            .then((res) => res.json())
            .then(setRestocks);

        // Fetch medications expiring in the next month
        fetch("/api/medication/expiringnextmonth")
            .then((res) => res.json())
            .then(setExpiringMedications);
    }, []);

    const totalQuantity = medications.reduce((sum, medication) => sum + medication.quantity, 0);

    return (
        <div className="home-container">
            <div className="column">
                <h2>Medications</h2>
                <p>Total Medications: {medications.length}</p>
                <p>Total Quantity: {totalQuantity}</p>
            </div>
            <div className="column">
                <h2>Restocks (Past Month)</h2>
                <ul>
                    {restocks.map((restock) => (
                        <li key={restock.id}>
                            {restock.medicationName} - {restock.quantity} - {restock.restockDate}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="column">
                <h2>Expiring Medications (Next Month)</h2>
                <ul>
                    {expiringMedications.map((medication) => (
                        <li key={medication.id}>
                            {medication.name} - {medication.expirationDate}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};