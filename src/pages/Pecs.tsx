import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Download, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const pecs = [
  {
    id: "municipios-semissoberanos",
    numero: "01",
    titulo: "Municípios Semissoberanos",
    artigo: "Art. 29-A",
    resumo: "Cria o conceito de município semissoberano, com competência legislativa ampliada em matérias administrativas, tributárias e penais leves.",
    impacto: "Redução do poder concentrado na União e leis mais próximas da realidade local.",
    pontos: [
      "Autonomia legislativa plena em matérias administrativas",
      "Competência tributária ampliada",
      "Justiça municipal para crimes leves",
      "Códigos administrativos próprios",
    ],
    status: "Em elaboração",
  },
  {
    id: "federalismo-penal",
    numero: "02",
    titulo: "Federalismo Penal Escalonado",
    artigo: "Art. 22-A",
    resumo: "Permite a existência de legislação penal municipal e estadual, respeitando hierarquia clara de competências.",
    impacto: "Sistema penal mais adequado às realidades regionais e locais.",
    pontos: [
      "União: crimes contra a federação",
      "Estados: crimes violentos",
      "Municípios: crimes de ordem urbana e administrativa",
      "Hierarquia clara de competências",
    ],
    status: "Em elaboração",
  },
  {
    id: "reforma-stf",
    numero: "03",
    titulo: "Reforma do STF e Justiça Descentralizada",
    artigo: "Art. 101",
    resumo: "Reduz a hiperconcentração do STF e cria câmaras constitucionais regionais para desafogar o sistema.",
    impacto: "Justiça mais célere e próxima do cidadão.",
    pontos: [
      "Criação de câmaras constitucionais regionais",
      "Limitação de competências do STF",
      "Mandatos fixos para ministros",
      "Maior transparência nas decisões",
    ],
    status: "Em elaboração",
  },
];

export default function Pecs() {
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
              Propostas de Emenda à Constituição
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Pacote de PECs
            </h1>
            <p className="text-lg text-white/80">
              Três propostas de emenda constitucional para transformar a estrutura 
              do Estado brasileiro, devolvendo poder aos municípios e cidadãos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lista de PECs */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-8">
            {pecs.map((pec, index) => (
              <motion.div
                key={pec.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-elevated transition-shadow">
                  <div className="grid lg:grid-cols-4">
                    <div className="lg:col-span-1 bg-accent p-8 text-accent-foreground flex flex-col justify-center">
                      <span className="text-sm font-semibold text-secondary mb-2">
                        {pec.artigo}
                      </span>
                      <span className="font-display text-5xl font-black text-secondary">
                        PEC {pec.numero}
                      </span>
                      <span className="text-xs mt-2 px-2 py-1 bg-secondary/20 rounded-full w-fit">
                        {pec.status}
                      </span>
                    </div>
                    <div className="lg:col-span-3 p-8">
                      <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                        {pec.titulo}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {pec.resumo}
                      </p>
                      
                      <div className="bg-primary/5 p-4 rounded-lg mb-4">
                        <p className="text-sm font-semibold text-primary mb-1">Impacto esperado:</p>
                        <p className="text-sm text-muted-foreground">{pec.impacto}</p>
                      </div>

                      <h3 className="font-semibold text-foreground mb-2">Principais pontos:</h3>
                      <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                        {pec.pontos.map((ponto) => (
                          <li key={ponto} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                            <span className="text-muted-foreground">{ponto}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-3">
                        <Link to={`/pecs/${pec.id}`}>
                          <Button>
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
            Assine o manifesto e ajude a pressionar por mudanças reais na estrutura do Estado.
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
                Baixar Todas as PECs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
