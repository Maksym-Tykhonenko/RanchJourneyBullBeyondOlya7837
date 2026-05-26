import {ImageSourcePropType} from 'react-native';

export type LocationCategory =
  | 'ranch'
  | 'farmPark'
  | 'cityFarm'
  | 'dairyFarm'
  | 'educationalFarm'
  | 'wildlifeFarm'
  | 'agritourism';

export type LocationRecord = {
  id: string;
  name: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  type: string;
  category: LocationCategory;
  tags: string[];
  description: string;
  facts: string[];
  visitInfo: string;
  hours: string;
  image: ImageSourcePropType;
  topPick: boolean;
};

export type AnimalCategory =
  | 'beef'
  | 'dairy'
  | 'heritage'
  | 'wool'
  | 'pig'
  | 'buffalo'
  | 'goat'
  | 'camel';

export type AnimalRecord = {
  id: string;
  name: string;
  scientificName: string;
  breed: string;
  weight: string;
  height: string;
  lifespan: string;
  origin: string;
  color: string;
  temperament: string;
  description: string;
  funFacts: string[];
  category: AnimalCategory;
  image: ImageSourcePropType;
  flagLocation: string;
};

export type MyAnimal = {
  id: string;
  name: string;
  breed: string;
  origin?: string;
  weight?: string;
  color?: string;
  description?: string;
  imageUri?: string;
  createdAt: number;
};

export type FactRecord = {
  id: string;
  emoji: string;
  category: string;
  title: string;
  body: string;
};

export type QuizOption = {
  key: 'A' | 'B' | 'C' | 'D';
  label: string;
  correct: boolean;
};

export type QuizQuestion = {
  id: string;
  text: string;
  options: QuizOption[];
  explanation: string;
};

export type OnboardingSlide = {
  id: string;
  title: string;
  subtitle: string;
  highlight: string;
  highlightIcon: string;
  image: ImageSourcePropType;
  cta: string;
};

export type GamePickupKind = 'hay' | 'apple' | 'carrot' | 'water' | 'rock' | 'cactus' | 'snake';
