import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Building2, Scale, Coins, Shield, Vote, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Layout } from "@/components/layout/Layout";

interface Metrica {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  atual: number;
  descentralizado: number;
  unidade: string;
  melhorEMaior: boolean;
}

const metricas: Metrica[] = [
  {
    icon: Building2,
    label: "Autonomia Municipal",
    atual: 15,
    descentralizado: 85,
    unidade: "%",
    melhorEMaior: true,
  },
  {
    icon: Coins,
    label: "Impostos Retidos Localmente",
    atual: 25,
    descentralizado: 70,
    unidade: "%",
    melhorEMaior: true,
  },
  {
    icon: Scale,
    label: "Tempo Médio Processos Judiciais",
    atual: 4.5,
    descentralizado: 1.5,
    unidade: " anos",
    melhorEMaior: false,
  },
  {
    icon: Shield,
    label: "Efetivo Policial por 100k hab.",
    atual: 180,
    descentralizado: 350,
    unidade: "",
    melhorEMaior: true,
  },
  {
    icon: Vote,
    label: "Participação em Decisões Locais",
    atual: 8,
    descentralizado: 65,
    unidade: "%",
    melhorEMaior: true,
  },
  {
    icon: FileText,
    label: "Leis Adaptadas à Realidade Local",
    atual: 12,
    descentralizado: 78,
    unidade: "%",
    melhorEMaior: true,
  },
];

export default function Comparador() {
  const [transicao, setTransicao] = useState([0]);

  const calcularValor = (atual: number, descentralizado: number) => {
    const progresso = transicao[0] / 100;
    return atual + (descentralizado - atual) * progresso;
  };

  const getCorBarra = (metrica: Metrica, valor: number) => {
    const progresso = transicao[0] / 100;
    if (progresso < 0.3) return "bg-destructive";
    if (progresso < 0.7) return "bg-secondary";
    return "bg-primary";
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
            <div className="flex items-center gap-3 mb-4">
              <ArrowLeftRight className="h-8 w-8 text-secondary" />
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                Comparador Interativo
              </h1>
            </div>
            <p className="text-lg text-white/80">
              Visualize as diferenças entre o Brasil centralizado atual e um Brasil 
              descentralizado com as PECs aprovadas. Arraste o controle para ver a transição.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparador */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Controle de transição */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="font-display text-center">
                  Nível de Descentralização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-destructive whitespace-nowrap">
                    Brasil Atual
                  </span>
                  <Slider
                    value={transicao}
                    onValueChange={setTransicao}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium text-primary whitespace-nowrap">
                    Brasil Descentralizado
                  </span>
                </div>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-foreground">{transicao[0]}%</span>
                  <span className="text-muted-foreground ml-2">de transição</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Métricas */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metricas.map((metrica, index) => {
              const valorAtual = calcularValor(metrica.atual, metrica.descentralizado);
              const percentualBarra = metrica.melhorEMaior
                ? (valorAtual / metrica.descentralizado) * 100
                : ((metrica.atual - valorAtual + metrica.descentralizado) / metrica.atual) * 100;

              return (
                <motion.div
                  key={metrica.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          transicao[0] > 50 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}>
                          <metrica.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-sm">{metrica.label}</h3>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                          <span className="text-3xl font-bold">
                            {valorAtual.toFixed(metrica.unidade === " anos" ? 1 : 0)}
                          </span>
                          <span className="text-muted-foreground">{metrica.unidade}</span>
                        </div>

                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={getCorBarra(metrica, valorAtual)}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(percentualBarra, 100)}%` }}
                            transition={{ duration: 0.5 }}
                            style={{ height: "100%" }}
                          />
                        </div>

                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Atual: {metrica.atual}{metrica.unidade}</span>
                          <span>Meta: {metrica.descentralizado}{metrica.unidade}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Resumo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <Card className={`border-2 ${transicao[0] > 50 ? "border-primary bg-primary/5" : "border-destructive/50 bg-destructive/5"}`}>
              <CardContent className="p-8 text-center">
                <h3 className="font-display text-2xl font-bold mb-4">
                  {transicao[0] < 30 && "O Brasil está altamente centralizado"}
                  {transicao[0] >= 30 && transicao[0] < 70 && "Transição em andamento"}
                  {transicao[0] >= 70 && "Brasil descentralizado e forte!"}
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {transicao[0] < 30 && "Brasília concentra poder excessivo, deixando municípios e estados dependentes e limitados em sua capacidade de governar."}
                  {transicao[0] >= 30 && transicao[0] < 70 && "As PECs começam a devolver poder aos municípios e estados, criando um equilíbrio federativo mais saudável."}
                  {transicao[0] >= 70 && "Com as PECs aprovadas, o poder está distribuído de forma equilibrada. Municípios têm autonomia real para resolver seus problemas."}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
