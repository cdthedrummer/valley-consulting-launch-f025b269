import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  MapPin, 
  Calendar,
  ChevronRight,
  PlayCircle,
  Database,
  Zap,
  Target
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { motion } from 'framer-motion';

const AIDashboardSellIn: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <SEOHead
        title="AI Marketing Dashboard | Hudson Valley Consulting"
        description="Launch your AI-powered marketing dashboard for real-time market intelligence, competitor analysis, and data-driven insights for contractors in Hudson Valley."
        canonicalUrl="/resources/ai-dashboard-sell-in"
        keywords="AI marketing dashboard, contractor marketing analytics, market intelligence, Hudson Valley business data, real-time insights"
      />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered Intelligence
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Marketing Dashboard
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Real-time market intelligence, competitor analysis, and AI-driven insights 
              tailored specifically for contractors in Hudson Valley.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button asChild size="lg" className="group">
                <Link to="/ai/dashboard" className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Launch Dashboard
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="#demo" className="flex items-center">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-12 px-4">
        <div className="container-custom max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Make Data-Driven Decisions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stop guessing about your market. Get real insights from trusted sources 
              like the US Census Bureau, Bureau of Labor Statistics, and more.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Market Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Real-time demographic data, home sales trends, and market conditions 
                    for your specific area.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Demographics & income data</li>
                    <li>• Home sales & market trends</li>
                    <li>• Competitor landscape analysis</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Industry Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Tailored data for your specific industry, from HVAC to plumbing 
                    to home improvement.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Industry-specific metrics</li>
                    <li>• Seasonal demand patterns</li>
                    <li>• Pricing optimization insights</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Opportunity Mapping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Visual maps highlighting high-opportunity areas and 
                    underserved markets in your region.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Interactive opportunity maps</li>
                    <li>• Service gap identification</li>
                    <li>• Territory expansion planning</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data Sources Section */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">
              Powered by Trusted Data Sources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Database className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">US Census Bureau</h3>
                  <p className="text-sm text-muted-foreground">
                    Official demographic and housing data from the American Community Survey
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Bureau of Labor Statistics</h3>
                  <p className="text-sm text-muted-foreground">
                    Employment trends, wage data, and economic indicators
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">County Business Patterns</h3>
                  <p className="text-sm text-muted-foreground">
                    Business establishment counts and industry analysis
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Placeholder */}
      <section id="demo" className="py-12 px-4">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">See It In Action</h2>
            
            <div className="bg-muted rounded-lg p-12 mb-8">
              <PlayCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                Interactive dashboard demo coming soon
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                For now, launch the dashboard to explore real data for your area
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-primary/5">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make Smarter Marketing Decisions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join contractors who are already using data-driven insights to grow their business
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link to="/ai/dashboard" className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Launch Your Dashboard
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/booking" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Demo
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AIDashboardSellIn;