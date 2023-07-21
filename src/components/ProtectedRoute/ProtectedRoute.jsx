import {Navigate} from "react-router-dom";

export default function ProtectedRoute({redirectPath, isAuthenticated, children}) {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace/>
  }

  return children
}