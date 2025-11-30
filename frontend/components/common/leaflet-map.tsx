"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"

// Leaflet icon sorununu düzelt (SSR için)
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const L = require("leaflet")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  })
}

// Dynamic import for Leaflet map (SSR sorunlarını önlemek için)
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

interface LeafletMapProps {
  lat: number
  lng: number
  zoom?: number
  height?: string
  showPopup?: boolean
  popupContent?: React.ReactNode
}

// Component to update map center when coordinates change
function MapCenterUpdater({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useMap } = require("react-leaflet")
  const map = useMap()

  useEffect(() => {
    map.setView([lat, lng], zoom, {
      animate: true,
      duration: 0.5,
    })
  }, [lat, lng, zoom, map])

  return null
}

export function LeafletMap({
  lat,
  lng,
  zoom = 15,
  height = "100%",
  showPopup = false,
  popupContent,
}: LeafletMapProps) {
  if (typeof window === "undefined") {
    return (
      <div className="flex items-center justify-center bg-accent" style={{ height }}>
        <div className="text-center">
          <p className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
            Harita yükleniyor...
          </p>
        </div>
      </div>
    )
  }

  return (
    <MapContainer
      key={`${lat}-${lng}`}
      center={[lat, lng]}
      zoom={zoom}
      className="w-full rounded-xl"
      style={{ height }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapCenterUpdater lat={lat} lng={lng} zoom={zoom} />
      <Marker position={[lat, lng]}>
        {showPopup && popupContent && <Popup>{popupContent}</Popup>}
      </Marker>
    </MapContainer>
  )
}

