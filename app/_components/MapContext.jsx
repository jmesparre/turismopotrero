// MapContext.js
"use client";
import { createContext, useContext, useState } from "react";

const MapContext = createContext();

export const useMapContext = () => useContext(MapContext);

export function MapProvider({ children }) {
  const [visibleCategories, setVisibleCategories] = useState({});
  const [selectedLocalidad, setSelectedLocalidad] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: -66.32880,
    latitude: -33.25044,
    zoom: 10.5,
  });

  return (
    <MapContext.Provider value={{ visibleCategories, setVisibleCategories, selectedLocalidad, setSelectedLocalidad, viewState, setViewState }}>
      {children}
    </MapContext.Provider>
  );
}
