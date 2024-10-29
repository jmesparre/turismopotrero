// MapContext.js
"use client";
import { createContext, useContext, useState } from "react";

const MapContext = createContext();

export const useMapContext = () => useContext(MapContext);

export function MapProvider({ children }) {
  const [visibleCategories, setVisibleCategories] = useState({});
  const [selectedLocalidad, setSelectedLocalidad] = useState(null); // Nueva propiedad de estado

  return (
    <MapContext.Provider value={{ visibleCategories, setVisibleCategories, selectedLocalidad, setSelectedLocalidad }}>
      {children}
    </MapContext.Provider>
  );
}
