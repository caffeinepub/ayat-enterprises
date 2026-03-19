import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  ChevronUp,
  DollarSign,
  FileText,
  Globe,
  Mail,
  Menu,
  PieChart,
  Search,
  Share2,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

interface CaseStudy {
  company: string;
  industry: string;
  metric: string;
  before: string;
  after: string;
  description: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const services: Service[] = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "SEO Optimization",
    description:
      "Dominate search rankings with technical SEO audits, keyword strategy, and on-page optimization that drives sustainable organic growth.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "PPC Advertising",
    description:
      "Maximize ROI with precision-targeted Google Ads and Bing campaigns, reducing cost-per-acquisition while increasing qualified leads.",
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Social Media Marketing",
    description:
      "Build brand authority and community engagement across LinkedIn, Instagram, and X with data-driven content and paid social strategies.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Content Marketing",
    description:
      "Attract and convert prospects with authoritative long-form content, case studies, and thought leadership that positions you as industry leader.",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Marketing",
    description:
      "Nurture leads through automated drip campaigns, segmented newsletters, and behaviour-triggered sequences with 40%+ open rates.",
  },
  {
    icon: <PieChart className="w-6 h-6" />,
    title: "Web Analytics",
    description:
      "Turn raw data into revenue decisions with GA4 setup, custom dashboards, conversion tracking, and monthly performance insights.",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    company: "NovaTech Solutions",
    role: "CEO",
    quote:
      "Ayat Enterprises transformed our digital presence. Within 6 months our organic traffic tripled and our leads pipeline exploded. The team's strategic thinking is second to none.",
    rating: 5,
  },
  {
    name: "Marcus Williams",
    company: "Apex Retail Group",
    role: "Marketing Director",
    quote:
      "Our PPC campaigns were bleeding money before we partnered with Ayat. They cut our CPA by 47% in the first quarter and we've never looked back. Genuinely world-class.",
    rating: 5,
  },
  {
    name: "Priya Kapoor",
    company: "FinEdge Advisors",
    role: "Co-Founder",
    quote:
      "The content strategy they built for us established us as thought leaders in fintech. Our white papers now generate qualified leads every week. Worth every penny.",
    rating: 5,
  },
  {
    name: "James O'Brien",
    company: "Crestwood Healthcare",
    role: "Head of Growth",
    quote:
      "Professional, data-driven, and genuinely invested in our success. Ayat's team feels like an extension of our own. Our patient acquisition is up 210% year-over-year.",
    rating: 5,
  },
];

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$1,499",
    period: "/month",
    description:
      "Perfect for growing businesses ready to establish digital authority.",
    features: [
      "SEO audit & on-page optimisation",
      "Google Ads management (up to $5k spend)",
      "Monthly analytics report",
      "2 blog posts per month",
      "Email support",
      "Dedicated account manager",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$3,499",
    period: "/month",
    description: "For ambitious brands ready to dominate their market segment.",
    features: [
      "Everything in Starter",
      "Full PPC management (up to $20k spend)",
      "Social media management (3 platforms)",
      "6 content pieces per month",
      "Email marketing automation",
      "Bi-weekly strategy calls",
      "Conversion rate optimisation",
    ],
    cta: "Most Popular",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "Full-service digital marketing for enterprise-scale ambitions.",
    features: [
      "Everything in Growth",
      "Unlimited ad spend management",
      "Custom analytics & BI dashboards",
      "PR & digital outreach",
      "Dedicated creative team",
      "Weekly executive reporting",
      "SLA-backed performance guarantees",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

const caseStudies: CaseStudy[] = [
  {
    company: "TechVista E-commerce",
    industry: "Retail & E-commerce",
    metric: "Organic Revenue",
    before: "$42k/mo",
    after: "$198k/mo",
    description:
      "Restructured site architecture, rebuilt internal linking strategy, and launched a topical authority content cluster that ranked 340 new keywords in under 8 months.",
  },
  {
    company: "Meridian Law Group",
    industry: "Professional Services",
    metric: "Qualified Leads",
    before: "18/month",
    after: "143/month",
    description:
      "Combined local SEO dominance with targeted Google Ads and a LinkedIn thought leadership programme that positioned their partners as leading voices in corporate law.",
  },
  {
    company: "PulseHealth Clinics",
    industry: "Healthcare",
    metric: "Patient Bookings",
    before: "94/month",
    after: "512/month",
    description:
      "Rebuilt their entire paid search strategy with a 12-campaign structure, added remarketing, and deployed a 6-sequence email nurture flow reducing no-shows by 38%.",
  },
];

const faqs = [
  {
    question: "How soon can I expect to see results from SEO?",
    answer:
      "SEO is a medium-to-long-term strategy. Most clients see meaningful improvements in rankings and traffic within 3–6 months, with compounding growth thereafter. PPC and paid social campaigns typically show measurable ROI within the first 30 days.",
  },
  {
    question: "Do you work with businesses in any industry?",
    answer:
      "We specialise in B2B services, e-commerce, healthcare, fintech, and professional services. Our team has deep vertical expertise in these sectors, allowing us to craft strategies that actually resonate with your specific audience and competitive landscape.",
  },
  {
    question: "What makes Ayat Enterprises different from other agencies?",
    answer:
      "We operate on a performance-first model: our strategies are built around revenue outcomes, not vanity metrics. Every campaign is grounded in competitive research, precise audience targeting, and continuous data-driven iteration. We don't sell retainers — we build growth engines.",
  },
  {
    question: "How do you measure and report on campaign performance?",
    answer:
      "Every client receives a custom analytics dashboard and a structured monthly report covering traffic, conversions, cost-per-acquisition, ROI, and actionable next steps. Growth tier clients and above also receive bi-weekly strategy calls.",
  },
  {
    question: "Can I upgrade or change my plan as my business grows?",
    answer:
      "Absolutely. Our packages are designed to scale with you. Upgrades take effect the following billing cycle, and our team proactively recommends plan changes when your business has outgrown its current tier. There are no long-term lock-in contracts.",
  },
];

// ─── Utility ─────────────────────────────────────────────────────────────────

function useScrollspy(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const contactRef = useRef<HTMLElement>(null);

  const navLinks = [
    "services",
    "results",
    "testimonials",
    "pricing",
    "contact",
  ];
  const active = useScrollspy(navLinks);

  useEffect(() => {
    const handler = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    toast.success("Message sent! We'll be in touch within 24 hours.");
    setFormData({ name: "", email: "", company: "", message: "" });
  }

  const stats = [
    {
      icon: <Users className="w-7 h-7" />,
      value: "340+",
      label: "Clients Served",
    },
    {
      icon: <DollarSign className="w-7 h-7" />,
      value: "$2.8B",
      label: "Revenue Generated",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      value: "412%",
      label: "Avg Traffic Increase",
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      value: "8.4x",
      label: "Average ROI",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" />

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              Ayat
              <span className="text-primary"> Enterprises</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((id) => (
              <button
                type="button"
                key={id}
                onClick={() => scrollTo(id)}
                data-ocid="nav.link"
                className={`text-sm font-medium capitalize transition-colors hover:text-primary ${
                  active === id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {id}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Button
              onClick={() => scrollTo("contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              data-ocid="nav.primary_button"
            >
              Free Consultation
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.toggle"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-background"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                {navLinks.map((id) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="capitalize text-left py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    data-ocid="nav.link"
                  >
                    {id}
                  </button>
                ))}
                <Button
                  onClick={() => scrollTo("contact")}
                  className="bg-primary text-primary-foreground mt-2"
                  data-ocid="nav.primary_button"
                >
                  Free Consultation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden pt-16"
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.78 0.15 85 / 0.3) 1px, transparent 1px), linear-gradient(to right, oklch(0.78 0.15 85 / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.78 0.15 85 / 0.6)" }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1">
                <Award className="w-3.5 h-3.5 mr-1.5" /> #1 Rated Digital
                Marketing Agency
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              Turn Search Rankings
              <br />
              Into <span className="text-primary">Real Revenue</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
            >
              Ayat Enterprises is a performance-first digital marketing agency
              that combines enterprise-grade SEO, precision PPC, and data-driven
              content to deliver measurable, compounding growth for ambitious
              brands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => scrollTo("contact")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold px-8 shadow-gold"
                data-ocid="hero.primary_button"
              >
                Get a Free Strategy Call <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("results")}
                className="border-border text-foreground hover:bg-muted text-base"
                data-ocid="hero.secondary_button"
              >
                View Our Results
              </Button>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-14 flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>No long-term contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Dedicated account manager</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Results in 30 days</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Our Services
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="text-primary"> Dominate Online</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From technical SEO to performance advertising — integrated
              strategies built to compound your growth month after month.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Card className="bg-card border-border/60 hover:border-primary/40 transition-all duration-300 hover:shadow-gold group h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary/20 transition-colors">
                      {svc.icon}
                    </div>
                    <CardTitle className="font-display text-xl">
                      {svc.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {svc.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results / Stats ── */}
      <section id="results" className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Proven Results
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Numbers That
              <span className="text-primary"> Speak for Themselves</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="bg-card border-border/60 text-center py-8 hover:border-primary/40 transition-all hover:shadow-gold">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-3 text-primary">
                      {s.icon}
                    </div>
                    <div className="font-display text-4xl font-bold text-primary mb-1">
                      {s.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {s.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Case Studies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Featured Case Studies
            </h3>
            <p className="text-muted-foreground">
              Real clients, real numbers, real growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="bg-card border-border/60 hover:border-primary/40 transition-all hover:shadow-gold h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="font-display text-lg">
                          {cs.company}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {cs.industry}
                        </Badge>
                      </div>
                      <Globe className="w-5 h-5 text-primary mt-1" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">
                      {cs.metric}
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1 bg-muted rounded-lg p-3 text-center">
                        <div className="text-xs text-muted-foreground mb-0.5">
                          Before
                        </div>
                        <div className="font-display font-bold text-xl">
                          {cs.before}
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                      <div className="flex-1 bg-primary/10 rounded-lg p-3 text-center border border-primary/20">
                        <div className="text-xs text-primary/70 mb-0.5">
                          After
                        </div>
                        <div className="font-display font-bold text-xl text-primary">
                          {cs.after}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cs.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Client Stories
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              What Our Clients
              <span className="text-primary"> Are Saying</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trusted by 340+ businesses across industries to deliver
              transformative digital growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="bg-card border-border/60 hover:border-primary/40 transition-all hover:shadow-gold h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].slice(0, t.rating).map((n) => (
                        <Star
                          key={t.name + n}
                          className="w-4 h-4 text-primary fill-primary"
                        />
                      ))}
                    </div>
                    <blockquote className="text-foreground/90 leading-relaxed mb-6 text-sm md:text-base">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{t.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {t.role} · {t.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Transparent Pricing
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Invest in Growth,
              <span className="text-primary"> Not Guesswork</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No hidden fees. No long-term lock-in. Every plan includes a
              dedicated account manager and monthly performance reporting.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 text-xs font-bold">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full transition-all duration-300 ${
                    tier.highlighted
                      ? "border-primary/60 bg-card shadow-gold scale-[1.02]"
                      : "border-border/60 bg-card hover:border-primary/30"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">
                      {tier.name}
                    </CardTitle>
                    <div className="flex items-end gap-1 mt-2">
                      <span
                        className={`font-display text-4xl font-bold ${tier.highlighted ? "text-primary" : ""}`}
                      >
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-muted-foreground text-sm mb-1">
                          {tier.period}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {tier.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => scrollTo("contact")}
                      className={`w-full font-semibold ${
                        tier.highlighted
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                      data-ocid={`pricing.primary_button.${i + 1}`}
                    >
                      {tier.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              FAQ
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Common
              <span className="text-primary"> Questions</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${i}`}
                  className="bg-card border border-border/60 rounded-lg px-6 hover:border-primary/30 transition-colors"
                  data-ocid={`faq.item.${i + 1}`}
                >
                  <AccordionTrigger className="font-semibold text-left hover:no-underline hover:text-primary transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" ref={contactRef} className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Get in Touch
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Let's Build Your
                <span className="text-primary"> Growth Engine</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Book a free 45-minute strategy session. We'll audit your current
                digital presence, identify quick wins, and outline a tailored
                growth roadmap — no fluff, no hard sell.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
                    text: "Comprehensive digital audit included",
                  },
                  {
                    icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
                    text: "Custom growth roadmap",
                  },
                  {
                    icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
                    text: "No obligation, no pressure",
                  },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className="bg-card border-border/60"
                data-ocid="contact.card"
              >
                <CardContent className="pt-8 pb-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium" htmlFor="name">
                          Name *
                        </label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="bg-background border-border/60 focus:border-primary"
                          data-ocid="contact.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium" htmlFor="email">
                          Email *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="bg-background border-border/60 focus:border-primary"
                          data-ocid="contact.input"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium" htmlFor="company">
                        Company
                      </label>
                      <Input
                        id="company"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="bg-background border-border/60 focus:border-primary"
                        data-ocid="contact.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium" htmlFor="message">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us about your business goals and current challenges..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="bg-background border-border/60 focus:border-primary resize-none"
                        data-ocid="contact.textarea"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                      data-ocid="contact.submit_button"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                      {!submitting && <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50 bg-card py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display text-lg font-bold">
                  Ayat <span className="text-primary">Enterprises</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Performance-first digital marketing agency delivering
                measurable, compounding growth for ambitious brands worldwide.
              </p>
              <div className="flex gap-4 mt-5">
                <a
                  href="https://linkedin.com"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  <SiLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com"
                  aria-label="X / Twitter"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  <SiX className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  <SiFacebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  <SiInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
                Services
              </h4>
              <ul className="space-y-2.5">
                {[
                  "SEO Optimization",
                  "PPC Advertising",
                  "Social Media",
                  "Content Marketing",
                  "Email Marketing",
                ].map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => scrollTo("services")}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      data-ocid="footer.link"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
                Company
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Our Results", id: "results" },
                  { label: "Testimonials", id: "testimonials" },
                  { label: "Pricing", id: "pricing" },
                  { label: "Contact", id: "contact" },
                ].map((l) => (
                  <li key={l.label}>
                    <button
                      type="button"
                      onClick={() => scrollTo(l.id)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      data-ocid="footer.link"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <span>
              © {new Date().getFullYear()} Ayat Enterprises. All rights
              reserved.
            </span>
            <span>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline-offset-2 hover:underline"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* ── Scroll to top ── */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-gold hover:bg-primary/90 transition-colors"
            data-ocid="nav.button"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
