// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";
// import { useAuth } from "@/hooks/use-auth";
// import AdminAuth from "./AdminAuth";
// import { NewsItem } from "@/data/newsItems";
// import { NewsContext } from "@/hooks/use-language";
// import { useContext } from "react";
// import { format } from "date-fns";

// export default function AdminDashboard() {
//   const { toast } = useToast();
//   const { isAuthenticated, user, logoutMutation } = useAuth();

//   // News management state
//   const { news, setNews } = useContext(NewsContext);
//   const [newNewsItem, setNewNewsItem] = useState<Omit<NewsItem, "id">>({
//     title: "",
//     content: "",
//     date: format(new Date(), "MMMM dd, yyyy"),
//     category: "news"
//   });
//   const [editingNewsId, setEditingNewsId] = useState<number | null>(null);

//   // News management functions
//   const handleNewsInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setNewNewsItem(prev => ({ ...prev, [name]: value }));
//   };

//   const addNewsItem = () => {
//     if (newNewsItem.title.trim() === '' || newNewsItem.content.trim() === '') {
//       toast({
//         title: "Validation Error",
//         description: "Title and content are required fields",
//         variant: "destructive"
//       });
//       return;
//     }

//     const newId = Math.max(0, ...news.map(item => item.id)) + 1;
//     const newsItem: NewsItem = {
//       id: newId,
//       ...newNewsItem
//     };

//     const updatedNews = [newsItem, ...news];
//     setNews(updatedNews);

//     setNewNewsItem({
//       title: "",
//       content: "",
//       date: format(new Date(), "MMMM dd, yyyy"),
//       category: "news"
//     });

//     toast({
//       title: "News Published",
//       description: "The news item has been published successfully",
//       variant: "default"
//     });
    
//     // Redirect to news section
//     const newsSection = document.getElementById('news');
//     if (newsSection) {
//       newsSection.scrollIntoView({ behavior: 'smooth' });
//     } else {
//       window.location.href = '/#news';
//     }
//   };

//   const editNewsItem = (id: number) => {
//     const itemToEdit = news.find(item => item.id === id);
//     if (!itemToEdit) return;

//     setNewNewsItem({
//       title: itemToEdit.title,
//       content: itemToEdit.content,
//       date: itemToEdit.date,
//       category: itemToEdit.category,
//       imageUrl: itemToEdit.imageUrl
//     });

//     setEditingNewsId(id);
//   };

//   const updateNewsItem = () => {
//     if (!editingNewsId) return;

//     const updatedItems = news.map(item => 
//       item.id === editingNewsId ? { ...item, ...newNewsItem } : item
//     );

//     setNews(updatedItems); // Update news context

//     setNewNewsItem({
//       title: "",
//       content: "",
//       date: format(new Date(), "MMMM dd, yyyy"),
//       category: "news"
//     });

//     setEditingNewsId(null);

//     toast({
//       title: "News Updated",
//       description: "The news item has been updated successfully",
//       variant: "default"
//     });
//   };

//   const deleteNewsItem = (id: number) => {
//     const filteredNews = news.filter(item => item.id !== id);
//     setNews(filteredNews); // Update news context

//     toast({
//       title: "News Deleted",
//       description: "The news item has been deleted",
//       variant: "default"
//     });
//   };

//   if (!isAuthenticated) {
//     return <AdminAuth onAuthenticated={() => {}} />;
//   }

//   return (
//     <section id="admin-dashboard" className="py-8 bg-gradient-to-b from-background to-background/95 min-h-screen">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <motion.h2 
//             className="text-3xl font-montserrat font-bold"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             Admin <span className="text-blue-500">Dashboard</span>
//           </motion.h2>

//           <motion.div 
//             className="flex items-center space-x-3"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="text-right">
//               <p className="text-sm text-gray-400">Logged in as</p>
//               <p className="font-bold">{user?.username}</p>
//             </div>
//             <Button 
//               variant="outline" 
//               size="sm"
//               onClick={() => logoutMutation.mutate()}
//             >
//               <i className="fas fa-sign-out-alt mr-2"></i>
//               Logout
//             </Button>
//           </motion.div>
//         </div>

