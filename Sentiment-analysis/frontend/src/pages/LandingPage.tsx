import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle, BarChart3, MessageCircle, Shield, Zap, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { ThemeProvider } from "next-themes";

function LandingPageContent() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time sentiment analysis with AI-powered insights and comprehensive reporting."
    },
    {
      icon: MessageCircle,
      title: "Comment Processing",
      description: "Bulk upload and process thousands of stakeholder comments with automated categorization."
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with role-based access control and data protection."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process large datasets quickly with optimized algorithms and cloud infrastructure."
    }
  ];

  const benefits = [
    "AI-powered sentiment analysis",
    "Interactive data visualizations",
    "Bulk comment processing",
    "Exportable reports (PDF/CSV)",
    "Real-time dashboard insights",
    "Multi-format file support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center space-x-4">
            <div className="hero-gradient p-2 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">eConsultation</h1>
              <p className="text-xs text-muted-foreground">Comment Analyzer</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Benefits
            </a>
            <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              onClick={() => navigate('/upload')}
              className="hero-gradient text-white font-medium"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
                AI-Powered Comment Analysis Platform
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Transform Stakeholder
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Feedback </span>
                Into Actionable Insights
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Analyze thousands of consultation comments with advanced AI sentiment analysis,
                automated categorization, and beautiful visualizations. Make data-driven decisions faster.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  size="lg"
                  onClick={() => navigate('/upload')}
                  className="hero-gradient text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Start Analyzing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg border-2 hover:bg-accent/10"
                >
                  View Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 hero-gradient rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to process, analyze, and visualize stakeholder feedback effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 bg-card">
                  <div className="hero-gradient p-3 rounded-lg w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Built specifically for government consultations and stakeholder engagement,
                our platform delivers enterprise-grade analysis with user-friendly interfaces.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="p-8 bg-gradient-to-br from-card to-accent/10 shadow-xl">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="hero-gradient p-4 rounded-full w-fit mx-auto mb-4">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Get Started?</h3>
                    <p className="text-muted-foreground">Join organizations already using our platform</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">10K+</div>
                      <div className="text-sm text-muted-foreground">Comments Analyzed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">50+</div>
                      <div className="text-sm text-muted-foreground">Organizations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">99%</div>
                      <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate('/dashboard')}
                    className="w-full hero-gradient text-white font-semibold py-3"
                  >
                    Start Free Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="hero-gradient p-2 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">eConsultation Comment Analyzer</h3>
                <p className="text-sm text-muted-foreground">AI-Powered Stakeholder Insights</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Transform your consultation process with intelligent comment analysis and actionable insights.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 eConsultation Platform. Built for government and enterprise stakeholder engagement.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function LandingPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LandingPageContent />
    </ThemeProvider>
  );
}