import StarBackground from "@/components/StarBackground";
import ChurnPredictionForm from "@/components/ChurnPredictionForm";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <StarBackground />
      <ChurnPredictionForm />
      <footer className="relative z-10 text-center py-6 border-t border-primary/20">
        <p className="text-sm text-muted-foreground">© 2026 Mohd Kaif</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Built with AI assistance</p>
      </footer>
    </div>
  );
};

export default Index;
