
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
import { initialNews, NewsItem } from './data/newsItems';

export const NewsContext = createContext<{
  news: NewsItem[];
  setNews: (news: NewsItem[]) => void;
}>({ news: [], setNews: () => {} });

function App() {
  const [news, setNews] = useState<NewsItem[]>(initialNews);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <NewsContext.Provider value={{ news, setNews }}>
            <Router />
            <Toaster />
          </NewsContext.Provider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

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

export default App;
