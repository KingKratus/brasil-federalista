import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, Share2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { TextSuggestion } from "@/components/TextSuggestion";
import { textosCompletosPecs } from "@/data/textosCompletos";

const pecsData: Record<string, {
  numero: string;
  titulo: string;
  artigo: string;
  resumo: string;
  impacto: string;
  pontos: string[];
  justificativa: string;
}> = {
  "municipios-semissoberanos": {
    numero: "01",
    titulo: "Municípios Semissoberanos",
    artigo: "Art. 29-A",
    resumo: "Cria o conceito de município semissoberano, com competência legislativa ampliada em matérias administrativas, tributárias e penais leves.",
    impacto: "Redução do poder concentrado na União e leis mais próximas da realidade local.",
    pontos: [
      "Autonomia legislativa plena em matérias administrativas",
      "Competência tributária ampliada",
      "Possibilidade de justiça municipal",
      "Competência para criar códigos administrativos próprios",
      "Guarda Municipal com poder de polícia",
      "Orçamento impositivo local",
    ],
    justificativa: "O Brasil é um país de dimensões continentais com realidades extremamente diversas. Municípios no Norte têm desafios completamente diferentes de municípios no Sul. A centralização legislativa em Brasília impede que soluções locais sejam implementadas de forma ágil e adequada às necessidades de cada comunidade.",
  },
  "federalismo-penal": {
    numero: "02",
    titulo: "Federalismo Penal Escalonado",
    artigo: "Art. 22-A",
    resumo: "Permite a existência de legislação penal municipal e estadual, respeitando hierarquia clara de competências.",
    impacto: "Sistema penal mais adequado às realidades regionais e locais.",
    pontos: [
      "União: crimes contra a federação e soberania",
      "Estados: crimes violentos e de maior gravidade",
      "Municípios: crimes de ordem urbana e administrativa",
      "Hierarquia clara de competências",
      "Penas proporcionais à esfera legisladora",
      "Sistema integrado de informações criminais",
    ],
    justificativa: "O sistema penal brasileiro é excessivamente centralizado e não responde adequadamente às diferentes realidades regionais. Crimes urbanos como pichação, som alto e perturbação da ordem poderiam ser tratados de forma mais eficiente pela esfera municipal, enquanto crimes violentos mantém a competência estadual.",
  },
  "reforma-stf": {
    numero: "03",
    titulo: "Reforma do STF e Justiça Descentralizada",
    artigo: "Art. 101",
    resumo: "Reduz a hiperconcentração do STF e cria câmaras constitucionais regionais para desafogar o sistema.",
    impacto: "Justiça mais célere e próxima do cidadão.",
    pontos: [
      "Criação de câmaras constitucionais regionais",
      "Limitação de competências do STF",
      "Mandatos fixos de 8 anos para ministros",
      "Maior transparência nas decisões",
      "Fim do foro privilegiado para autoridades",
      "Criação de corte de precedentes",
    ],
    justificativa: "O STF se tornou uma corte hiperconcentrada que decide sobre praticamente qualquer matéria no país. Essa concentração gera morosidade, ativismo judicial excessivo e afasta a justiça do cidadão comum. A criação de câmaras regionais permitiria maior celeridade e adequação às realidades locais.",
  },
};

export default function PecDetalhe() {
  const { id } = useParams<{ id: string }>();
  const pec = id ? pecsData[id] : null;

  if (!pec) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">PEC não encontrada</h1>
          <Link to="/pecs">
            <Button>Voltar para PECs</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 pb-12 gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/pecs" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para PECs
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold">
                {pec.artigo}
              </span>
              <span className="font-display text-2xl font-black text-secondary">
                PEC {pec.numero}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              {pec.titulo}
            </h1>
            <p className="text-lg text-white/80 max-w-3xl">
              {pec.resumo}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Impacto */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold text-foreground mb-3">
                    Impacto Esperado
                  </h2>
                  <p className="text-muted-foreground">
                    {pec.impacto}
                  </p>
                </CardContent>
              </Card>

              {/* Pontos principais */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">
                    Principais Pontos
                  </h2>
                  <ul className="space-y-3">
                    {pec.pontos.map((ponto) => (
                      <li key={ponto} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{ponto}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Justificativa */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold text-foreground mb-3">
                    Justificativa
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {pec.justificativa}
                  </p>
                </CardContent>
              </Card>

              {/* Texto completo */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold text-foreground mb-3">
                    Texto Completo
                  </h2>
                  <div className="bg-muted p-4 rounded-lg max-h-[600px] overflow-y-auto">
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed">
                      {textosCompletosPecs[id || ""] || "[Texto em elaboração]"}
                    </pre>
                  </div>
                  
                  {/* Sistema de sugestões */}
                  <TextSuggestion 
                    documentType="pec" 
                    documentId={id || ""} 
                    originalText={textosCompletosPecs[id || ""] || ""} 
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Ações</h3>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar PDF
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>
                  <Separator />
                  <Link to="/manifesto" className="block">
                    <Button variant="secondary" className="w-full">
                      Assinar Manifesto
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Status</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-sm text-muted-foreground">Em elaboração</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Compartilhe</h3>
                  <p className="text-sm text-muted-foreground">
                    Ajude a divulgar esta proposta nas redes sociais e grupos de WhatsApp.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
