// Sử dụng useContext để làm localStorage
// Setup
import { createContext, useContext, useState } from "react";
import { CURRENT_USER } from "../../Constants";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    return user || null;
  });

  const handleSignIn = (user) => {
    setCurrentUser(user);
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    localStorage.clear(CURRENT_USER);
  };
  return (
    <UserContext.Provider value={{ currentUser, handleSignIn, handleLogOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(UserContext);
  return value;
};
