import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "./pages/home";
import AdminDashboard from "@/components/AdminDashboard";
import { AnimatedBackground, MouseTrailer } from "@/components/AnimatedEffects";
import { AuthProvider } from "@/hooks/use-auth";

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
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
