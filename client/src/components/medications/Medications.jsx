import { useState, useEffect } from "react";
import "./Medications.css";
import { getMedications, updateMedication, deleteMedication, getMedicationById } from "../../managers/medicationManager";
import { useNavigate } from "react-router-dom";

export const Medications = () => {
    const [medications, setMedications] = useState([]);
    const [editingMedication, setEditingMedication] = useState(null);
    const [editedMedicationName, setEditedMedicationName] = useState("");
    const [newMedicationName, setNewMedicationName] = useState("");

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

        const updatedMedication = { ...editingMedication, name: editedMedicationName };

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

    const handleAddMedication = () => {
        if (newMedicationName.trim() === "") {
            alert("Medication name cannot be empty.");
            return;
        }

        const newMedication = { name: newMedicationName };

        addMedication(newMedication)
            .then(() => {
                fetchMedications(); // Refresh the medication list
                setNewMedicationName(""); // Clear the input field
            })
            .catch((error) => {
                console.error("Error adding medication:", error);
            });
    };

    return (
        <div className="medications-container">
            <h2>Medications</h2>
            <ul className="medications-list">
                {medications.map((medication) => (
                    <li className="medication-item" key={medication.id}>
                        {editingMedication?.id === medication.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedMedicationName}
                                    onChange={(e) => setEditedMedicationName(e.target.value)}
                                />
                                <div className="medication-actions">
                                    <button onClick={handleSaveEdit}>Save</button>
                                    <button onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                                {medication.name}
                                <div className="medication-actions">
                                    <button onClick={() => handleEditMedication(medication)}>
                                        Edit
                                    </button>
                                   <button onClick={() => handleDeleteMedication(medication)}>
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="New medication name"
                value={newMedicationName}
                onChange={(e) => setNewMedicationName(e.target.value)}
            />
            <button onClick={handleAddMedication}>Add Medication</button>
        </div>
    );
}
