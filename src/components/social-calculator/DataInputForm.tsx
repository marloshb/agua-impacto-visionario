import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  Users, 
  Activity, 
  DollarSign, 
  Cloud, 
  Database,
  Upload,
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { ProjectData, DataSource } from '@/types/calculator';

const projectDataSchema = z.object({
  // Infrastructure
  waterCoverage: z.number().min(0).max(100),
  sewerCoverage: z.number().min(0).max(100),
  treatmentPlants: z.number().min(0),
  pipelineLength: z.number().min(0),
  pumpStations: z.number().min(0),
  investmentAmount: z.number().min(0),
  projectType: z.enum(['water', 'sewer', 'treatment', 'integrated']),
  
  // Demographics
  totalPopulation: z.number().min(0),
  households: z.number().min(0),
  averageIncome: z.number().min(0),
  educationLevel: z.enum(['low', 'medium', 'high']),
  vulnerabilityIndex: z.number().min(0).max(1),
  childrenUnder5: z.number().min(0),
  eldersOver65: z.number().min(0),
  
  // Health
  waterborneIllnesses: z.number().min(0),
  hospitalizations: z.number().min(0),
  infantMortality: z.number().min(0),
  diarrheaCases: z.number().min(0),
  waterQualityIndex: z.number().min(0).max(100),
  
  // Economic
  propertyValues: z.number().min(0),
  localBusiness: z.number().min(0),
  employment: z.number().min(0).max(100),
  tourism: z.number().min(0),
  industrialActivity: z.number().min(0).max(100),
  
  // Climate
  floodRisk: z.number().min(0).max(1),
  droughtRisk: z.number().min(0).max(1),
  temperatureChange: z.number(),
  precipitationChange: z.number(),
  extremeEvents: z.number().min(0)
});

type ProjectDataForm = z.infer<typeof projectDataSchema>;

interface DataInputFormProps {
  onSubmit: (data: ProjectData) => void;
  initialData?: Partial<ProjectData>;
  dataSources: DataSource[];
  loading?: boolean;
}

