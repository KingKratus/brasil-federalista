import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Scale, Shield, DollarSign, Lock, Users, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const pilares = [
  {
    id: "soberania",
    icon: Building2,
    emoji: "🇧🇷",
    title: "Soberania Nacional Real",
    subtitle: "Não simbólica",
    description: "Defendemos uma soberania exercida através de instituições fortes e descentralizadas, onde o poder emana do povo e é exercido localmente.",
    pontos: [
      "Fortalecimento das instituições locais",
      "Redução da dependência de organismos internacionais",
      "Proteção das fronteiras e recursos naturais",
      "Valorização da identidade nacional",
    ],
    propostas: ["/pecs/municipios-semissoberanos"],
  },
  {
    id: "federalismo",
    icon: Scale,
    emoji: "🏛️",
    title: "Federalismo Forte e Descentralizado",
    subtitle: "Poder distribuído",
    description: "Um federalismo real, onde estados e municípios possuem autonomia legislativa, tributária e administrativa plena.",
    pontos: [
      "Competência legislativa ampliada para municípios",
      "Autonomia tributária estadual e municipal",
      "Redução do poder concentrado na União",
      "Respeito às particularidades regionais",
    ],
    propostas: ["/pecs/federalismo-penal", "/leis/distritos-tributarios"],
  },
  {
    id: "autonomia",
    icon: Building2,
    emoji: "🏙️",
    title: "Autonomia Municipal Máxima",
    subtitle: "Cidades livres",
    description: "Municípios com poder real para criar suas próprias leis administrativas, tributárias e de ordem pública.",
    pontos: [
      "Municípios semissoberanos",
      "Códigos administrativos próprios",
      "Justiça municipal para crimes leves",
      "Orçamento impositivo local",
    ],
    propostas: ["/pecs/municipios-semissoberanos", "/leis/democracia-direta"],
  },
  {
    id: "justica",
    icon: Scale,
    emoji: "⚖️",
    title: "Justiça Próxima do Cidadão",
    subtitle: "Descentralização judicial",
    description: "Sistema judiciário reestruturado com câmaras regionais, reduzindo a hiperconcentração do STF.",
    pontos: [
      "Câmaras constitucionais regionais",
      "Reforma do STF",
      "Justiça municipal para causas menores",
      "Celeridade processual",
    ],
    propostas: ["/pecs/reforma-stf"],
  },
  {
    id: "fiscal",
    icon: DollarSign,
    emoji: "💰",
    title: "Responsabilidade Fiscal e Transparência",
    subtitle: "Dinheiro do povo",
    description: "Controle rigoroso do gasto público, auditoria permanente da dívida e transparência total.",
    pontos: [
      "Auditoria permanente da dívida pública",
      "Limite constitucional de endividamento",
      "Orçamento impositivo",
      "Redução de subsídios cruzados",
    ],
    propostas: ["/leis/auditoria-divida", "/leis/distritos-tributarios"],
  },
  {
    id: "seguranca",
    icon: Shield,
    emoji: "🔒",
    title: "Segurança Pública com Poder Local",
    subtitle: "Proteção do cidadão",
    description: "Guardas Municipais armadas e autônomas, com poder de polícia e integração de dados criminais.",
    pontos: [
      "Guarda Municipal armada com poder de polícia",
      "Banco de dados criminais integrado",
      "Autonomia para políticas de segurança",
      "Resposta rápida e local",
    ],
    propostas: ["/pecs/municipios-semissoberanos"],
  },
];

export default function Pilares() {
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
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              O Que Defendemos
            </h1>
            <p className="text-lg text-white/80">
              Seis pilares fundamentais para a reconstrução institucional do Brasil, 
              baseados em federalismo, liberdade e responsabilidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-12">
            {pilares.map((pilar, index) => (
              <motion.div
                key={pilar.id}
                id={pilar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <div className="grid lg:grid-cols-3">
                    <div className="lg:col-span-1 bg-primary/5 p-8 flex flex-col justify-center">
                      <span className="text-5xl mb-4">{pilar.emoji}</span>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                        {pilar.title}
                      </h2>
                      <p className="text-sm text-primary font-semibold uppercase tracking-wide">
                        {pilar.subtitle}
                      </p>
                    </div>
                    <div className="lg:col-span-2 p-8">
                      <p className="text-muted-foreground mb-6">
                        {pilar.description}
                      </p>
                      <h3 className="font-semibold text-foreground mb-3">Pontos principais:</h3>
                      <ul className="space-y-2 mb-6">
                        {pilar.pontos.map((ponto) => (
                          <li key={ponto} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground">{ponto}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {pilar.propostas.map((proposta) => (
                          <Link key={proposta} to={proposta}>
                            <Button variant="outline" size="sm">
                              Ver Proposta
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        ))}
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
            Concorda com nossos pilares?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Junte-se ao movimento e ajude a construir um Brasil descentralizado e forte.
          </p>
          <Link to="/manifesto">
            <Button size="lg" className="bg-primary text-primary-foreground">
              Assinar Manifesto
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
