import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Send, UserPlus, BookOpen, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";

const opcoes = [
  {
    icon: UserPlus,
    title: "Assinar Manifesto",
    description: "Registre seu apoio ao movimento e às nossas propostas de descentralização.",
    href: "/manifesto",
    cta: "Assinar agora",
    destaque: true,
  },
  {
    icon: Send,
    title: "Enviar Sugestão de Lei",
    description: "Tem uma ideia para melhorar o Brasil? Envie sua proposta para análise.",
    href: "/sugestoes",
    cta: "Enviar proposta",
  },
  {
    icon: BookOpen,
    title: "Área do Membro",
    description: "Acesse materiais exclusivos, acompanhe seu progresso e conecte-se com outros membros.",
    href: "/auth",
    cta: "Acessar área",
  },
  {
    icon: Trophy,
    title: "Simulador de PEC",
    description: "Visualize como ficaria seu município com as PECs aprovadas.",
    href: "/simulador",
    cta: "Simular agora",
  },
];

export default function Participe() {
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
              Participe do Movimento
            </h1>
            <p className="text-lg text-white/80">
              Diversas formas de contribuir para a construção de um Brasil descentralizado e forte.
              Escolha como você quer fazer a diferença.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Opções */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {opcoes.map((opcao, index) => (
              <motion.div
                key={opcao.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link to={opcao.href}>
                  <Card className={`h-full hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer ${opcao.destaque ? "border-2 border-primary" : ""}`}>
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${opcao.destaque ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                        <opcao.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="font-display text-xl">
                        {opcao.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {opcao.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant={opcao.destaque ? "default" : "outline"} className="w-full">
                        {opcao.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Cada voz conta
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              O Movimento Jovem Bolsonarista é construído por cidadãos comuns que acreditam 
              em um Brasil melhor. Sua participação faz a diferença.
            </p>
            <blockquote className="font-display text-xl text-foreground italic">
              "Menos Brasília, mais Brasil."
            </blockquote>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
