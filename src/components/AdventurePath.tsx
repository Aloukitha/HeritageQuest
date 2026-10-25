
import { useEffect, useState } from "react";
import {
  Compass,
  MapPin,
  Star,
  Trophy,
  Sparkles,
} from "lucide-react";

import type { Destination } from "../data/destinations";
import { getLevels } from "../data/challenges";
import type { LevelProgress } from "../lib/progress";

interface AdventurePathProps {
  destinations: Destination[];
  progress: LevelProgress[];
  onStartLevel: (
    destination: Destination,
    levelNumber: number
  ) => void;
}

export default function AdventurePath({
  destinations,
  progress,
  onStartLevel,
}: AdventurePathProps) {
  const [activeDestinationId, setActiveDestinationId] = useState(
    destinations[0]?.id ?? ""
  );

  // Keep the selected destination valid if the list changes.
  useEffect(() => {
    if (
      !destinations.some(
        (item) => item.id === activeDestinationId
      )
    ) {
      setActiveDestinationId(destinations[0]?.id ?? "");
    }
  }, [destinations, activeDestinationId]);

  const destination = destinations.find(
    (item) => item.id === activeDestinationId
  );

  if (!destination) {
    return (
      <section className="adventure-path-section">
        <h2>Choose your heritage adventure</h2>
        <p>No destinations are available.</p>
      </section>
    );
  }

  // Levels are loaded using the exact destination ID.
  const levels = getLevels(destination.id);

  const getLevelProgress = (levelNumber: number) =>
    progress.find(
      (item) =>
        item.level_id === `${destination.id}-${levelNumber}` &&
        item.completed
    );

  const completedCount = levels.filter((level) =>
    getLevelProgress(level.levelNumber)
  ).length;

  const totalStars = levels.reduce(
    (sum, level) =>
      sum + (getLevelProgress(level.levelNumber)?.stars ?? 0),
    0
  );

  return (
    <section className="adventure-path-section">
      <div className="adventure-heading">
        <div>
          <span className="adventure-eyebrow">
            <Sparkles size={15} /> YOUR HERITAGE JOURNEY
          </span>

          <h2>Follow the Heritage Trail</h2>

          <p>
            Choose any challenge, explore India's history, and earn
            stars at your own pace.
          </p>
        </div>

        <div className="adventure-emblem" aria-hidden="true">
          🪷
        </div>
      </div>

      <label
        className="adventure-select-label"
        htmlFor="adventure-destination"
      >
        Choose a monument
      </label>

      <select
        id="adventure-destination"
        className="adventure-select"
        value={activeDestinationId}
        onChange={(event) =>
          setActiveDestinationId(event.target.value)
        }
      >
        {destinations.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <div className="adventure-stats">
        <div>
          <Trophy size={19} />
          <span>
            <strong>
              {completedCount}/{levels.length}
            </strong>
            <small>Challenges completed</small>
          </span>
        </div>

        <div>
          <Star size={19} />
          <span>
            <strong>{totalStars}</strong>
            <small>Stars earned</small>
          </span>
        </div>
      </div>

      {levels.length === 0 ? (
        <div className="adventure-empty">
          <p>
            No challenges are configured for {destination.name} yet.
          </p>
          <p>
            Check the destination ID in destinations.ts and the
            matching entries in challenges.ts.
          </p>
        </div>
      ) : (
        <div className="adventure-trail">
          {levels.map((level, index) => {
            const saved = getLevelProgress(level.levelNumber);
            const completed = Boolean(saved);

            return (
              <article
                className={`adventure-level ${
                  completed ? "is-completed" : ""
                }`}
                key={`${level.destinationId}-${level.levelNumber}`}
              >
                <div className="adventure-trail-marker">
                  <span className="adventure-level-icon">
                    {completed ? (
                      <Trophy size={22} />
                    ) : index === 0 ? (
                      <Compass size={22} />
                    ) : (
                      <MapPin size={22} />
                    )}
                  </span>

                  {index < levels.length - 1 && (
                    <span className="adventure-trail-line" />
                  )}
                </div>

                <div className="adventure-level-card">
                  <div className="adventure-level-top">
                    <span className="adventure-level-number">
                      CHALLENGE {level.levelNumber}
                    </span>

                    {completed && (
                      <span className="adventure-completed-label">
                        Completed
                      </span>
                    )}
                  </div>

                  <h3>{level.title}</h3>

                  {completed ? (
                    <div className="adventure-rewards">
                      <span>
                        Best score: {saved?.best_score ?? 0}
                      </span>

                      <span className="adventure-stars">
                        {"★".repeat(saved?.stars ?? 0)}
                        {"☆".repeat(
                          Math.max(
                            0,
                            3 - (saved?.stars ?? 0)
                          )
                        )}
                      </span>
                    </div>
                  ) : (
                    <p className="adventure-level-description">
                      Ready to explore? Start this challenge whenever
                      you like.
                    </p>
                  )}

                  <button
                    type="button"
                    className="adventure-start-button"
                    onClick={() =>
                      onStartLevel(
                        destination,
                        level.levelNumber
                      )
                    }
                  >
                    {completed ? "Play again" : "Start challenge"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <p className="adventure-footer-note">
        Every challenge is open. Play in any order and revisit any
        level whenever you want.
      </p>
    </section>
  );
}
