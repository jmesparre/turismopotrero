"use client"
import { createContext, useContext, useState } from "react";

const MapContext = createContext();

export const useMapContext = () => useContext(MapContext);

export function MapProvider({ children }) {
  const [visibleCategories, setVisibleCategories] = useState({});

  return (
    <MapContext.Provider value={{ visibleCategories, setVisibleCategories }}>
      {children}
    </MapContext.Provider>
  );
}
