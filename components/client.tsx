"use client";

import React, { useState, useEffect } from "react";

interface ClientProps {
  children: React.ReactNode;
}

const Client: React.FC<ClientProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default Client;
