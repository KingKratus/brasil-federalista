import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pilares from "./pages/Pilares";
import Pecs from "./pages/Pecs";
import PecDetalhe from "./pages/PecDetalhe";
import Leis from "./pages/Leis";
import LeiDetalhe from "./pages/LeiDetalhe";
import Simulador from "./pages/Simulador";
import Comparador from "./pages/Comparador";
import Manifesto from "./pages/Manifesto";
import Participe from "./pages/Participe";
import Auth from "./pages/Auth";
import Membros from "./pages/Membros";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pilares" element={<Pilares />} />
          <Route path="/pecs" element={<Pecs />} />
          <Route path="/pecs/:id" element={<PecDetalhe />} />
          <Route path="/leis" element={<Leis />} />
          <Route path="/leis/:id" element={<LeiDetalhe />} />
          <Route path="/simulador" element={<Simulador />} />
          <Route path="/comparador" element={<Comparador />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/participe" element={<Participe />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/membros" element={<Membros />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
