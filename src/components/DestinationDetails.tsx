
import { useState } from "react";

import type { Destination } from "../data/destinations";
import { getLevels } from "../data/challenges";

type Props = {
  destination: Destination;
  onBack: () => void;
  onStartAdventure: (destination: Destination) => void;
};

export default function DestinationDetails({
  destination,
  onBack,
  onStartAdventure,
}: Props) {
  const [imageFailed, setImageFailed] = useState(false);

  // Get the actual levels configured for this destination.
  const levels = getLevels(destination.id);
  const missionCount = levels.length;

  return (
    <section
      className="selected-destination"
      aria-labelledby="destination-title"
    >
      <button
        type="button"
        className="back-button"
        onClick={onBack}
      >
        ← Back to all destinations
      </button>

      <div className="selected-card">
        {!imageFailed && (
          <img
            src={destination.image}
            alt={`${destination.name} heritage site`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}

        <div className="selected-content">
          <span className="eyebrow">YOUR NEXT MISSION</span>

          <h2 id="destination-title">
            {destination.emoji} {destination.name}
          </h2>

          <p className="location-line">
            {destination.city}, {destination.state}, India
          </p>

          <p>{destination.description}</p>

          <div className="detail-tags">
            <span>🎯 {destination.difficulty}</span>
            <span>🧩 {missionCount} missions</span>
          </div>

          <h3>Did you know?</h3>

          <ul>
            {destination.facts.map((fact, index) => (
              <li key={`${destination.id}-fact-${index}`}>
                {fact}
              </li>
            ))}
          </ul>

          {missionCount === 0 ? (
            <p role="status">
              Missions for this destination are not available yet.
              Please check the challenge configuration.
            </p>
          ) : (
            <button
              type="button"
              className="primary-button"
              onClick={() => onStartAdventure(destination)}
            >
              Start Adventure
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
