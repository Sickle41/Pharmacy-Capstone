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
                        <th>Manufacturer</th>
                        <th>Expiration Date</th>
                        <th>Quantity in Stock</th>
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
                                        value={editingSupplier?.manufacturer || ""}
                                        onChange={(e) => setEditingSupplier({...editingSupplier, manufacturer: e.target.value})}
                                    />
                                ) : (
                                    supplier.manufacturer
                                )}
                            </td>
                            <td>
                                {editingSupplier?.id === supplier.id ? (
                                    <input
                                        type="date"
                                        value={editingSupplier?.expirationDate || ""}
                                        onChange={(e) => setEditingSupplier({...editingSupplier, expirationDate: e.target.value})}
                                    />
                                ) : (
                                    new Date(supplier.expirationDate).toLocaleDateString()
                                )}
                            </td>
                            <td>
                                {editingSupplier?.id === supplier.id ? (
                                    <input
                                        type="number"
                                        value={editingSupplier?.quantityInStock || 0}
                                        onChange={(e) => setEditingSupplier({...editingSupplier, quantityInStock: parseInt(e.target.value)})}
                                    />
                                ) : (
                                    supplier.quantityInStock
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
