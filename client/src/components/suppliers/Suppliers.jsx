import { useState, useEffect } from "react";
import "./Suppliers.css";
import { getSuppliers, updateSupplier, deleteSupplier, getSupplierById } from "../../managers/supplierManager";
import { useNavigate } from "react-router-dom";

export const Suppliers = () => {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [editedSupplierName, setEditedSupplierName] = useState("");

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = () => {
        getSuppliers()
            .then((data) => {
                setSuppliers(data);
            })
            .catch((error) => {
                console.error("Error fetching suppliers:", error);
            });
    };

    const handleDeleteSupplier = (supplier) => {
        deleteSupplier(supplier)
            .then(() => {
                fetchSuppliers(); // Refresh the supplier list
            })
            .catch((error) => {
                console.error("Error deleting supplier:", error);
            });
    };

    const handleEditSupplier = (supplier) => {
        getSupplierById(supplier.id)
            .then((data) => {
                setEditingSupplier({...data, suppliers: []});
                setEditedSupplierName(data.name);
            })
            .catch((error) => {
                console.error("Error fetching supplier details:", error);
            });
    };

    const handleCancelEdit = () => {
        setEditingSupplier(null);
        setEditedSupplierName("");
    };

    const handleSaveEdit = () => {
        if (editedSupplierName.trim() === "") {
            alert("Supplier name cannot be empty.");
            return;
        }

        const updatedSupplier = {
            ...editingSupplier,
            name: editedSupplierName
        };

        updateSupplier(updatedSupplier)
            .then(() => {
                fetchSuppliers(); // Refresh the supplier list
                setEditingSupplier(null);
                setEditedSupplierName("");
            })
            .catch((error) => {
                console.error("Error updating supplier:", error);
            });
    };

    return (
        <div className="suppliers-container">
            <h2>Suppliers</h2>
            <table className="suppliers-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact Info</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.id}>
                            <td>
                                {editingSupplier?.id === supplier.id ? (
                                    <input
                                        type="text"
                                        value={editedSupplierName}
                                        onChange={(e) => setEditedSupplierName(e.target.value)}
                                    />
                                ) : (
                                    supplier.name
                                )}
                            </td>
                            <td>
                                {editingSupplier?.id === supplier.id ? (
                                    <input
                                        type="text"
                                        value={editingSupplier?.contactInfo || ""}
                                        onChange={(e) => setEditingSupplier({...editingSupplier, contactInfo: e.target.value})}
                                    />
                                ) : (
                                    supplier.contactInfo
                                )}
                            </td>
                            <td>
                                {editingSupplier?.id === supplier.id ? (
                                    <>
                                        <button onClick={handleSaveEdit}>Save</button>
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditSupplier(supplier)}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteSupplier(supplier)}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate("/suppliers/create")}>Add Supplier</button>
        </div>
    );
}
