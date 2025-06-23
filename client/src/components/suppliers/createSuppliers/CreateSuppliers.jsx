import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSupplier } from "../../managers/supplierManager";
import "./CreateSuppliers.css";

export const CreateSuppliers = () => {
    const [name, setName] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSupplier = {
            name: name,
            contactInfo: contactInfo
        };

        addSupplier(newSupplier)
            .then(() => {
                navigate("/suppliers");
            });
    };

    return (
        <div className="create-supplier-container">
            <h2>Add New Supplier</h2>
            <form className="create-supplier-form" onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="contactInfo">Contact Info:</label>
                    <input
                        type="text"
                        id="contactInfo"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        required
                    />
                </fieldset>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};