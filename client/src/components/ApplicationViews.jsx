import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from "./home/Home";
import { Medications } from "./medications/Medications";
import { CreateMedications } from "./medications/createMedications/CreateMedications";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home loggedInUser={loggedInUser} />
           </AuthorizedRoute>
          }
        />
        <Route
          path="/medications"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Medications loggedInUser={loggedInUser} />
           </AuthorizedRoute>
          }
        />
         <Route
          path="/medications/create"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CreateMedications loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
        
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
