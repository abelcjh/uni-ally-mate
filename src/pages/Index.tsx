import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, BookOpen, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-sm font-medium">
              <Heart className="w-4 h-4 text-primary" />
              <span>Your AI Companion</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Navigate University Life with
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> UniFriend</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              An AI-powered companion that supports you academically and emotionally, 
              adapting to your unique communication style and university needs.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/auth">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/auth">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
            <img 
              src={heroImage} 
              alt="University students collaborating" 
              className="relative rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Students Love UniFriend</h2>
          <p className="text-muted-foreground text-lg">
            Your personal companion for academic success and emotional wellbeing
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adaptive Communication</h3>
              <p className="text-muted-foreground">
                Speaks your language - whether it's English, Malay, or Manglish. 
                UniFriend adapts to your communication style naturally.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-orange-400 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Learning Support</h3>
              <p className="text-muted-foreground">
                Get personalized coursework recommendations and study guidance 
                that adapts to your learning pace and performance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Campus Connection</h3>
              <p className="text-muted-foreground">
                Discover relevant campus events and connect with peer communities 
                to enhance your university experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-2 border-primary/20">
          <CardContent className="text-center py-16 px-4">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make University Life Easier?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who've found their perfect companion for 
              academic success and emotional support.
            </p>
            <Button asChild variant="hero" size="lg">
              <Link to="/auth">
                Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 UniFriend. Supporting students, one conversation at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
