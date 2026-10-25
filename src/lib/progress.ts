
import { supabase, supabaseReady } from "./supabase";

export interface LevelProgress {
  user_id: string;
  level_id: string;
  best_score: number;
  stars: number;
  completed: boolean;
  updated_at: string;
}

const LOCAL_PROGRESS_KEY = "heritage-quest-progress";

export function loadLocalProgress(): LevelProgress[] {
  try {
    const saved = localStorage.getItem(LOCAL_PROGRESS_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as LevelProgress[]) : [];
  } catch {
    return [];
  }
}

export function saveLocalProgress(
  destinationId: string,
  levelNumber: number,
  score: number,
  stars: number
): LevelProgress[] {
  const levelId = `${destinationId}-${levelNumber}`;
  const current = loadLocalProgress();
  const existing = current.find((item) => item.level_id === levelId);

  const updatedLevel: LevelProgress = {
    user_id: "local-player",
    level_id: levelId,
    best_score: Math.max(existing?.best_score ?? 0, score),
    stars: Math.max(existing?.stars ?? 0, stars),
    completed: true,
    updated_at: new Date().toISOString(),
  };

  const updated = [
    ...current.filter((item) => item.level_id !== levelId),
    updatedLevel,
  ];

  localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(updated));

  return updated;
}


export function mergeProgress(...lists: LevelProgress[][]): LevelProgress[] {
  const merged = new Map<string, LevelProgress>();

  for (const list of lists) {
    for (const item of list) {
      // Keep each user's progress separate.
      const key = `${item.user_id}:${item.level_id}`;
      const existing = merged.get(key);

      merged.set(key, {
        ...existing,
        ...item,
        best_score: Math.max(
          existing?.best_score ?? 0,
          item.best_score
        ),
        stars: Math.max(
          existing?.stars ?? 0,
          item.stars
        ),
        completed: Boolean(
          existing?.completed || item.completed
        ),
      });
    }
  }

  return Array.from(merged.values());
}


export async function loadProgress(
  userId: string
): Promise<LevelProgress[]> {
  if (!supabaseReady || !supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("level_progress")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return (data ?? []) as LevelProgress[];
}

export async function saveProgress(
  userId: string,
  destinationId: string,
  levelNumber: number,
  score: number,
  stars: number
): Promise<void> {
  if (!supabaseReady || !supabase) {
    throw new Error("Supabase is not configured.");
  }

  const levelId = `${destinationId}-${levelNumber}`;

  const { data: existing, error: readError } = await supabase
    .from("level_progress")
    .select("best_score, stars")
    .eq("user_id", userId)
    .eq("level_id", levelId)
    .maybeSingle();

  if (readError) throw readError;

  const { error } = await supabase.from("level_progress").upsert(
    {
      user_id: userId,
      level_id: levelId,
      best_score: Math.max(existing?.best_score ?? 0, score),
      stars: Math.max(existing?.stars ?? 0, stars),
      completed: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,level_id" }
  );

  if (error) throw error;
}
