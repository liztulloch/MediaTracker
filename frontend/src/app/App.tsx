import { ReviewSurveyForm } from './components/ReviewSurveyForm';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-[#dcc2c4]/30 via-white to-[#9c9f69]/20 py-8">
      <ReviewSurveyForm />
      <Toaster />
    </div>
  );
}