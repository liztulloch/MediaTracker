import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Star, BookOpen, Film, Music, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { submitReview } from '../../api/index'
interface ReviewData {
  name: string;
  stars: number;
  why: string;
  genre: string;
  extraThoughts: string;
}

export function ReviewSurveyForm() {
  const [bookData, setBookData] = useState<ReviewData>({
    Booktitle : '',
    stars: 0,
    why: '',
    genre: '',
    extraThoughts: '',
  });

  const [movieData, setMovieData] = useState<ReviewData>({
    name: '',
    stars: 0,
    why: '',
    genre: '',
    extraThoughts: '',
  });

  const [albumData, setAlbumData] = useState<ReviewData>({
    name: '',
    stars: 0,
    why: '',
    genre: '',
    extraThoughts: '',
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

  const handleSubmit = async (type: 'book' | 'movie' | 'album') => {
  let data: ReviewData
  let label: string

  switch (type) {
    case 'book': data = bookData; label = 'Book'; break
    case 'movie': data = movieData; label = 'Movie/Show'; break
    case 'album': data = albumData; label = 'Album'; break
  }

  if (!data.name) {
    toast.error('Please enter a name')
    return
  }

  try {
    await submitReview(type, data)
    toast.success(`${label} review saved! ✨`)
    // reset form
    if (type === 'book') setBookData({ name: '', stars: 0, why: '', genre: '', extraThoughts: '' })
    else if (type === 'movie') setMovieData({ name: '', stars: 0, why: '', genre: '', extraThoughts: '' })
    else setAlbumData({ name: '', stars: 0, why: '', genre: '', extraThoughts: '' })
  } catch (err) {
    toast.error('Something went wrong, try again')
    console.error(err)
  }
}

  const StarRating = ({
    rating,
    onChange,
  }: {
    rating: number;
    onChange: (rating: number) => void;
  }) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="transition-all duration-200 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-[#9c9f69] rounded-full p-1"
          >
            <Star
              className={`w-8 h-8 ${
                star <= rating
                  ? 'fill-[#9c9f69] text-[#9c9f69]'
                  : 'fill-[#dcc2c4] text-[#dcc2c4]'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const renderReviewForm = (
    type: 'book' | 'movie' | 'album',
    data: ReviewData,
    setData: React.Dispatch<React.SetStateAction<ReviewData>>,
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

        <div className="space-y-3">
          <Label className="text-[#332202]">Stars</Label>
          <div className="flex items-center gap-4">
            <StarRating
              rating={data.stars}
              onChange={(stars) => setData({ ...data, stars })}
            />
            <span className="text-sm text-[#332202] font-medium">
              {data.stars > 0 ? `${data.stars} / 5` : 'Not rated'}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${type}-why`} className="text-[#332202]">Why</Label>
          <Textarea
            id={`${type}-why`}
            placeholder="Why did you choose this? What did you think?"
            value={data.why}
            onChange={(e) => setData({ ...data, why: e.target.value })}
            className="min-h-24 border-2 border-[#dcc2c4] focus:border-[#9c9f69] rounded-2xl"
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
          <Label htmlFor={`${type}-extra`} className="text-[#332202]">Extra Thoughts</Label>
          <Textarea
            id={`${type}-extra`}
            placeholder="Any additional thoughts..."
            value={data.extraThoughts}
            onChange={(e) => setData({ ...data, extraThoughts: e.target.value })}
            className="min-h-24 border-2 border-[#dcc2c4] focus:border-[#9c9f69] rounded-2xl"
          />
        </div>

        <Button 
          onClick={() => handleSubmit(type)} 
          className="w-full bg-[#9c9f69] hover:bg-[#8a8d5e] text-white rounded-2xl py-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Submit
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
              <Sparkles className="w-10 h-10 text-[#9c9f69]" />
            </div>
          </div>
          <CardTitle className="text-4xl text-[#332202] mb-2">Media Review Survey</CardTitle>
          <CardDescription className="text-[#332202]/70 text-base">
            Share your thoughts on books, movies, shows, and albums ✨
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
              {renderReviewForm('book', bookData, setBookData, bookGenres)}
            </TabsContent>

            <TabsContent value="movies" className="mt-6">
              {renderReviewForm('movie', movieData, setMovieData, movieGenres)}
            </TabsContent>

            <TabsContent value="albums" className="mt-6">
              {renderReviewForm('album', albumData, setAlbumData, albumGenres)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}