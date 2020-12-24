import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext({ user: null });

// eslint-disable-next-line react/prop-types
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      setUser(userAuth);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}
