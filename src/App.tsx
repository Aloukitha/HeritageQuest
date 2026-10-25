
import { useEffect, useMemo, useState } from "react";
import {
  Compass,
  MapPin,
  Search,
  Trophy,
  Sparkles,
  Star,
  Flame,
  ChevronRight,
  CircleCheck,
  Menu,
  X,
  Medal,
  Globe2,
} from "lucide-react";

import "./index.css";

import { destinations, type Destination } from "./data/destinations";
import { getLevels } from "./data/challenges";

import AuthPage from "./components/AuthPage";
import HeritageMap from "./components/HeritageMap";
import DestinationDetails from "./components/DestinationDetails";
import ChallengePage from "./components/ChallengePage";
import AdventurePath from "./components/AdventurePath";

import type { QuizResult } from "./lib/gameLogic";


import {
  loadProgress,
  saveProgress,
  type LevelProgress,
} from "./lib/progress";


import { supabase, supabaseReady } from "./lib/supabase";

const filters = ["All", "North", "South", "East", "West", "Central"];

function getDestinationRegion(destination: Destination): string {
  if (destination.region) {
    return destination.region;
  }

  const state = destination.state.toLowerCase();

  const northStates = [
    "jammu and kashmir",
    "ladakh",
    "himachal pradesh",
    "punjab",
    "haryana",
    "uttarakhand",
  ];

  const southStates = [
    "andhra pradesh",
    "telangana",
    "karnataka",
    "kerala",
    "tamil nadu",
  ];

  const eastStates = [
    "bihar",
    "jharkhand",
    "odisha",
    "west bengal",
    "sikkim",
  ];

  const westStates = [
    "goa",
    "gujarat",
    "maharashtra",
    "rajasthan",
  ];

  const centralStates = [
    "madhya pradesh",
    "chhattisgarh",
    "uttar pradesh",
  ];

  if (northStates.some((item) => state.includes(item))) {
    return "North";
  }

  if (southStates.some((item) => state.includes(item))) {
    return "South";
  }

  if (eastStates.some((item) => state.includes(item))) {
    return "East";
  }

  if (westStates.some((item) => state.includes(item))) {
    return "West";
  }

  if (centralStates.some((item) => state.includes(item))) {
    return "Central";
  }

  return "All";
}

