import { useState } from 'react';
import { ReviewSurveyForm } from './components/ReviewSurveyForm';
import { WatchlistForm } from './components/WatchlistForm';
import { Toaster } from './components/ui/sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Star, Plus } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'review' | 'watchlist'>('home');

  if (currentPage === 'review') {
    return (
      <div className="size-full flex items-center justify-center bg-gradient-to-br from-[#dcc2c4]/30 via-white to-[#9c9f69]/20 py-8 relative">
        <Button 
          onClick={() => setCurrentPage('home')}
          className="absolute top-4 left-4 bg-[#dcc2c4] hover:bg-[#c7aca7] text-[#332202] rounded-2xl px-6"
        >
          ← Back
        </Button>
        <div className="w-full">
          <ReviewSurveyForm />
        </div>
        <Toaster />
      </div>
    );
  }

  if (currentPage === 'watchlist') {
    return (
      <div className="size-full flex items-center justify-center bg-gradient-to-br from-[#dcc2c4]/30 via-white to-[#9c9f69]/20 py-8 relative">
        <Button 
          onClick={() => setCurrentPage('home')}
          className="absolute top-4 left-4 bg-[#dcc2c4] hover:bg-[#c7aca7] text-[#332202] rounded-2xl px-6"
        >
          ← Back
        </Button>
        <div className="w-full">
          <WatchlistForm />
        </div>
        <Toaster />
      </div>
    );
  }

  // Home/Landing page
  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-[#dcc2c4]/30 via-white to-[#9c9f69]/20 py-8 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#332202] mb-2">MediaTracker</h1>
          <p className="text-[#332202]/70 text-lg">Track your media, share your thoughts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="shadow-xl border-4 border-[#dcc2c4] rounded-3xl overflow-hidden bg-white cursor-pointer hover:shadow-2xl transition-all hover:scale-105"
            onClick={() => setCurrentPage('review')}
          >
            <CardHeader className="text-center bg-gradient-to-br from-[#9c9f69]/20 to-transparent pb-6">
              <div className="flex justify-center mb-3">
                <div className="bg-white p-4 rounded-full shadow-lg">
                  <Star className="w-10 h-10 text-[#9c9f69]" />
                </div>
              </div>
              <CardTitle className="text-3xl text-[#332202]">Review</CardTitle>
              <CardDescription className="text-[#332202]/70 text-base">
                Rate and review media you've experienced
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-[#332202]/80 mb-4">
                Share your thoughts on books, movies, shows, and albums. Rate them with stars and tell us why you loved (or didn't love) them.
              </p>
              <Button className="w-full bg-[#9c9f69] hover:bg-[#8a8d5e] text-white rounded-2xl py-6">
                Start Reviewing
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="shadow-xl border-4 border-[#dcc2c4] rounded-3xl overflow-hidden bg-white cursor-pointer hover:shadow-2xl transition-all hover:scale-105"
            onClick={() => setCurrentPage('watchlist')}
          >
            <CardHeader className="text-center bg-gradient-to-br from-[#dcc2c4]/20 to-transparent pb-6">
              <div className="flex justify-center mb-3">
                <div className="bg-white p-4 rounded-full shadow-lg">
                  <Plus className="w-10 h-10 text-[#9c9f69]" />
                </div>
              </div>
              <CardTitle className="text-3xl text-[#332202]">Watchlist</CardTitle>
              <CardDescription className="text-[#332202]/70 text-base">
                Keep track of what you want to watch
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-[#332202]/80 mb-4">
                Add items to your watchlist. Keep track of books to read, movies to watch, shows to binge, and albums to listen to.
              </p>
              <Button className="w-full bg-[#9c9f69] hover:bg-[#8a8d5e] text-white rounded-2xl py-6">
                Go to Watchlist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  );
}