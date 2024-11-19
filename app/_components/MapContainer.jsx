"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Map, { Marker, Popup, NavigationControl, Source, Layer } from "react-map-gl/maplibre";
import rawMarcadores from "./marcadores.json"; // JSON sin IDs explícitos
import { Waves, Footprints, Trees, Beer, ForkKnife, IceCream, Coffee, Home, Tent, BedSingle, Building, BusFront } from "lucide-react";
import { useMapContext } from "./MapContext";
import "./maplibre-gl.css";

const streetsStyle = "https://api.maptiler.com/maps/streets/style.json?key=QQA77dxgxuJjLwWBDCe5";
const satelliteStyle = "https://api.maptiler.com/maps/satellite/style.json?key=QQA77dxgxuJjLwWBDCe5";

function MapContainer() {
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [visibleRoutes, setVisibleRoutes] = useState(new Set());
  const [marcadores, setMarcadores] = useState([]); // Estado para guardar marcadores con IDs generados
  const { visibleCategories } = useMapContext();
  
  const [mapStyle, setMapStyle] = useState(streetsStyle);

  useEffect(() => {
    // Generar IDs únicos al cargar los marcadores
    const marcadoresConId = rawMarcadores.marcadores.map((marcador, index) => ({
      id: `marcador-${index + 1}`, // Genera un ID único basado en el índice
      ...marcador,
    }));
    setMarcadores(marcadoresConId);
  }, []);

  const toggleMapStyle = () => {
    setMapStyle((prevStyle) => (prevStyle === streetsStyle ? satelliteStyle : streetsStyle));
  };

  const bounds = [
    [-67.34, -35.02],
    [-64.54, -32.35],
  ];

  const togglePopup = (marcadorId) => {
    setSelectedMarkerId((prevId) => (prevId === marcadorId ? null : marcadorId));
  };

  const handleClickOutside = useCallback((e) => {
    const popup = document.querySelector(".maplibregl-popup");
    if (popup && !popup.contains(e.target)) {
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

  const getIcono = (iconoNombre) => {
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
  };

  const [viewState, setViewState] = useState({
    longitude: -66.3288,
    latitude: -33.25044,
    zoom: 10.5,
  });

  const { selectedLocalidad } = useMapContext();

  useEffect(() => {
    if (selectedLocalidad) {
      const { longitude, latitude, zoom } = selectedLocalidad.viewState;
      setViewState({ longitude, latitude, zoom });
    }
  }, [selectedLocalidad]);

  return (
    <>
      <button
        onClick={toggleMapStyle}
        className="select-none absolute bottom-10 right-2 medium text-xs z-10 bg-white hover:text-primary p-1 rounded shadow"
      >
        Cambiar a {mapStyle === streetsStyle ? "Satélite" : "Calle"}
      </button>
      <Map
        className="fixed top-0"
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%", position: "fixed" }}
        mapStyle={mapStyle}
        maxZoom={16}
        maxBounds={bounds}
      >
        {marcadores.map((marcador) => {
          const Icono = getIcono(marcador.icono);
          if (!Icono) {
            console.error(`Icono no encontrado para ${marcador.icono}`);
            return null;
          }

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
                  onClose={() => setSelectedMarkerId(null)}
                  closeOnClick={false}
                  className="popup-style select-none"
                >
                  <div className="pl-4 pr-4 pb-1 pt-1 subpixel-antialiased">
                    <h3 className="subpixel-antialiased scroll-m-20 text-lg font-extrabold tracking-tight mb-2">
                      {marcador.popup.titulo}
                    </h3>
                    <p className="text-xs font-light leading-4">{marcador.popup.descripcion}</p>
                    {(marcador.subcategoria === "Caminatas" || marcador.categoria === "Transporte") && (
                      <>
                        <button className="bg-gray-200 hover:bg-gray-300 pl-1 pr-1 w-full rounded mt-3" onClick={() => {
                          if (visibleRoutes.has(marcador.id)) {
                            setVisibleRoutes(prev => new Set([...prev].filter(id => id !== marcador.id)));
                          } else {
                            setVisibleRoutes(prev => new Set([...prev, marcador.id]));
                          }
                        }}>
                          {visibleRoutes.has(marcador.id) ? "Ocultar Recorrido" : "Mostrar Recorrido"}
                        </button>
                      </>
                    )}
                  </div>
                </Popup>
              )}
              {visibleRoutes.has(marcador.id) && marcador.recorrido && (
                <Source type="geojson" data={marcador.recorrido}>
                  <Layer
                    id={`route-${marcador.id}`}
                    type="line"
                    layout={{
                      "line-cap": "round",
                      "line-join": "round"
                    }}
                    paint={{
                      "line-color": "rgb(127 87 241)",
                      "line-width": 4
                    }}
                  />
                </Source>
              )}
            </React.Fragment>
          );
        })}
        <NavigationControl position="top-right" />
      </Map>
    </>
  );
}

export default MapContainer;
