import React, { useState } from 'react';
import AppRoutes from "./routes";
import UserContext from './context/UserContext';

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppRoutes />
    </UserContext.Provider>
  );
}