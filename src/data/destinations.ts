
export type Destination = {
  id: string;
  name: string;
  state: string;
  region: string;
  description: string;
  image: string;
  emoji: string;
  difficulty: string;
  missions: number;
  color: string;
  city: string;
  latitude: number;
  longitude: number;
  facts: string[];
};

export const destinations: Destination[] = [
  {
    id: "charminar",
    name: "Charminar",
    city: "Hyderabad",
    state: "Telangana",
    region: "South",
    description:
      "Discover Hyderabad's iconic monument, its four grand arches, and the stories of the old city.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.DPVOC9X4kH--UoLdg46AEgHaF_?r=0&pid=Api&h=220&P=0",
    emoji: "🏛️",
    difficulty: "Easy",
    missions: 3,
    color: "peach",
    latitude: 17.3616,
    longitude: 78.4747,
    facts: [
      "Charminar was built in 1591.",
      "Its name means Four Minarets.",
      "It is a major landmark in Hyderabad's Old City.",
    ],
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    city: "Agra",
    state: "Uttar Pradesh",
    region: "North",
    description:
      "Explore the marble masterpiece of Agra and uncover the history behind its remarkable architecture.",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=85",
    emoji: "🕌",
    difficulty: "Easy",
    missions: 4,
    color: "lavender",
    latitude: 27.1751,
    longitude: 78.0421,
    facts: [
      "The Taj Mahal was commissioned by Mughal emperor Shah Jahan.",
      "It is located in Agra, Uttar Pradesh.",
      "UNESCO lists it as a World Heritage Site.",
    ],
  },
  {
    id: "hampi",
    name: "Hampi",
    city: "Hampi",
    state: "Karnataka",
    region: "South",
    description:
      "Journey through ancient temple ruins, stone chariots, and the legacy of the Vijayanagara Empire.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.vREWBKl81RBhfJ2lZ75X6AHaE8?r=0&pid=Api&h=220&P=0",
    emoji: "🗿",
    difficulty: "Medium",
    missions: 5,
    color: "mint",
    latitude: 15.335,
    longitude: 76.46,
    facts: [
      "Hampi was a major centre of the Vijayanagara Empire.",
      "Its landscape includes temples, ruins, and large boulders.",
      "The Group of Monuments at Hampi is a UNESCO World Heritage Site.",
    ],
  },
  {
    id: "golconda-fort",
    name: "Golconda Fort",
    city: "Hyderabad",
    state: "Telangana",
    region: "South",
    description:
      "Uncover the secrets of a mighty fort known for its grand gateways, walls, and acoustic design.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.FzotleknOLA3Rzvnud4JxAHaEK?r=0&pid=Api&h=220&P=0",
    emoji: "🏰",
    difficulty: "Medium",
    missions: 4,
    color: "yellow",
    latitude: 17.3833,
    longitude: 78.4011,
    facts: [
      "Golconda Fort is near Hyderabad.",
      "The fort is known for its gateways and defensive walls.",
      "The region was historically associated with the diamond trade.",
    ],
  },
  {
    id: "konark",
    name: "Konark Sun Temple",
    city: "Konark",
    state: "Odisha",
    region: "East",
    description:
      "Explore the celebrated Sun Temple, designed in the form of a magnificent stone chariot.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.Iw5ZWnJqPiMhM3Ul_efKgwHaE8?r=0&pid=Api&h=220&P=0",
    emoji: "☀️",
    difficulty: "Medium",
    missions: 4,
    color: "blue",
    latitude: 19.8876,
    longitude: 86.0945,
    facts: [
      "The temple is dedicated to Surya, the Sun God.",
      "Its design represents a large stone chariot.",
      "The Konark Sun Temple is a UNESCO World Heritage Site.",
    ],
  },
  {
    id: "red-fort",
    name: "Red Fort",
    city: "Delhi",
    state: "Delhi",
    region: "North",
    description:
      "Step into the history of the Mughal-era fort and learn about its place in India's story.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.Yh6TG_f2x5ZSitGBa99mGgHaEo?r=0&pid=Api&h=220&P=0",
    emoji: "🧱",
    difficulty: "Easy",
    missions: 3,
    color: "pink",
    latitude: 28.6562,
    longitude: 77.241,
    facts: [
      "The Red Fort is in Old Delhi.",
      "It was commissioned by Mughal emperor Shah Jahan.",
      "India's Independence Day address is delivered from the fort's ramparts.",
    ],
  },
  {
    id: "gateway-of-india",
    name: "Gateway of India",
    city: "Mumbai",
    state: "Maharashtra",
    region: "West",
    description:
      "Explore Mumbai's iconic waterfront monument and discover its history.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.ZyjBqADF1leQRZduoPAxEgHaEo?r=0&pid=Api&h=220&P=0",
    emoji: "🏛️",
    difficulty: "Easy",
    missions: 3,
    color: "peach",
    latitude: 18.922,
    longitude: 72.8347,
    facts: [
      "The Gateway of India overlooks the Arabian Sea.",
      "It was completed in 1924.",
      "It is one of Mumbai's best-known landmarks.",
    ],
  },
  {
    id: "ajanta-caves",
    name: "Ajanta Caves",
    city: "Ajanta",
    state: "Maharashtra",
    region: "West",
    description:
      "Discover ancient Buddhist caves decorated with paintings and sculptures.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.XJuV3yJt3JLL6cWmLGftTwHaE8?r=0&pid=Api&h=220&P=0",
    emoji: "🪨",
    difficulty: "Medium",
    missions: 4,
    color: "mint",
    latitude: 20.5519,
    longitude: 75.7033,
    facts: [
      "The caves contain Buddhist religious art.",
      "Many caves feature paintings and sculptures.",
      "Ajanta is a UNESCO World Heritage Site.",
    ],
  },
  {
    id: "sanchi-stupa",
    name: "Sanchi Stupa",
    city: "Sanchi",
    state: "Madhya Pradesh",
    region: "Central",
    description:
      "Explore an important Buddhist monument and its beautifully carved gateways.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.kviwEWzkTpINONsCWh8jGAHaE8?r=0&pid=Api&h=220&P=0",
    emoji: "🛕",
    difficulty: "Easy",
    missions: 3,
    color: "yellow",
    latitude: 23.4793,
    longitude: 77.7397,
    facts: [
      "Sanchi is an important Buddhist heritage site.",
      "The Great Stupa was originally commissioned by Ashoka.",
      "Sanchi is a UNESCO World Heritage Site.",
    ],
  },
  {
    id: "khajuraho",
    name: "Khajuraho Temples",
    city: "Khajuraho",
    state: "Madhya Pradesh",
    region: "Central",
    description:
      "Discover historic temples known for intricate carvings and distinctive architecture.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.aEk30Px9nw6mrOj4nXhpWwHaE8?r=0&pid=Api&h=220&P=0",
    emoji: "🛕",
    difficulty: "Medium",
    missions: 4,
    color: "lavender",
    latitude: 24.8318,
    longitude: 79.9199,
    facts: [
      "The temples were built by the Chandela dynasty.",
      "The temple complex is famous for its sculptures.",
      "The Khajuraho Group of Monuments is a UNESCO World Heritage Site.",
    ],
  },
];
