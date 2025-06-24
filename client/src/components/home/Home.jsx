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
            <div className="row">
                <div className="col-12">
                    <h2>Medications</h2>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Total Medications</th>
                                <th>Total Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="d-flex flex-column">
                                        <div>Total:</div>
                                        <div>{medications.length}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex flex-column">
                                        <div>Quantity:</div>
                                        <div>{totalQuantity}</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h2>Restocks (Past Month)</h2>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity Added</th>
                                <th>Date Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restocks.map((restock) => (
                                <tr key={restock.id}>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <div>Name:</div>
                                            <div>{restock.medication}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <div>Quantity:</div>
                                            <div>{restock.quantityAdded}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <div>Date:</div>
                                            <div>{new Date(restock.date).toLocaleDateString()}</div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h2>Expiring Medications (Next Month)</h2>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Expiration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expiringMedications.map((medication) => (
                                <tr key={medication.id}>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <div>Name:</div>
                                            <div>{medication.name}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <div>Expiration:</div>
                                            <div>{new Date(medication.expirationDate).toLocaleDateString()}</div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};