function App() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [selected, setSelected] = useState<Destination | null>(null);
  const [page, setPage] = useState("Explore");
  const [mobileMenu, setMobileMenu] = useState(false);

  // Authentication state
  const [authLoading, setAuthLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Quiz state
  const [quizDestinationId, setQuizDestinationId] =
    useState<string | null>(null);
  const [quizLevelNumber, setQuizLevelNumber] = useState(1);
  const [quizNotice, setQuizNotice] = useState("");

  // Player progress
  const [progress, setProgress] = useState<LevelProgress[]>([]);

  // Check the current Supabase login session.
  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    let active = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;

      setUserId(session?.user.id ?? null);
      setUserEmail(session?.user.email ?? null);
      setAuthLoading(false);
    });

    async function restoreSession() {
      try {
        const {
          data: { session },
          error,
        } = await supabase!.auth.getSession();

        if (error) throw error;

        if (active) {
          setUserId(session?.user.id ?? null);
          setUserEmail(session?.user.email ?? null);
          setAuthLoading(false);
        }
      } catch (error) {
        console.error("Could not restore login session:", error);

        if (active) {
          setAuthLoading(false);
        }
      }
    }

    void restoreSession();

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  // Load local progress first, then merge it with cloud progress.
 
  // Load only the progress belonging to the signed-in account.
  useEffect(() => {
    let active = true;

    // Clear progress from the previous account immediately.
    setProgress([]);

    async function fetchProgress() {
      if (!userId || !supabaseReady || !supabase) {
        return;
      }

      try {
        const accountProgress = await loadProgress(userId);

        if (active) {
          setProgress(
            accountProgress.filter(
              (item) => item.user_id === userId
            )
          );
        }
      } catch (error) {
        console.error("Could not load cloud progress:", error);

        if (active) {
          setProgress([]);
        }
      }
    }

    void fetchProgress();

    return () => {
      active = false;
    };
  }, [userId]);


  // Calculate XP from completed missions.
  const totalXp = progress
    .filter((item) => item.completed)
    .reduce((total, item) => total + item.best_score, 0);

  // Calculate the number of configured levels.
  const totalLevels = destinations.reduce(
    (total, destination) =>
      total + getLevels(destination.id).length,
    0
  );

  // Filter destinations using the search field and region buttons.
  const filteredDestinations = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(searchText) ||
        destination.state.toLowerCase().includes(searchText) ||
        destination.description.toLowerCase().includes(searchText);

      const matchesRegion =
        region === "All" ||
        getDestinationRegion(destination) === region;

      return matchesSearch && matchesRegion;
    });
  }, [search, region]);

  // Clear the active quiz when navigating to another page.
  function navigate(nextPage: string) {
    setPage(nextPage);
    setSelected(null);
    setQuizDestinationId(null);
    setQuizLevelNumber(1);
    setQuizNotice("");
    setMobileMenu(false);
    setSearch("");
    setRegion("All");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Start the first configured level for a destination.
  function startAdventure(destination: Destination) {
    const levels = getLevels(destination.id);

    if (levels.length === 0) {
      setSelected(destination);
      setQuizNotice(
        `No challenges are configured for ${destination.name} yet.`
      );
      return;
    }

    startLevel(destination, levels[0].levelNumber);
  }

  // Start a specific configured level.
  function startLevel(
    destination: Destination,
    levelNumber: number
  ) {
    const levels = getLevels(destination.id);
    const levelExists = levels.some(
      (level) => level.levelNumber === levelNumber
    );

    if (!levelExists) {
      setQuizNotice(
        `Level ${levelNumber} is not configured for ${destination.name}.`
      );
      return;
    }

    setSelected(null);
    setPage("Explore");
    setQuizDestinationId(destination.id);
    setQuizLevelNumber(levelNumber);
    setQuizNotice("");
    setMobileMenu(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Exit the quiz and return to Explore.
  function exitQuiz() {
    setQuizDestinationId(null);
    setQuizLevelNumber(1);
    setQuizNotice("");
    setSelected(null);
    setPage("Explore");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Save progress locally first, then sync with Supabase.
  
  // Save completed levels to the currently signed-in account.
  async function handleQuizComplete(result: QuizResult) {
    if (!supabaseReady || !supabase || !userId) {
      setQuizNotice(
        "Please sign in to save your progress to your account."
      );
      return;
    }

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;

      // Confirm the active session belongs to this account.
      if (!user || user.id !== userId) {
        setProgress([]);
        setQuizNotice(
          "Your login session changed. Please sign in again."
        );
        return;
      }

      await saveProgress(
        user.id,
        result.destinationId,
        result.levelNumber,
        result.score,
        result.stars
      );

      const accountProgress = await loadProgress(user.id);

      setProgress(
        accountProgress.filter(
          (item) => item.user_id === user.id
        )
      );

      setQuizNotice("Progress saved and synced successfully!");
    } catch (error) {
      console.error("Could not save or sync progress:", error);

      setQuizNotice(
        "Cloud saving failed. Please check your connection and try again."
      );
    }
  }


  // Continue to the next configured level, even if level numbers
  // are not consecutive.
  function continueToNextLevel() {
    if (!quizDestinationId) return;

    const levels = getLevels(quizDestinationId).sort(
      (a, b) => a.levelNumber - b.levelNumber
    );

    const nextLevel = levels.find(
      (level) => level.levelNumber > quizLevelNumber
    );

    if (nextLevel) {
      setQuizLevelNumber(nextLevel.levelNumber);
      setQuizNotice("");
      return;
    }

    setQuizDestinationId(null);
    setQuizLevelNumber(1);
    setQuizNotice("");
    setSelected(null);
    setPage("Explore");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Log out the current player.
  async function handleLogout() {
    if (!supabase) return;

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Could not sign out:", error);
    }
  }

  const navItems = ["Home", "Explore", "My Progress"];

  // Show a loading screen while checking the login session.
  if (authLoading) {
    return (
      <div className="auth-page">
        <p>Loading your explorer profile...</p>
      </div>
    );
  }

  // Show login/signup if the player is not signed in.
  if (!userId) {
    return <AuthPage />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          type="button"
          className="brand"
          onClick={() => navigate("Home")}
        >
          <span className="brand-icon">
            <Compass size={25} strokeWidth={2.5} />
          </span>

          <span>
            <span className="brand-name">Heritage Quest</span>
            <span className="brand-caption">
              YOUR STORY. YOUR DISCOVERY.
            </span>
          </span>
        </button>

        {!quizDestinationId && (
          <nav
            className={`nav-links ${mobileMenu ? "nav-open" : ""}`}
          >
            {navItems.map((item) => (
              <button
                type="button"
                key={item}
                className={`nav-link ${
                  page === item ? "active" : ""
                }`}
                onClick={() => navigate(item)}
              >
                {item}
              </button>
            ))}
          </nav>
        )}

        <div className="topbar-right">
          {!quizDestinationId && (
            <>
              <div className="xp-pill">
                <Sparkles size={16} />
                <span>{totalXp} XP</span>
              </div>

              <div
                className="avatar"
                title={userEmail ?? "Explorer profile"}
                aria-label={userEmail ?? "Explorer profile"}
              >
                🧭
              </div>

              <button
                type="button"
                className="nav-link"
                onClick={handleLogout}
              >
                Log out
              </button>

              <button
                type="button"
                className="menu-button"
                aria-label="Toggle navigation"
                aria-expanded={mobileMenu}
                onClick={() => setMobileMenu((open) => !open)}
              >
                {mobileMenu ? <X /> : <Menu />}
              </button>
            </>
          )}
        </div>
      </header>

      <main>
        {quizDestinationId ? (
          <section className="progress-page">
            <button
              type="button"
              className="primary-button"
              onClick={exitQuiz}
              style={{ marginBottom: 20 }}
            >
              ← Back to Explore
            </button>

            <div className="eyebrow">
              <Sparkles size={15} /> YOUR HERITAGE ADVENTURE
            </div>

            <h1>Level {quizLevelNumber}</h1>

            {quizNotice && (
              <p role="status" aria-live="polite">
                {quizNotice}
              </p>
            )}

            <ChallengePage
              key={`${quizDestinationId}-${quizLevelNumber}`}
              destinationId={quizDestinationId}
              levelNumber={quizLevelNumber}
              onComplete={handleQuizComplete}
              onContinue={continueToNextLevel}
            />
          </section>
        ) : (
          <>
            {page === "Home" && (
              <section className="welcome-page">
                <div className="welcome-card">
                  <span className="eyebrow">
                    <Sparkles size={15} /> YOUR NEXT ADVENTURE AWAITS
                  </span>

                  <h1>
                    Every monument
                    <br />
                    has a <span>story.</span>
                  </h1>

                  <p>
                    Discover India's incredible heritage, solve fun
                    challenges, and collect rewards along the way.
                  </p>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => navigate("Explore")}
                  >
                    Start Exploring <ChevronRight size={19} />
                  </button>

                  <div className="welcome-art" aria-hidden="true">
                    🗺️ 🏛️ ✨
                  </div>
                </div>

                <ProgressSummary
                  progress={progress}
                  totalLevels={totalLevels}
                />
              </section>
            )}

            {page === "Explore" && (
              <>
                <section className="hero">
                  <div className="hero-content">
                    <div className="eyebrow">
                      <Sparkles size={15} /> THE WORLD IS YOUR PLAYGROUND
                    </div>

                    <h1>
                      Find your next
                      <br />
                      <span>heritage adventure.</span>
                    </h1>

                    <p>
                      From ancient forts to timeless temples, choose a
                      destination and uncover the stories hidden within.
                    </p>

                    <div className="hero-actions">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() =>
                          document
                            .getElementById("destinations")
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                      >
                        <Compass size={18} /> Explore Destinations
                      </button>

                      <span className="hero-note">
                        <Globe2 size={16} /> Explore at your own pace
                      </span>
                    </div>

                    <div className="hero-stats">
                      <div>
                        <strong>
                          {destinations.length
                            .toString()
                            .padStart(2, "0")}
                        </strong>
                        <span>Destinations</span>
                      </div>

                      <div>
                        <strong>{totalLevels}</strong>
                        <span>Available missions</span>
                      </div>

                      <div>
                        <strong>∞</strong>
                        <span>Ways to explore</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="hero-illustration"
                    aria-hidden="true"
                  >
                    <div className="hero-sun">☀️</div>
                    <div className="hero-cloud cloud-one">☁️</div>
                    <div className="hero-cloud cloud-two">☁️</div>
                    <div className="hero-monument">🏛️</div>
                    <div className="hero-flag">📍</div>
                    <div className="hero-ground" />

                    <div className="floating-note">
                      <span>🏆</span>
                      <div>
                        <strong>Explorer!</strong>
                        <small>Your journey begins</small>
                      </div>
                    </div>
                  </div>
                </section>

                <ProgressSummary
                  progress={progress}
                  totalLevels={totalLevels}
                />

                <AdventurePath
                  destinations={destinations}
                  progress={progress}
                  onStartLevel={startLevel}
                />

                <section
                  className="destination-section"
                  id="destinations"
                >
                  <div className="section-heading">
                    <div>
                      <div className="eyebrow">PICK YOUR PATH</div>
                      <h2>Where will you explore?</h2>
                      <p>
                        Choose any destination. Your adventure, your rules.
                      </p>
                    </div>

                    <span className="count-pill">
                      {filteredDestinations.length} places
                    </span>
                  </div>

                  <div className="search-filter-row">
                    <label className="search-box">
                      <Search size={19} />

                      <input
                        type="search"
                        placeholder="Search monuments or states..."
                        value={search}
                        onChange={(event) =>
                          setSearch(event.target.value)
                        }
                      />

                      {search && (
                        <button
                          type="button"
                          aria-label="Clear search"
                          className="clear-search"
                          onClick={() => setSearch("")}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </label>

                    <div
                      className="filter-list"
                      aria-label="Filter by region"
                    >
                      {filters.map((filter) => (
                        <button
                          type="button"
                          key={filter}
                          className={`filter-chip ${
                            region === filter ? "chosen" : ""
                          }`}
                          onClick={() => setRegion(filter)}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  <HeritageMap
                    destinations={filteredDestinations}
                    onSelectDestination={setSelected}
                  />

                  {selected ? (
                    <DestinationDetails
                      destination={selected}
                      onBack={() => setSelected(null)}
                      onStartAdventure={startAdventure}
                    />
                  ) : (
                    <div className="destination-grid">
                      {filteredDestinations.map((destination) => (
                        <article
                          className="destination-card"
                          key={destination.id}
                        >
                          <button
                            type="button"
                            className="destination-image-button"
                            onClick={() => setSelected(destination)}
                            aria-label={`Explore ${destination.name}`}
                          >
                            <img
                              className="destination-image"
                              src={destination.image}
                              alt={destination.name}
                              loading="lazy"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />

                            <span
                              className={`difficulty ${destination.color}`}
                            >
                              {destination.difficulty}
                            </span>

                            <span className="image-emoji">
                              {destination.emoji}
                            </span>
                          </button>

                          <div className="destination-card-body">
                            <span className="location-line">
                              <MapPin size={14} /> {destination.state}
                            </span>

                            <h3>{destination.name}</h3>
                            <p>{destination.description}</p>

                            <div className="destination-card-footer">
                              <span>
                                🧩 {getLevels(destination.id).length} missions
                              </span>

                              <button
                                type="button"
                                className="round-arrow"
                                aria-label={`Select ${destination.name}`}
                                onClick={() =>
                                  setSelected(destination)
                                }
                              >
                                <ChevronRight size={20} />
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}

                  {filteredDestinations.length === 0 && (
                    <div className="empty-state">
                      <span>🧭</span>
                      <h3>No destinations found</h3>
                      <p>
                        Try another monument name or choose a different
                        region.
                      </p>

                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => {
                          setSearch("");
                          setRegion("All");
                        }}
                      >
                        Show all destinations
                      </button>
                    </div>
                  )}
                </section>
              </>
            )}

            {page === "My Progress" && (
              <section className="progress-page">
                <div className="eyebrow">
                  <Trophy size={15} /> YOUR ADVENTURE LOG
                </div>

                <h1>Your explorer journey</h1>

                <p>
                  Every discovery brings you one step closer to becoming a
                  heritage expert.
                </p>

                <ProgressSummary
                  progress={progress}
                  totalLevels={totalLevels}
                />

                <div className="achievement-panel">
                  <h2>
                    <Medal size={22} /> Your badge collection
                  </h2>

                  <div className="badge-grid">
                    <div className="achievement unlocked">
                      <span>🧭</span>
                      <strong>Trail Starter</strong>
                      <small>Ready to explore</small>
                    </div>

                    <div
                      className={`achievement ${
                        totalXp >= 50 ? "unlocked" : "locked"
                      }`}
                    >
                      <span>📚</span>
                      <strong>Curious Mind</strong>
                      <small>
                        {totalXp >= 50
                          ? "Achievement unlocked!"
                          : "Earn 50 XP"}
                      </small>
                    </div>

                    <div
                      className={`achievement ${
                        progress.filter((item) => item.completed).length >= 5
                          ? "unlocked"
                          : "locked"
                      }`}
                    >
                      <span>🏆</span>
                      <strong>Heritage Hero</strong>
                      <small>Complete 5 missions</small>
                    </div>

                    <div
                      className={`achievement ${
                        progress.filter((item) => item.completed).length >= 10
                          ? "unlocked"
                          : "locked"
                      }`}
                    >
                      <span>🌟</span>
                      <strong>Master Explorer</strong>
                      <small>Complete 10 missions</small>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() => navigate("Explore")}
                >
                  Explore more destinations <ChevronRight size={18} />
                </button>
              </section>
            )}
          </>
        )}
      </main>

      <footer className="footer">
        <button
          type="button"
          className="footer-brand"
          onClick={() => navigate("Home")}
        >
          <Compass size={20} /> Heritage Quest
        </button>

        <span>
          Discover the past. Play the present. Inspire the future. ✨
        </span>

        <span>Student Project · 2026</span>
      </footer>
    </div>
  );
}

interface ProgressSummaryProps {
  progress: LevelProgress[];
  totalLevels: number;
}

function ProgressSummary({
  progress,
  totalLevels,
}: ProgressSummaryProps) {
  const completedLevels = progress.filter(
    (item) => item.completed
  ).length;

  const totalXp = progress
    .filter((item) => item.completed)
    .reduce((total, item) => total + item.best_score, 0);

  const playerLevel = Math.floor(totalXp / 500) + 1;
  const xpIntoLevel = totalXp % 500;
  const progressPercent = (xpIntoLevel / 500) * 100;

  const totalStars = progress
    .filter((item) => item.completed)
    .reduce((total, item) => total + item.stars, 0);

  return (
    <section
      className="progress-summary"
      aria-label="Player progress"
    >
      <div className="progress-intro">
        <div className="progress-icon">
          <Trophy size={22} />
        </div>

        <div>
          <strong>Your adventure so far</strong>
          <span>Every great explorer starts somewhere!</span>
        </div>
      </div>

      <div className="progress-stat">
        <Sparkles size={19} className="stat-purple" />
        <div>
          <strong>{totalXp}</strong>
          <span>Total XP</span>
        </div>
      </div>

      <div className="progress-stat">
        <CircleCheck size={19} className="stat-green" />
        <div>
          <strong>
            {completedLevels} / {totalLevels}
          </strong>
          <span>Missions done</span>
        </div>
      </div>

      <div className="progress-stat">
        <Flame size={19} className="stat-orange" />
        <div>
          <strong>Level {playerLevel}</strong>
          <span>Curious Explorer</span>
        </div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-label">
          <span>Next level</span>
          <strong>{xpIntoLevel} / 500 XP</strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div
        className="mini-badge"
        title={`${totalStars} stars earned across completed missions`}
      >
        <Star size={22} fill="currentColor" />
        <span>{totalStars}</span>
      </div>
    </section>
  );
}

export default App;
