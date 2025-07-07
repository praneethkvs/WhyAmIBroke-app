import { Coffee, Leaf, Tv, Wine, Car, Utensils } from "lucide-react";

export const HABITS = [
  {
    id: 'coffee',
    name: 'Coffee',
    icon: Coffee,
    frequency: 'daily',
    defaultPrice: 5.00,
    boomerCallout: '"BuT i NeEd My CaFfEiNe!" - Every millennial ever',
    className: 'habit-tile-coffee'
  },
  {
    id: 'avocado',
    name: 'Avocado Toast',
    icon: Leaf,
    frequency: 'weekly',
    defaultPrice: 12.00,
    boomerCallout: '"This is why you can\'t afford a house" - Every boomer',
    className: 'habit-tile-avocado'
  },
  {
    id: 'streaming',
    name: 'Streaming',
    icon: Tv,
    frequency: 'monthly',
    defaultPrice: 45.00,
    boomerCallout: '"You have Netflix, Hulu, Disney+, AND HBO?!" - Your wallet',
    className: 'habit-tile-streaming'
  },
  {
    id: 'alcohol',
    name: 'Alcohol',
    icon: Wine,
    frequency: 'weekly',
    defaultPrice: 25.00,
    boomerCallout: '"Liquid courage is expensive courage" - Your liver and wallet',
    className: 'habit-tile-alcohol'
  },
  {
    id: 'rideshare',
    name: 'Rideshares',
    icon: Car,
    frequency: 'weekly',
    defaultPrice: 30.00,
    boomerCallout: '"Walking is free, but your feet hurt" - Ancient wisdom',
    className: 'habit-tile-rideshare'
  },
  {
    id: 'lunch',
    name: 'Lunch Out',
    icon: Utensils,
    frequency: 'daily',
    defaultPrice: 15.00,
    boomerCallout: '"That sandwich costs more than minimum wage" - Reality check',
    className: 'habit-tile-lunch'
  }
] as const;

export const FREQUENCY_MULTIPLIERS = {
  daily: 30,
  weekly: 4.33,
  monthly: 1
} as const;

export const FUN_FACTS = [
  'a small island',
  'a Tesla Model S',
  'a luxury yacht',
  'a Hollywood mansion',
  'early retirement',
  'financial freedom',
  'a private jet',
  'multiple Lamborghinis'
] as const;