//         {/* News Management */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <Card className="bg-glass-dark">
//             <CardHeader>
//               <CardTitle className="text-xl font-montserrat flex items-center">
//                 <i className="fas fa-newspaper text-blue-500 mr-2"></i> 
//                 News & Updates Management
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                 {/* News Entry Form */}
//                 <div className="md:col-span-1">
//                   <Card className="bg-background/20 p-4">
//                     <h3 className="text-lg font-semibold mb-4">
//                       {editingNewsId ? 'Edit News Item' : 'Add New Post'}
//                     </h3>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium mb-1">Title</label>
//                         <input
//                           type="text"
//                           name="title"
//                           value={newNewsItem.title}
//                           onChange={handleNewsInputChange}
//                           className="w-full p-2 rounded bg-background border border-gray-700"
//                           placeholder="Enter news title"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-1">Category</label>
//                         <select 
//                           name="category"
//                           value={newNewsItem.category}
//                           onChange={handleNewsInputChange}
//                           className="w-full p-2 rounded bg-background border border-gray-700"
//                         >
//                           <option value="news">News</option>
//                           <option value="event">Event</option>
//                           <option value="offer">Special Offer</option>
//                           <option value="tournament">Tournament</option>
//                         </select>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-1">Date</label>
//                         <input
//                           type="date"
//                           name="date"
//                           value={format(new Date(newNewsItem.date), 'yyyy-MM-dd')}
//                           onChange={handleNewsInputChange}
//                           className="w-full p-2 rounded bg-background border border-gray-700"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-1">Content</label>
//                         <textarea
//                           name="content"
//                           value={newNewsItem.content}
//                           onChange={handleNewsInputChange}
//                           className="w-full p-2 rounded bg-background border border-gray-700 min-h-[150px]"
//                           placeholder="Enter news content"
//                         ></textarea>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-1">Upload Image (optional)</label>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) {
//                               const reader = new FileReader();
//                               reader.onloadend = () => {
//                                 setNewNewsItem(prev => ({
//                                   ...prev,
//                                   imageUrl: reader.result as string
//                                 }));
//                               };
//                               reader.readAsDataURL(file);
//                             }
//                           }}
//                           className="w-full p-2 rounded bg-background border border-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                         />
//                       </div>

//                       {editingNewsId ? (
//                         <div className="flex space-x-2">
//                           <Button 
//                             className="w-full" 
//                             onClick={updateNewsItem}
//                           >
//                             <i className="fas fa-save mr-2"></i> Update
//                           </Button>
//                           <Button 
//                             variant="outline" 
//                             className="w-full"
//                             onClick={() => {
//                               setEditingNewsId(null);
//                               setNewNewsItem({
//                                 title: "",
//                                 content: "",
//                                 date: format(new Date(), "MMMM dd, yyyy"),
//                                 category: "news"
//                               });
//                             }}
//                           >
//                             <i className="fas fa-times mr-2"></i> Cancel
//                           </Button>
//                         </div>
//                       ) : (
//                         <Button 
//                           className="w-full"
//                           onClick={addNewsItem}
//                         >
//                           <i className="fas fa-plus mr-2"></i> Publish News
//                         </Button>
//                       )}
//                     </div>
//                   </Card>
//                 </div>

//                 {/* News List */}
//                 <div className="md:col-span-2">
//                   <div className="space-y-4">
//                     {news.map((item) => (
//                       <Card key={item.id} className="bg-background/20 p-4 relative overflow-hidden">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h3 className="text-lg font-semibold">{item.title}</h3>
//                             <div className="flex items-center space-x-3 mt-1 mb-3">
//                               <span className={`text-xs px-2 py-1 rounded-full ${
//                                 item.category === "news" ? "bg-blue-500/20 text-blue-400" :
//                                 item.category === "tournament" ? "bg-purple-500/20 text-purple-400" :
//                                 item.category === "offer" ? "bg-green-500/20 text-green-400" :
//                                 "bg-amber-500/20 text-amber-400"
//                               }`}>
//                                 {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
//                               </span>
//                               <span className="text-sm text-gray-400">{item.date}</span>
//                             </div>
//                             <p className="text-gray-300">{item.content}</p>
//                           </div>
//                         </div>
//                         <div className="flex space-x-2 mt-4">
//                           <Button 
//                             size="sm" 
//                             variant="outline"
//                             onClick={() => editNewsItem(item.id)}
//                           >
//                             <i className="fas fa-edit mr-1"></i> Edit
//                           </Button>
//                           <Button 
//                             size="sm" 
//                             variant="outline" 
//                             className="text-red-400 hover:text-red-300"
//                             onClick={() => deleteNewsItem(item.id)}
//                           >
//                             <i className="fas fa-trash-alt mr-1"></i> Delete
//                           </Button>
//                         </div>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// interface NewsItem {
//   id: number;
//   title: string;
//   description: string;
//   imageUrl: string;
//   category: string;
// }

// const AdminDashboard: React.FC = () => {
//   const [news, setNews] = useState<NewsItem[]>([]);
//   const [newNewsItem, setNewNewsItem] = useState<NewsItem>({
//     id: 0,
//     title: "",
//     description: "",
//     imageUrl: "",
//     category: "news",
//   });
//   const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
//   const [adminName, setAdminName] = useState<string>("");
//   const [fileName, setFileName] = useState<string>("");