export default function DataInputForm({ 
  onSubmit, 
  initialData, 
  dataSources, 
  loading = false 
}: DataInputFormProps) {
  const [activeTab, setActiveTab] = useState('infrastructure');
  const [autoFillProgress, setAutoFillProgress] = useState(0);
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  const form = useForm<ProjectDataForm>({
    resolver: zodResolver(projectDataSchema),
    defaultValues: {
      waterCoverage: initialData?.infrastructure?.waterCoverage || 0,
      sewerCoverage: initialData?.infrastructure?.sewerCoverage || 0,
      treatmentPlants: initialData?.infrastructure?.treatmentPlants || 0,
      pipelineLength: initialData?.infrastructure?.pipelineLength || 0,
      pumpStations: initialData?.infrastructure?.pumpStations || 0,
      investmentAmount: initialData?.infrastructure?.investmentAmount || 0,
      projectType: initialData?.infrastructure?.projectType || 'integrated',
      
      totalPopulation: initialData?.demographics?.totalPopulation || 0,
      households: initialData?.demographics?.households || 0,
      averageIncome: initialData?.demographics?.averageIncome || 0,
      educationLevel: initialData?.demographics?.educationLevel || 'medium',
      vulnerabilityIndex: initialData?.demographics?.vulnerabilityIndex || 0,
      childrenUnder5: initialData?.demographics?.childrenUnder5 || 0,
      eldersOver65: initialData?.demographics?.eldersOver65 || 0,
      
      waterborneIllnesses: initialData?.health?.waterborneIllnesses || 0,
      hospitalizations: initialData?.health?.hospitalizations || 0,
      infantMortality: initialData?.health?.infantMortality || 0,
      diarrheaCases: initialData?.health?.diarrheaCases || 0,
      waterQualityIndex: initialData?.health?.waterQualityIndex || 50,
      
      propertyValues: initialData?.economic?.propertyValues || 0,
      localBusiness: initialData?.economic?.localBusiness || 0,
      employment: initialData?.economic?.employment || 0,
      tourism: initialData?.economic?.tourism || 0,
      industrialActivity: initialData?.economic?.industrialActivity || 0,
      
      floodRisk: initialData?.climate?.floodRisk || 0,
      droughtRisk: initialData?.climate?.droughtRisk || 0,
      temperatureChange: initialData?.climate?.temperatureChange || 0,
      precipitationChange: initialData?.climate?.precipitationChange || 0,
      extremeEvents: initialData?.climate?.extremeEvents || 0
    }
  });

  const handleAutoFill = async () => {
    setIsAutoFilling(true);
    setAutoFillProgress(0);
    
    // Simulate auto-fill from external data sources
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setAutoFillProgress((i / steps) * 100);
      
      if (i === 3) {
        // Simulate IBGE data fill
        form.setValue('totalPopulation', 45000);
        form.setValue('households', 12000);
        form.setValue('averageIncome', 2500);
      }
      
      if (i === 6) {
        // Simulate SUS data fill
        form.setValue('waterborneIllnesses', 150);
        form.setValue('hospitalizations', 45);
        form.setValue('infantMortality', 12);
      }
      
      if (i === 9) {
        // Simulate climate data fill
        form.setValue('floodRisk', 0.3);
        form.setValue('droughtRisk', 0.2);
        form.setValue('temperatureChange', 2.1);
      }
    }
    
    setIsAutoFilling(false);
  };

  const handleFormSubmit = (data: ProjectDataForm) => {
    const projectData: ProjectData = {
      area: initialData?.area!,
      infrastructure: {
        waterCoverage: data.waterCoverage,
        sewerCoverage: data.sewerCoverage,
        treatmentPlants: data.treatmentPlants,
        pipelineLength: data.pipelineLength,
        pumpStations: data.pumpStations,
        investmentAmount: data.investmentAmount,
        projectType: data.projectType
      },
      demographics: {
        totalPopulation: data.totalPopulation,
        households: data.households,
        averageIncome: data.averageIncome,
        educationLevel: data.educationLevel,
        vulnerabilityIndex: data.vulnerabilityIndex,
        childrenUnder5: data.childrenUnder5,
        eldersOver65: data.eldersOver65
      },
      health: {
        waterborneIllnesses: data.waterborneIllnesses,
        hospitalizations: data.hospitalizations,
        infantMortality: data.infantMortality,
        diarrheaCases: data.diarrheaCases,
        waterQualityIndex: data.waterQualityIndex
      },
      economic: {
        propertyValues: data.propertyValues,
        localBusiness: data.localBusiness,
        employment: data.employment,
        tourism: data.tourism,
        industrialActivity: data.industrialActivity
      },
      climate: {
        floodRisk: data.floodRisk,
        droughtRisk: data.droughtRisk,
        temperatureChange: data.temperatureChange,
        precipitationChange: data.precipitationChange,
        extremeEvents: data.extremeEvents
      }
    };
    
    onSubmit(projectData);
  };

  const getDataSourceStatus = (type: DataSource['type']) => {
    const source = dataSources.find(s => s.type === type);
    if (!source) return { status: 'unavailable', color: 'text-red-500' };
    
    if (source.reliability > 80) return { status: 'excellent', color: 'text-green-500' };
    if (source.reliability > 60) return { status: 'good', color: 'text-yellow-500' };
    return { status: 'poor', color: 'text-red-500' };
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Entrada de Dados do Projeto
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleAutoFill}
              disabled={isAutoFilling}
            >
              {isAutoFilling ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              Auto-preenchimento
            </Button>
          </div>
        </div>
        
        {isAutoFilling && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Coletando dados...</span>
              <span>{Math.round(autoFillProgress)}%</span>
            </div>
            <Progress value={autoFillProgress} className="w-full" />
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {/* Data Sources Status */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-medium mb-3">Status das Fontes de Dados</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {['IBGE', 'SUS', 'TrataBrasil', 'IPCC', 'ANA', 'INPE'].map((source) => {
              const status = getDataSourceStatus(source as DataSource['type']);
              return (
                <Badge key={source} variant="outline" className="justify-between">
                  <span>{source}</span>
                  <div className={`w-2 h-2 rounded-full ${status.color === 'text-green-500' ? 'bg-green-500' : status.color === 'text-yellow-500' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                </Badge>
              );
            })}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="infrastructure" className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span className="hidden sm:inline">Infraestrutura</span>
                </TabsTrigger>
                <TabsTrigger value="demographics" className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Demografia</span>
                </TabsTrigger>
                <TabsTrigger value="health" className="flex items-center gap-1">
                  <Activity className="w-4 h-4" />
                  <span className="hidden sm:inline">Saúde</span>
                </TabsTrigger>
                <TabsTrigger value="economic" className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="hidden sm:inline">Economia</span>
                </TabsTrigger>
                <TabsTrigger value="climate" className="flex items-center gap-1">
                  <Cloud className="w-4 h-4" />
                  <span className="hidden sm:inline">Clima</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="infrastructure" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="waterCoverage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cobertura de Água (%)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sewerCoverage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cobertura de Esgoto (%)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="treatmentPlants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estações de Tratamento</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pipelineLength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Extensão de Rede (km)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="investmentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor do Investimento (R$)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Projeto</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="water">Abastecimento de Água</SelectItem>
                            <SelectItem value="sewer">Esgotamento Sanitário</SelectItem>
                            <SelectItem value="treatment">Tratamento</SelectItem>
                            <SelectItem value="integrated">Integrado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="demographics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="totalPopulation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>População Total</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="households"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Domicílios</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="averageIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Renda Média (R$/mês)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="educationLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nível de Educação</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o nível" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Baixo</SelectItem>
                            <SelectItem value="medium">Médio</SelectItem>
                            <SelectItem value="high">Alto</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="vulnerabilityIndex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Índice de Vulnerabilidade (0-1)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="childrenUnder5"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crianças Menores de 5 Anos</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="health" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="waterborneIllnesses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doenças Hídricas (casos/100k hab)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hospitalizations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Internações Anuais</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="infantMortality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mortalidade Infantil (/1000 nascimentos)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="waterQualityIndex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Índice de Qualidade da Água (0-100)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="economic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="propertyValues"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Médio de Imóveis (R$)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="localBusiness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Empresas Locais</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="employment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taxa de Emprego (%)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tourism"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visitantes/Turistas por Ano</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="climate" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="floodRisk"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Risco de Enchentes (0-1)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="droughtRisk"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Risco de Seca (0-1)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="temperatureChange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mudança de Temperatura até 2050 (°C)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="precipitationChange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mudança na Precipitação até 2050 (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button type="button" variant="outline">
                Salvar Rascunho
              </Button>
              <Button type="submit" disabled={loading} className="min-w-32">
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Check className="w-4 h-4 mr-2" />
                )}
                Calcular Impactos
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}