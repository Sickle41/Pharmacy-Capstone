import { useState, useEffect } from "react";
import "./Medications.css";
import { getMedications, updateMedication, deleteMedication, getMedicationById } from "../../managers/medicationManager";
import { useNavigate } from "react-router-dom";

import { tryGetLoggedInUser } from "../../managers/authManager";
export const Medications = () => {
    const navigate = useNavigate();
    const [medications, setMedications] = useState([]);
    const [editingMedication, setEditingMedication] = useState(null);
    const [editedMedicationName, setEditedMedicationName] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        tryGetLoggedInUser().then(user => {
            setLoggedInUser(user);
        });
    }, []);

    useEffect(() => {
        fetchMedications();
    }, []);

    const fetchMedications = () => {
        getMedications()
            .then((data) => {
                setMedications(data);
            })
            .catch((error) => {
                console.error("Error fetching medications:", error);
            });
    };

    const handleDeleteMedication = (medication) => {
        deleteMedication(medication)
            .then(() => {
                fetchMedications(); // Refresh the medication list
            })
            .catch((error) => {
                console.error("Error deleting medication:", error);
            });
    };

    const handleEditMedication = (medication) => {
        getMedicationById(medication.id)
            .then((data) => {
                setEditingMedication({...data, suppliers: []});
                setEditedMedicationName(data.name);
            })
            .catch((error) => {
                console.error("Error fetching medication details:", error);
            });
    };

    const handleCancelEdit = () => {
        setEditingMedication(null);
        setEditedMedicationName("");
    };

    const handleSaveEdit = () => {
        if (editedMedicationName.trim() === "") {
            alert("Medication name cannot be empty.");
            return;
        }

        const updatedMedication = {
            ...editingMedication,
            name: editedMedicationName
        };

        updateMedication(updatedMedication)
            .then(() => {
                fetchMedications(); // Refresh the medication list
                setEditingMedication(null);
                setEditedMedicationName("");
            })
            .catch((error) => {
                console.error("Error updating medication:", error);
            });
    };

    return (
        <div className="medications-container">
            <h2>Medications</h2>
            <table className="medications-table">
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
                    {medications.map((medication) => (
                        <tr key={medication.id}>
                            <td>
                                {editingMedication?.id === medication.id ? (
                                    <input
                                        type="text"
                                        value={editedMedicationName}
                                        onChange={(e) => setEditedMedicationName(e.target.value)}
                                    />
                                ) : (
                                    medication.name
                                )}
                            </td>
                            <td>
                                {editingMedication?.id === medication.id ? (
                                    <input
                                        type="text"
                                        value={editingMedication?.manufacturer || ""}
                                        onChange={(e) => setEditingMedication({...editingMedication, manufacturer: e.target.value})}
                                    />
                                ) : (
                                    medication.manufacturer
                                )}
                            </td>
                            <td>
                                {editingMedication?.id === medication.id ? (
                                    <input
                                        type="date"
                                        value={editingMedication?.expirationDate || ""}
                                        onChange={(e) => setEditingMedication({...editingMedication, expirationDate: e.target.value})}
                                    />
                                ) : (
                                    new Date(medication.expirationDate).toLocaleDateString()
                                )}
                            </td>
                            <td>
                                {editingMedication?.id === medication.id ? (
                                    <input
                                        type="number"
                                        value={editingMedication?.quantityInStock || 0}
                                        onChange={(e) => setEditingMedication({...editingMedication, quantityInStock: parseInt(e.target.value)})}
                                    />
                                ) : (
                                    medication.quantityInStock
                                )}
                            </td>
                            <td>
                                {editingMedication?.id === medication.id ? (
                                    <>
                                        <button onClick={handleSaveEdit}>Save</button>
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        {loggedInUser?.id === medication.userProfileId && (
                                            <>
                                                <button onClick={() => handleEditMedication(medication)}>
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDeleteMedication(medication)}>
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate("/medications/create")}>Add Medication</button>
        </div>
    );
}
