import { MapMarkerProps } from "react-native-maps";

/** interfaces */
export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface EmergencyContact {
    name: string;
    phone: string;
    relationship: string;
}

export interface Zone {
    id: string;
    name: string;
    coordinates: { latitude: number; longitude: number }[];
    dangerLevel: 'low' | 'medium' | 'high';
}

export interface Incident {
    id: string;
    latitude: number;
    longitude: number;
    crimeType: string;
    timeOccurred: string;
    trustLevel: number;
    description: string;
}

/** constants */
export const transportationModes = {
    'DRIVING': 'car',
    'WALKING': 'walk',
    'TRANSIT': 'bus',
    'BICYCLING': 'bicycle'
};

export const emergencyOptions = [
    { text: "Safety Concern", value: "safety concern" },
    { text: "Medical", value: "medical" },
    { text: "Fire", value: "fire" },
    { text: "Crime", value: "crime" },
    { text: "Natural Disaster", value: "natural disaster" },
    { text: "Other", value: "other" },
  ];

export const promptOptions = [
    { text: "Current safety risks", value: "What are the main safety risks for someone like me in this area right now?" },
    { text: "Quick safety tips", value: "Give me 3 quick safety tips for my current situation." },
    { text: "Emergency", value: "I'm in an emergency situation." },
    { text: "Suspicious activity", value: "I've witnessed suspicious activity. What should I do?" },
];

export const centralLA = {
    latitude: 34.052235,
    longitude: -118.243683,
};

/** types */
export type RouteType = {
    origin: { latitude: number; longitude: number };
    destination: { latitude: number; longitude: number };
    coordinates?: { latitude: number; longitude: number }[];
};

export type DateTimeInfo = {
    time: string;
    date: string;
    month: string;
};

export type CrimeMarker = {
    coordinate: MapMarkerProps["coordinate"];
    title?: MapMarkerProps["title"];
    description?: MapMarkerProps["description"];
    crimeType: string;
    timeOccurred: string;
    trustLevel: number;
};
