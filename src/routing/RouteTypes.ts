import {NavigatorScreenParams} from '@react-navigation/native';

export type HubTabParams = {
  Explore: undefined;
  Map: undefined;
  Animals: undefined;
  Facts: undefined;
  Game: undefined;
};

export type RootStackParams = {
  Splash: undefined;
  Onboarding: undefined;
  Hub: NavigatorScreenParams<HubTabParams>;
  LocationDetails: {locationId: string};
  AnimalDetails: {animalId: string};
  MyAnimalForm: undefined;
  QuizIntro: undefined;
  QuizPlay: undefined;
  QuizResults: {
    score: number;
    total: number;
    review: Array<{text: string; correct: boolean}>;
  };
  RanchSprintPlay: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}
