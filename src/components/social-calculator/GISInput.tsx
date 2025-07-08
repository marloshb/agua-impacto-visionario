
import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Map, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  MapPin,
  Database,
  Calculator,
  Save,
  FileText,
  Layers
} from 'lucide-react';
import GISMap from './GISMap';
import { ProjectArea, GISLayer, GISProjectInput, GISValidationResult } from '@/types/calculator';

interface GISInputProps {
  onProjectSubmit: (project: GISProjectInput) => void;
  onValidationComplete: (result: GISValidationResult) => void;
}

export default function GISInput({ onProjectSubmit, onValidationComplete }: GISInputProps) {
  const [selectedArea, setSelectedArea] = useState<ProjectArea | null>(null);
  const [projectData, setProjectData] = useState({
    name: '',
    interventionType: 'water_network' as const,
    lengthKm: 0,
    populationServed: 0,
    investmentAmount: 0,
    materials: [] as string[],
    constructionPeriod: 24
  });
  
  const [layers, setLayers] = useState<GISLayer[]>([
    {
      id: 'ibge_population',
      name: 'Densidade Populacional (IBGE)',
      type: 'demographic',
      visible: false,
      opacity: 0.7
    },
    {
      id: 'sus_health',
      name: 'Estabelecimentos de Saúde (SUS)',
      type: 'health',
      visible: false,
      opacity: 0.8
    },
    {
      id: 'ana_water',
      name: 'Recursos Hídricos (ANA)',
      type: 'infrastructure',
      visible: false,
      opacity: 0.6
    },
    {
      id: 'infrastructure_existing',
      name: 'Infraestrutura Existente',
      type: 'infrastructure',
      visible: false,
      opacity: 0.9
    }
  ]);

  const [externalData, setExternalData] = useState({
    ibge: null,
    sus: null,
    climate: null
  });

  const [validationResult, setValidationResult] = useState<GISValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('map');

  const handleAreaSelect = useCallback((area: ProjectArea) => {
    setSelectedArea(area);
    // Auto-populate project data based on area
    setProjectData(prev => ({
      ...prev,
      name: area.name,
      populationServed: area.population
    }));
    validateProject(area, projectData);
  }, [projectData]);

  const handleLayerToggle = useCallback((layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, visible: !layer.visible }
        : layer
    ));
  }, []);

  const handleLayerOpacityChange = useCallback((layerId: string, opacity: number) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, opacity }
        : layer
    ));
  }, []);

  const validateProject = async (area: ProjectArea | null, data: any) => {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    if (!area) {
      errors.push('Área do projeto não definida');
    } else if (area.area < 0.1) {
      warnings.push('Área muito pequena para análise confiável');
    }

    if (!data.name.trim()) {
      errors.push('Nome do projeto é obrigatório');
    }

    if (data.populationServed <= 0) {
      errors.push('População atendida deve ser maior que zero');
    }

    if (data.investmentAmount <= 0) {
      errors.push('Valor do investimento deve ser informado');
    }

    if (area && data.populationServed > area.population * 1.2) {
      warnings.push('População atendida parece alta para a área selecionada');
    }

    if (data.interventionType === 'integrated' && data.lengthKm < 5) {
      suggestions.push('Projetos integrados geralmente requerem redes mais extensas');
    }

    const result: GISValidationResult = {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions
    };

    setValidationResult(result);
    onValidationComplete(result);
  };

  const fetchExternalData = async () => {
    if (!selectedArea) return;

    setIsLoading(true);
    try {
      // Simulate API calls to external data sources
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock external data
      const mockIBGE = {
        populationDensity: 1200 + Math.random() * 800,
        averageIncome: 2500 + Math.random() * 1500,
        urbanization: 0.7 + Math.random() * 0.25,
        accessToWater: 0.85 + Math.random() * 0.1,
        accessToSewer: 0.65 + Math.random() * 0.15
      };

      const mockSUS = {
        waterborneIllnesses: 150 + Math.random() * 100,
        hospitalizations: 45 + Math.random() * 30,
        infantMortality: 12 + Math.random() * 8,
        healthFacilities: 3 + Math.floor(Math.random() * 5)
      };

      setExternalData({
        ibge: mockIBGE,
        sus: mockSUS,
        climate: null
      });

    } catch (error) {
      console.error('Erro ao buscar dados externos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedArea || !validationResult?.isValid) return;

    const gisProject: GISProjectInput = {
      polygon: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [selectedArea.coordinates.map(coord => [coord[1], coord[0]])]
        },
        properties: {
          area_km2: selectedArea.area,
          perimeter_km: Math.sqrt(selectedArea.area) * 4 // Approximate
        }
      },
      projectData,
      externalData
    };

    onProjectSubmit(gisProject);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="w-5 h-5" />
            Módulo de Entrada GIS - Definição do Projeto
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="map">Mapeamento</TabsTrigger>
          <TabsTrigger value="project">Dados do Projeto</TabsTrigger>
          <TabsTrigger value="external">Dados Externos</TabsTrigger>
          <TabsTrigger value="validation">Validação</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <GISMap 
            selectedArea={selectedArea}
            onAreaSelect={handleAreaSelect}
            layers={layers}
            onLayerToggle={handleLayerToggle}
            onLayerOpacityChange={handleLayerOpacityChange}
          />
          
          {selectedArea && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Área</Label>
                    <p className="font-medium">{selectedArea.area.toFixed(2)} km²</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">População</Label>
                    <p className="font-medium">{selectedArea.population.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Município</Label>
                    <p className="font-medium">{selectedArea.municipality}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Estado</Label>
                    <p className="font-medium">{selectedArea.state}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="project" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações do Projeto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Nome do Projeto</Label>
                  <Input
                    id="projectName"
                    value={projectData.name}
                    onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Saneamento Básico - Região Norte"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interventionType">Tipo de Intervenção</Label>
                  <Select 
                    value={projectData.interventionType} 
                    onValueChange={(value) => setProjectData(prev => ({ 
                      ...prev, 
                      interventionType: value as any 
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water_network">Rede de Água</SelectItem>
                      <SelectItem value="sewer_network">Rede de Esgoto</SelectItem>
                      <SelectItem value="treatment_plant">Estação de Tratamento</SelectItem>
                      <SelectItem value="integrated">Projeto Integrado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lengthKm">Extensão da Rede (km)</Label>
                  <Input
                    id="lengthKm"
                    type="number"
                    value={projectData.lengthKm}
                    onChange={(e) => setProjectData(prev => ({ 
                      ...prev, 
                      lengthKm: parseFloat(e.target.value) || 0 
                    }))}
                    placeholder="0.0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="populationServed">População Atendida</Label>
                  <Input
                    id="populationServed"
                    type="number"
                    value={projectData.populationServed}
                    onChange={(e) => setProjectData(prev => ({ 
                      ...prev, 
                      populationServed: parseInt(e.target.value) || 0 
                    }))}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investmentAmount">Valor do Investimento (R$)</Label>
                  <Input
                    id="investmentAmount"
                    type="number"
                    value={projectData.investmentAmount}
                    onChange={(e) => setProjectData(prev => ({ 
                      ...prev, 
                      investmentAmount: parseFloat(e.target.value) || 0 
                    }))}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="constructionPeriod">Período de Construção (meses)</Label>
                  <Input
                    id="constructionPeriod"
                    type="number"
                    value={projectData.constructionPeriod}
                    onChange={(e) => setProjectData(prev => ({ 
                      ...prev, 
                      constructionPeriod: parseInt(e.target.value) || 24 
                    }))}
                    placeholder="24"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="external" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Integração com Dados Externos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 mb-4">
                <Button 
                  onClick={fetchExternalData}
                  disabled={!selectedArea || isLoading}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {isLoading ? 'Buscando Dados...' : 'Buscar Dados Externos'}
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Importar Dados Locais
                </Button>
              </div>

              {isLoading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Conectando com APIs externas...</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} />
                </div>
              )}

              {externalData.ibge && (
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Badge variant="secondary">IBGE</Badge>
                    Dados Demográficos
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm bg-muted p-3 rounded">
                    <div>
                      <span className="text-muted-foreground">Densidade Pop.:</span>
                      <span className="font-medium ml-2">{externalData.ibge.populationDensity.toFixed(0)} hab/km²</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Renda Média:</span>
                      <span className="font-medium ml-2">R$ {externalData.ibge.averageIncome.toFixed(0)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Acesso à Água:</span>
                      <span className="font-medium ml-2">{(externalData.ibge.accessToWater * 100).toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Acesso ao Esgoto:</span>
                      <span className="font-medium ml-2">{(externalData.ibge.accessToSewer * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              )}

              {externalData.sus && (
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Badge variant="secondary">SUS</Badge>
                    Dados de Saúde
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm bg-muted p-3 rounded">
                    <div>
                      <span className="text-muted-foreground">Doenças Hídricas:</span>
                      <span className="font-medium ml-2">{externalData.sus.waterborneIllnesses}/ano</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Internações:</span>
                      <span className="font-medium ml-2">{externalData.sus.hospitalizations}/ano</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Unidades de Saúde:</span>
                      <span className="font-medium ml-2">{externalData.sus.healthFacilities}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Mortalidade Infantil:</span>
                      <span className="font-medium ml-2">{externalData.sus.infantMortality}/1000</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Validação do Projeto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => validateProject(selectedArea, projectData)}
                className="w-full"
              >
                Executar Validação Completa
              </Button>

              {validationResult && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {validationResult.isValid ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-medium">
                      {validationResult.isValid ? 'Projeto Válido' : 'Correções Necessárias'}
                    </span>
                  </div>

                  {validationResult.errors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-red-600">Erros:</h4>
                      {validationResult.errors.map((error, idx) => (
                        <p key={idx} className="text-sm text-red-600 flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3" />
                          {error}
                        </p>
                      ))}
                    </div>
                  )}

                  {validationResult.warnings.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-yellow-600">Avisos:</h4>
                      {validationResult.warnings.map((warning, idx) => (
                        <p key={idx} className="text-sm text-yellow-600 flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3" />
                          {warning}
                        </p>
                      ))}
                    </div>
                  )}

                  {validationResult.suggestions.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-600">Sugestões:</h4>
                      {validationResult.suggestions.map((suggestion, idx) => (
                        <p key={idx} className="text-sm text-blue-600 flex items-center gap-2">
                          <Info className="w-3 h-3" />
                          {suggestion}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <Separator />

              <div className="flex gap-4">
                <Button 
                  onClick={handleSubmit}
                  disabled={!validationResult?.isValid}
                  className="flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Enviar para Calculadora Social
                </Button>

                <Button variant="outline" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Salvar Projeto
                </Button>

                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Exportar Dados
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
