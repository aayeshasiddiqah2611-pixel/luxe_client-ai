import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const validate = (form) => {
  const errors = {};
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Enter a valid email";
  if (form.password.length < 8) errors.password = "Password too short";
  return errors;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    if (errors[e.target.id]) setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => navigate("/"), 1800);
  };

  return (
    <div style={styles.root}>
      {/* Left panel – decorative */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={styles.leftPanel}
      >
        <div style={styles.leftOverlay} />
        <div style={styles.leftContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div style={styles.logoWrap}>
              <span style={styles.logoSymbol}>◆</span>
              <span style={styles.logoText}>LUXE</span>
            </div>
            <h2 style={styles.tagline}>
              Curated luxury,<br />
              <em>reimagined.</em>
            </h2>
            <div style={styles.divider} />
            <p style={styles.taglineBody}>
              Discover exclusive collections from the world's most coveted brands.
            </p>
          </motion.div>

        </div>
      </motion.div>

      {/* Right panel – form */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={styles.rightPanel}
      >
        <div style={styles.formContainer}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={styles.heading}
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            style={styles.subheading}
          >
            Sign in to continue
          </motion.p>

          <form onSubmit={handleSubmit} style={styles.form} noValidate>
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              style={styles.fieldWrap}
            >
              <label htmlFor="email" style={styles.label}>Email</label>
              <div style={{
                ...styles.inputBox,
                borderColor: errors.email ? "#ff4d6d" : focused === "email" ? "#c9a84c" : "rgba(255,255,255,0.08)",
                boxShadow: focused === "email" ? "0 0 0 3px rgba(201,168,76,0.10)" : "none",
              }}>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={styles.input}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={styles.error}
                  >
                    {errors.email}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              style={styles.fieldWrap}
            >
              <label htmlFor="password" style={styles.label}>Password</label>
              <div style={{
                ...styles.inputBox,
                borderColor: errors.password ? "#ff4d6d" : focused === "password" ? "#c9a84c" : "rgba(255,255,255,0.08)",
                boxShadow: focused === "password" ? "0 0 0 3px rgba(201,168,76,0.10)" : "none",
              }}>
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  style={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={styles.eyeBtn}
                  tabIndex={-1}
                >
                  {showPass ? "●" : "○"}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={styles.error}
                  >
                    {errors.password}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              style={styles.forgotRow}
            >
              <a href="#" style={styles.forgotLink}>Forgot password?</a>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(201,168,76,0.25)" }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              style={styles.btn}
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                  style={styles.spinner}
                />
              ) : (
                "Sign In →"
              )}
            </motion.button>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              style={styles.orRow}
            >
              <div style={styles.orLine} />
              <span style={styles.orText}>or</span>
              <div style={styles.orLine} />
            </motion.div>

            {/* Social login placeholders */}
            {["Continue with Google", "Continue with Apple"].map((label, i) => (
              <motion.button
                key={label}
                type="button"
                whileHover={{ borderColor: "rgba(201,168,76,0.4)", background: "rgba(201,168,76,0.04)" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                style={styles.socialBtn}
              >
                {label}
              </motion.button>
            ))}
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            style={styles.signupPrompt}
          >
            New here?{" "}
            <Link to="/signup" style={styles.link}>Create account</Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    background: "#0a0a0b",
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    overflow: "hidden",
  },
  leftPanel: {
    flex: "0 0 42%",
    position: "relative",
    background: "linear-gradient(160deg, #0f0d08, #1a1508, #0a0a0b)",
    borderRight: "1px solid rgba(201,168,76,0.12)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    "@media(maxWidth:768px)": { display: "none" },
  },
  leftOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(201,168,76,0.04) 0%, transparent 50%)",
    pointerEvents: "none",
  },
  leftContent: {
    position: "relative",
    padding: "4rem 3rem",
    width: "100%",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "3rem",
  },
  logoSymbol: { color: "#c9a84c", fontSize: "1.1rem" },
  logoText: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    fontSize: "0.8rem",
    letterSpacing: "0.4em",
  },
  tagline: {
    color: "#f0ece0",
    fontSize: "2.8rem",
    fontWeight: 300,
    lineHeight: 1.2,
    margin: "0 0 1.5rem",
    fontStyle: "normal",
  },
  divider: {
    width: "40px",
    height: "1px",
    background: "linear-gradient(90deg, #c9a84c, transparent)",
    marginBottom: "1.5rem",
  },
  taglineBody: {
    color: "rgba(240,236,224,0.35)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.82rem",
    lineHeight: 1.7,
    letterSpacing: "0.04em",
    maxWidth: "280px",
  },
  floatTag: {
    position: "absolute",
    background: "rgba(201,168,76,0.08)",
    border: "1px solid rgba(201,168,76,0.2)",
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.65rem",
    fontWeight: 700,
    letterSpacing: "0.2em",
    padding: "0.45rem 0.9rem",
    borderRadius: "1px",
    whiteSpace: "nowrap",
    zIndex: 10,
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
  },
  formContainer: {
    width: "100%",
    maxWidth: "380px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    color: "#f0ece0",
    fontSize: "2.4rem",
    fontWeight: 400,
    margin: "0 0 0.3rem",
    letterSpacing: "0.02em",
    textAlign: "center",
    width: "100%",
  },
  subheading: {
    color: "rgba(240,236,224,0.35)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: "2.5rem",
    textAlign: "center",
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  },
  fieldWrap: { display: "flex", flexDirection: "column", gap: "0.4rem", width: "100%" },
  label: {
    color: "rgba(240,236,224,0.5)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "2px",
    background: "rgba(255,255,255,0.025)",
    transition: "border-color 0.25s, box-shadow 0.25s",
    padding: "0 1rem",
    width: "100%",
    minHeight: "48px",
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#f0ece0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.88rem",
    padding: "0.9rem 0",
    minWidth: 0,
  },
  eyeBtn: {
    background: "none",
    border: "none",
    color: "rgba(240,236,224,0.3)",
    cursor: "pointer",
    fontSize: "0.7rem",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
  },
  error: {
    color: "#ff4d6d",
    fontSize: "0.75rem",
    fontFamily: "'Montserrat', sans-serif",
  },
  forgotRow: { display: "flex", justifyContent: "flex-end", width: "100%" },
  forgotLink: {
    color: "rgba(201,168,76,0.6)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    textDecoration: "none",
    letterSpacing: "0.05em",
  },
  btn: {
    padding: "1rem",
    background: "linear-gradient(135deg, #c9a84c, #a8853a)",
    border: "none",
    borderRadius: "2px",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "3.2rem",
    transition: "box-shadow 0.3s",
    width: "100%",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(10,10,11,0.3)",
    borderTop: "2px solid #0a0a0b",
    borderRadius: "50%",
  },
  orRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    margin: "0.25rem 0",
    width: "100%",
  },
  orLine: { flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" },
  orText: {
    color: "rgba(240,236,224,0.2)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.72rem",
    letterSpacing: "0.1em",
  },
  socialBtn: {
    padding: "0.85rem",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "2px",
    color: "rgba(240,236,224,0.6)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.82rem",
    letterSpacing: "0.05em",
    cursor: "pointer",
    transition: "border-color 0.25s, background 0.25s",
    width: "100%",
  },
  signupPrompt: {
    marginTop: "2rem",
    textAlign: "center",
    color: "rgba(240,236,224,0.3)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.82rem",
    width: "100%",
  },
  link: { color: "#c9a84c", textDecoration: "none", fontWeight: 600 },
};