//   // Load news and admin name from localStorage
//   useEffect(() => {
//     const storedNews = localStorage.getItem("news");
//     if (storedNews) {
//       setNews(JSON.parse(storedNews));
//     }

//     const storedName = localStorage.getItem("adminName");
//     if (storedName) {
//       setAdminName(storedName);
//     } else {
//       setAdminName("leet");
//       localStorage.setItem("adminName", "leet");
//     }
//   }, []);

//   // Save news to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("news", JSON.stringify(news));
//   }, [news]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setNewNewsItem(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setFileName(file.name);

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setNewNewsItem(prev => ({
//         ...prev,
//         imageUrl: reader.result as string,
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const addNewsItem = () => {
//     const id = Date.now();
//     const newItem = { ...newNewsItem, id };
//     setNews(prev => [...prev, newItem]);
//     setNewNewsItem({ id: 0, title: "", description: "", imageUrl: "", category: "news" });
//     setFileName('');
//   };

//   const editNewsItem = (id: number) => {
//     const item = news.find(n => n.id === id);
//     if (item) {
//       setEditingNewsId(id);
//       setNewNewsItem(item);
//     }
//   };

//   const updateNewsItem = () => {
//     if (editingNewsId === null) return;
//     setNews(prev =>
//       prev.map(n => (n.id === editingNewsId ? { ...newNewsItem, id: editingNewsId } : n))
//     );
//     setEditingNewsId(null);
//     setNewNewsItem({ id: 0, title: "", description: "", imageUrl: "", category: "news" });
//     setFileName('');
//   };

//   const deleteNewsItem = (id: number) => {
//     const updated = news.filter(n => n.id !== id);
//     setNews(updated);
//   };

//   // ✅ Updated logout function
//   const handleLogout = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("adminName");
//       window.location.href = "/"; // Change this to your login page route if needed
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-white">Manage Uploads</h1>
//         <div className="flex items-center space-x-4 text-sm">
//           <span className="text-gray-300">
//             Welcome, <strong className="text-blue-400">{adminName}</strong>
//           </span>
//           <Button variant="outline" className="text-white border-white hover:bg-white/10" onClick={handleLogout}>
//             <i className="fas fa-sign-out-alt mr-2"></i> Logout
//           </Button>
//         </div>
//       </div>

//       {/* Upload Card */}
//       <Card className="bg-glass-dark">
//         <CardHeader>
//           <CardTitle className="text-xl flex items-center">
//             <i className="fas fa-upload text-blue-500 mr-2"></i> Manage Uploads
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Form */}
//             <div className="md:col-span-1 space-y-4">
//               <div>
//                 <label className="block mb-1 text-sm font-medium">Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={newNewsItem.title}
//                   onChange={handleInputChange}
//                   className="w-full p-2 bg-background rounded border border-gray-700"
//                   placeholder="Enter title"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm font-medium">Description</label>
//                 <textarea
//                   name="description"
//                   value={newNewsItem.description}
//                   onChange={handleInputChange}
//                   className="w-full p-2 bg-background rounded border border-gray-700 min-h-[120px]"
//                   placeholder="Enter description"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm font-medium">Upload Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="w-full p-2 bg-background border border-gray-700 file:bg-blue-50 file:text-blue-700 file:rounded-full"
//                 />
//                 {fileName && !newNewsItem.imageUrl && (
//                   <p className="mt-2 text-sm text-gray-400">{fileName}</p>
//                 )}
//                 {newNewsItem.imageUrl && (
//                   <img src={newNewsItem.imageUrl} alt="Preview" className="mt-2 w-full rounded shadow" />
//                 )}
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm font-medium">Category</label>
//                 <select
//                   name="category"
//                   value={newNewsItem.category}
//                   onChange={handleInputChange}
//                   className="w-full p-2 bg-background rounded border border-gray-700"
//                 >
//                   <option value="news">News</option>
//                   <option value="event">Event</option>
//                   <option value="tournament">Tournament</option>
//                   <option value="offer">Offer</option>
//                 </select>
//               </div>

//               {editingNewsId ? (
//                 <div className="flex space-x-2">
//                   <Button className="w-full" onClick={updateNewsItem}>
//                     <i className="fas fa-save mr-2"></i> Update
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="w-full"
//                     onClick={() => {
//                       setEditingNewsId(null);
//                       setNewNewsItem({ id: 0, title: "", description: "", imageUrl: "", category: "news" });
//                       setFileName('');
//                     }}
//                   >
//                     <i className="fas fa-times mr-2"></i> Cancel
//                   </Button>
//                 </div>
//               ) : (
//                 <Button className="w-full" onClick={addNewsItem}>
//                   <i className="fas fa-plus mr-2"></i> Upload
//                 </Button>
//               )}
//             </div>

//             {/* Uploaded Items */}
//             <div className="md:col-span-2 space-y-4">
//               {news.map(item => (
//                 <Card key={item.id} className="bg-background/20 p-4 relative">
//                   <div className="flex items-center space-x-4">
//                     {item.imageUrl && (
//                       <img src={item.imageUrl} alt="Uploaded" className="w-24 h-24 object-cover rounded" />
//                     )}
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold">{item.title}</h3>
//                       <p className="text-gray-400">{item.description}</p>
//                       <p className="text-xs mt-1">Category: <strong>{item.category}</strong></p>
//                     </div>
//                   </div>
//                   <div className="flex space-x-2 mt-4">
//                     <Button size="sm" variant="outline" onClick={() => editNewsItem(item.id)}>
//                       <i className="fas fa-edit mr-1"></i> Edit
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="text-red-400 hover:text-red-300"
//                       onClick={() => deleteNewsItem(item.id)}
//                     >
//                       <i className="fas fa-trash-alt mr-1"></i> Delete
//                     </Button>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminDashboard;
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import AdminAuth from "./AdminAuth";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, user, logoutMutation } = useAuth();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newNewsItem, setNewNewsItem] = useState<NewsItem>({
    id: 0,
    title: "",
    description: "",
    imageUrl: "",
    category: "news",
  });
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string>("");

  // Load news from localStorage
  useEffect(() => {
    const storedNews = localStorage.getItem("news");
    if (storedNews) {
      setNews(JSON.parse(storedNews));
    }
  }, []);

  // Save news to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("news", JSON.stringify(news));
  }, [news]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewNewsItem(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewNewsItem(prev => ({
        ...prev,
        imageUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const addNewsItem = () => {
    const id = Date.now();
    const newItem = { ...newNewsItem, id };
    setNews(prev => [...prev, newItem]);
    setNewNewsItem({ id: 0, title: "", description: "", imageUrl: "", category: "news" });
    setFileName('');
  };

  const editNewsItem = (id: number) => {
    const item = news.find(n => n.id === id);
    if (item) {
      setEditingNewsId(id);
      setNewNewsItem(item);
    }
  };

  const updateNewsItem = () => {
    if (editingNewsId === null) return;
    setNews(prev =>
      prev.map(n => (n.id === editingNewsId ? { ...newNewsItem, id: editingNewsId } : n))
    );
    setEditingNewsId(null);
    setNewNewsItem({ id: 0, title: "", description: "", imageUrl: "", category: "news" });
    setFileName('');
  };

  const deleteNewsItem = (id: number) => {
    const updated = news.filter(n => n.id !== id);
    setNews(updated);
  };

  // 🔐 If not authenticated, show login
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => {}} />;
  }

  return (
    <div className="p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Uploads</h1>
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-gray-300">
            Welcome, <strong className="text-blue-400">{user?.username}</strong>
          </span>
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white/10"
            onClick={() => logoutMutation.mutate()}
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Logout
          </Button>
        </div>
      </div>

      {/* Upload Card */}
      <Card className="bg-glass-dark">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <i className="fas fa-upload text-blue-500 mr-2"></i> Manage Uploads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Form */}
            <div className="md:col-span-1 space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newNewsItem.title}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-background border border-gray-700"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={newNewsItem.category}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-background border border-gray-700"
                >
                  <option value="news">News</option>
                  <option value="event">Event</option>
                  <option value="offer">Special Offer</option>
                  <option value="tournament">Tournament</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={newNewsItem.description}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-background border border-gray-700 min-h-[120px]"
                ></textarea>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 rounded bg-background border border-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {editingNewsId ? (
                <div className="flex gap-2">
                  <Button className="w-full" onClick={updateNewsItem}>
                    <i className="fas fa-save mr-2"></i> Update
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setEditingNewsId(null);
                      setNewNewsItem({ id: 0, title: "", description: "", imageUrl: "", category: "news" });
                      setFileName('');
                    }}
                  >
                    <i className="fas fa-times mr-2"></i> Cancel
                  </Button>
                </div>
              ) : (
                <Button className="w-full" onClick={addNewsItem}>
                  <i className="fas fa-plus mr-2"></i> Add News
                </Button>
              )}
            </div>

            {/* News List */}
            <div className="md:col-span-2 space-y-4">
              {news.map(item => (
                <Card key={item.id} className="bg-background/20 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                        <span className="capitalize">{item.category}</span>
                      </div>
                      <p className="text-gray-300">{item.description}</p>
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt="Uploaded"
                          className="mt-3 max-w-xs rounded-lg shadow"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline" onClick={() => editNewsItem(item.id)}>
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
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
