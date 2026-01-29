import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, MessageCircle } from "lucide-react";
import logoMjb from "@/assets/logo-mjb.jpg";

const footerLinks = {
  propostas: [
    { name: "PEC 01 - Municípios Semissoberanos", href: "/pecs/municipios-semissoberanos" },
    { name: "PEC 02 - Federalismo Penal", href: "/pecs/federalismo-penal" },
    { name: "PEC 03 - Reforma do STF", href: "/pecs/reforma-stf" },
    { name: "Lei de Distritos Tributários", href: "/leis/distritos-tributarios" },
  ],
  movimento: [
    { name: "O Que Defendemos", href: "/pilares" },
    { name: "Assinar Manifesto", href: "/manifesto" },
    { name: "Área do Membro", href: "/auth" },
    { name: "Enviar Sugestões", href: "/sugestoes" },
  ],
  recursos: [
    { name: "Downloads", href: "/downloads" },
    { name: "Simulador de PEC", href: "/simulador" },
    { name: "Comparador Brasil", href: "/comparador" },
  ],
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "WhatsApp", icon: MessageCircle, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src={logoMjb}
                alt="Movimento Jovem Bolsonarista"
                className="h-12 w-12 rounded-full object-cover border-2 border-secondary"
              />
              <div>
                <span className="font-display font-bold text-xl text-secondary">
                  MJB
                </span>
                <span className="block text-xs text-accent-foreground/70">
                  Movimento Jovem Bolsonarista
                </span>
              </div>
            </Link>
            <p className="text-sm text-accent-foreground/80 mb-6">
              Menos Brasília, mais Brasil. Um pacote de reformas constitucionais 
              e legais para devolver poder ao cidadão.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-full bg-accent-foreground/10 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Propostas */}
          <div>
            <h3 className="font-display font-semibold text-secondary mb-4">
              Propostas
            </h3>
            <ul className="space-y-2">
              {footerLinks.propostas.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-accent-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Movimento */}
          <div>
            <h3 className="font-display font-semibold text-secondary mb-4">
              Movimento
            </h3>
            <ul className="space-y-2">
              {footerLinks.movimento.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-accent-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-display font-semibold text-secondary mb-4">
              Recursos
            </h3>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-accent-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-accent-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-accent-foreground/60">
              © {new Date().getFullYear()} Movimento Jovem Bolsonarista. Todos os direitos reservados.
            </p>
            <p className="text-sm text-accent-foreground/60 italic">
              "O Brasil não é grande demais para ser governado. É centralizado demais."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
