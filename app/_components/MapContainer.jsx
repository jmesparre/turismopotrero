"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/maplibre";
import marcadores from "./marcadores.json";
import {
  Waves,
  Footprints,
  Trees,
  Beer,
  ForkKnife,
  IceCream,
  Coffee,
  Home,
  Tent,
  BedSingle,
  Building,
  BusFront,
} from "lucide-react";
import { useMapContext } from "./MapContext";
import "./maplibre-gl.css";

const streetsStyle = "https://api.maptiler.com/maps/streets/style.json?key=QQA77dxgxuJjLwWBDCe5";
const satelliteStyle = "https://api.maptiler.com/maps/satellite/style.json?key=QQA77dxgxuJjLwWBDCe5";

function MapContainer() {
  const [selectedMarkerId, setSelectedMarkerId] = useState(null); // Solo un marcador seleccionado
  const popupContentRef = useRef(null);
  const { visibleCategories } = useMapContext(); // Accede al contexto para categorías visibles
  
  const [mapStyle, setMapStyle] = useState(streetsStyle);

  const toggleMapStyle = () => {
    setMapStyle((prevStyle) => 
      prevStyle === streetsStyle ? satelliteStyle : streetsStyle
    );
  };

  const bounds = [
    [-66.28, -33.248],
    [-66.18, -33.19],
  ];

  const togglePopup = (marcadorId) => {
    setSelectedMarkerId((prevId) =>
      prevId === marcadorId ? null : marcadorId
    );
  };

  const handleClickOutside = useCallback((e) => {
    if (popupContentRef.current && !popupContentRef.current.contains(e.target)) {
      setSelectedMarkerId(null);
    }
  }, []);

  useEffect(() => {
    if (selectedMarkerId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedMarkerId, handleClickOutside]);

  function getIcono(iconoNombre) {
    switch (iconoNombre) {
      case "Waves":
        return Waves;
      case "Footprints":
        return Footprints;
      case "Trees":
        return Trees;
      case "Beer":
        return Beer;
      case "ForkKnife":
        return ForkKnife;
      case "IceCream":
        return IceCream;
      case "Coffee":
        return Coffee;
      case "Building":
        return Building;
      case "Tent":
        return Tent;
      case "BedSingle":
        return BedSingle;
      case "Home":
        return Home;
      case "BusFront":
        return BusFront;
      default:
        return null;
    }
  }

  return (
    <>
      <button onClick={toggleMapStyle} className="absolute top-4 right-4 z-10 bg-white p-2 rounded shadow">
        Cambiar a {mapStyle === streetsStyle ? "Satélite" : "Calle"}
      </button>
      <Map
        className="fixed top-0"
        initialViewState={{
          longitude: -66.237,
          latitude: -33.222,
          zoom: 13.5,
        }}
        style={{ width: "100%", height: "100%", position: "fixed" }}
        mapStyle={mapStyle}  // Cambiado a usar el estado
        maxZoom={16}
        maxBounds={bounds}
      >
        {marcadores.marcadores.map((marcador) => {
          const Icono = getIcono(marcador.icono);

          if (!Icono) {
            console.error(`Icono no encontrado para ${marcador.icono}`);
            return null;
          }

          // Filtra los marcadores según la categoría visible
          if (!visibleCategories[marcador.subcategoria]) {
            return null;
          }

          return (
            <React.Fragment key={marcador.id}>
              <Marker
                longitude={marcador.ubicacion.longitude}
                latitude={marcador.ubicacion.latitude}
                onClick={() => togglePopup(marcador.id)}
                className="bg-white rounded shadow p-1 hover:p-1.5 transition ease-out"
              >
                <div>
                  <Icono size={23} />
                </div>
              </Marker>
              {selectedMarkerId === marcador.id && (
                <Popup
                  longitude={marcador.ubicacion.longitude}
                  latitude={marcador.ubicacion.latitude}
                  anchor="top"
                  onClose={() => setSelectedMarkerId(null)}
                  closeOnClick={false}
                >
                  <div className="pt-2 pb-2 pl-4 pr-4" ref={popupContentRef}>
                    <h3 className="pb-2 scroll-m-20 text-2xl font-semibold tracking-tight">
                      {marcador.popup.titulo}
                    </h3>
                    <p>
                      <strong>Categoría:</strong> {marcador.categoria}
                    </p>
                    <p>
                      <strong>Subcategoría:</strong> {marcador.subcategoria}
                    </p>
                    <p className="pt-2">{marcador.popup.descripcion}</p>
                  </div>
                </Popup>
              )}
            </React.Fragment>
          );
        })}
        <NavigationControl
          position="bottom-right"
          showCompass
          showZoom
          visualizePitch
        />
      </Map>
    </>
  );
}

export default MapContainer;
