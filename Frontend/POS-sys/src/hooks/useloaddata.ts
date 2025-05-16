import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../https/index";
import { useEffect, useState } from "react";
import { removeUser, setUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store"; 
import { User } from "../https/api.types"; 

const useLoadData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // // Get existing user state (for accessToken and isAuth)
  const { accessToken,isAuth} = useSelector((state: RootState) => state.userReducer);
  console.log("[useLoadData] Access Token:", accessToken,isAuth);
  
  useEffect(() => {
    //  if (!accessToken) return; 
    const fetchUser = async () => {
      try {
        const data: User = await getUserData();
        const { _id, name, email, phone, role } = data;
        
        // Preserve accessToken
        dispatch(setUser({
          _id,
          name,
          email,
          phone,
          role,
          accessToken, 
          isAuth: true,
        }));

        // console.log("[useLoadData] User data fetched successfully:", data);
      } catch (error) {
        console.error("[useLoadData] Error fetching user data:", error);
        dispatch(removeUser());
        navigate("/auth"); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, navigate, accessToken]);

  return isLoading;
};

export default useLoadData;
