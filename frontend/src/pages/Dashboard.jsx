// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ModeToggle } from "@/components/ui/mode-toggle";

// function Dashboard() {
//   const { user, logout, token } = useAuth();
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const travelTips = [
//     { icon: "🎒", title: "Pack Smart", description: "Roll your clothes to save space" },
//     { icon: "🗺️", title: "Local SIM Card", description: "Stay connected affordably" },
//     { icon: "💊", title: "Travel Insurance", description: "Always protect your journey" },
//     { icon: "📸", title: "Golden Hour", description: "Best photos at sunrise/sunset" },
//   ];

//   const upcomingEvents = [
//     { month: "MAY", event: "Meskel Festival", location: "Addis Ababa", date: "May 15-20" },
//     { month: "JUN", event: "Timket Celebration", location: "Gondar", date: "June 10-15" },
//     { month: "JUL", event: "Enkutatash", location: "Nationwide", date: "July 11" },
//   ];

//   useEffect(() => {
//     async function fetchData() {
//       if (!token) return;
      
//       try {
//         const bookingsRes = await fetch('http://localhost:5001/api/bookings', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const bookingsData = await bookingsRes.json();
//         setBookings(bookingsData.bookings || []);

//         const favoritesRes = await fetch('http://localhost:5001/api/favorites', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const favoritesData = await favoritesRes.json();
//         setFavorites(favoritesData.favorites || []);
//       } catch (error) {
//         console.error('Failed to load data', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, [token]);

//   async function handleCancelBooking(bookingId) {
//     if (!confirm('Are you sure you want to cancel this booking?')) return;
    
//     try {
//       const response = await fetch(`http://localhost:5001/api/bookings/${bookingId}/cancel`, {
//         method: 'PATCH',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       if (response.ok) {
//         setBookings(bookings.filter(b => b.id !== bookingId));
//         alert('Booking cancelled successfully');
//       }
//     } catch (error) {
//       console.error('Failed to cancel booking', error);
//     }
//   }

//   function handleLogout() {
//     logout();
//     navigate("/login");
//   }

//   const upcomingTrips = bookings.filter(b => b.status !== 'cancelled').length;
//   const favoriteCount = favorites.length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
//       <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//           <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
//             <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
//               <span className="text-white text-xl">✈</span>
//             </div>
//             <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
//               MakiTravel
//             </span>
//           </div>

//           <div className="flex items-center gap-3">
//             <ModeToggle />
//             {/* Admin Add Destination Button */}
//             {user?.role === 'admin' && (
//               <Link to="/admin/add-destination">
//                 <Button variant="outline" className="rounded-xl border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all">
//                   + Add Destination
//                 </Button>
//               </Link>
//             )}
//             <Link to="/destinations">
//               <Button variant="outline" className="rounded-xl border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all">
//                 Explore Destinations
//               </Button>
//             </Link>
//             <Button onClick={handleLogout} variant="destructive" className="rounded-xl bg-red-600 hover:bg-red-700">
//               Logout
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Rest of your component remains the same */}
//       <main className="mx-auto max-w-7xl px-6 py-8">
//         {/* Welcome Banner */}
//         <div className="mb-8 p-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-white relative overflow-hidden shadow-lg">
//           <div className="absolute top-0 right-0 opacity-10 text-9xl">✈️</div>
//           <div className="relative z-10 flex justify-between items-center flex-wrap gap-4">
//             <div>
//               <h2 className="text-2xl font-bold">Welcome back, {user?.full_name || user?.fullName || "Traveler"}! 👋</h2>
//               <p className="text-emerald-100 mt-1">Your next adventure is just a click away</p>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3">
//                 <p className="text-3xl font-bold">{upcomingTrips}</p>
//                 <p className="text-xs">Upcoming Trips</p>
//               </div>
//               <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3">
//                 <p className="text-3xl font-bold">{favoriteCount}</p>
//                 <p className="text-xs">Favorites</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Bookings */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Booked Trips */}
//             <Card className="rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
//               <div className="bg-emerald-600 px-6 py-4">
//                 <CardTitle className="text-white flex items-center gap-2">
//                   <span>📅</span> My Booked Trips
//                   <span className="ml-auto text-sm bg-white/20 px-2 py-1 rounded-full">{bookings.length} trips</span>
//                 </CardTitle>
//               </div>
//               <CardContent className="p-6">
//                 {loading ? (
//                   <div className="flex justify-center py-12">
//                     <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
//                   </div>
//                 ) : bookings.length === 0 ? (
//                   <div className="text-center py-12">
//                     <div className="text-7xl mb-4">🗺️</div>
//                     <p className="text-gray-600 dark:text-gray-400 text-lg mb-3">No bookings yet</p>
//                     <p className="text-gray-500 dark:text-gray-500 text-sm mb-6">Start planning your dream vacation today!</p>
//                     <Link to="/destinations">
//                       <Button className="rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all">
//                         ✨ Explore Destinations
//                       </Button>
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
//                     {bookings.map((booking) => (
//                       <div key={booking.id} className="p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h3 className="font-bold text-lg text-gray-800 dark:text-white">{booking.title}</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
//                               📍 {booking.location}
//                             </p>
//                           </div>
//                           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                             booking.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
//                           }`}>
//                             {booking.status || 'Confirmed'}
//                           </span>
//                         </div>
//                         <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
//                           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
//                             📅 {booking.start_date || booking.booking_date}
//                           </div>
//                           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
//                             👥 {booking.number_of_guests || booking.travelers} travelers
//                           </div>
//                         </div>
//                         <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-slate-800">
//                           <p className="text-emerald-600 font-bold text-xl">{booking.total_price}</p>
//                           {booking.status !== 'cancelled' && (
//                             <Button 
//                               onClick={() => handleCancelBooking(booking.id)}
//                               variant="outline" 
//                               className="rounded-xl text-red-500 border-red-300 hover:bg-red-50 text-sm"
//                               size="sm"
//                             >
//                               Cancel
//                             </Button>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Travel Tips Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {travelTips.map((tip, idx) => (
//                 <div key={idx} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
//                   <div className="text-3xl mb-2">{tip.icon}</div>
//                   <h4 className="font-semibold text-gray-800 dark:text-white">{tip.title}</h4>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tip.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-8">
//             {/* Favorite Destinations */}
//             <Card className="rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
//               <div className="bg-emerald-600 px-6 py-4">
//                 <CardTitle className="text-white flex items-center gap-2">
//                   <span>❤️</span> Favorites
//                   <span className="ml-auto text-sm bg-white/20 px-2 py-1 rounded-full">{favorites.length} saved</span>
//                 </CardTitle>
//               </div>
//               <CardContent className="p-6">
//                 {loading ? (
//                   <div className="flex justify-center py-8">
//                     <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
//                   </div>
//                 ) : favorites.length === 0 ? (
//                   <div className="text-center py-8">
//                     <div className="text-5xl mb-3">💙</div>
//                     <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">No favorites yet</p>
//                     <Link to="/destinations">
//                       <Button variant="outline" className="rounded-xl border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white">
//                         Browse Destinations
//                       </Button>
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="space-y-3 max-h-[400px] overflow-y-auto">
//                     {favorites.map((fav) => (
//                       <Link to={`/destination/${fav.id}`} key={fav.id}>
//                         <div className="group p-3 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all hover:border-emerald-300">
//                           <div className="flex gap-3">
//                             <img 
//                               src={fav.image_url || 'https://images.unsplash.com/photo-1547471080-7cc2caa01e7f'} 
//                               alt={fav.title}
//                               className="w-14 h-14 rounded-lg object-cover"
//                               onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1547471080-7cc2caa01e7f'}
//                             />
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-emerald-600 transition">
//                                 {fav.title}
//                               </h3>
//                               <p className="text-xs text-gray-500 dark:text-gray-400">📍 {fav.location}</p>
//                               <p className="text-emerald-600 font-bold text-sm mt-1">{fav.price}</p>
//                             </div>
//                             <div className="text-emerald-400 opacity-0 group-hover:opacity-100 transition">→</div>
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Upcoming Events */}
//             <Card className="rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
//               <div className="bg-emerald-600 px-6 py-4">
//                 <CardTitle className="text-white flex items-center gap-2">
//                   <span>🎉</span> Upcoming Events
//                 </CardTitle>
//               </div>
//               <CardContent className="p-6">
//                 <div className="space-y-3">
//                   {upcomingEvents.map((event, idx) => (
//                     <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800">
//                       <div className="text-center min-w-[50px]">
//                         <p className="text-xs text-emerald-600 font-bold">{event.month}</p>
//                         <p className="text-lg font-bold text-emerald-600">{event.date.split(' ')[0]}</p>
//                       </div>
//                       <div className="flex-1">
//                         <h4 className="font-semibold text-gray-800 dark:text-white">{event.event}</h4>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">{event.location}</p>
//                       </div>
//                       <Button variant="ghost" size="sm" className="text-emerald-600">
//                         Details →
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Quote Card */}
//             <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white text-center shadow-lg">
//               <div className="text-4xl mb-3">🌟</div>
//               <p className="text-sm opacity-90">Travel Experience</p>
//               <p className="text-xl font-bold mt-1">Premium Member</p>
//               <div className="mt-3 flex justify-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <span key={i} className="text-yellow-300">★</span>
//                 ))}
//               </div>
//               <p className="text-xs mt-3 opacity-75">"Travel is the only thing you buy that makes you richer"</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/mode-toggle";

