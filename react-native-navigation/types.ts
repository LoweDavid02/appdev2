import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: { result?: string } | undefined;
  Details: { itemId: number; otherParam: string };
  Root: { screen: string; params: { user: string } };
};

export type NestedStackParamList = {
  Profile: undefined;
  Settings: { user: string };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export type SettingsScreenRouteProp = RouteProp<
  NestedStackParamList,
  'Settings'
>;

export type BtnVariant = 'primary' | 'ghost' | 'danger' | 'teal';

export interface BtnProps {
  label: string;
  onPress: () => void;
  variant?: BtnVariant;
}

export interface TagProps {
  label: string;
  color?: string;
  textColor?: string;
}

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

export interface DetailsScreenProps {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
}

export interface SettingsScreenProps {
  route: SettingsScreenRouteProp;
}

export interface Colors {
  bg: string;
  surface: string;
  border: string;
  accent: string;
  accentDim: string;
  text: string;
  muted: string;
  danger: string;
  teal: string;
}
