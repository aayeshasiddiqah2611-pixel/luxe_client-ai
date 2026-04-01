import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const inputFields = [
  { id: "name", label: "Full Name", type: "text", icon: "✦" },
  { id: "email", label: "Email Address", type: "email", icon: "◈" },
  { id: "phone", label: "Phone Number", type: "tel", icon: "◉" },
  { id: "password", label: "Password", type: "password", icon: "▣" },
  { id: "confirmPassword", label: "Confirm Password", type: "password", icon: "▣" },
];

const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Valid email required";
  if (!form.phone.match(/^\+?[\d\s\-]{10,}$/)) errors.phone = "Valid phone required";
  if (form.password.length < 8) errors.password = "Min 8 characters";
  if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords don't match";
  return errors;
};

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    if (errors[e.target.id]) setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    setTimeout(() => navigate("/login"), 1800);
  };

  return (
    <div style={styles.root}>
      {/* Animated background grid */}
      <div style={styles.bgGrid} />
      <div style={styles.bgGlow} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={styles.card}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={styles.logoWrap}
        >
          <span style={styles.logoSymbol}>◆</span>
          <span style={styles.logoText}>LUXE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={styles.heading}
        >
          Create Account
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          style={styles.subheading}
        >
          Join the experience
        </motion.p>

        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          {inputFields.map((field, i) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 * i + 0.5, duration: 0.5, ease: "easeOut" }}
              style={styles.fieldWrap}
            >
              <div
                style={{
                  ...styles.inputBox,
                  borderColor: errors[field.id]
                    ? "#ff4d6d"
                    : focused === field.id
                    ? "#c9a84c"
                    : "rgba(255,255,255,0.08)",
                  boxShadow: focused === field.id ? "0 0 0 3px rgba(201,168,76,0.12)" : "none",
                }}
              >
                <span style={styles.inputIcon}>{field.icon}</span>
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.label}
                  value={form[field.id]}
                  onChange={handleChange}
                  onFocus={() => setFocused(field.id)}
                  onBlur={() => setFocused(null)}
                  style={styles.input}
                  autoComplete="off"
                />
              </div>
              <AnimatePresence>
                {errors[field.id] && (
                  <motion.span
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={styles.error}
                  >
                    {errors[field.id]}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            style={styles.btn}
            disabled={submitted}
          >
            {submitted ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                style={styles.spinner}
              />
            ) : (
              "Create Account →"
            )}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={styles.loginLink}
        >
          Already a member?{" "}
          <Link to="/login" style={styles.link}>
            Sign In
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    position: "relative",
    overflow: "hidden",
    padding: "1rem",
  },
  bgGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    pointerEvents: "none",
  },
  bgGlow: {
    position: "absolute",
    top: "-20%",
    right: "-10%",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: "420px",
    background: "linear-gradient(145deg, #111114, #0d0d10)",
    border: "1px solid rgba(201,168,76,0.18)",
    borderRadius: "4px",
    padding: "2.5rem 2rem",
    boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,168,76,0.1)",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    marginBottom: "1.5rem",
    width: "100%",
  },
  logoSymbol: {
    color: "#c9a84c",
    fontSize: "1.2rem",
    lineHeight: 1,
  },
  logoText: {
    color: "#c9a84c",
    fontSize: "0.85rem",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.35em",
  },
  heading: {
    color: "#f0ece0",
    fontSize: "1.8rem",
    fontWeight: 400,
    margin: "0 0 0.5rem",
    letterSpacing: "0.02em",
    lineHeight: 1.2,
    textAlign: "center",
    width: "100%",
  },
  subheading: {
    color: "rgba(240,236,224,0.4)",
    fontSize: "0.75rem",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 400,
    letterSpacing: "0.15em",
    marginBottom: "2rem",
    textTransform: "uppercase",
    textAlign: "center",
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  },
  fieldWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    width: "100%",
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "4px",
    background: "rgba(255,255,255,0.03)",
    transition: "border-color 0.25s, box-shadow 0.25s",
    padding: "0 0.875rem",
    minHeight: "48px",
    width: "100%",
  },
  inputIcon: {
    color: "#c9a84c",
    fontSize: "0.75rem",
    marginRight: "0.75rem",
    opacity: 0.7,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#f0ece0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    padding: "0.75rem 0",
    fontWeight: 400,
    width: "100%",
    minWidth: 0,
  },
  error: {
    color: "#ff4d6d",
    fontSize: "0.75rem",
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: "0.02em",
    paddingLeft: "0.25rem",
  },
  btn: {
    marginTop: "0.75rem",
    padding: "1rem 1.5rem",
    background: "linear-gradient(135deg, #c9a84c, #a8853a)",
    border: "none",
    borderRadius: "4px",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "48px",
    width: "100%",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(10,10,11,0.3)",
    borderTop: "2px solid #0a0a0b",
    borderRadius: "50%",
  },
  loginLink: {
    marginTop: "1.5rem",
    textAlign: "center",
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    letterSpacing: "0.02em",
  },
  link: {
    color: "#c9a84c",
    textDecoration: "none",
    fontWeight: 600,
    transition: "opacity 0.2s",
  },
};