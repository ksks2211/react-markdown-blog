import Map, { Source, Layer, NavigationControl } from "react-map-gl";
import { useQuery } from "react-query";
import { fetchGeoJson } from "../../api";
import type { FeatureCollection } from "geojson";
import type { FillLayer, LineLayer, MapLayerMouseEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CSSProperties, useState } from "react";
import throttle from "lodash-es/throttle";

interface HoverInfo {
  title: string;
  x: number;
  y: number;
}

const stateLineLayer: LineLayer = {
  id: "state-borders",
  type: "line",
  source: "state",
  layout: {},
  paint: {
    "line-color": "#374d8c",
    "line-width": 2,
  },
};
const stateFillLayer: FillLayer = {
  id: "state-fills",
  type: "fill",
  source: "states",
  layout: {},
  paint: {
    "fill-color": "#627BC1",
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      1,
      0.4,
    ],
  },
};

const accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

const toolTipStyle: CSSProperties = {
  position: "absolute",
  width: "auto",
  whiteSpace: "nowrap",
  fontSize: ".7rem",
  color: "white",
  backgroundColor: "rgba(0,0,0,.4)",
  borderRadius: ".5rem",
  padding: ".6rem",
  transform: "translate(-50%,-130%)",
  display: "flex",
  overflow: "hidden",
};

const initialViewState = {
  longitude: -98.486052,
  latitude: 40.830348,
  zoom: 2.6,
};

const boxStyle: CSSProperties = {
  height: "55vh",
  width: "100%",
  margin: "auto",
  position: "relative",
};

const StatesAndTerritoriesOfTheUs = () => {
  const { data, isLoading } = useQuery<FeatureCollection, Error>({
    queryFn: fetchGeoJson,
    queryKey: ["us-geo-json"],
    staleTime: Infinity,
  });

  const [polyGonId, setPolyGonId] = useState<number>(1);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | undefined>(undefined);

  if (isLoading || data === undefined) {
    return <div>Loading...</div>;
  }

  const onMouseMove = throttle((e: MapLayerMouseEvent) => {
    const {
      point: { x, y },
    } = e;
    const feature = e.features && e.features[0];
    const stateId = feature?.id;
    if (stateId !== undefined && typeof stateId === "number") {
      const title = (feature?.properties?.name as string) || "United States";
      setHoverInfo({
        title,
        x,
        y,
      });

      setPolyGonId((prevId) => {
        e.target.setFeatureState(
          { source: "states", id: prevId },
          { hover: false }
        );
        e.target.setFeatureState(
          { source: "states", id: stateId },
          { hover: true }
        );
        return stateId;
      });
    }
  }, 200);

  const onMouseLeave = (e: MapLayerMouseEvent) => {
    e.target.setFeatureState(
      { source: "states", id: polyGonId },
      { hover: false }
    );

    setHoverInfo(undefined);
  };

  return (
    <Map
      mapboxAccessToken={accessToken}
      initialViewState={initialViewState}
      style={boxStyle}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      projection={{
        name: "globe",
      }}
      interactiveLayerIds={["state-fills"]}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <Source id="states" type="geojson" data={data}>
        <Layer {...stateFillLayer} />
        <Layer {...stateLineLayer} />
      </Source>
      <NavigationControl />

      {hoverInfo && (
        <div
          className="tooltip"
          style={{
            ...toolTipStyle,
            left: hoverInfo.x,
            top: hoverInfo.y,
          }}
        >
          <div>{hoverInfo.title}</div>
        </div>
      )}
    </Map>
  );
};

export default StatesAndTerritoriesOfTheUs;
