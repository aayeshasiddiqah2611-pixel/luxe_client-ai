import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const navItems = [
    { name: "Collections", path: "/collections" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Brands", path: "/brands" },
    { name: "Sale", path: "/sale" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={styles.nav}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <div style={styles.logo}>
          <span style={styles.logoSym}>◆</span>
          <span style={styles.logoTxt}>LUXE</span>
        </div>
      </Link>

      <div style={styles.links}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            style={{
              ...styles.link,
              color: location.pathname === item.path
                ? "#c9a84c"
                : "rgba(240,236,224,0.55)",
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div style={styles.actions}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          style={styles.cartBtn}
        >
          <span>Cart</span>
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={styles.cartBadge}
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>
        <Link to="/login" style={styles.loginBtn}>
          Sign In
        </Link>
        <Link to="/signup">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={styles.signupBtn}
          >
            Join
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 4vw",
    height: "72px",
    background: "rgba(10,10,11,0.95)",
    borderBottom: "1px solid rgba(201,168,76,0.1)",
    backdropFilter: "blur(20px)",
  },
  logo: { display: "flex", alignItems: "center", gap: "0.5rem" },
  logoSym: { color: "#c9a84c", fontSize: "1rem" },
  logoTxt: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    fontSize: "0.8rem",
    letterSpacing: "0.4em",
  },
  links: { display: "flex", gap: "2.5rem" },
  link: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.78rem",
    letterSpacing: "0.12em",
    textDecoration: "none",
    textTransform: "uppercase",
    transition: "color 0.2s",
  },
  actions: { display: "flex", alignItems: "center", gap: "1.2rem" },
  cartBtn: {
    position: "relative",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "2px",
    color: "rgba(240,236,224,0.6)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  cartBadge: {
    background: "#c9a84c",
    color: "#0a0a0b",
    fontSize: "0.65rem",
    fontWeight: 700,
    padding: "0.15rem 0.4rem",
    borderRadius: "10px",
  },
  loginBtn: {
    color: "rgba(240,236,224,0.6)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.78rem",
    letterSpacing: "0.1em",
    textDecoration: "none",
    textTransform: "uppercase",
  },
  signupBtn: {
    background: "linear-gradient(135deg, #c9a84c, #a8853a)",
    border: "none",
    borderRadius: "2px",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.15em",
    padding: "0.55rem 1.4rem",
    cursor: "pointer",
    textTransform: "uppercase",
  },
};
