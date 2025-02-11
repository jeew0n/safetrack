import { Zone } from "./constants";

export const getMockDangerZones = (gender: 'male' | 'female'): Zone[] => {
  const baseDangerZones: Zone[] = mockDangerZones;
  if (gender === 'male') {
    return baseDangerZones.map(zone => {
      // List of zones to lower the danger level for males
      const zonesToLower = ['Central', 'Wilshire', '77th Street', 'Southeast'];

      if (zonesToLower.includes(zone.name)) {
        switch (zone.dangerLevel) {
          case 'high':
            return { ...zone, dangerLevel: 'medium' };
          case 'medium':
            return { ...zone, dangerLevel: 'low' };
          default:
            return zone;
        }
      }
      return zone;
    });
  }

  return baseDangerZones;
};

export const mockDangerZones: Zone[] = [
    {
        id: '1',
        name: 'Central',
        coordinates: [
          { latitude: 34.0600, longitude: -118.2700 },
          { latitude: 34.0650, longitude: -118.2400 },
          { latitude: 34.0500, longitude: -118.2200 },
          { latitude: 34.0300, longitude: -118.2300 },
          { latitude: 34.0350, longitude: -118.2600 },
          { latitude: 34.0450, longitude: -118.2750 },
        ],
        dangerLevel: 'high',
      },
      {
        id: '2',
        name: 'Rampart',
        coordinates: [
          { latitude: 34.0650, longitude: -118.2400 },
          { latitude: 34.0800, longitude: -118.2600 },
          { latitude: 34.0850, longitude: -118.2900 },
          { latitude: 34.0700, longitude: -118.3100 },
          { latitude: 34.0550, longitude: -118.2950 },
          { latitude: 34.0600, longitude: -118.2700 },
        ],
        dangerLevel: 'medium',
      },
      {
        id: '3',
        name: 'Southwest',
        coordinates: [
          { latitude: 34.0000, longitude: -118.3200 },
          { latitude: 34.0100, longitude: -118.2900 },
          { latitude: 33.9900, longitude: -118.2700 },
          { latitude: 33.9700, longitude: -118.2800 },
          { latitude: 33.9650, longitude: -118.3100 },
          { latitude: 33.9800, longitude: -118.3300 },
        ],
        dangerLevel: 'medium',
      },
      {
        id: '4',
        name: 'Hollenbeck',
        coordinates: [
          { latitude: 34.0500, longitude: -118.2200 },
          { latitude: 34.0650, longitude: -118.1900 },
          { latitude: 34.0550, longitude: -118.1700 },
          { latitude: 34.0300, longitude: -118.1800 },
          { latitude: 34.0250, longitude: -118.2050 },
          { latitude: 34.0300, longitude: -118.2300 },
        ],
        dangerLevel: 'medium',
      },
      {
        id: '5',
        name: 'Harbor',
        coordinates: [
          { latitude: 33.7800, longitude: -118.2900 },
          { latitude: 33.7900, longitude: -118.2600 },
          { latitude: 33.7700, longitude: -118.2400 },
          { latitude: 33.7400, longitude: -118.2500 },
          { latitude: 33.7300, longitude: -118.2800 },
          { latitude: 33.7500, longitude: -118.3000 },
        ],
        dangerLevel: 'medium',
      },
      {
        id: '6',
        name: 'Hollywood',
        coordinates: [
          { latitude: 34.1000, longitude: -118.3200 },
          { latitude: 34.1100, longitude: -118.2900 },
          { latitude: 34.0950, longitude: -118.2700 },
          { latitude: 34.0800, longitude: -118.2800 },
          { latitude: 34.0850, longitude: -118.3100 },
          { latitude: 34.0900, longitude: -118.3300 },
        ],
        dangerLevel: 'medium',
      },
      {
        id: '7',
        name: 'Wilshire',
        coordinates: [
          { latitude: 34.0700, longitude: -118.3100 },
          { latitude: 34.0800, longitude: -118.3400 },
          { latitude: 34.0650, longitude: -118.3600 },
          { latitude: 34.0450, longitude: -118.3500 },
          { latitude: 34.0500, longitude: -118.3200 },
          { latitude: 34.0550, longitude: -118.2950 },
        ],
        dangerLevel: 'high',
      },
      {
        id: '8',
        name: 'West LA',
        coordinates: [
          { latitude: 34.0650, longitude: -118.3600 },
          { latitude: 34.0700, longitude: -118.4000 },
          { latitude: 34.0500, longitude: -118.4300 },
          { latitude: 34.0300, longitude: -118.4200 },
          { latitude: 34.0250, longitude: -118.3800 },
          { latitude: 34.0450, longitude: -118.3500 },
        ],
        dangerLevel: 'low',
      },
      {
        id: '9',
        name: 'Van Nuys',
        coordinates: [
          { latitude: 34.2200, longitude: -118.4500 },
          { latitude: 34.2300, longitude: -118.4200 },
          { latitude: 34.2100, longitude: -118.4000 },
          { latitude: 34.1900, longitude: -118.4100 },
          { latitude: 34.1850, longitude: -118.4400 },
          { latitude: 34.2000, longitude: -118.4600 },
        ],
        dangerLevel: 'low',
      },
      {
        id: '10',
        name: 'West Valley',
        coordinates: [
          { latitude: 34.2300, longitude: -118.5700 },
          { latitude: 34.2400, longitude: -118.5300 },
          { latitude: 34.2200, longitude: -118.5000 },
          { latitude: 34.1900, longitude: -118.5200 },
          { latitude: 34.1950, longitude: -118.5600 },
          { latitude: 34.2100, longitude: -118.5800 },
        ],
        dangerLevel: 'medium',
      },
      {
        id: '11',
        name: 'Northeast',
        coordinates: [
          { latitude: 34.1300, longitude: -118.2300 },
          { latitude: 34.1400, longitude: -118.2000 },
          { latitude: 34.1200, longitude: -118.1800 },
          { latitude: 34.0950, longitude: -118.1900 },
          { latitude: 34.1000, longitude: -118.2200 },
          { latitude: 34.1100, longitude: -118.2400 },
        ],
        dangerLevel: 'low',
      },
      {
        id: '12',
        name: '77th Street',
        coordinates: [
          { latitude: 33.9900, longitude: -118.2700 },
          { latitude: 34.0000, longitude: -118.2400 },
          { latitude: 33.9800, longitude: -118.2200 },
          { latitude: 33.9600, longitude: -118.2300 },
          { latitude: 33.9550, longitude: -118.2600 },
          { latitude: 33.9700, longitude: -118.2800 },
        ],
        dangerLevel: 'high',
      },
      {
        id: '13',
        name: 'Newton',
        coordinates: [
          { latitude: 34.0300, longitude: -118.2300 },
          { latitude: 34.0350, longitude: -118.2050 },
          { latitude: 34.0200, longitude: -118.1900 },
          { latitude: 34.0000, longitude: -118.2000 },
          { latitude: 34.0000, longitude: -118.2400 },
          { latitude: 34.0100, longitude: -118.2500 },
        ],
        dangerLevel: 'medium',
      },
      {
        id: '14',
        name: 'Pacific',
        coordinates: [
          { latitude: 34.0300, longitude: -118.4200 },
          { latitude: 34.0350, longitude: -118.4500 },
          { latitude: 34.0150, longitude: -118.4700 },
          { latitude: 33.9900, longitude: -118.4600 },
          { latitude: 33.9850, longitude: -118.4300 },
          { latitude: 34.0050, longitude: -118.4100 },
        ],
        dangerLevel: 'low',
      },
      {
        id: '15',
        name: 'North Hollywood',
        coordinates: [
          { latitude: 34.2100, longitude: -118.4000 },
          { latitude: 34.2200, longitude: -118.3700 },
          { latitude: 34.2000, longitude: -118.3500 },
          { latitude: 34.1800, longitude: -118.3600 },
          { latitude: 34.1750, longitude: -118.3900 },
          { latitude: 34.1900, longitude: -118.4100 },
        ],
        dangerLevel: 'low',
      },
      {
        id: '16',
        name: 'Foothill',
        coordinates: [
          { latitude: 34.2600, longitude: -118.3500 },
          { latitude: 34.2700, longitude: -118.3100 },
          { latitude: 34.2500, longitude: -118.2800 },
          { latitude: 34.2200, longitude: -118.2900 },
          { latitude: 34.2250, longitude: -118.3300 },
          { latitude: 34.2400, longitude: -118.3600 },
        ],
        dangerLevel: 'low',
      },
      {
        id: '17',
        name: 'Devonshire',
        coordinates: [
          { latitude: 34.2700, longitude: -118.5300 },
          { latitude: 34.2800, longitude: -118.4900 },
          { latitude: 34.2600, longitude: -118.4600 },
          { latitude: 34.2300, longitude: -118.4700 },
          { latitude: 34.2350, longitude: -118.5100 },
          { latitude: 34.2500, longitude: -118.5400 },
        ],
        dangerLevel: 'medium',
      },
      {
        id: '18',
        name: 'Southeast',
        coordinates: [
          { latitude: 33.9600, longitude: -118.2300 },
          { latitude: 33.9700, longitude: -118.2000 },
          { latitude: 33.9500, longitude: -118.1800 },
          { latitude: 33.9300, longitude: -118.1900 },
          { latitude: 33.9250, longitude: -118.2200 },
          { latitude: 33.9400, longitude: -118.2400 },
        ],
        dangerLevel: 'high',
      },
];

