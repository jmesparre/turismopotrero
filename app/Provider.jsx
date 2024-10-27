// Provider.js
import React from "react";
import SidebarTool from "./_components/SidebarTool";
import { MapProvider } from "./_components/MapContext"; // Importa el MapProvider

function Provider({ children }) {
  return (
    <MapProvider>
      <div>
        <SidebarTool />
        {children}
      </div>
    </MapProvider>
  );
}

export default Provider;
