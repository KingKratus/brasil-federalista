import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, LogOut, BookOpen, FileText, Trophy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

const materiais = [
  { titulo: "Introdução ao Federalismo", tipo: "PDF", progresso: 100 },
  { titulo: "Autonomia Municipal na Prática", tipo: "PDF", progresso: 75 },
  { titulo: "Guia de Argumentação Política", tipo: "PDF", progresso: 30 },
  { titulo: "História da Descentralização no Brasil", tipo: "Vídeo", progresso: 0 },
];

export default function Membros() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Até logo!",
      description: "Você saiu da sua conta.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Carregando...</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Membro";
  const progressoGeral = Math.round(materiais.reduce((acc, m) => acc + m.progresso, 0) / materiais.length);

  return (
    <Layout>
      <section className="pt-20 pb-12 gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
                    Olá, {userName}!
                  </h1>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    Jovem Liderança
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Progresso */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-secondary" />
                      Seu Progresso
                    </CardTitle>
                    <CardDescription>
                      Continue estudando para se tornar um líder ainda mais preparado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progresso geral</span>
                        <span className="font-semibold">{progressoGeral}%</span>
                      </div>
                      <Progress value={progressoGeral} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Materiais de Estudo
                    </CardTitle>
                    <CardDescription>
                      Conteúdos exclusivos para membros
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {materiais.map((material) => (
                        <div
                          key={material.titulo}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{material.titulo}</p>
                              <p className="text-sm text-muted-foreground">{material.tipo}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-24">
                              <Progress value={material.progresso} className="h-2" />
                            </div>
                            <span className="text-sm text-muted-foreground w-12 text-right">
                              {material.progresso}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-lg">Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/pecs")}>
                      <FileText className="mr-2 h-4 w-4" />
                      Ver PECs
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/leis")}>
                      <FileText className="mr-2 h-4 w-4" />
                      Ver Leis
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/simulador")}>
                      <Trophy className="mr-2 h-4 w-4" />
                      Simulador
                    </Button>
                    <Button className="w-full justify-start" onClick={() => navigate("/manifesto")}>
                      <Send className="mr-2 h-4 w-4" />
                      Assinar Manifesto
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-secondary">
                  <CardContent className="p-6 text-center">
                    <Badge className="bg-secondary text-secondary-foreground mb-2">Apoiador Verificado</Badge>
                    <p className="text-sm text-muted-foreground">
                      Você é um membro ativo do Movimento Jovem Bolsonarista
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
