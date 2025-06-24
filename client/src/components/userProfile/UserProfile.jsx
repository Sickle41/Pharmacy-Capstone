import { useState, useEffect } from "react";
import { tryGetLoggedInUser } from "../../managers/authManager";
import "./UserProfile.css";

export const UserProfile = () => {
    const [user, setUser] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const user = await tryGetLoggedInUser();
            setUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleChangePassword = () => {
        // Implement password change functionality here
        alert("Change password functionality not implemented yet.");
    };






    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            <div className="user-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
}
