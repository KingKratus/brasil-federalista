import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Download, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const leis = [
  {
    id: "distritos-tributarios",
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
    ],
    status: "Em elaboração",
  },
  {
    id: "auditoria-divida",
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
    ],
    status: "Em elaboração",
  },
  {
    id: "democracia-direta",
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
    ],
    status: "Em elaboração",
  },
];

export default function Leis() {
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
              Leis Ordinárias e Complementares
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Pacote de Leis
            </h1>
            <p className="text-lg text-white/80">
              Três propostas de lei para complementar as PECs e garantir a implementação 
              prática do federalismo descentralizado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lista de Leis */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-8">
            {leis.map((lei, index) => (
              <motion.div
                key={lei.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-elevated transition-shadow">
                  <div className="grid lg:grid-cols-4">
                    <div className="lg:col-span-1 bg-primary p-8 text-primary-foreground flex flex-col justify-center">
                      <span className="text-sm font-semibold text-primary-foreground/80 mb-2">
                        {lei.tipo}
                      </span>
                      <span className="font-display text-5xl font-black">
                        LEI {lei.numero}
                      </span>
                      <span className="text-xs mt-2 px-2 py-1 bg-primary-foreground/20 rounded-full w-fit">
                        {lei.status}
                      </span>
                    </div>
                    <div className="lg:col-span-3 p-8">
                      <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                        {lei.titulo}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {lei.resumo}
                      </p>
                      
                      <div className="bg-secondary/10 p-4 rounded-lg mb-4">
                        <p className="text-sm font-semibold text-secondary-foreground mb-1">Impacto esperado:</p>
                        <p className="text-sm text-muted-foreground">{lei.impacto}</p>
                      </div>

                      <h3 className="font-semibold text-foreground mb-2">Principais pontos:</h3>
                      <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                        {lei.pontos.map((ponto) => (
                          <li key={ponto} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                            <span className="text-muted-foreground">{ponto}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-3">
                        <Link to={`/leis/${lei.id}`}>
                          <Button className="bg-primary text-primary-foreground">
                            Ver Detalhes
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Baixar PDF
                        </Button>
                        <Button variant="ghost">
                          <Share2 className="mr-2 h-4 w-4" />
                          Compartilhar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Apoie nossas propostas
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Assine o manifesto e ajude a pressionar por mudanças reais na legislação brasileira.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/manifesto">
              <Button size="lg">
                Assinar Manifesto
              </Button>
            </Link>
            <Link to="/downloads">
              <Button size="lg" variant="outline">
                <Download className="mr-2 h-5 w-5" />
                Baixar Todas as Leis
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
