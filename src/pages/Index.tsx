import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Scale, Building2, Shield, DollarSign, Lock, Users, ScrollText, Vote, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";

const pilares = [
  {
    icon: Building2,
    title: "Soberania Nacional Real",
    description: "Não apenas simbólica, mas exercida através de instituições fortes e descentralizadas.",
    href: "/pilares#soberania",
  },
  {
    icon: Scale,
    title: "Federalismo Forte",
    description: "Estados e municípios com real poder de decisão e autonomia legislativa.",
    href: "/pilares#federalismo",
  },
  {
    icon: Building2,
    title: "Autonomia Municipal",
    description: "Cidades com poder para resolver seus próprios problemas, sem depender de Brasília.",
    href: "/pilares#autonomia",
  },
  {
    icon: Scale,
    title: "Justiça Descentralizada",
    description: "Justiça próxima do cidadão, com câmaras regionais e redução do poder do STF.",
    href: "/pilares#justica",
  },
  {
    icon: DollarSign,
    title: "Responsabilidade Fiscal",
    description: "Transparência total, auditoria da dívida e limite de endividamento.",
    href: "/pilares#fiscal",
  },
  {
    icon: Shield,
    title: "Segurança com Poder Local",
    description: "Guarda Municipal armada e autonomia para políticas de segurança locais.",
    href: "/pilares#seguranca",
  },
];

const estatisticas = [
  { numero: "3", label: "PECs Propostas", icon: ScrollText },
  { numero: "3", label: "Leis Complementares", icon: FileText },
  { numero: "10K+", label: "Apoiadores", icon: Users },
  { numero: "27", label: "Estados Alcançados", icon: Vote },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-6"
            >
              Movimento Jovem Bolsonarista
            </motion.span>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Menos Brasília,
              <br />
              <span className="text-secondary">mais Brasil.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              Um pacote de reformas constitucionais e legais para devolver poder ao cidadão, 
              aos municípios e à sociedade. Construindo um Brasil descentralizado e forte.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/manifesto">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold animate-pulse-glow">
                  Assinar Manifesto
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/pecs">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent">
                  Ver Propostas
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Estatísticas */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {estatisticas.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {stat.numero}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              O Que Defendemos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seis pilares fundamentais para a reconstrução institucional do Brasil, 
              baseados em federalismo, liberdade e responsabilidade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pilares.map((pilar, index) => (
              <motion.div
                key={pilar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link to={pilar.href}>
                  <Card className="h-full hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group cursor-pointer border-2 hover:border-primary">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <pilar.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <CardTitle className="font-display text-xl group-hover:text-primary transition-colors">
                        {pilar.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {pilar.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/pilares">
              <Button variant="outline" size="lg">
                Ver Todos os Pilares
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Comparador Destaque */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-accent overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <ArrowLeftRight className="h-6 w-6 text-accent" />
                    </div>
                    <span className="text-sm font-semibold text-accent uppercase tracking-wide">
                      Ferramenta Interativa
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Brasil Atual vs. Brasil Descentralizado
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Compare métricas de autonomia, tributação e justiça entre o modelo 
                    centralizado atual e nossa proposta de Brasil descentralizado.
                  </p>
                  <Link to="/comparador">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                      Explorar Comparador
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-accent/20 to-primary/20 p-8 md:p-12 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-4xl font-bold text-destructive">15%</div>
                      <div className="text-sm text-muted-foreground">Autonomia Atual</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-primary">85%</div>
                      <div className="text-sm text-muted-foreground">Autonomia Proposta</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-destructive">4.5 anos</div>
                      <div className="text-sm text-muted-foreground">Tempo Processos</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-primary">1.5 anos</div>
                      <div className="text-sm text-muted-foreground">Com Reforma</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Faça Parte da Mudança
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Junte-se a milhares de brasileiros que acreditam em um país descentralizado, 
              com poder nas mãos do cidadão e das comunidades locais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/manifesto">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Assinar Manifesto
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent">
                  Entrar como Membro
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="font-display text-2xl md:text-3xl text-foreground italic mb-4">
              "O Brasil não é grande demais para ser governado.
              <br />
              <span className="text-primary font-bold">É centralizado demais.</span>"
            </p>
            <cite className="text-muted-foreground">— Movimento Jovem Bolsonarista</cite>
          </motion.blockquote>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
