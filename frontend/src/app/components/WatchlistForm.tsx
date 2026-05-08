import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BookOpen, Film, Music, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface WatchlistData {
  name: string;
  genre: string;
  recommendedBy: string;
}

export function WatchlistForm() {
  const [bookData, setBookData] = useState<WatchlistData>({
    name: '',
    genre: '',
    recommendedBy: '',
  });

  const [movieData, setMovieData] = useState<WatchlistData>({
    name: '',
    genre: '',
    recommendedBy: '',
  });

  const [albumData, setAlbumData] = useState<WatchlistData>({
    name: '',
    genre: '',
    recommendedBy: '',
  });

  const bookGenres = [
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Science Fiction',
    'Fantasy',
    'Romance',
    'Thriller',
    'Biography',
    'Self-Help',
    'History',
    'Horror',
    'Poetry',
  ];

  const movieGenres = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Science Fiction',
    'Romance',
    'Thriller',
    'Documentary',
    'Animation',
    'Fantasy',
    'Crime',
    'Adventure',
    'TV Series',
    'Mini-Series',
  ];

  const albumGenres = [
    'Pop',
    'Rock',
    'Hip Hop',
    'R&B',
    'Jazz',
    'Classical',
    'Electronic',
    'Country',
    'Metal',
    'Indie',
    'Folk',
    'Blues',
  ];

  const recommendedByOptions = [
    'Friend',
    'Family',
    'Social Media',
    'Online Review',
    'Trending',
    'Personal Discovery',
    'Other',
  ];

  const handleSubmit = (type: 'book' | 'movie' | 'album') => {
    let data: WatchlistData;
    let label: string;

    switch (type) {
      case 'book':
        data = bookData;
        label = 'Book';
        break;
      case 'movie':
        data = movieData;
        label = 'Movie/Show';
        break;
      case 'album':
        data = albumData;
        label = 'Album';
        break;
    }

    if (!data.name) {
      toast.error('Please enter a name');
      return;
    }

    console.log(`${label} to Watchlist:`, data);
    toast.success(`${label} added to watchlist! 📝`);

    // Reset form
    if (type === 'book') {
      setBookData({ name: '', genre: '', recommendedBy: '' });
    } else if (type === 'movie') {
      setMovieData({ name: '', genre: '', recommendedBy: '' });
    } else {
      setAlbumData({ name: '', genre: '', recommendedBy: '' });
    }
  };

  const renderWatchlistForm = (
    type: 'book' | 'movie' | 'album',
    data: WatchlistData,
    setData: React.Dispatch<React.SetStateAction<WatchlistData>>,
    genres: string[]
  ) => {
    const labels = {
      book: 'Book Title',
      movie: 'Movie/Show Title',
      album: 'Album Title',
    };

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor={`${type}-name`} className="text-[#332202]">
            {labels[type]} <span className="text-[#9c9f69]">*</span>
          </Label>
          <Input
            id={`${type}-name`}
            placeholder={`Enter ${type === 'movie' ? 'movie/show' : type} title`}
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="border-2 border-[#dcc2c4] focus:border-[#9c9f69] rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${type}-genre`} className="text-[#332202]">Genre</Label>
          <Select value={data.genre} onValueChange={(value) => setData({ ...data, genre: value })}>
            <SelectTrigger id={`${type}-genre`} className="border-2 border-[#dcc2c4] focus:border-[#9c9f69] rounded-2xl">
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-2 border-[#dcc2c4]">
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre} className="rounded-xl focus:bg-[#dcc2c4]">
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${type}-recommended`} className="text-[#332202]">Who Recommended It?</Label>
          <Select value={data.recommendedBy} onValueChange={(value) => setData({ ...data, recommendedBy: value })}>
            <SelectTrigger id={`${type}-recommended`} className="border-2 border-[#dcc2c4] focus:border-[#9c9f69] rounded-2xl">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-2 border-[#dcc2c4]">
              {recommendedByOptions.map((option) => (
                <SelectItem key={option} value={option} className="rounded-xl focus:bg-[#dcc2c4]">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={() => handleSubmit(type)} 
          className="w-full bg-[#9c9f69] hover:bg-[#8a8d5e] text-white rounded-2xl py-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Watchlist
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="shadow-2xl border-4 border-[#dcc2c4] rounded-3xl overflow-hidden bg-white">
        <CardHeader className="text-center bg-gradient-to-br from-[#dcc2c4]/40 to-[#9c9f69]/20 pb-8">
          <div className="flex justify-center mb-3">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Plus className="w-10 h-10 text-[#9c9f69]" />
            </div>
          </div>
          <CardTitle className="text-4xl text-[#332202] mb-2">My Watchlist</CardTitle>
          <CardDescription className="text-[#332202]/70 text-base">
            Add books, movies, shows, and albums to your watchlist 📝
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="books" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#dcc2c4]/50 p-1.5 rounded-2xl">
              <TabsTrigger 
                value="books" 
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:text-[#332202] data-[state=active]:shadow-md transition-all"
              >
                <BookOpen className="w-4 h-4" />
                Books
              </TabsTrigger>
              <TabsTrigger 
                value="movies" 
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:text-[#332202] data-[state=active]:shadow-md transition-all"
              >
                <Film className="w-4 h-4" />
                Movies & Shows
              </TabsTrigger>
              <TabsTrigger 
                value="albums" 
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:text-[#332202] data-[state=active]:shadow-md transition-all"
              >
                <Music className="w-4 h-4" />
                Albums
              </TabsTrigger>
            </TabsList>

            <TabsContent value="books" className="mt-6">
              {renderWatchlistForm('book', bookData, setBookData, bookGenres)}
            </TabsContent>

            <TabsContent value="movies" className="mt-6">
              {renderWatchlistForm('movie', movieData, setMovieData, movieGenres)}
            </TabsContent>

            <TabsContent value="albums" className="mt-6">
              {renderWatchlistForm('album', albumData, setAlbumData, albumGenres)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
