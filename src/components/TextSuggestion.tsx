import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Plus, X, Check, Send, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface TextSuggestionProps {
  documentType: "pec" | "lei";
  documentId: string;
  originalText: string;
}

interface Suggestion {
  id: string;
  original_text: string;
  suggested_text: string;
  justification: string | null;
  status: string;
  author_name: string | null;
  created_at: string;
}

export function TextSuggestion({ documentType, documentId, originalText }: TextSuggestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [suggestedText, setSuggestedText] = useState("");
  const [justification, setJustification] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchSuggestions();
    }
  }, [isOpen, documentId]);

  const fetchSuggestions = async () => {
    const { data, error } = await supabase
      .from("text_suggestions")
      .select("*")
      .eq("document_type", documentType)
      .eq("document_id", documentId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSuggestions(data as Suggestion[]);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Faça login",
        description: "Você precisa estar logado para enviar sugestões.",
      });
      return;
    }

    if (!selectedText.trim() || !suggestedText.trim()) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha o texto original e a sugestão.",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("text_suggestions").insert({
      document_type: documentType,
      document_id: documentId,
      original_text: selectedText,
      suggested_text: suggestedText,
      justification: justification || null,
      user_id: user.id,
      author_name: authorName || user.email?.split("@")[0] || "Anônimo",
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: "Não foi possível enviar sua sugestão. Tente novamente.",
      });
    } else {
      toast({
        title: "Sugestão enviada!",
        description: "Sua sugestão foi registrada e será analisada.",
      });
      setSelectedText("");
      setSuggestedText("");
      setJustification("");
      setShowForm(false);
      fetchSuggestions();
    }

    setIsSubmitting(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-primary">Aprovada</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejeitada</Badge>;
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }
  };

  return (
    <div className="mt-6">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-start"
      >
        <GitBranch className="mr-2 h-4 w-4" />
        Sugestões de Alteração
        {suggestions.length > 0 && (
          <Badge variant="secondary" className="ml-auto">
            {suggestions.length}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="mt-4 border-dashed">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Sugestões da Comunidade
                  </span>
                  {user && (
                    <Button
                      size="sm"
                      onClick={() => setShowForm(!showForm)}
                      variant={showForm ? "secondary" : "default"}
                    >
                      {showForm ? (
                        <>
                          <X className="mr-1 h-4 w-4" /> Cancelar
                        </>
                      ) : (
                        <>
                          <Plus className="mr-1 h-4 w-4" /> Nova Sugestão
                        </>
                      )}
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {!user && (
                  <div className="text-center py-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm">
                      <a href="/auth" className="text-primary hover:underline">
                        Faça login
                      </a>{" "}
                      para enviar sugestões de alteração.
                    </p>
                  </div>
                )}

                <AnimatePresence>
                  {showForm && user && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="space-y-2">
                        <Label>Seu nome (opcional)</Label>
                        <Input
                          placeholder="Como você quer ser identificado"
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Trecho original que deseja alterar *</Label>
                        <Textarea
                          placeholder="Cole aqui o trecho do texto que você sugere modificar..."
                          value={selectedText}
                          onChange={(e) => setSelectedText(e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Sua sugestão de alteração *</Label>
                        <Textarea
                          placeholder="Escreva aqui como o trecho deveria ficar..."
                          value={suggestedText}
                          onChange={(e) => setSuggestedText(e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Justificativa (opcional)</Label>
                        <Textarea
                          placeholder="Explique por que essa alteração é importante..."
                          value={justification}
                          onChange={(e) => setJustification(e.target.value)}
                          rows={2}
                        />
                      </div>

                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? (
                          "Enviando..."
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" /> Enviar Sugestão
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {suggestions.length > 0 ? (
                  <div className="space-y-4">
                    <Separator />
                    <h4 className="font-semibold text-sm text-muted-foreground">
                      Sugestões recebidas ({suggestions.length})
                    </h4>
                    {suggestions.map((suggestion) => (
                      <motion.div
                        key={suggestion.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 border rounded-lg space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>{suggestion.author_name || "Anônimo"}</span>
                            <span>•</span>
                            <span>
                              {new Date(suggestion.created_at).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          {getStatusBadge(suggestion.status)}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="p-3 bg-destructive/10 rounded border-l-4 border-destructive">
                            <p className="font-semibold text-destructive mb-1 text-xs uppercase">
                              Original
                            </p>
                            <p className="text-muted-foreground line-through">
                              {suggestion.original_text}
                            </p>
                          </div>
                          <div className="p-3 bg-primary/10 rounded border-l-4 border-primary">
                            <p className="font-semibold text-primary mb-1 text-xs uppercase">
                              Sugestão
                            </p>
                            <p>{suggestion.suggested_text}</p>
                          </div>
                        </div>

                        {suggestion.justification && (
                          <p className="text-sm text-muted-foreground italic">
                            <strong>Justificativa:</strong> {suggestion.justification}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    Nenhuma sugestão ainda. Seja o primeiro!
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
