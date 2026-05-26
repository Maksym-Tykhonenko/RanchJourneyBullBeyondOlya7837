import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ExploreLocationsPanel} from '../panels/ExploreLocationsPanel';
import {RanchMapPanel} from '../panels/RanchMapPanel';
import {CattleBreedsPanel} from '../panels/CattleBreedsPanel';
import {RanchFactsPanel} from '../panels/RanchFactsPanel';
import {RanchSprintIntroPanel} from '../panels/RanchSprintIntroPanel';
import {HubTabBar} from '../widgets/HubTabBar';
import {HubTabParams} from './RouteTypes';

const Tab = createBottomTabNavigator<HubTabParams>();

export const HubTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={{headerShown: false}}
    tabBar={props => <HubTabBar {...props} />}>
    <Tab.Screen name="Explore" component={ExploreLocationsPanel} />
    <Tab.Screen name="Map" component={RanchMapPanel} />
    <Tab.Screen name="Animals" component={CattleBreedsPanel} />
    <Tab.Screen name="Facts" component={RanchFactsPanel} />
    <Tab.Screen name="Game" component={RanchSprintIntroPanel} />
  </Tab.Navigator>
);
