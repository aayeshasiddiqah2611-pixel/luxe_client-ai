import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();

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
      style={navStyles.nav}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <div style={navStyles.logo}>
          <span style={navStyles.logoSym}>◆</span>
          <span style={navStyles.logoTxt}>LUXE</span>
        </div>
      </Link>

      <div style={navStyles.links}>
        {navItems.map((item) => (
          <Link key={item.name} to={item.path} style={navStyles.link}>
            {item.name}
          </Link>
        ))}
      </div>

      <div style={navStyles.actions}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          style={navStyles.cartBtn}
        >
          <span>Cart</span>
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={navStyles.cartBadge}
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>
        <Link to="/login" style={navStyles.loginBtn}>
          Sign In
        </Link>
        <Link to="/signup">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={navStyles.signupBtn}
          >
            Join
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
}

function LookbookItem({ product, index }) {
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const isLarge = index % 5 === 0 || index % 5 === 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{
        ...itemStyles.item,
        gridColumn: isLarge ? "span 2" : "span 1",
        gridRow: isLarge ? "span 2" : "span 1",
      }}
    >
      {!imageLoaded && (
        <div style={itemStyles.placeholder}>
          <span style={itemStyles.placeholderEmoji}>{product.emoji}</span>
        </div>
      )}
      <img
        src={product.images[0]}
        alt={product.name}
        onLoad={() => setImageLoaded(true)}
        style={{
          ...itemStyles.image,
          opacity: imageLoaded ? 1 : 0,
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        style={itemStyles.overlay}
      >
        <div style={itemStyles.content}>
          <span style={itemStyles.brand}>{product.specifications.Brand}</span>
          <h3 style={itemStyles.name}>{product.name}</h3>
          <p style={itemStyles.price}>{product.displayPrice}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            style={itemStyles.addBtn}
          >
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LookbookPage() {
  return (
    <div style={pageStyles.root}>
      <Navbar />
      
      <div style={pageStyles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={pageStyles.header}
        >
          <h1 style={pageStyles.title}>The Lookbook</h1>
          <p style={pageStyles.subtitle}>Curated collection of our finest pieces</p>
        </motion.div>

        <div style={pageStyles.grid}>
          {products.map((product, index) => (
            <LookbookItem key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

const navStyles = {
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
    color: "rgba(240,236,224,0.55)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.78rem",
    letterSpacing: "0.12em",
    textDecoration: "none",
    textTransform: "uppercase",
    cursor: "pointer",
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

const itemStyles = {
  item: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    background: "#111",
    minHeight: "300px",
  },
  placeholder: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(145deg, #1a1a1a, #0f0f0f)",
  },
  placeholderEmoji: {
    fontSize: "4rem",
    color: "#c9a84c",
    opacity: 0.3,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease, opacity 0.3s ease",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
    display: "flex",
    alignItems: "flex-end",
    padding: "1.5rem",
    transition: "opacity 0.3s ease",
  },
  content: {
    width: "100%",
  },
  brand: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  name: {
    color: "#f0ece0",
    fontSize: "1.3rem",
    fontWeight: 400,
    margin: "0.25rem 0",
    lineHeight: 1.2,
  },
  price: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: "0.75rem",
  },
  addBtn: {
    padding: "0.6rem 1.2rem",
    background: "linear-gradient(135deg, #c9a84c, #a8853a)",
    border: "none",
    borderRadius: "4px",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    cursor: "pointer",
  },
};

const pageStyles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0b",
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    color: "#f0ece0",
    paddingTop: "72px",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "3rem 4vw",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  title: {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: 300,
    margin: "0 0 0.5rem",
  },
  subtitle: {
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    letterSpacing: "0.1em",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridAutoRows: "300px",
    gap: "1rem",
  },
};
