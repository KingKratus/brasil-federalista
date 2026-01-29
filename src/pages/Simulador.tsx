import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, BarChart3, TrendingUp, Building2, Scale, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout/Layout";
import { Slider } from "@/components/ui/slider";

const estados = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
  "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
  "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
  "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
  "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
];

const metricas = [
  {
    id: "autonomia",
    label: "Autonomia Legislativa",
    antes: 20,
    depois: 85,
    descricao: "Capacidade do município criar suas próprias leis",
    icon: Scale,
  },
  {
    id: "tributos",
    label: "Controle Tributário",
    antes: 15,
    depois: 70,
    descricao: "Percentual de tributos geridos localmente",
    icon: DollarSign,
  },
  {
    id: "seguranca",
    label: "Autonomia em Segurança",
    antes: 10,
    depois: 75,
    descricao: "Poder de decisão sobre políticas de segurança",
    icon: Building2,
  },
  {
    id: "justica",
    label: "Acesso à Justiça Local",
    antes: 25,
    depois: 80,
    descricao: "Resolução de conflitos em instância municipal",
    icon: Scale,
  },
];

export default function Simulador() {
  const [estado, setEstado] = useState<string>("");
  const [municipio, setMunicipio] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const handleSimular = () => {
    if (estado) {
      setShowResults(true);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 pb-12 gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-4">
              Ferramenta Interativa
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Simulador de PEC
            </h1>
            <p className="text-lg text-white/80">
              Visualize como ficaria seu município com as PECs do Movimento Jovem Bolsonarista aprovadas.
              Compare o cenário atual com o Brasil descentralizado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Seleção */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Selecione sua localização
              </CardTitle>
              <CardDescription>
                Escolha seu estado para simular o impacto das propostas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Estado</label>
                  <Select value={estado} onValueChange={setEstado}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {estados.map((uf) => (
                        <SelectItem key={uf} value={uf}>
                          {uf}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Município (opcional)</label>
                  <input
                    type="text"
                    placeholder="Digite o nome do município"
                    value={municipio}
                    onChange={(e) => setMunicipio(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSimular} className="w-full" disabled={!estado}>
                    Simular
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resultados */}
      {showResults && (
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Impacto em {municipio || estado}
                </h2>
                <p className="text-muted-foreground">
                  Comparativo entre o cenário atual e após aprovação das PECs
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {metricas.map((metrica, index) => (
                  <motion.div
                    key={metrica.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <metrica.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{metrica.label}</h3>
                            <p className="text-xs text-muted-foreground">{metrica.descricao}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Brasil Atual</span>
                              <span className="font-semibold text-destructive">{metrica.antes}%</span>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${metrica.antes}%` }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="h-full bg-destructive/50 rounded-full"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Brasil Descentralizado</span>
                              <span className="font-semibold text-primary">{metrica.depois}%</span>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${metrica.depois}%` }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="h-full bg-primary rounded-full"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            <span className="text-primary font-semibold">
                              +{metrica.depois - metrica.antes} pontos percentuais
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Resumo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-12"
              >
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-8 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-80" />
                    <h3 className="font-display text-2xl font-bold mb-2">
                      Seu município pode ter até 4x mais autonomia
                    </h3>
                    <p className="opacity-80 mb-6 max-w-2xl mx-auto">
                      Com as PECs do Movimento Jovem Bolsonarista, {municipio || estado} teria poder real 
                      para decidir sobre tributos, segurança, justiça e legislação local.
                    </p>
                    <Button size="lg" variant="secondary">
                      Apoiar as Propostas
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Info */}
      {!showResults && (
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Scale className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Autonomia Legislativa</h3>
                  <p className="text-sm text-muted-foreground">
                    Simule o impacto da PEC de Municípios Semissoberanos na sua cidade.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Controle Fiscal</h3>
                  <p className="text-sm text-muted-foreground">
                    Veja como a Lei de Distritos Tributários afetaria seu bairro.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Building2 className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Segurança Local</h3>
                  <p className="text-sm text-muted-foreground">
                    Entenda como a Guarda Municipal armada protegeria sua comunidade.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
