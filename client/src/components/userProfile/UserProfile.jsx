import { useState, useEffect } from "react";
import { tryGetLoggedInUser } from "../../managers/authManager";
import "./UserProfile.css";
import { updatePassword } from "../../managers/userProfileManager";

export const UserProfile = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

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

    const handleChangePassword = async () => {
        try {
            await updatePassword(currentPassword, newPassword);
            alert("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
        } catch (error) {
            console.error("Error updating password:", error);
            alert("Failed to update password.");
        }
    };

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            <div className="user-info">
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button onClick={handleChangePassword}>Change Password</button>
            </div>
        </div>
    );
}
