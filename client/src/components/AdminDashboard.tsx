import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import AdminAuth from "./AdminAuth";
import { NewsItem } from "@/data/newsItems";
import { NewsContext } from "@/hooks/use-language";
import { useContext } from "react";
import { format } from "date-fns";

export default function AdminDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, user, logoutMutation } = useAuth();

  // News management state
  const { news, setNews } = useContext(NewsContext);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(news);
  const [newNewsItem, setNewNewsItem] = useState<Omit<NewsItem, "id">>({
    title: "",
    content: "",
    date: format(new Date(), "MMMM dd, yyyy"),
    category: "news"
  });
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);

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

    const newId = Math.max(0, ...newsItems.map(item => item.id)) + 1;
    const newsItem: NewsItem = {
      id: newId,
      ...newNewsItem
    };

    const updatedNews = [newsItem, ...newsItems];
    setNewsItems(updatedNews);
    setNews(updatedNews);

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
    setNews(updatedItems); // Update news context as well

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
    setNews(newsItems.filter(item => item.id !== id)); // Update news context

    toast({
      title: "News Deleted",
      description: "The news item has been deleted",
      variant: "default"
    });
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => {}} />;
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
              onClick={() => logoutMutation.mutate()}
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </Button>
          </motion.div>
        </div>

        {/* News Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-glass-dark">
            <CardHeader>
              <CardTitle className="text-xl font-montserrat flex items-center">
                <i className="fas fa-newspaper text-blue-500 mr-2"></i> 
                News & Updates Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* News Entry Form */}
                <div className="md:col-span-1">
                  <Card className="bg-background/20 p-4">
                    <h3 className="text-lg font-semibold mb-4">
                      {editingNewsId ? 'Edit News Item' : 'Add New Post'}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={newNewsItem.title}
                          onChange={handleNewsInputChange}
                          className="w-full p-2 rounded bg-background border border-gray-700"
                          placeholder="Enter news title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select 
                          name="category"
                          value={newNewsItem.category}
                          onChange={handleNewsInputChange}
                          className="w-full p-2 rounded bg-background border border-gray-700"
                        >
                          <option value="news">News</option>
                          <option value="event">Event</option>
                          <option value="offer">Special Offer</option>
                          <option value="tournament">Tournament</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                          type="date"
                          name="date"
                          value={format(new Date(newNewsItem.date), 'yyyy-MM-dd')}
                          onChange={handleNewsInputChange}
                          className="w-full p-2 rounded bg-background border border-gray-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Content</label>
                        <textarea
                          name="content"
                          value={newNewsItem.content}
                          onChange={handleNewsInputChange}
                          className="w-full p-2 rounded bg-background border border-gray-700 min-h-[150px]"
                          placeholder="Enter news content"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
                        <input
                          type="text"
                          name="imageUrl"
                          value={newNewsItem.imageUrl || ''}
                          onChange={handleNewsInputChange}
                          className="w-full p-2 rounded bg-background border border-gray-700"
                          placeholder="Enter image URL"
                        />
                      </div>

                      {editingNewsId ? (
                        <div className="flex space-x-2">
                          <Button 
                            className="w-full" 
                            onClick={updateNewsItem}
                          >
                            <i className="fas fa-save mr-2"></i> Update
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => {
                              setEditingNewsId(null);
                              setNewNewsItem({
                                title: "",
                                content: "",
                                date: format(new Date(), "MMMM dd, yyyy"),
                                category: "news"
                              });
                            }}
                          >
                            <i className="fas fa-times mr-2"></i> Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          className="w-full"
                          onClick={addNewsItem}
                        >
                          <i className="fas fa-plus mr-2"></i> Publish News
                        </Button>
                      )}
                    </div>
                  </Card>
                </div>

                {/* News List */}
                <div className="md:col-span-2">
                  <div className="space-y-4">
                    {newsItems.map((item) => (
                      <Card key={item.id} className="bg-background/20 p-4 relative overflow-hidden">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <div className="flex items-center space-x-3 mt-1 mb-3">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                item.category === "news" ? "bg-blue-500/20 text-blue-400" :
                                item.category === "tournament" ? "bg-purple-500/20 text-purple-400" :
                                item.category === "offer" ? "bg-green-500/20 text-green-400" :
                                "bg-amber-500/20 text-amber-400"
                              }`}>
                                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                              </span>
                              <span className="text-sm text-gray-400">{item.date}</span>
                            </div>
                            <p className="text-gray-300">{item.content}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => editNewsItem(item.id)}
                          >
                            <i className="fas fa-edit mr-1"></i> Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-400 hover:text-red-300"
                            onClick={() => deleteNewsItem(item.id)}
                          >
                            <i className="fas fa-trash-alt mr-1"></i> Delete
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}