import {useContext} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Index from "./Index/Index";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Login from "./Login/Login";
import Register from "./Register/Register";
import PageLayout from "./PageLayout/PageLayout";
import AuthContext from "../contexts/AuthContext";

export default function App() {
  const { login, isAuthenticated } = useContext(AuthContext)

  function handleSignIn({ token }) {
    login(token)
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout/>}>
            <Route path="/sign-in" element={<Login onSignIn={handleSignIn}/>}/>
            <Route path="/sign-up" element={<Register/>}/>
            <Route index path="/" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirectPath={"/sign-in"}>
                <Index/>
              </ProtectedRoute>
            }/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}