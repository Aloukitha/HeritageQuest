
import { useState, type FormEvent } from "react";
import { Compass, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { supabase } from "../lib/supabase";
import "./AuthPage.css";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    if (!supabase) {
      setErrorMessage(
        "Supabase is not configured. Check your .env file."
      );
      return;
    }

    setBusy(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              player_name: playerName.trim(),
            },
          },
        });

        if (error) throw error;

        if (data.session) {
          setMessage("Account created! Welcome to Heritage Quest.");
        } else {
          setMessage(
            "Account created. Check your email to confirm your account, then log in."
          );
          setMode("login");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (error) throw error;

        // The App component detects the new session automatically.
      }
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand-icon">
          <Compass size={34} />
        </div>

        <p className="auth-eyebrow">YOUR ADVENTURE STARTS HERE</p>

        <h1>Heritage Quest</h1>

        <p className="auth-subtitle">
          Discover India's heritage. Solve challenges. Become a legend.
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "login" ? "selected" : ""}
            onClick={() => {
              setMode("login");
              setMessage("");
              setErrorMessage("");
            }}
          >
            Log in
          </button>

          <button
            type="button"
            className={mode === "signup" ? "selected" : ""}
            onClick={() => {
              setMode("signup");
              setMessage("");
              setErrorMessage("");
            }}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <label className="auth-field">
              <span>Gamer name</span>
              <input
                type="text"
                placeholder="Choose your explorer name"
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
                autoComplete="nickname"
                maxLength={40}
                required
              />
            </label>
          )}

          <label className="auth-field">
            <span>Email address</span>
            <div className="auth-input-wrap">
              <Mail size={18} />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="auth-input-wrap">
              <LockKeyhole size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                minLength={6}
                required
              />

              <button
                type="button"
                className="password-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {errorMessage && (
            <p className="auth-message auth-error" role="alert">
              {errorMessage}
            </p>
          )}

          {message && (
            <p className="auth-message auth-success" role="status">
              {message}
            </p>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={busy}
          >
            {busy
              ? "Please wait..."
              : mode === "login"
                ? "Enter the adventure"
                : "Create gamer account"}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "login"
            ? "New explorer? "
            : "Already have an account? "}

          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setMessage("");
              setErrorMessage("");
            }}
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>

        <p className="auth-footer">
          🏛️ Explore the past. Unlock the stories.
        </p>
      </section>
    </main>
  );
}
