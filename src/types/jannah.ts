
import { TreeDeciduous, TreePalm, Trees, Waves, Home, Building, Mosque, Mountain, Sun, Moon, Crown, Apple, Grape, Bird, Fish, Car, Ship, Fountain, Flower, Star, Heart, Gift, Zap } from 'lucide-react';

export interface JannahItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'nature' | 'structures' | 'special' | 'terrain' | 'decorations' | 'animals' | 'fruits' | 'religious' | 'transport' | 'utilities';
  size: '1x1' | '2x2' | '3x3' | '4x4';
  icon: React.ReactElement;
  intention: string;
  realProject: string;
}
