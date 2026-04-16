import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllDestinations } from '../services/destinationService';
import { useAuth } from '../context/AuthContext';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Button } from '@/components/ui/button';

// Import local images as fallback
import hararJugolImage from "../assets/hararjugol.jpg";
import lakeTanaImage from "../assets/laketana.jpg";
import axumImage from "../assets/axum.jpg";
import dallolImage from "../assets/dallo.jpg";
import simienImage from "../assets/simene.jpg";
import lalibelaImage from "../assets/lalibela.jpg";
import afarImage from "../assets/afar.jpg";
import abuneImage from "../assets/abune.jpg";
import demeraImage from "../assets/demera.jpg";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  // Fallback local destinations (used only if API fails)
  const fallbackDestinations = [
    {
      id: 1,
      title: "Harar Jugol",
      location: "Harar, Ethiopia",
      price: 649,
      image: hararJugolImage,
      duration_days: 4,
      description: "Ancient walled city with colorful markets"
    },
    {
      id: 2,
      title: "Lake Tana",
      location: "Bahir Dar, Ethiopia",
      price: 599,
      image: lakeTanaImage,
      duration_days: 4,
      description: "Island monasteries and Blue Nile source"
    },
    {
      id: 3,
      title: "Axum",
      location: "Axum, Ethiopia",
      price: 699,
      image: axumImage,
      duration_days: 3,
      description: "Ancient obelisks and archaeological sites"
    },
    {
      id: 4,
      title: "Dallol",
      location: "Afar, Ethiopia",
      price: 1299,
      image: dallolImage,
      duration_days: 5,
      description: "Colorful hydrothermal fields"
    },
    {
      id: 5,
      title: "Simien Mountains",
      location: "Gondar, Ethiopia",
      price: 899,
      image: simienImage,
      duration_days: 7,
      description: "Breathtaking trekking with wildlife"
    },
    {
      id: 6,
      title: "Lalibela",
      location: "Lalibela, Ethiopia",
      price: 799,
      image: lalibelaImage,
      duration_days: 6,
      description: "Rock-hewn churches, UNESCO World Heritage"
    },
    {
      id: 7,
      title: "Afar Depression",
      location: "Afar, Ethiopia",
      price: 899,
      image: afarImage,
      duration_days: 7,
      description: "Erta Ale volcano and salt flats"
    },
    {
      id: 8,
      title: "Abune Yemata",
      location: "Tigray, Ethiopia",
      price: 699,
      image: abuneImage,
      duration_days: 5,
      description: "Cliff church with ancient frescoes"
    },
    {
      id: 9,
      title: "Demera Festival",
      location: "Addis Ababa, Ethiopia",
      price: 599,
      image: demeraImage,
      duration_days: 4,
      description: "Colorful Meskel Festival celebration"
    }
  ];

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const data = await getAllDestinations();
        if (data.destinations && data.destinations.length > 0) {
          // Use API data if available
          const apiDestinations = data.destinations.map(dest => ({
            ...dest,
            image: dest.image_url
          }));
          setDestinations(apiDestinations);
        } else {
          // Use fallback if API returns empty
          setDestinations(fallbackDestinations);
        }
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Failed to load from server, showing local data');
        setDestinations(fallbackDestinations);
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
      <div className="text-center text-slate-600 dark:text-slate-300">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div>
          <h1 className="text-2xl font-bold text-[#52b788]">Popular Destinations</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Discover your next adventure
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />
          {token && (
            <Link to="/dashboard">
              <Button variant="outline" className="rounded-xl bg-white dark:bg-slate-900">
                Dashboard
              </Button>
            </Link>
          )}
          {!token && (
            <Link to="/login">
              <Button variant="outline" className="rounded-xl bg-white dark:bg-slate-900">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {error && (
          <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-xl text-sm">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link to={`/destination/${dest.id}`} key={dest.id}>
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow h-full flex flex-col">
                <img 
                  src={dest.image} 
                  alt={dest.title} 
                  className="w-full h-56 object-cover" 
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">{dest.title}</h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {dest.location}
                  </p>
                  <p className="text-[#52b788] font-bold text-lg">{dest.price}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{dest.duration_days} days</p>
                  {dest.description && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 line-clamp-2">{dest.description}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Destinations;