import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, CreditCard, FileText, Users, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Subscription Management",
      description: "Flexible billing cycles, trial periods, and plan management for any business model."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Usage Metering",
      description: "Track and bill based on actual usage with real-time monitoring and alerts."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Automated Invoicing",
      description: "Generate professional invoices automatically with PDF downloads and email delivery."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customer Portal",
      description: "Self-service portal for customers to manage subscriptions and view billing history."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Payments",
      description: "PCI-compliant payment processing with support for multiple payment methods."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analytics & Reporting",
      description: "Comprehensive insights into revenue, customer behavior, and business metrics."
    }
  ];

  const demoLinks = [
    {
      title: "Customer Portal",
      description: "Experience the customer-facing billing portal",
      path: "/portal",
      icon: <Users className="w-5 h-5" />,
      badge: "Customer View"
    },
    {
      title: "Admin Dashboard",
      description: "Explore the administrative interface",
      path: "/dashboard",
      icon: <BarChart3 className="w-5 h-5" />,
      badge: "Admin View"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Zybill</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link to="/portal">Portal Demo</Link>
              </Button>
              <Button asChild>
                <Link to="/dashboard">Dashboard Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="status-badge-trial text-base px-4 py-2">
              Production-Ready MVP
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Modern Billing & 
              <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                {" "}Usage Metering
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete billing infrastructure for SaaS businesses. Handle subscriptions, usage tracking, 
              invoicing, and customer management with a beautiful, developer-friendly platform.
            </p>
            
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button size="lg" className="px-8" asChild>
                <Link to="/dashboard">
                  Explore Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/portal">
                  View Portal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Links */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Interactive Demos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore both sides of the Zybill platform with our interactive demos featuring real data and workflows.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {demoLinks.map((demo, index) => (
              <Link key={index} to={demo.path}>
                <Card className="billing-card group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {demo.icon}
                        </div>
                        <CardTitle className="text-xl">{demo.title}</CardTitle>
                      </div>
                      <Badge variant="outline">{demo.badge}</Badge>
                    </div>
                    <CardDescription className="text-base">
                      {demo.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                      Try Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Billing Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to handle complex billing scenarios, from simple subscriptions to usage-based pricing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="billing-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for Developers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Modern tech stack with TypeScript, React, and comprehensive API integration points for easy customization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="billing-card">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Frontend Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Tailwind CSS", "Vite", "React Query"].map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">
                  Modern, type-safe frontend with beautiful components and excellent developer experience.
                </p>
              </div>
            </div>
            
            <div className="billing-card">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Integration Ready</h3>
                <div className="flex flex-wrap gap-2">
                  {["REST APIs", "Webhooks", "Stripe", "Email", "PDF Generation"].map((integration) => (
                    <Badge key={integration} variant="outline">{integration}</Badge>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">
                  Pre-built integration points for payments, notifications, and third-party services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary-hover rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Zybill MVP</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Production-ready billing platform starter
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
