
export interface Challenge {
  id: string;
  destinationId: string;
  levelNumber: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface HeritageLevel {
  destinationId: string;
  levelNumber: number;
  title: string;
}

export const heritageLevels: HeritageLevel[] = [
  // CHARMINAR
  { destinationId: "charminar", levelNumber: 1, title: "The Four Arches" },
  { destinationId: "charminar", levelNumber: 2, title: "Hyderabad's History" },
  { destinationId: "charminar", levelNumber: 3, title: "Architecture Explorer" },

  // TAJ MAHAL
  { destinationId: "taj-mahal", levelNumber: 1, title: "The Marble Wonder" },
  { destinationId: "taj-mahal", levelNumber: 2, title: "The Mughal Story" },
  { destinationId: "taj-mahal", levelNumber: 3, title: "Gardens and Design" },
  { destinationId: "taj-mahal", levelNumber: 4, title: "Taj Challenge" },

  // HAMPI
  { destinationId: "hampi", levelNumber: 1, title: "The Lost Kingdom" },
  { destinationId: "hampi", levelNumber: 2, title: "Stone Chariot" },
  { destinationId: "hampi", levelNumber: 3, title: "Temple Explorer" },
  { destinationId: "hampi", levelNumber: 4, title: "Ancient Architecture" },
  { destinationId: "hampi", levelNumber: 5, title: "Vijayanagara Challenge" },

  // GOLCONDA FORT
  { destinationId: "golconda-fort", levelNumber: 1, title: "The Mighty Fort" },
  { destinationId: "golconda-fort", levelNumber: 2, title: "Acoustic Secrets" },
  { destinationId: "golconda-fort", levelNumber: 3, title: "Fort Defences" },
  { destinationId: "golconda-fort", levelNumber: 4, title: "Golconda Challenge" },

  // KONARK SUN TEMPLE
  { destinationId: "konark", levelNumber: 1, title: "The Stone Chariot" },
  { destinationId: "konark", levelNumber: 2, title: "Sun Temple Stories" },
  { destinationId: "konark", levelNumber: 3, title: "Sculpture Explorer" },
  { destinationId: "konark", levelNumber: 4, title: "Konark Challenge" },

  // RED FORT
  { destinationId: "red-fort", levelNumber: 1, title: "The Red Walls" },
  { destinationId: "red-fort", levelNumber: 2, title: "Mughal Delhi" },
  { destinationId: "red-fort", levelNumber: 3, title: "Independence Story" },

  // GATEWAY OF INDIA
  { destinationId: "gateway-of-india", levelNumber: 1, title: "The Waterfront Arch" },
  { destinationId: "gateway-of-india", levelNumber: 2, title: "Mumbai's History" },
  { destinationId: "gateway-of-india", levelNumber: 3, title: "Gateway Challenge" },

  // AJANTA CAVES
  { destinationId: "ajanta-caves", levelNumber: 1, title: "Buddhist Cave Stories" },
  { destinationId: "ajanta-caves", levelNumber: 2, title: "Ancient Paintings" },
  { destinationId: "ajanta-caves", levelNumber: 3, title: "Rock-Cut Wonders" },
  { destinationId: "ajanta-caves", levelNumber: 4, title: "Ajanta Challenge" },

  // SANCHI STUPA
  { destinationId: "sanchi-stupa", levelNumber: 1, title: "The Great Stupa" },
  { destinationId: "sanchi-stupa", levelNumber: 2, title: "Carved Gateways" },
  { destinationId: "sanchi-stupa", levelNumber: 3, title: "Buddhist Heritage" },

  // KHAJURAHO
  { destinationId: "khajuraho", levelNumber: 1, title: "Temple Architecture" },
  { destinationId: "khajuraho", levelNumber: 2, title: "Intricate Carvings" },
  { destinationId: "khajuraho", levelNumber: 3, title: "The Chandela Dynasty" },
  { destinationId: "khajuraho", levelNumber: 4, title: "Khajuraho Challenge" },
];

export const challenges: Challenge[] = [
  // CHARMINAR
  {
    id: "charminar-1",
    destinationId: "charminar",
    levelNumber: 1,
    question: "In which city is Charminar located?",
    options: ["Hyderabad", "Delhi", "Jaipur", "Mumbai"],
    correctAnswer: 0,
    explanation: "Charminar is one of Hyderabad's best-known landmarks.",
  },
  {
    id: "charminar-2",
    destinationId: "charminar",
    levelNumber: 2,
    question: "Charminar is traditionally associated with which ruler?",
    options: ["Akbar", "Muhammad Quli Qutb Shah", "Shah Jahan", "Ashoka"],
    correctAnswer: 1,
    explanation: "Muhammad Quli Qutb Shah founded Hyderabad and is associated with Charminar's construction.",
  },
  {
    id: "charminar-3",
    destinationId: "charminar",
    levelNumber: 3,
    question: "What does the name Charminar mean?",
    options: ["Four gardens", "Four minarets", "Four palaces", "Four rivers"],
    correctAnswer: 1,
    explanation: "Charminar means 'four minarets'.",
  },

  // TAJ MAHAL
  {
    id: "taj-mahal-1",
    destinationId: "taj-mahal",
    levelNumber: 1,
    question: "Where is the Taj Mahal located?",
    options: ["Agra", "Lucknow", "Delhi", "Bhopal"],
    correctAnswer: 0,
    explanation: "The Taj Mahal stands in Agra, Uttar Pradesh.",
  },
  {
    id: "taj-mahal-2",
    destinationId: "taj-mahal",
    levelNumber: 2,
    question: "Which Mughal emperor commissioned the Taj Mahal?",
    options: ["Akbar", "Babur", "Shah Jahan", "Aurangzeb"],
    correctAnswer: 2,
    explanation: "Shah Jahan commissioned it in memory of Mumtaz Mahal.",
  },
  {
    id: "taj-mahal-3",
    destinationId: "taj-mahal",
    levelNumber: 3,
    question: "Which material is especially famous in the Taj Mahal's exterior?",
    options: ["Red sandstone", "White marble", "Granite", "Brick"],
    correctAnswer: 1,
    explanation: "The monument is renowned for its white marble.",
  },
  {
    id: "taj-mahal-4",
    destinationId: "taj-mahal",
    levelNumber: 4,
    question: "Which river flows near the Taj Mahal?",
    options: ["Ganga", "Yamuna", "Godavari", "Narmada"],
    correctAnswer: 1,
    explanation: "The Taj Mahal is situated beside the Yamuna River.",
  },

  // HAMPI
  {
    id: "hampi-1",
    destinationId: "hampi",
    levelNumber: 1,
    question: "Hampi was a major centre of which empire?",
    options: ["Maurya", "Vijayanagara", "Gupta", "Chola"],
    correctAnswer: 1,
    explanation: "Hampi was the capital region of the Vijayanagara Empire.",
  },
  {
    id: "hampi-2",
    destinationId: "hampi",
    levelNumber: 2,
    question: "What is the famous Stone Chariot at Hampi associated with?",
    options: ["Vittala Temple", "Golconda Fort", "Sanchi Stupa", "Red Fort"],
    correctAnswer: 0,
    explanation: "The Stone Chariot is a celebrated feature of the Vittala Temple complex.",
  },
  {
    id: "hampi-3",
    destinationId: "hampi",
    levelNumber: 3,
    question: "In which Indian state is Hampi?",
    options: ["Kerala", "Karnataka", "Odisha", "Telangana"],
    correctAnswer: 1,
    explanation: "Hampi is in Karnataka.",
  },
  {
    id: "hampi-4",
    destinationId: "hampi",
    levelNumber: 4,
    question: "What is Hampi especially known for today?",
    options: ["Ancient ruins and temples", "Modern skyscrapers", "Snow forts", "Coral reefs"],
    correctAnswer: 0,
    explanation: "Hampi preserves extensive ruins, temples and monuments.",
  },
  {
    id: "hampi-5",
    destinationId: "hampi",
    levelNumber: 5,
    question: "Which landscape feature is common around Hampi?",
    options: ["Rocky boulder hills", "Glaciers", "Sand dunes", "Mangrove swamps"],
    correctAnswer: 0,
    explanation: "Hampi is known for its striking rocky, boulder-strewn landscape.",
  },

  // GOLCONDA FORT — LEVEL 1
  {
    id: "golconda-1",
    destinationId: "golconda-fort",
    levelNumber: 1,
    question: "Near which city is Golconda Fort located?",
    options: ["Hyderabad", "Mumbai", "Jaipur", "Chennai"],
    correctAnswer: 0,
    explanation: "Golconda Fort is located near Hyderabad in Telangana.",
  },
  {
    id: "golconda-2",
    destinationId: "golconda-fort",
    levelNumber: 1,
    question: "What is Golconda Fort primarily known as?",
    options: ["A hilltop fortress", "A seaside palace", "A Buddhist monastery", "A modern museum"],
    correctAnswer: 0,
    explanation: "Golconda is a historic fortress complex built on and around a granite hill.",
  },
  {
    id: "golconda-3",
    destinationId: "golconda-fort",
    levelNumber: 1,
    question: "Which Indian state is home to Golconda Fort?",
    options: ["Telangana", "Kerala", "Punjab", "Odisha"],
    correctAnswer: 0,
    explanation: "Golconda Fort is in Telangana.",
  },

  // GOLCONDA FORT — LEVEL 2
  {
    id: "golconda-4",
    destinationId: "golconda-fort",
    levelNumber: 2,
    question: "What unusual feature is Golconda Fort famous for?",
    options: ["Acoustic communication", "Floating walls", "Underground railway", "Glass bridges"],
    correctAnswer: 0,
    explanation: "Certain areas are known for carrying sounds over long distances.",
  },
  {
    id: "golconda-5",
    destinationId: "golconda-fort",
    levelNumber: 2,
    question: "What does 'acoustic' relate to?",
    options: ["Sound", "Light", "Water", "Stone colour"],
    correctAnswer: 0,
    explanation: "Acoustics is the study of sound and how it travels.",
  },
  {
    id: "golconda-6",
    destinationId: "golconda-fort",
    levelNumber: 2,
    question: "Why was sound transmission useful in a fortress?",
    options: ["To communicate warnings", "To grow crops", "To light lamps", "To make coins"],
    correctAnswer: 0,
    explanation: "Sound could help communicate messages or warnings within the fort.",
  },

  // GOLCONDA FORT — LEVEL 3
  {
    id: "golconda-7",
    destinationId: "golconda-fort",
    levelNumber: 3,
    question: "Why did historic forts have thick defensive walls?",
    options: ["To resist attacks", "To collect rainbows", "To support trees only", "To store boats"],
    correctAnswer: 0,
    explanation: "Strong walls helped protect the fort and its inhabitants from attacks.",
  },
  {
    id: "golconda-8",
    destinationId: "golconda-fort",
    levelNumber: 3,
    question: "What is a gateway in a fort?",
    options: ["A controlled entrance", "A water tank", "A royal crown", "A prayer book"],
    correctAnswer: 0,
    explanation: "Fort gateways controlled entry and could be designed for defence.",
  },
  {
    id: "golconda-9",
    destinationId: "golconda-fort",
    levelNumber: 3,
    question: "Which material is prominent in the landscape around Golconda Fort?",
    options: ["Granite", "Ice", "Coral", "Chalk only"],
    correctAnswer: 0,
    explanation: "Golconda Fort stands amid the granite rock formations of the region.",
  },

  // GOLCONDA FORT — LEVEL 4
  {
    id: "golconda-10",
    destinationId: "golconda-fort",
    levelNumber: 4,
    question: "Golconda's history is closely associated with which trade?",
    options: ["Diamond trade", "Silk farming only", "Tea plantations", "Petroleum refining"],
    correctAnswer: 0,
    explanation: "The Golconda region became renowned for its historic diamond trade.",
  },
  {
    id: "golconda-11",
    destinationId: "golconda-fort",
    levelNumber: 4,
    question: "Which feature helped make Golconda a strong defensive site?",
    options: ["Elevated rocky terrain", "A surrounding glacier", "A coral reef", "A floating platform"],
    correctAnswer: 0,
    explanation: "The elevated rocky terrain helped defenders observe and protect approaches.",
  },
  {
    id: "golconda-12",
    destinationId: "golconda-fort",
    levelNumber: 4,
    question: "Which city should you visit to explore Golconda Fort?",
    options: ["Hyderabad", "Kolkata", "Shimla", "Patna"],
    correctAnswer: 0,
    explanation: "Golconda Fort is a major historic attraction in Hyderabad.",
  },

  // KONARK SUN TEMPLE
  {
    id: "konark-1",
    destinationId: "konark",
    levelNumber: 1,
    question: "In which state is the Konark Sun Temple?",
    options: ["Odisha", "Punjab", "Gujarat", "Assam"],
    correctAnswer: 0,
    explanation: "Konark Sun Temple is in Odisha.",
  },
  {
    id: "konark-2",
    destinationId: "konark",
    levelNumber: 2,
    question: "The temple is designed in the form of what?",
    options: ["A stone chariot", "A ship", "A lotus pond", "A mountain cave"],
    correctAnswer: 0,
    explanation: "The temple represents the chariot of the Sun God.",
  },
  {
    id: "konark-3",
    destinationId: "konark",
    levelNumber: 3,
    question: "Which deity is the temple dedicated to?",
    options: ["Surya, the Sun God", "Shiva only", "Indra only", "Agni only"],
    correctAnswer: 0,
    explanation: "The temple is dedicated to Surya.",
  },
  {
    id: "konark-4",
    destinationId: "konark",
    levelNumber: 4,
    question: "What is Konark especially admired for?",
    options: ["Stone carvings and architecture", "Modern glass walls", "Wooden skyscrapers", "Ice sculptures"],
    correctAnswer: 0,
    explanation: "Its sculptural detail and monumental architecture are widely celebrated.",
  },

  // RED FORT
  {
    id: "red-fort-1",
    destinationId: "red-fort",
    levelNumber: 1,
    question: "Where is the Red Fort located?",
    options: ["Delhi", "Mumbai", "Hyderabad", "Mysuru"],
    correctAnswer: 0,
    explanation: "The Red Fort is in Old Delhi.",
  },
  {
    id: "red-fort-2",
    destinationId: "red-fort",
    levelNumber: 2,
    question: "Which Mughal emperor commissioned the Red Fort in Delhi?",
    options: ["Shah Jahan", "Akbar", "Babur", "Humayun"],
    correctAnswer: 0,
    explanation: "Shah Jahan commissioned the Red Fort when he established Shahjahanabad.",
  },
  {
    id: "red-fort-3",
    destinationId: "red-fort",
    levelNumber: 3,
    question: "On which national day does India's Prime Minister traditionally address the nation from the Red Fort?",
    options: ["Independence Day", "Republic Day", "Gandhi Jayanti", "Constitution Day"],
    correctAnswer: 0,
    explanation: "The Prime Minister delivers the Independence Day address from the Red Fort.",
  },

  // GATEWAY OF INDIA
  {
    id: "gateway-of-india-1",
    destinationId: "gateway-of-india",
    levelNumber: 1,
    question: "In which city is the Gateway of India?",
    options: ["Mumbai", "Kochi", "Pune", "Chennai"],
    correctAnswer: 0,
    explanation: "The Gateway of India stands on Mumbai's waterfront.",
  },
  {
    id: "gateway-of-india-2",
    destinationId: "gateway-of-india",
    levelNumber: 2,
    question: "The Gateway of India overlooks which body of water?",
    options: ["Arabian Sea", "Bay of Bengal", "Dal Lake", "Chilika Lake"],
    correctAnswer: 0,
    explanation: "It stands beside the Arabian Sea in Mumbai.",
  },
  {
    id: "gateway-of-india-3",
    destinationId: "gateway-of-india",
    levelNumber: 3,
    question: "The Gateway of India commemorates the 1911 visit of which British monarch?",
    options: ["George V", "Edward VIII", "Henry VIII", "Charles II"],
    correctAnswer: 0,
    explanation: "It commemorates the visit of King George V and Queen Mary to India in 1911.",
  },

  // AJANTA CAVES — LEVEL 1
  {
    id: "ajanta-1",
    destinationId: "ajanta-caves",
    levelNumber: 1,
    question: "Ajanta Caves are especially associated with which religion?",
    options: ["Buddhism", "Sikhism", "Zoroastrianism", "Shinto"],
    correctAnswer: 0,
    explanation: "Ajanta preserves important Buddhist monuments, paintings and sculptures.",
  },
  {
    id: "ajanta-2",
    destinationId: "ajanta-caves",
    levelNumber: 1,
    question: "In which Indian state are Ajanta Caves located?",
    options: ["Maharashtra", "Rajasthan", "Kerala", "Bihar"],
    correctAnswer: 0,
    explanation: "Ajanta Caves are located in Maharashtra.",
  },
  {
    id: "ajanta-3",
    destinationId: "ajanta-caves",
    levelNumber: 1,
    question: "What type of historic site are the Ajanta Caves?",
    options: ["Rock-cut caves", "Floating palaces", "Desert forts", "Seaside lighthouses"],
    correctAnswer: 0,
    explanation: "The caves were excavated into rock and developed as Buddhist religious spaces.",
  },

  // AJANTA CAVES — LEVEL 2
  {
    id: "ajanta-4",
    destinationId: "ajanta-caves",
    levelNumber: 2,
    question: "What makes Ajanta especially famous in the world of art?",
    options: ["Ancient paintings", "Modern neon signs", "Glass mosaics from today", "Printed posters"],
    correctAnswer: 0,
    explanation: "Ajanta is renowned for its ancient murals and Buddhist artistic traditions.",
  },
  {
    id: "ajanta-5",
    destinationId: "ajanta-caves",
    levelNumber: 2,
    question: "Many Ajanta paintings illustrate stories connected with which figure?",
    options: ["Buddha", "Julius Caesar", "Napoleon", "Christopher Columbus"],
    correctAnswer: 0,
    explanation: "Many paintings depict the Buddha and stories associated with Buddhist tradition.",
  },
  {
    id: "ajanta-6",
    destinationId: "ajanta-caves",
    levelNumber: 2,
    question: "Which other art form can visitors see at Ajanta besides paintings?",
    options: ["Sculpture", "Digital billboards", "Steel machinery", "Animated screens"],
    correctAnswer: 0,
    explanation: "The caves contain sculptures as well as paintings and architectural features.",
  },

  // AJANTA CAVES — LEVEL 3
  {
    id: "ajanta-7",
    destinationId: "ajanta-caves",
    levelNumber: 3,
    question: "What does 'rock-cut architecture' mean?",
    options: ["Structures carved from natural rock", "Buildings made only of glass", "Houses built on boats", "Structures made of ice"],
    correctAnswer: 0,
    explanation: "Rock-cut architecture is created by excavating and shaping natural rock.",
  },
  {
    id: "ajanta-8",
    destinationId: "ajanta-caves",
    levelNumber: 3,
    question: "What were many Ajanta caves used for?",
    options: ["Buddhist worship and monastic life", "Modern shopping malls", "Railway stations", "Royal cricket grounds"],
    correctAnswer: 0,
    explanation: "The caves served religious and monastic purposes for Buddhist communities.",
  },
  {
    id: "ajanta-9",
    destinationId: "ajanta-caves",
    levelNumber: 3,
    question: "What material forms the main structure of the Ajanta Caves?",
    options: ["Rock", "Plastic", "Iron sheets", "Glass blocks"],
    correctAnswer: 0,
    explanation: "The caves were excavated directly into rock.",
  },

  // AJANTA CAVES — LEVEL 4
  {
    id: "ajanta-10",
    destinationId: "ajanta-caves",
    levelNumber: 4,
    question: "Which international organisation lists Ajanta as a World Heritage Site?",
    options: ["UNESCO", "FIFA", "WTO", "OPEC"],
    correctAnswer: 0,
    explanation: "Ajanta Caves are recognised as a UNESCO World Heritage Site.",
  },
  {
    id: "ajanta-11",
    destinationId: "ajanta-caves",
    levelNumber: 4,
    question: "Why are Ajanta's paintings historically valuable?",
    options: ["They preserve ancient artistic and religious traditions", "They record modern traffic rules", "They show the first aeroplanes", "They are printed advertisements"],
    correctAnswer: 0,
    explanation: "The paintings offer insight into historic art, beliefs and cultural life.",
  },
  {
    id: "ajanta-12",
    destinationId: "ajanta-caves",
    levelNumber: 4,
    question: "Which pair best describes Ajanta's heritage?",
    options: ["Buddhist art and rock-cut architecture", "Modern factories and airports", "Ice sculpture and skiing", "Space technology and robotics"],
    correctAnswer: 0,
    explanation: "Ajanta is celebrated for Buddhist art and its remarkable rock-cut caves.",
  },

  // SANCHI STUPA — LEVEL 1
  {
    id: "sanchi-1",
    destinationId: "sanchi-stupa",
    levelNumber: 1,
    question: "Sanchi Stupa is most closely associated with which religion?",
    options: ["Buddhism", "Christianity", "Sikhism", "Judaism"],
    correctAnswer: 0,
    explanation: "Sanchi is one of India's most important Buddhist heritage sites.",
  },
  {
    id: "sanchi-2",
    destinationId: "sanchi-stupa",
    levelNumber: 1,
    question: "Who originally commissioned the Great Stupa at Sanchi?",
    options: ["Emperor Ashoka", "Shah Jahan", "Akbar", "Tipu Sultan"],
    correctAnswer: 0,
    explanation: "The Great Stupa was originally commissioned by Mauryan emperor Ashoka.",
  },
  {
    id: "sanchi-3",
    destinationId: "sanchi-stupa",
    levelNumber: 1,
    question: "In which Indian state is Sanchi located?",
    options: ["Madhya Pradesh", "Telangana", "Tamil Nadu", "Assam"],
    correctAnswer: 0,
    explanation: "Sanchi is located in Madhya Pradesh.",
  },

  // SANCHI STUPA — LEVEL 2
  {
    id: "sanchi-4",
    destinationId: "sanchi-stupa",
    levelNumber: 2,
    question: "What is a torana at Sanchi?",
    options: ["A carved ceremonial gateway", "A water wheel", "A royal throne", "A musical instrument"],
    correctAnswer: 0,
    explanation: "Toranas are the elaborately carved gateways associated with the Great Stupa.",
  },
  {
    id: "sanchi-5",
    destinationId: "sanchi-stupa",
    levelNumber: 2,
    question: "What can visitors see carved on Sanchi's gateways?",
    options: ["Scenes and symbols from Buddhist traditions", "Modern train timetables", "Electronic circuits", "Maps of the Moon"],
    correctAnswer: 0,
    explanation: "The gateways contain detailed carvings illustrating Buddhist stories and symbols.",
  },
  {
    id: "sanchi-6",
    destinationId: "sanchi-stupa",
    levelNumber: 2,
    question: "Which material is prominent in the historic monuments at Sanchi?",
    options: ["Stone", "Plastic", "Aluminium foil", "Fibreglass"],
    correctAnswer: 0,
    explanation: "Stone was an important material used in Sanchi's monuments and carvings.",
  },

  // SANCHI STUPA — LEVEL 3
  {
    id: "sanchi-7",
    destinationId: "sanchi-stupa",
    levelNumber: 3,
    question: "What is a stupa traditionally associated with?",
    options: ["Buddhist religious practice and relics", "Royal shipbuilding", "Modern sports", "Mining machinery"],
    correctAnswer: 0,
    explanation: "Stupas are Buddhist monuments associated with worship and, in some cases, sacred relics.",
  },
  {
    id: "sanchi-8",
    destinationId: "sanchi-stupa",
    levelNumber: 3,
    question: "Which organisation recognises Sanchi as a World Heritage Site?",
    options: ["UNESCO", "FIFA", "NASA", "OPEC"],
    correctAnswer: 0,
    explanation: "The Buddhist Monuments at Sanchi are recognised by UNESCO.",
  },
  {
    id: "sanchi-9",
    destinationId: "sanchi-stupa",
    levelNumber: 3,
    question: "Which emperor helped spread Buddhism and is linked to Sanchi's early history?",
    options: ["Ashoka", "Aurangzeb", "Akbar", "Shah Jahan"],
    correctAnswer: 0,
    explanation: "Mauryan emperor Ashoka played a major role in spreading Buddhism and is linked to Sanchi's early development.",
  },

  // KHAJURAHO
  {
    id: "khajuraho-1",
    destinationId: "khajuraho",
    levelNumber: 1,
    question: "Khajuraho is located in which state?",
    options: ["Madhya Pradesh", "Uttar Pradesh", "Gujarat", "Andhra Pradesh"],
    correctAnswer: 0,
    explanation: "Khajuraho is in Madhya Pradesh.",
  },
  {
    id: "khajuraho-2",
    destinationId: "khajuraho",
    levelNumber: 2,
    question: "Khajuraho's temples are especially known for what?",
    options: ["Intricate sculptures and carvings", "Huge modern paintings", "Bronze ships", "Glass skyscrapers"],
    correctAnswer: 0,
    explanation: "The temples are famous for detailed sculptural decoration.",
  },
  {
    id: "khajuraho-3",
    destinationId: "khajuraho",
    levelNumber: 3,
    question: "Which dynasty built many of Khajuraho's famous temples?",
    options: ["Chandela", "Maurya", "Pallava", "Satavahana"],
    correctAnswer: 0,
    explanation: "The Chandela rulers built many of the surviving temples.",
  },
  {
    id: "khajuraho-4",
    destinationId: "khajuraho",
    levelNumber: 4,
    question: "Khajuraho's historic temples include temples dedicated to which traditions?",
    options: ["Hindu and Jain", "Only Greek gods", "Only Roman gods", "Only Sikh gurus"],
    correctAnswer: 0,
    explanation: "The surviving temple groups include both Hindu and Jain temples.",
  },
];

export function getChallenges(
  destinationId: string,
  levelNumber = 1
): Challenge[] {
  const levelQuestions = challenges.filter(
    (challenge) =>
      challenge.destinationId === destinationId &&
      challenge.levelNumber === levelNumber
  );

  const shuffled = [...levelQuestions];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, 5);
}

export function getLevels(destinationId: string): HeritageLevel[] {
  return heritageLevels.filter(
    (level) => level.destinationId === destinationId
  );
}
