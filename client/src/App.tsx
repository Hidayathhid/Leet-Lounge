import { createContext, useState } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "./pages/home";
import AdminDashboard from "@/components/AdminDashboard";
import { AnimatedBackground, MouseTrailer } from "@/components/AnimatedEffects";
import { AuthProvider } from "@/hooks/use-auth";
import { LanguageProvider } from "@/hooks/use-language";

// Assume necessary types and initial state
type NewsItem = { title: string; content: string; };
const initialNews: NewsItem[] = [];

const NewsContext = createContext<{ news: NewsItem[], setNews: React.Dispatch<React.SetStateAction<NewsItem[]>> }>({ news: [], setNews: () => { } });


function Router() {
  return (
    <>
      <AnimatedBackground />
      <MouseTrailer />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNews);

  return (
    <QueryClientProvider client={queryClient}>
      <NewsContext.Provider value={{ news: newsItems, setNews: setNewsItems }}>
        <LanguageProvider>
          <AuthProvider>
            <Router />
            <Toaster />
          </AuthProvider>
        </LanguageProvider>
      </NewsContext.Provider>
    </QueryClientProvider>
  );
}

export default App;