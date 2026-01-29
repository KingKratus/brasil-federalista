import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, FileText, Share2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

export default function Manifesto() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const assinaturasCount = 12847; // Placeholder

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSuccess(true);
    setIsSubmitting(false);
    toast({
      title: "Assinatura registrada!",
      description: "Obrigado por apoiar o movimento. Você receberá um email de confirmação.",
    });
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
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Assine o Manifesto
            </h1>
            <p className="text-lg text-white/80">
              Junte-se a milhares de brasileiros que acreditam em um Brasil 
              descentralizado, com poder nas mãos do cidadão.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contador */}
      <section className="py-8 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <Users className="h-8 w-8 text-secondary-foreground" />
            <div className="text-center">
              <span className="font-display text-4xl font-black text-secondary-foreground">
                {assinaturasCount.toLocaleString("pt-BR")}
              </span>
              <span className="block text-sm text-secondary-foreground/80">
                assinaturas coletadas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Texto do Manifesto */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-2xl">
                    Manifesto pela Descentralização do Brasil
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    Nós, cidadãos brasileiros, declaramos nosso compromisso com a reconstrução 
                    institucional do Brasil através da descentralização do poder político, 
                    administrativo e fiscal.
                  </p>
                  
                  <h3 className="font-display font-semibold text-foreground mt-6 mb-3">
                    Defendemos:
                  </h3>
                  
                  <ul className="space-y-2">
                    {[
                      "Municípios com real autonomia legislativa e tributária",
                      "Estados fortes com competências ampliadas",
                      "Redução do poder concentrado em Brasília",
                      "Justiça próxima do cidadão, com câmaras regionais",
                      "Segurança pública com poder local",
                      "Transparência e auditoria permanente da dívida pública",
                      "Democracia direta em decisões locais",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-foreground">
                    "O Brasil não é grande demais para ser governado. É centralizado demais."
                  </blockquote>

                  <p className="text-muted-foreground mt-4">
                    Ao assinar este manifesto, você se compromete a divulgar nossas propostas 
                    e apoiar candidatos que defendam a descentralização do poder.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Formulário */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {isSuccess ? (
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-16 w-16 mx-auto mb-4" />
                    <h2 className="font-display text-2xl font-bold mb-2">
                      Obrigado por assinar!
                    </h2>
                    <p className="opacity-80 mb-6">
                      Sua assinatura foi registrada. Você receberá um email de confirmação 
                      e atualizações sobre o movimento.
                    </p>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        navigator.share?.({
                          title: "Manifesto MJB",
                          text: "Assinei o Manifesto pela Descentralização do Brasil!",
                          url: window.location.href,
                        });
                      }}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartilhar
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-xl">
                      Assine agora
                    </CardTitle>
                    <CardDescription>
                      Preencha seus dados para registrar sua assinatura
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Nome completo *
                        </label>
                        <Input
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Seu nome"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Email *
                        </label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Cidade
                          </label>
                          <Input
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            placeholder="Sua cidade"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Estado
                          </label>
                          <Input
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            placeholder="UF"
                            maxLength={2}
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Registrando..." : "Assinar Manifesto"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Seus dados são protegidos e não serão compartilhados com terceiros.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
