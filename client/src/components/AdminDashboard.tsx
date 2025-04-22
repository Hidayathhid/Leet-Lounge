import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import type { Booking } from "@shared/schema";
import AdminAuth from "./AdminAuth";
import { initialNews, NewsItem } from "./News";

// Simulated station data for real-time status
interface Station {
  id: number;
  type: string; // "PlayStation", "NonSmoking", "Smoking", "VIP"
  status: "available" | "occupied" | "maintenance";
  user?: string;
  startTime?: string;
  endTime?: string;
  specs?: {
    processor: string;
    gpu: string;
    ram: string;
    monitor: string;
  };
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("stations");
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [maintenanceReason, setMaintenanceReason] = useState("");
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  
  // News management state
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNews);
  const [newNewsItem, setNewNewsItem] = useState<Omit<NewsItem, "id">>({
    title: "",
    content: "",
    date: format(new Date(), "MMMM dd, yyyy"),
    category: "news"
  });
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);

  // Fetch all bookings
  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      return apiRequest("GET", "/api/bookings");
    },
    enabled: isAuthenticated,
  });

  // Simulated stations data (in a real app this would be fetched from the API)
  const { data: stations = [], isLoading: stationsLoading } = useQuery({
    queryKey: ["stations"],
    queryFn: async () => {
      // Simulate API fetch with sample data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const stationTypes = [
        { type: "PlayStation", count: 5 },
        { type: "NonSmoking", count: 10 },
        { type: "Smoking", count: 8 },
        { type: "VIP", count: 2 }
      ];
      
      // Generate random stations
      const stationsList: Station[] = [];
      let stationId = 1;
      
      stationTypes.forEach(({ type, count }) => {
        for (let i = 1; i <= count; i++) {
          const random = Math.random();
          let status: "available" | "occupied" | "maintenance" = "available";
          let user, startTime, endTime;
          
          if (random < 0.6) {
            status = "occupied";
            user = `User ${Math.floor(Math.random() * 1000)}`;
            // Random start time in the last 3 hours
            const start = new Date();
            start.setHours(start.getHours() - Math.floor(Math.random() * 3));
            startTime = format(start, "HH:mm");
            
            // Random end time in the next 2 hours
            const end = new Date();
            end.setHours(end.getHours() + Math.floor(Math.random() * 2) + 1);
            endTime = format(end, "HH:mm");
          } else if (random > 0.9) {
            status = "maintenance";
          }
          
          const specs = {
            processor: type === "VIP" 
              ? "Core i9-14900K" 
              : (type === "Smoking" || type === "NonSmoking") 
                ? "Core i7-14700F" 
                : "Core i5-14400F",
            gpu: type === "VIP" 
              ? "RTX 4090" 
              : (type === "Smoking" || type === "NonSmoking") 
                ? "RTX 3070 Ti" 
                : "RTX 3060",
            ram: type === "VIP" ? "64GB DDR5" : "32GB DDR5",
            monitor: type === "VIP" 
              ? "360Hz BENQ" 
              : (type === "Smoking" || type === "NonSmoking") 
                ? "240Hz" 
                : "165Hz",
          };
          
          stationsList.push({
            id: stationId++,
            type,
            status,
            user,
            startTime,
            endTime,
            specs
          });
        }
      });
      
      return stationsList;
    },
    enabled: isAuthenticated,
    refetchInterval: 60000, // Refetch every minute
  });

  // Station status update mutation (simulated)
  const updateStationMutation = useMutation({
    mutationFn: async ({ stationId, status, reason = "" }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stations"] });
      toast({
        title: "Station Updated",
        description: "The station status has been updated successfully.",
        variant: "default",
      });
      setShowMaintenanceModal(false);
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update station status. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle maintenance status change
  const setMaintenanceStatus = (station: Station) => {
    setSelectedStation(station);
    setMaintenanceReason("");
    setShowMaintenanceModal(true);
  };

  // Submit maintenance
  const submitMaintenance = () => {
    if (!selectedStation) return;
    
    updateStationMutation.mutate({
      stationId: selectedStation.id,
      status: "maintenance",
      reason: maintenanceReason
    });
  };

  // Free up a station
  const freeStation = (station: Station) => {
    updateStationMutation.mutate({
      stationId: station.id,
      status: "available"
    });
  };

  // Cancel booking mutation (simulated)
  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: number) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast({
        title: "Booking Cancelled",
        description: "The booking has been cancelled successfully.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Cancellation Failed",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // News management functions
  const handleNewsInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewNewsItem(prev => ({ ...prev, [name]: value }));
  };
  
  const addNewsItem = () => {
    if (newNewsItem.title.trim() === '' || newNewsItem.content.trim() === '') {
      toast({
        title: "Validation Error",
        description: "Title and content are required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Add the news item
    const newId = Math.max(0, ...newsItems.map(item => item.id)) + 1;
    const newsItem: NewsItem = {
      id: newId,
      ...newNewsItem
    };
    
    setNewsItems([newsItem, ...newsItems]);
    
    // Reset form
    setNewNewsItem({
      title: "",
      content: "",
      date: format(new Date(), "MMMM dd, yyyy"),
      category: "news"
    });
    
    toast({
      title: "News Published",
      description: "The news item has been published successfully",
      variant: "default"
    });
  };
  
  const editNewsItem = (id: number) => {
    const itemToEdit = newsItems.find(item => item.id === id);
    if (!itemToEdit) return;
    
    setNewNewsItem({
      title: itemToEdit.title,
      content: itemToEdit.content,
      date: itemToEdit.date,
      category: itemToEdit.category,
      imageUrl: itemToEdit.imageUrl
    });
    
    setEditingNewsId(id);
  };
  
  const updateNewsItem = () => {
    if (!editingNewsId) return;
    
    const updatedItems = newsItems.map(item => 
      item.id === editingNewsId ? { ...item, ...newNewsItem } : item
    );
    
    setNewsItems(updatedItems);
    
    // Reset form
    setNewNewsItem({
      title: "",
      content: "",
      date: format(new Date(), "MMMM dd, yyyy"),
      category: "news"
    });
    
    setEditingNewsId(null);
    
    toast({
      title: "News Updated",
      description: "The news item has been updated successfully",
      variant: "default"
    });
  };
  
  const deleteNewsItem = (id: number) => {
    setNewsItems(newsItems.filter(item => item.id !== id));
    
    toast({
      title: "News Deleted",
      description: "The news item has been deleted",
      variant: "default"
    });
  };

  // Group stations by type
  const stationsByType = stations.reduce((acc, station) => {
    if (!acc[station.type]) {
      acc[station.type] = [];
    }
    acc[station.type].push(station);
    return acc;
  }, {});

  // Calculate station stats
  const stationStats = {
    total: stations.length,
    available: stations.filter(s => s.status === "available").length,
    occupied: stations.filter(s => s.status === "occupied").length,
    maintenance: stations.filter(s => s.status === "maintenance").length
  };

  // Recent bookings
  const recentBookings = bookings?.slice(0, 5) || [];

  // Today's bookings
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaysBookings = bookings?.filter(booking => {
    const bookingDate = new Date(booking.date);
    bookingDate.setHours(0, 0, 0, 0);
    return bookingDate.getTime() === today.getTime();
  }) || [];

  // Handle user authentication from AdminAuth component
  const handleAuthenticated = (userData: any) => {
    // We're using the useAuth hook, so we don't need these local state setters
    // Instead, we would use loginMutation from the useAuth hook in a real implementation
    console.log("User authenticated:", userData);
  };

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  return (
    <section id="admin-dashboard" className="py-8 bg-gradient-to-b from-background to-background/95 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            className="text-3xl font-montserrat font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Admin <span className="text-blue-500">Dashboard</span>
          </motion.h2>
          
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-right">
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="font-bold">{user?.username}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                // Handle logout using the logoutMutation from useAuth
                logoutMutation.mutate();
              }}
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </Button>
          </motion.div>
        </div>

        {/* Status Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-glass">
            <CardContent className="p-4 flex items-center">
              <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-desktop text-blue-500 text-lg"></i>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Stations</p>
                <p className="text-2xl font-bold">{stationStats.total}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-glass">
            <CardContent className="p-4 flex items-center">
              <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-check text-green-500 text-lg"></i>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Available</p>
                <p className="text-2xl font-bold">{stationStats.available}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-glass">
            <CardContent className="p-4 flex items-center">
              <div className="bg-orange-500/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-user text-orange-500 text-lg"></i>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Occupied</p>
                <p className="text-2xl font-bold">{stationStats.occupied}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-glass">
            <CardContent className="p-4 flex items-center">
              <div className="bg-red-500/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-tools text-red-500 text-lg"></i>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Maintenance</p>
                <p className="text-2xl font-bold">{stationStats.maintenance}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="stations">
                <i className="fas fa-desktop mr-2"></i> Stations
              </TabsTrigger>
              <TabsTrigger value="bookings">
                <i className="fas fa-calendar-alt mr-2"></i> Bookings
              </TabsTrigger>
              <TabsTrigger value="news">
                <i className="fas fa-newspaper mr-2"></i> News
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <i className="fas fa-chart-line mr-2"></i> Analytics
              </TabsTrigger>
            </TabsList>
            
            {/* Stations Tab */}
            <TabsContent value="stations">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Station Controls */}
                <div className="md:col-span-2">
                  <Card className="bg-glass-dark mb-8">
                    <CardHeader>
                      <CardTitle className="text-xl font-montserrat flex items-center">
                        <i className="fas fa-th-large text-blue-500 mr-2"></i> 
                        Station Status & Control
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {stationsLoading ? (
                        <div className="p-8 text-center">
                          <i className="fas fa-spinner fa-spin text-blue-500 text-2xl mb-2"></i>
                          <p>Loading stations...</p>
                        </div>
                      ) : (
                        <Tabs defaultValue="NonSmoking">
                          <TabsList className="grid grid-cols-4">
                            <TabsTrigger value="PlayStation">PlayStation</TabsTrigger>
                            <TabsTrigger value="NonSmoking">Non-Smoking</TabsTrigger>
                            <TabsTrigger value="Smoking">Smoking</TabsTrigger>
                            <TabsTrigger value="VIP">VIP</TabsTrigger>
                          </TabsList>
                          
                          {Object.keys(stationsByType).map(stationType => (
                            <TabsContent key={stationType} value={stationType}>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                {stationsByType[stationType]?.map(station => (
                                  <Card key={station.id} className={`
                                    overflow-hidden border-l-4 
                                    ${station.status === 'available' ? 'border-green-500' : 
                                      station.status === 'occupied' ? 'border-orange-500' : 'border-red-500'}
                                  `}>
                                    <CardContent className="p-4">
                                      <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-bold">
                                          Station #{station.id}
                                        </h4>
                                        <Badge className={`
                                          ${station.status === 'available' ? 'bg-green-500' : 
                                            station.status === 'occupied' ? 'bg-orange-500' : 'bg-red-500'}
                                        `}>
                                          {station.status}
                                        </Badge>
                                      </div>
                                      
                                      {station.status === 'occupied' && (
                                        <div className="mb-3 text-sm">
                                          <p className="text-gray-400">User: <span className="text-white">{station.user}</span></p>
                                          <p className="text-gray-400">Time: <span className="text-white">{station.startTime} - {station.endTime}</span></p>
                                        </div>
                                      )}
                                      
                                      <div className="flex space-x-2 mt-4">
                                        {station.status === 'available' ? (
                                          <Button 
                                            size="sm" 
                                            variant="outline"
                                            className="w-full text-xs"
                                            onClick={() => setMaintenanceStatus(station)}
                                          >
                                            <i className="fas fa-tools mr-1"></i> Maintenance
                                          </Button>
                                        ) : (
                                          <Button 
                                            size="sm"
                                            variant="outline"
                                            className="w-full text-xs"
                                            onClick={() => freeStation(station)}
                                          >
                                            <i className="fas fa-check mr-1"></i> Set Available
                                          </Button>
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Quick View */}
                <div className="md:col-span-1">
                  <Card className="bg-glass-dark mb-8">
                    <CardHeader>
                      <CardTitle className="text-xl font-montserrat flex items-center">
                        <i className="fas fa-calendar-day text-blue-500 mr-2"></i> 
                        Today's Bookings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {bookingsLoading ? (
                        <div className="p-4 text-center">
                          <i className="fas fa-spinner fa-spin text-blue-500 text-xl mb-2"></i>
                          <p>Loading bookings...</p>
                        </div>
                      ) : todaysBookings.length === 0 ? (
                        <div className="p-4 text-center text-gray-400">
                          <i className="fas fa-calendar-times text-2xl mb-2"></i>
                          <p>No bookings for today</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {todaysBookings.map((booking) => (
                            <Card key={booking.id} className="bg-background/20">
                              <CardContent className="p-3">
                                <div className="flex justify-between">
                                  <div>
                                    <h4 className="font-bold">{booking.name}</h4>
                                    <p className="text-sm text-gray-400">{booking.loungeType}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm">{format(new Date(booking.date), "HH:mm")}</p>
                                    <p className="text-sm text-gray-400">{booking.hours} hours</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card className="bg-glass-dark">
                <CardHeader>
                  <CardTitle className="text-xl font-montserrat flex items-center">
                    <i className="fas fa-clipboard-list text-blue-500 mr-2"></i> 
                    Booking Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {bookingsLoading ? (
                    <div className="p-12 text-center">
                      <i className="fas fa-spinner fa-spin text-blue-500 text-3xl mb-4"></i>
                      <p>Loading bookings data...</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-3 px-4">#</th>
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Lounge</th>
                            <th className="text-left py-3 px-4">Date & Time</th>
                            <th className="text-left py-3 px-4">Duration</th>
                            <th className="text-left py-3 px-4">People</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings?.map((booking) => (
                            <tr key={booking.id} className="border-b border-gray-800 hover:bg-background/30">
                              <td className="py-3 px-4">{booking.id}</td>
                              <td className="py-3 px-4">
                                <div>
                                  <p className="font-medium">{booking.name}</p>
                                  <p className="text-sm text-gray-400">{booking.email}</p>
                                </div>
                              </td>
                              <td className="py-3 px-4">{booking.loungeType}</td>
                              <td className="py-3 px-4">
                                {format(new Date(booking.date), "MMM dd, yyyy")}
                                <br />
                                <span className="text-gray-400">
                                  {format(new Date(booking.date), "HH:mm")}
                                </span>
                              </td>
                              <td className="py-3 px-4">{booking.hours} hrs</td>
                              <td className="py-3 px-4">{booking.people}</td>
                              <td className="py-3 px-4">
                                <Badge className={
                                  booking.status === "confirmed" ? "bg-green-500" :
                                  booking.status === "pending" ? "bg-yellow-500" :
                                  "bg-red-500"
                                }>
                                  {booking.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="h-8 px-2"
                                  >
                                    <i className="fas fa-check text-green-500"></i>
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="h-8 px-2"
                                    onClick={() => cancelBookingMutation.mutate(booking.id)}
                                  >
                                    <i className="fas fa-times text-red-500"></i>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-glass-dark">
                  <CardHeader>
                    <CardTitle className="text-xl font-montserrat flex items-center">
                      <i className="fas fa-chart-pie text-blue-500 mr-2"></i> 
                      Lounge Utilization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center p-12">
                      <div className="inline-block p-4 rounded-full bg-blue-500/10 mb-4">
                        <i className="fas fa-chart-pie text-blue-500 text-4xl"></i>
                      </div>
                      <p className="text-lg text-gray-400">
                        Analytics chart would display here, showing utilization rates for each lounge area.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-glass-dark">
                  <CardHeader>
                    <CardTitle className="text-xl font-montserrat flex items-center">
                      <i className="fas fa-coins text-blue-500 mr-2"></i> 
                      Revenue Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center p-12">
                      <div className="inline-block p-4 rounded-full bg-blue-500/10 mb-4">
                        <i className="fas fa-chart-line text-blue-500 text-4xl"></i>
                      </div>
                      <p className="text-lg text-gray-400">
                        Revenue analytics chart would display here, showing daily and weekly earnings.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Maintenance Modal */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-background rounded-lg w-full max-w-md p-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Set Maintenance Status</h3>
            <p className="mb-4 text-gray-400">
              Station #{selectedStation?.id} - {selectedStation?.type}
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Maintenance Reason
              </label>
              <textarea
                className="w-full p-3 rounded-md bg-background/50 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter the reason for maintenance..."
                rows={3}
                value={maintenanceReason}
                onChange={(e) => setMaintenanceReason(e.target.value)}
              ></textarea>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => setShowMaintenanceModal(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={submitMaintenance}
                className="bg-blue-500 hover:bg-blue-400"
                disabled={updateStationMutation.isPending}
              >
                {updateStationMutation.isPending ? (
                  <span className="flex items-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Updating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <i className="fas fa-tools mr-2"></i> Set Maintenance
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}