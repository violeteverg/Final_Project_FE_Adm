import Dashboard from "./pages/_dashboard/Dashboard";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkToken, getUser } from "./lib/utils";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/app/slice";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(null);
  const dispatch = useDispatch();

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
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();

      dispatch(setUser(userData));
    };

    fetchUser();
  }, [dispatch]);
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
