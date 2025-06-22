import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addMedication } from "../../../managers/medicationManager";
import { getSuppliers } from "../../../managers/supplierManager";
import "./CreateMedications.css";

export const CreateMedications = ({ loggedInUser }) => {
    const [name, setName] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [quantityInStock, setQuantityInStock] = useState(0);
    const [supplierId, setSupplierId] = useState(0);
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const newMedication = {
            name: name,
            manufacturer: manufacturer,
            expirationDate: expirationDate,
            quantityInStock: parseInt(quantityInStock),
            supplierIds: [supplierId],
            userProfileId: loggedInUser.id,
        };

        addMedication(newMedication)
            .then(() => {
                navigate("/medications");
            })
            .catch((error) => {
                console.error("Error adding medication:", error);
            });
    };

    useEffect(() => {
        getSuppliers()
            .then(setSuppliers)
            .catch((error) => {
                console.error("Error fetching suppliers:", error);
            });
    }, []);

    return (
        <div className="create-medication-container">
            <h2>Create New Medication</h2>
            <form className="create-medication-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="manufacturer">Manufacturer:</label>
                    <input
                        type="text"
                        id="manufacturer"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expirationDate">Expiration Date:</label>
                    <input
                        type="date"
                        id="expirationDate"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantityInStock">Quantity in Stock:</label>
                    <input
                        type="number"
                        id="quantityInStock"
                        value={quantityInStock}
                        onChange={(e) => setQuantityInStock(e.target.value)}
                        required
                    />
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
                <button type="submit">Create Medication</button>
            </form>
        </div>
    );
};