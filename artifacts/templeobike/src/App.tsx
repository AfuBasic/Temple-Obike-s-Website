import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';

import { Hero } from './components/Hero';
import { CredibilityStrip } from './components/CredibilityStrip';
import { About } from './components/About';
import { Talks } from './components/Talks';
import { SpeakingHistory } from './components/SpeakingHistory';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import RateCard from './pages/rate-card';
import MediaKit from './pages/media-kit';

const queryClient = new QueryClient();

// The single page layout
function SpeakerSite() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground font-sans selection:bg-primary/30 selection:text-foreground">
      <Hero />
      <CredibilityStrip />
      <About />
      <Talks />
      <SpeakingHistory />
      <Contact />
      <Footer />
    </main>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={SpeakerSite} />
      <Route path="/rate-card" component={RateCard} />
      <Route path="/media-kit" component={MediaKit} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
