import { useEffect, useState } from "react";
import { getMedications, expiringSoonMedications } from "../../managers/medicationManager";
import { recentRestocks } from "../../managers/restockManager";
import "./Home.css";

export const Home = () => {
    const [medications, setMedications] = useState([]);
    const [restocks, setRestocks] = useState([]);
    const [expiringMedications, setExpiringMedications] = useState([]);

    useEffect(() => {
        getMedications()
            .then((data) => {
                
                setMedications(data);
            });

        // Fetch restocks for the past month
        recentRestocks()
            .then(setRestocks)
            .then(() => {
                
            });
        // Fetch medications expiring in the next month
        expiringSoonMedications()
            .then(setExpiringMedications);
    }, []);

    const calculateTotalQuantity = () => {
        let total = 0;
        medications.forEach(medication => {
            total += (parseInt(medication.quantityInStock) || 0);
        });
        return total;
    };

    const totalQuantity = calculateTotalQuantity();

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
                               Name {restock.medication} - Quantity Added {restock.quantityAdded} - Date Added {new Date(restock.date).toLocaleDateString()}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="column">
                <h2>Expiring Medications (Next Month)</h2>
                <ul>
                    {expiringMedications.map((medication) => (
                        <li key={medication.id}>
                            {medication.name} - Expiration Date {new Date(medication.expirationDate).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};