import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addRestock } from "../../../managers/restockManager";
import { getMedications } from "../../../managers/medicationManager";
import { getSuppliers } from "../../../managers/supplierManager";
import "./CreateRestock.css";

export const CreateRestock = ({ loggedInUser }) => {
    const [medicationId, setMedicationId] = useState(0);
    const [supplierId, setSupplierId] = useState(0);
    const [quantityAdded, setQuantityAdded] = useState(0);
    const [dateAdded, setDateAdded] = useState("");
    const [medications, setMedications] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const newRestock = {
            medicationId: parseInt(medicationId),
            supplierId: parseInt(supplierId),
            quantityAdded: parseInt(quantityAdded),
            date: dateAdded,
            userProfileId: loggedInUser.id,
        };

        addRestock(newRestock)
            .then(() => {
                navigate("/restocks");
            })
            .catch((error) => {
                console.error("Error adding restock:", error);
            });
    };

    useEffect(() => {
        getMedications()
            .then(setMedications)
            .catch((error) => {
                console.error("Error fetching medications:", error);
            });

        getSuppliers()
            .then(setSuppliers)
            .catch((error) => {
                console.error("Error fetching suppliers:", error);
            });
    }, []);

    return (
        <div className="create-restock-container">
            <h2>Create New Restock</h2>
            <form className="create-restock-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="medicationId">Medication:</label>
                    <select
                        id="medicationId"
                        value={medicationId}
                        onChange={(e) => {
                            setMedicationId(parseInt(e.target.value));
                        }}
                    >
                        <option value={0}>Select a medication</option>
                        {medications.map((medication) => (
                            <option key={medication.id} value={medication.id}>
                                {medication.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="supplierId">Supplier:</label>
                    <select
                        id="supplierId"
                        value={supplierId}
                        onChange={(e) => {
                            setSupplierId(parseInt(e.target.value));
                        }}
                    >
                        <option value={0}>Select a supplier</option>
                        {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="quantityAdded">Quantity Added:</label>
                    <input
                        type="number"
                        id="quantityAdded"
                        value={quantityAdded}
                        onChange={(e) => setQuantityAdded(parseInt(e.target.value))}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateAdded">Date Added:</label>
                    <input
                        type="date"
                        id="dateAdded"
                        value={dateAdded}
                        onChange={(e) => setDateAdded(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Restock</button>
            </form>
        </div>
    );
};