import { useState, useEffect } from "react";
import {getRestocks,deleteRestock,updateRestock,} from "../../managers/restockManager";
import { getMedications } from "../../managers/medicationManager";
import { getSuppliers } from "../../managers/supplierManager";
import { useNavigate } from "react-router-dom";
import "./Restocks.css";

export const Restocks = () => {
  const navigate = useNavigate();
  const [restocks, setRestocks] = useState([]);
  const [medications, setMedications] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [editingRestockId, setEditingRestockId] = useState(null);
  const [editingRestock, setEditingRestock] = useState({
    medicationId: "",
    supplierId: "",
    quantityAdded: 0,
    dateAdded: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const restocksData = await getRestocks();
      setRestocks(restocksData);

      const medicationsData = await getMedications();
      setMedications(medicationsData);

      const suppliersData = await getSuppliers();
      setSuppliers(suppliersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteRestock = (restock) => {
    deleteRestock(restock)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting restock:", error);
      });
  };

  const handleEditRestock = (restock) => {
    setEditingRestockId(restock.id);
    setEditingRestock({
      medicationId: restock.medicationId,
      supplierId: restock.supplierId,
      quantityAdded: restock.quantityAdded,
      dateAdded: restock.dateAdded?.slice(0, 10), // format for input
    });
  };

  const handleCancelEdit = () => {
    setEditingRestockId(null);
    setEditingRestock({
      medicationId: "",
      supplierId: "",
      quantityAdded: 0,
      dateAdded: "",
    });
  };

  const handleSaveEdit = () => {
    updateRestock({
      id: editingRestockId,
      medicationId: editingRestock.medicationId,
      supplierId: editingRestock.supplierId,
      quantityAdded: editingRestock.quantityAdded,
      date: editingRestock.dateAdded,
    })
      .then(() => {
        fetchData();
        setEditingRestockId(null);
      })
      .catch((error) => {
        console.error("Error updating restock:", error);
      });
  };

  const renderRestockItem = (restock) => {
    if (editingRestockId === restock.id) {
      return (
        <li key={restock.id} className="restock-item">
          <select
            value={editingRestock.medicationId}
            onChange={(e) =>
              setEditingRestock({
                ...editingRestock,
                medicationId: parseInt(e.target.value),
              })
            }
          >
            <option value="">Select Medication</option>
            {medications.map((medication) => (
              <option key={medication.id} value={medication.id}>
                {medication.name}
              </option>
            ))}
          </select>

          <select
            value={editingRestock.supplierId}
            onChange={(e) =>
              setEditingRestock({
                ...editingRestock,
                supplierId: parseInt(e.target.value),
              })
            }
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={editingRestock.quantityAdded}
            onChange={(e) =>
              setEditingRestock({
                ...editingRestock,
                quantityAdded: parseInt(e.target.value),
              })
            }
          />

          <input
            type="date"
            value={editingRestock.dateAdded}
            onChange={(e) =>
              setEditingRestock({
                ...editingRestock,
                dateAdded: e.target.value,
              })
            }
          />

          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </li>
      );
    } else {
      return (
        <li key={restock.id} className="restock-item">
          <p>
            Medication:{" "}
            {medications.find((m) => m.id === restock.medicationId)?.name ||
              "Unknown Medication"}
          </p>
          <p>
            Supplier:{" "}
            {suppliers.find((s) => s.id === restock.supplierId)?.name ||
              "Unknown Supplier"}
          </p>
          <p>Quantity Added: {restock.quantityAdded}</p>
          <p>Date Added: {new Date(restock.dateAdded).toLocaleDateString()}</p>
          <button onClick={() => handleEditRestock(restock)}>Edit</button>
          <button onClick={() => handleDeleteRestock(restock)}>Delete</button>
        </li>
      );
    }
  };

  return (
    <div className="restocks-container">
      <h2>Restocks</h2>
      <ul className="restocks-list">
        {restocks.map((restock) => renderRestockItem(restock))}
      </ul>
      <button onClick={() => navigate("/restocks/create")}>Add Restock</button>
    </div>
  );
};