function Dashboard() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminDestinations, setAdminDestinations] = useState([]);
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalDestinations: 0,
    myDestinations: 0
  });

  useEffect(() => {
    async function fetchData() {
      if (!token) return;
      
      try {
        // Fetch bookings
        const bookingsRes = await fetch('http://localhost:5001/api/bookings', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData.bookings || []);

        // Fetch favorites
        const favoritesRes = await fetch('http://localhost:5001/api/favorites', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const favoritesData = await favoritesRes.json();
        setFavorites(favoritesData.favorites || []);

        // If admin, fetch admin stats
        if (user?.role === 'admin') {
          // Get total users
          const usersRes = await fetch('http://localhost:5001/api/auth/users', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const usersData = await usersRes.json();
          
          // Get all destinations
          const destRes = await fetch('http://localhost:5001/api/destinations');
          const destData = await destRes.json();
          
          // Get destinations created by this admin (you'll need to add created_by field)
          // For now, we'll just show all destinations
          const myDestRes = await fetch('http://localhost:5001/api/destinations');
          const myDestData = await myDestRes.json();
          
          setAdminStats({
            totalUsers: usersData.count || 0,
            totalDestinations: destData.destinations?.length || 0,
            myDestinations: myDestData.destinations?.length || 0
          });
          
          setAdminDestinations(myDestData.destinations || []);
        }
      } catch (error) {
        console.error('Failed to load data', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token, user]);

  async function handleDeleteDestination(destinationId) {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    
    try {
      const response = await fetch(`http://localhost:5001/api/destinations/${destinationId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setAdminDestinations(adminDestinations.filter(d => d.id !== destinationId));
        setAdminStats({
          ...adminStats,
          totalDestinations: adminStats.totalDestinations - 1,
          myDestinations: adminStats.myDestinations - 1
        });
        alert('Destination deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete destination', error);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // Admin View
  if (user?.role === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span className="text-white text-xl">✈</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                MakiTravel Admin
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ModeToggle />
              <Link to="/admin/add-destination">
                <Button className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:shadow-lg transition-all">
                  + Add New Destination
                </Button>
              </Link>
              <Link to="/destinations">
                <Button variant="outline" className="rounded-xl">
                  View Site
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="destructive" className="rounded-xl bg-red-600 hover:bg-red-700">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-8">
          {/* Welcome Banner */}
          <div className="mb-8 p-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 opacity-10 text-9xl">👑</div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold">Welcome back, Admin {user?.full_name || "User"}! 👋</h2>
              <p className="text-emerald-100 mt-1">Manage your destinations and monitor platform activity</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Users</p>
                    <p className="text-3xl font-bold mt-1">{adminStats.totalUsers}</p>
                  </div>
                  <div className="text-4xl opacity-80">👥</div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Destinations</p>
                    <p className="text-3xl font-bold mt-1">{adminStats.totalDestinations}</p>
                  </div>
                  <div className="text-4xl opacity-80">🌍</div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">My Destinations</p>
                    <p className="text-3xl font-bold mt-1">{adminStats.myDestinations}</p>
                  </div>
                  <div className="text-4xl opacity-80">✈️</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Destinations Table */}
          <Card className="rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
            <div className="bg-emerald-600 px-6 py-4">
              <CardTitle className="text-white flex items-center gap-2">
                <span>📋</span> My Destinations
                <span className="ml-auto text-sm bg-white/20 px-2 py-1 rounded-full">{adminDestinations.length} destinations</span>
              </CardTitle>
            </div>
            <CardContent className="p-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : adminDestinations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-7xl mb-4">🗺️</div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-3">No destinations added yet</p>
                  <Link to="/admin/add-destination">
                    <Button className="rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">
                      + Add Your First Destination
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-slate-800 rounded-xl">
                      <tr>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">ID</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Title</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Location</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Price</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Duration</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                      {adminDestinations.map((dest) => (
                        <tr key={dest.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{dest.id}</td>
                          <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{dest.title}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{dest.location}</td>
                          <td className="px-4 py-3 text-sm text-emerald-600 font-semibold">{dest.price}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{dest.duration_days} days</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Link to={`/destination/${dest.id}`}>
                                <Button variant="outline" size="sm" className="rounded-lg text-blue-600 border-blue-300">
                                  View
                                </Button>
                              </Link>
                              <Button 
                                onClick={() => handleDeleteDestination(dest.id)}
                                variant="outline" 
                                size="sm"
                                className="rounded-lg text-red-600 border-red-300 hover:bg-red-50"
                              >
                                Delete
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
        </main>
      </div>
    );
  }

  // Normal User View
  const upcomingTrips = bookings.filter(b => b.status !== 'cancelled').length;
  const favoriteCount = favorites.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white text-xl">✈</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              MakiTravel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <Link to="/destinations">
              <Button variant="outline" className="rounded-xl border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all">
                Explore Destinations
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="destructive" className="rounded-xl bg-red-600 hover:bg-red-700">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 p-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 opacity-10 text-9xl">✈️</div>
          <div className="relative z-10 flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {user?.full_name || user?.fullName || "Traveler"}! 👋</h2>
              <p className="text-emerald-100 mt-1">Your next adventure is just a click away</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3">
                <p className="text-3xl font-bold">{upcomingTrips}</p>
                <p className="text-xs">Upcoming Trips</p>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3">
                <p className="text-3xl font-bold">{favoriteCount}</p>
                <p className="text-xs">Favorites</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
            <div className="bg-emerald-600 px-6 py-4">
              <CardTitle className="text-white flex items-center gap-2">
                <span>📅</span> My Booked Trips
                <span className="ml-auto text-sm bg-white/20 px-2 py-1 rounded-full">{bookings.length} trips</span>
              </CardTitle>
            </div>
            <CardContent className="p-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-7xl mb-4">🗺️</div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-3">No bookings yet</p>
                  <Link to="/destinations">
                    <Button className="rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">
                      Explore Destinations
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="p-4 rounded-xl border border-gray-200 dark:border-slate-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{booking.title}</h3>
                          <p className="text-sm text-gray-500">📍 {booking.location}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                          {booking.status || 'Confirmed'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                        <div className="text-gray-600">📅 {booking.start_date || booking.booking_date}</div>
                        <div className="text-gray-600">👥 {booking.number_of_guests || booking.travelers} travelers</div>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t">
                        <p className="text-emerald-600 font-bold text-xl">{booking.total_price}</p>
                        {booking.status !== 'cancelled' && (
                          <Button onClick={() => handleCancelBooking(booking.id)} variant="outline" size="sm" className="text-red-500">
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
            <div className="bg-emerald-600 px-6 py-4">
              <CardTitle className="text-white flex items-center gap-2">
                <span>❤️</span> Favorites
                <span className="ml-auto text-sm bg-white/20 px-2 py-1 rounded-full">{favorites.length} saved</span>
              </CardTitle>
            </div>
            <CardContent className="p-6">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : favorites.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3">💙</div>
                  <p className="text-gray-600 text-sm mb-3">No favorites yet</p>
                  <Link to="/destinations">
                    <Button variant="outline" className="rounded-xl border-emerald-500 text-emerald-600">
                      Browse Destinations
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.map((fav) => (
                    <Link to={`/destination/${fav.id}`} key={fav.id}>
                      <div className="p-3 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                        <div className="flex gap-3">
                          <img src={fav.image_url} alt={fav.title} className="w-14 h-14 rounded-lg object-cover" />
                          <div>
                            <h3 className="font-semibold">{fav.title}</h3>
                            <p className="text-xs text-gray-500">{fav.location}</p>
                            <p className="text-emerald-600 font-bold text-sm">${fav.price}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;