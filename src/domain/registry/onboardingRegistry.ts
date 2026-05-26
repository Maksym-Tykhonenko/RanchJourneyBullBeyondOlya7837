import {OnboardingSlide} from '../models';

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'destinations',
    title: 'Discover Ranch Destinations',
    subtitle:
      'Explore stunning ranch locations across the countryside. Find hidden gems and popular destinations.',
    highlight: 'Top-rated locations, visitor reviews & interactive map',
    highlightIcon: '📍',
    image: require('../../assets/onboarding/slide_destinations.png'),
    cta: 'Continue',
  },
  {
    id: 'animals',
    title: 'Explore Amazing Animals',
    subtitle:
      'Discover the fascinating world of cattle breeds and farm animals. Learn about their origins, characteristics, and unique traits that make each breed special.',
    highlight: '8+ cattle breeds with detailed profiles & facts',
    highlightIcon: '🐂',
    image: require('../../assets/onboarding/slide_animals.png'),
    cta: 'Continue',
  },
  {
    id: 'play',
    title: 'Learn, Quiz & Play',
    subtitle:
      'Test your ranch knowledge with engaging quizzes, discover surprising animal facts, and have fun with our exclusive mini-game. The ranch adventure never stops!',
    highlight: 'Quizzes, fun facts & the exclusive mini-game',
    highlightIcon: '🎮',
    image: require('../../assets/onboarding/slide_play.png'),
    cta: 'Start Exploring',
  },
];
