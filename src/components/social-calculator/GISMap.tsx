import React, { useState, useRef, useCallback, useEffect } from 'react';
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

interface GISMapProps {
  selectedArea: ProjectArea | null;
  onAreaSelect: (area: ProjectArea) => void;
  layers: GISLayer[];
  onLayerToggle: (layerId: string) => void;
  onLayerOpacityChange: (layerId: string, opacity: number) => void;
}

// Temporary drawing component - will be replaced with actual map integration
function DrawingInterface({ onPolygonComplete }: { onPolygonComplete: (coordinates: [number, number][]) => void }) {
  const [drawing, setDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<[number, number][]>([]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drawing) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Convert to lat/lng (simplified)
    const lat = -14.235 + (0.5 - y) * 20;
    const lng = -51.925 + (x - 0.5) * 30;
    
    const newPoint: [number, number] = [lat, lng];
    const newPath = [...currentPath, newPoint];
    setCurrentPath(newPath);
  };

  const finishDrawing = () => {
    if (currentPath.length >= 3) {
      onPolygonComplete(currentPath);
      setCurrentPath([]);
      setDrawing(false);
    }
  };

  return (
    <>
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
              Clique no mapa para adicionar pontos ({currentPath.length} pontos)
            </p>
            <div className="flex gap-2 mt-2">
              <Button 
                size="sm" 
                onClick={finishDrawing}
                disabled={currentPath.length < 3}
              >
                Finalizar Área
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setDrawing(false);
                  setCurrentPath([]);
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
      {drawing && (
        <div 
          className="absolute inset-0 cursor-crosshair z-10"
          onClick={handleMapClick}
        />
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
      {/* Map Container - Temporary placeholder */}
      <div className="flex-1 relative bg-slate-100 dark:bg-slate-800 rounded-lg border overflow-hidden">
        {/* Temporary map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20">
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Brazil outline placeholder */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-48 h-40 bg-primary/10 rounded-lg border-2 border-primary/30 flex items-center justify-center">
              <span className="text-primary/60 font-medium">Mapa do Brasil</span>
            </div>
          </div>
          
          {/* Selected area visualization */}
          {selectedArea && (
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-20 bg-primary/30 rounded border-2 border-primary animate-pulse">
                <div className="p-2 bg-card/90 rounded mt-2 mx-1">
                  <p className="text-xs font-medium">{selectedArea.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedArea.area.toFixed(1)} km²
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DrawingInterface onPolygonComplete={handlePolygonComplete} />

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
        
        {/* Info overlay */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg border">
          <p className="text-xs text-muted-foreground">
            🗺️ Visualização simplificada - GIS completo em desenvolvimento
          </p>
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
