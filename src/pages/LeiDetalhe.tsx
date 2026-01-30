import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, Share2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { TextSuggestion } from "@/components/TextSuggestion";
import { textosCompletosLeis } from "@/data/textosCompletos";

const leisData: Record<string, {
  numero: string;
  titulo: string;
  tipo: string;
  resumo: string;
  impacto: string;
  pontos: string[];
  justificativa: string;
}> = {
  "distritos-tributarios": {
    numero: "01",
    titulo: "Lei de Distritos Tributários Municipais",
    tipo: "Lei Complementar",
    resumo: "Permite que cada distrito pague impostos conforme o custo do serviço público local, com total transparência dos gastos.",
    impacto: "Cidadãos sabem exatamente para onde vai seu dinheiro e podem cobrar resultados.",
    pontos: [
      "Tributação proporcional ao custo do serviço",
      "Transparência total dos gastos por distrito",
      "Participação cidadã na alocação de recursos",
      "Redução de desperdício e corrupção",
      "Accountability direta do poder público",
      "Sistema de prestação de contas simplificado",
    ],
    justificativa: "Atualmente o cidadão não sabe quanto paga e quanto recebe em serviços públicos. Esta lei cria uma relação direta entre tributo e serviço, permitindo que cada comunidade decida onde investir seus recursos e cobre resultados de seus representantes.",
  },
  "auditoria-divida": {
    numero: "02",
    titulo: "Lei de Auditoria Permanente da Dívida Pública",
    tipo: "Lei Complementar",
    resumo: "Estabelece auditorias periódicas obrigatórias da dívida pública com publicação aberta de todos os contratos.",
    impacto: "Maior controle social sobre o endividamento público e identificação de irregularidades.",
    pontos: [
      "Auditorias periódicas obrigatórias",
      "Publicação aberta de contratos",
      "Comissões independentes de auditoria",
      "Sanções para irregularidades",
      "Participação da sociedade civil",
      "Relatórios públicos semestrais",
    ],
    justificativa: "A dívida pública brasileira cresce sem que a população saiba exatamente quais são seus termos e condições. Esta lei estabelece mecanismos permanentes de auditoria e transparência, permitindo identificar contratos lesivos e irregularidades.",
  },
  "democracia-direta": {
    numero: "03",
    titulo: "Lei de Democracia Direta Municipal",
    tipo: "Lei Complementar",
    resumo: "Facilita a realização de referendos e plebiscitos locais, além de implementar o voto distrital em decisões relevantes.",
    impacto: "Cidadãos decidem diretamente sobre questões que afetam suas comunidades.",
    pontos: [
      "Referendos e plebiscitos facilitados",
      "Voto distrital em decisões relevantes",
      "Iniciativa popular simplificada",
      "Assembleias comunitárias vinculantes",
      "Revogação de mandatos por voto popular",
      "Orçamento participativo obrigatório",
    ],
    justificativa: "A democracia representativa se tornou distante do cidadão. Esta lei implementa mecanismos de democracia direta que permitem às comunidades decidir sobre questões locais importantes sem depender exclusivamente de representantes eleitos.",
  },
};

export default function LeiDetalhe() {
  const { id } = useParams<{ id: string }>();
  const lei = id ? leisData[id] : null;

  if (!lei) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Lei não encontrada</h1>
          <Link to="/leis">
            <Button>Voltar para Leis</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 pb-12 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/leis" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Leis
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-semibold">
                {lei.tipo}
              </span>
              <span className="font-display text-2xl font-black text-primary-foreground">
                LEI {lei.numero}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              {lei.titulo}
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-3xl">
              {lei.resumo}
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
                    {lei.impacto}
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
                    {lei.pontos.map((ponto) => (
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
                    {lei.justificativa}
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
                      {textosCompletosLeis[id || ""] || "[Texto em elaboração]"}
                    </pre>
                  </div>
                  
                  {/* Sistema de sugestões */}
                  <TextSuggestion 
                    documentType="lei" 
                    documentId={id || ""} 
                    originalText={textosCompletosLeis[id || ""] || ""} 
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Ações</h3>
                  <Button className="w-full bg-primary text-primary-foreground">
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
                    <div className="w-2 h-2 rounded-full bg-primary" />
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
