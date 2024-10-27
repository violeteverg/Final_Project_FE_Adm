import Dashboard from "./pages/_dashboard/Dashboard";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkToken } from "./lib/utils";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const alias = await checkToken();
      if (alias === "ADMIN") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='mx-auto w-full h-full'>
      <Dashboard />
    </div>
  );
}

export default App;
