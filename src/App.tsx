
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import LiveTV from './pages/LiveTV';
import RamadanCalendar from './pages/RamadanCalendar';
import IslamicCalendar from './pages/IslamicCalendar';
import IslamicEventPage from './components/islamic-calendar/IslamicEventPage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/live-tv" element={<LiveTV />} />
            <Route path="/ramadan-calendar" element={<RamadanCalendar />} />
            <Route path="/islamic-calendar" element={<IslamicCalendar />} />
            <Route path="/islamic-calendar/:slug" element={<IslamicEventPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
