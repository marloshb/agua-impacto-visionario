import React, { useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Map, 
  Layers, 
  Navigation, 
  Zap, 
  Activity, 
  DollarSign, 
  Cloud,
  Building,
  Users
} from 'lucide-react';
import { ProjectArea, GISLayer } from '@/types/calculator';
import 'leaflet/dist/leaflet.css';

interface GISMapProps {
  selectedArea: ProjectArea | null;
  onAreaSelect: (area: ProjectArea) => void;
  layers: GISLayer[];
  onLayerToggle: (layerId: string) => void;
  onLayerOpacityChange: (layerId: string, opacity: number) => void;
}

// Component for drawing polygons on the map
function DrawingEvents({ onPolygonComplete }: { onPolygonComplete: (coordinates: [number, number][]) => void }) {
  const [drawing, setDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<[number, number][]>([]);

  useMapEvents({
    click(e) {
      if (!drawing) return;
      
      const newPoint: [number, number] = [e.latlng.lat, e.latlng.lng];
      const newPath = [...currentPath, newPoint];
      setCurrentPath(newPath);
    },
    contextmenu(e) {
      if (drawing && currentPath.length >= 3) {
        onPolygonComplete(currentPath);
        setCurrentPath([]);
        setDrawing(false);
      }
    }
  });

  return (
    <>
      {drawing && currentPath.length > 0 && (
        <Polygon 
          positions={currentPath} 
          pathOptions={{ color: 'hsl(var(--primary))', fillOpacity: 0.3 }}
        />
      )}
      {!drawing && (
        <div className="absolute top-4 left-4 z-[1000]">
          <Button 
            onClick={() => setDrawing(true)}
            className="bg-card text-card-foreground hover:bg-accent"
          >
            <Map className="w-4 h-4 mr-2" />
            Desenhar Área do Projeto
          </Button>
        </div>
      )}
      {drawing && (
        <div className="absolute top-4 left-4 z-[1000] space-y-2">
          <div className="bg-card p-3 rounded-lg border">
            <p className="text-sm text-muted-foreground">
              Clique para adicionar pontos. Clique direito para finalizar.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setDrawing(false);
                setCurrentPath([]);
              }}
              className="mt-2"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default function GISMap({ 
  selectedArea, 
  onAreaSelect, 
  layers, 
  onLayerToggle, 
  onLayerOpacityChange 
}: GISMapProps) {
  const mapRef = useRef(null);
  const [activeTab, setActiveTab] = useState('infrastructure');

  const handlePolygonComplete = useCallback((coordinates: [number, number][]) => {
    // Calculate area using simple polygon area formula (approximation)
    const area = calculatePolygonArea(coordinates);
    
    const newArea: ProjectArea = {
      id: `area_${Date.now()}`,
      name: `Projeto ${new Date().toLocaleDateString()}`,
      coordinates,
      area: area,
      population: Math.round(area * 1000), // Estimate: 1000 people per km²
      municipality: 'Município Selecionado',
      state: 'Estado'
    };
    
    onAreaSelect(newArea);
  }, [onAreaSelect]);

  const calculatePolygonArea = (coordinates: [number, number][]): number => {
    // Simplified area calculation (not precise for geographic coordinates)
    if (coordinates.length < 3) return 0;
    
    let area = 0;
    for (let i = 0; i < coordinates.length; i++) {
      const j = (i + 1) % coordinates.length;
      area += coordinates[i][0] * coordinates[j][1];
      area -= coordinates[j][0] * coordinates[i][1];
    }
    return Math.abs(area / 2) * 111 * 111; // Rough conversion to km²
  };

  const layersByCategory = {
    infrastructure: layers.filter(l => l.type === 'infrastructure'),
    demographic: layers.filter(l => l.type === 'demographic'),
    health: layers.filter(l => l.type === 'health'),
    economic: layers.filter(l => l.type === 'economic'),
    climate: layers.filter(l => l.type === 'climate'),
    administrative: layers.filter(l => l.type === 'administrative')
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'infrastructure': return <Building className="w-4 h-4" />;
      case 'demographic': return <Users className="w-4 h-4" />;
      case 'health': return <Activity className="w-4 h-4" />;
      case 'economic': return <DollarSign className="w-4 h-4" />;
      case 'climate': return <Cloud className="w-4 h-4" />;
      case 'administrative': return <Navigation className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'infrastructure': return 'text-blue-600 dark:text-blue-400';
      case 'demographic': return 'text-purple-600 dark:text-purple-400';
      case 'health': return 'text-green-600 dark:text-green-400';
      case 'economic': return 'text-yellow-600 dark:text-yellow-400';
      case 'climate': return 'text-indigo-600 dark:text-indigo-400';
      case 'administrative': return 'text-gray-600 dark:text-gray-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="flex h-[600px] w-full gap-4">
      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          ref={mapRef}
          center={[-14.235, -51.925] as [number, number]}
          zoom={4}
          className="w-full h-full rounded-lg border"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <DrawingEvents onPolygonComplete={handlePolygonComplete} />
          
          {selectedArea && (
            <Polygon 
              positions={selectedArea.coordinates}
              pathOptions={{ 
                color: 'hsl(var(--primary))', 
                fillColor: 'hsl(var(--primary))',
                fillOpacity: 0.4,
                weight: 3
              }}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold">{selectedArea.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Área: {selectedArea.area.toFixed(2)} km²
                  </p>
                  <p className="text-sm text-muted-foreground">
                    População: {selectedArea.population.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedArea.municipality}, {selectedArea.state}
                  </p>
                </div>
              </Popup>
            </Polygon>
          )}
        </MapContainer>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-[1000] space-y-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-card/90 backdrop-blur-sm"
          >
            <Navigation className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-card/90 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Layer Control Panel */}
      <Card className="w-80 h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Camadas GIS
          </CardTitle>
        </CardHeader>
        <CardContent className="custom-scrollbar overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1 mb-4">
              <TabsTrigger value="infrastructure" className="text-xs p-2">
                <Building className="w-3 h-3 mr-1" />
                Infra
              </TabsTrigger>
              <TabsTrigger value="demographic" className="text-xs p-2">
                <Users className="w-3 h-3 mr-1" />
                Demo
              </TabsTrigger>
              <TabsTrigger value="health" className="text-xs p-2">
                <Activity className="w-3 h-3 mr-1" />
                Saúde
              </TabsTrigger>
            </TabsList>
            
            <TabsList className="grid w-full grid-cols-3 h-auto p-1 mb-4">
              <TabsTrigger value="economic" className="text-xs p-2">
                <DollarSign className="w-3 h-3 mr-1" />
                Econ
              </TabsTrigger>
              <TabsTrigger value="climate" className="text-xs p-2">
                <Cloud className="w-3 h-3 mr-1" />
                Clima
              </TabsTrigger>
              <TabsTrigger value="administrative" className="text-xs p-2">
                <Navigation className="w-3 h-3 mr-1" />
                Admin
              </TabsTrigger>
            </TabsList>

            {Object.entries(layersByCategory).map(([category, categoryLayers]) => (
              <TabsContent key={category} value={category} className="space-y-3">
                {categoryLayers.map((layer) => (
                  <div key={layer.id} className="space-y-2 p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={getCategoryColor(category)}>
                          {getCategoryIcon(category)}
                        </div>
                        <Label className="text-sm font-medium">{layer.name}</Label>
                      </div>
                      <Switch
                        checked={layer.visible}
                        onCheckedChange={() => onLayerToggle(layer.id)}
                      />
                    </div>
                    
                    {layer.visible && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label className="text-xs">Opacidade:</Label>
                          <span className="text-xs text-muted-foreground">
                            {Math.round(layer.opacity * 100)}%
                          </span>
                        </div>
                        <Slider
                          value={[layer.opacity * 100]}
                          onValueChange={(value) => onLayerOpacityChange(layer.id, value[0] / 100)}
                          max={100}
                          step={10}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                ))}
                
                {categoryLayers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className={getCategoryColor(category)}>
                      {getCategoryIcon(category)}
                    </div>
                    <p className="text-sm mt-2">
                      Nenhuma camada disponível para {category}
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}