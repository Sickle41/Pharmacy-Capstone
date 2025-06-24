import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from "./home/Home";
import { Medications } from "./medications/Medications";
import { CreateMedications } from "./medications/createMedications/CreateMedications";
import { Suppliers } from "./suppliers/Suppliers";
import { CreateSuppliers } from "./suppliers/createSuppliers/CreateSuppliers";
import { Restocks } from "./restocks/Restocks"; 
import { CreateRestock } from "./restocks/createRestock/CreateRestock";


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
          path="/suppliers"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Suppliers loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
     
        <Route
          path="/suppliers/create"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CreateSuppliers loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
         <Route 
        path="/restocks"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <Restocks loggedInUser={loggedInUser} />
          </AuthorizedRoute>
        }
        />
         <Route 
        path="/restocks/create"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <CreateRestock loggedInUser={loggedInUser} />
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
