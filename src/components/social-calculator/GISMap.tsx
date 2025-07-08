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
  Users,
  Upload,
  CheckCircle,
  X,
  MapPin,
  Database
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

  const importFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.shp,.geojson,.kml,.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Simulate file processing
        setTimeout(() => {
          const mockCoordinates: [number, number][] = [
            [-15.7934, -47.8823],
            [-15.7950, -47.8900],
            [-15.8000, -47.8850],
            [-15.7980, -47.8750],
            [-15.7934, -47.8823]
          ];
          onPolygonComplete(mockCoordinates);
        }, 1000);
      }
    };
    input.click();
  };

  return (
    <>
      {!drawing && (
        <div className="absolute top-4 left-4 z-[1000] space-y-2">
          <Button 
            onClick={() => setDrawing(true)}
            className="bg-card text-card-foreground hover:bg-accent flex items-center gap-2"
          >
            <Map className="w-4 h-4" />
            Desenhar Área do Projeto
          </Button>
          <Button 
            onClick={importFile}
            variant="outline"
            className="bg-card text-card-foreground hover:bg-accent flex items-center gap-2 w-full"
          >
            <Upload className="w-4 h-4" />
            Importar Shapefile/GeoJSON
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
                className="flex items-center gap-1"
              >
                <CheckCircle className="w-3 h-3" />
                Finalizar Área
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setDrawing(false);
                  setCurrentPath([]);
                }}
                className="flex items-center gap-1"
              >
                <X className="w-3 h-3" />
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

// Enhanced data integration panel
function DataIntegrationPanel() {
  const [activeIntegrations, setActiveIntegrations] = useState([
    { id: 'ibge', name: 'IBGE - SIDRA', status: 'active', lastSync: new Date() },
    { id: 'sus', name: 'SUS - DATASUS', status: 'active', lastSync: new Date() },
    { id: 'ana', name: 'ANA - Recursos Hídricos', status: 'inactive', lastSync: null },
    { id: 'inmet', name: 'INMET - Clima', status: 'active', lastSync: new Date() }
  ]);

  return (
    <div className="absolute bottom-4 right-4 w-80 bg-card/95 backdrop-blur-sm p-4 rounded-lg border z-[1000]">
      <h4 className="font-medium mb-3 flex items-center gap-2">
        <Database className="w-4 h-4" />
        Integrações Ativas
      </h4>
      <div className="space-y-2">
        {activeIntegrations.map((integration) => (
          <div key={integration.id} className="flex items-center justify-between text-sm">
            <span>{integration.name}</span>
            <Badge variant={integration.status === 'active' ? 'default' : 'secondary'}>
              {integration.status === 'active' ? 'Conectado' : 'Inativo'}
            </Badge>
          </div>
        ))}
      </div>
      <Button size="sm" className="w-full mt-3">
        Sincronizar Dados
      </Button>
    </div>
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
  const [showDataPanel, setShowDataPanel] = useState(false);

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
      {/* Map Container - Enhanced placeholder */}
      <div className="flex-1 relative bg-slate-100 dark:bg-slate-800 rounded-lg border overflow-hidden">
        {/* Enhanced map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20">
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Simulate geographic features */}
              <path d="M50,200 Q150,150 250,200 T350,180" stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.6"/>
              <circle cx="180" cy="220" r="8" fill="#ef4444" opacity="0.7"/>
              <circle cx="280" cy="180" r="6" fill="#22c55e" opacity="0.7"/>
              <rect x="100" y="120" width="20" height="15" fill="#8b5cf6" opacity="0.6"/>
            </svg>
          </div>
          
          {/* Brazil outline placeholder */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-48 h-40 bg-primary/10 rounded-lg border-2 border-primary/30 flex items-center justify-center">
              <span className="text-primary/60 font-medium">Mapa Interativo do Brasil</span>
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
                  <p className="text-xs text-muted-foreground">
                    {selectedArea.population.toLocaleString()} hab
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DrawingInterface onPolygonComplete={handlePolygonComplete} />

        {/* Enhanced Map Controls */}
        <div className="absolute top-4 right-4 z-[1000] space-y-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-card/90 backdrop-blur-sm"
            title="Centralizar mapa"
          >
            <Navigation className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-card/90 backdrop-blur-sm"
            title="Localização atual"
          >
            <MapPin className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-card/90 backdrop-blur-sm"
            onClick={() => setShowDataPanel(!showDataPanel)}
            title="Painel de dados"
          >
            <Database className="w-4 h-4" />
          </Button>
        </div>
        
        {showDataPanel && <DataIntegrationPanel />}
        
        {/* Enhanced info overlay */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg border">
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">GIS Integrado</span>
          </div>
          <p className="text-xs text-muted-foreground">
            🗺️ Interface com Leaflet, PostGIS e APIs externas
          </p>
          <p className="text-xs text-muted-foreground">
            📍 Desenhe polígonos ou importe Shapefiles
          </p>
        </div>
      </div>

      {/* Enhanced Layer Control Panel */}
      <Card className="w-80 h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Camadas e Dados GIS
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
          
          {/* Add integration status */}
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-2">Status das Integrações</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>IBGE - SIDRA</span>
                <Badge variant="default" className="text-xs">Ativo</Badge>
              </div>
              <div className="flex justify-between">
                <span>SUS - DATASUS</span>
                <Badge variant="default" className="text-xs">Ativo</Badge>
              </div>
              <div className="flex justify-between">
                <span>ANA - Recursos</span>
                <Badge variant="secondary" className="text-xs">Inativo</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