export const mockCrimeIncidents = [
  {
    coordinate: {
      latitude: 34.052235,
      longitude: -118.243683,
    },
    title: "Robbery",
    description: "Time: 2023-06-15 14:30 || Trust Level: 85%",
  },
  {
    coordinate: {
      latitude: 34.082235,
      longitude: -118.413683,
    },
    title: "Assault",
    description: "Time: 2023-06-14 22:15 || Trust Level: 92%",
  },
  {
    coordinate: {
      latitude: 33.992235,
      longitude: -118.283683,
    },
    title: "Burglary",
    description: "Time: 2023-06-13 03:45 || Trust Level: 78%",
  },
  {
    coordinate: {
      latitude: 34.102235,
      longitude: -118.333683,
    },
    title: "Vehicle Theft",
    description: "Time: 2023-06-12 18:20 || Trust Level: 88%",
  },
  {
    coordinate: {
      latitude: 34.022235,
      longitude: -118.178683,
    },
    title: "Vandalism",
    description: "Time: 2023-06-11 09:10 || Trust Level: 70%",
  }
];

export const mockCrimeIncidentsAlternate = [
  {
    coordinate: {
      latitude: 34.062235,
      longitude: -118.253683,
    },
    title: "Theft",
    description: "Time: 2023-06-16 11:45 || Trust Level: 82%",
  },
  {
    coordinate: {
      latitude: 34.092235,
      longitude: -118.423683,
    },
    title: "Harassment",
    description: "Time: 2023-06-15 20:30 || Trust Level: 75%",
  },
  {
    coordinate: {
      latitude: 33.982235,
      longitude: -118.273683,
    },
    title: "Drug-related incident",
    description: "Time: 2023-06-14 16:20 || Trust Level: 90%",
  },
  {
    coordinate: {
      latitude: 34.112235,
      longitude: -118.323683,
    },
    title: "Public Disturbance",
    description: "Time: 2023-06-13 23:55 || Trust Level: 68%",
  },
  {
    coordinate: {
      latitude: 34.032235,
      longitude: -118.188683,
    },
    title: "Suspicious Activity",
    description: "Time: 2023-06-12 07:15 || Trust Level: 72%",
  }
];

