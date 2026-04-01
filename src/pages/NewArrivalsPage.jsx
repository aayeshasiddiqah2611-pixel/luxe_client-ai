import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import Navbar from "../components/Navbar";

const newArrivals = [
  {
    id: 1,
    name: "Noir Édition Parfum",
    shortName: "Noir Édition",
    price: 1290,
    displayPrice: "$1,290",
    originalPrice: "$1,590",
    discount: "19% off",
    tag: "NEW",
    category: "Fragrance",
    emoji: "◈",
    rating: 4.9,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop",
    arrivalDate: "2026-03-28",
  },
  {
    id: 6,
    name: "Classic Leather Oxford",
    shortName: "Leather Oxford",
    price: 720,
    displayPrice: "$720",
    originalPrice: "$950",
    discount: "24% off",
    tag: "NEW",
    category: "Shoes",
    emoji: "◈",
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=600&fit=crop",
    arrivalDate: "2026-03-27",
  },
  {
    id: 8,
    name: "Cashmere Wrap Scarf",
    shortName: "Cashmere Scarf",
    price: 380,
    displayPrice: "$380",
    originalPrice: "$550",
    discount: "31% off",
    tag: "NEW",
    category: "Apparel",
    emoji: "✦",
    rating: 4.8,
    reviews: 678,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=600&fit=crop",
    arrivalDate: "2026-03-26",
  },
  {
    id: 12,
    name: "Suede Driving Loafers",
    shortName: "Suede Loafers",
    price: 650,
    displayPrice: "$650",
    originalPrice: "$850",
    discount: "24% off",
    tag: "NEW",
    category: "Shoes",
    emoji: "◈",
    rating: 4.5,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=600&h=600&fit=crop",
    arrivalDate: "2026-03-25",
  },
];

function ProductCard({ product, index }) {
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

  const daysAgo = Math.floor((new Date() - new Date(product.arrivalDate)) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      <div style={styles.imageContainer}>
        {!imageLoaded && (
          <div style={styles.placeholder}>
            <span style={styles.placeholderEmoji}>{product.emoji}</span>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          style={{
            ...styles.image,
            opacity: imageLoaded ? 1 : 0,
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <span style={styles.newBadge}>NEW</span>
        <span style={styles.arrivalBadge}>{daysAgo === 0 ? "Today" : `${daysAgo}d ago`}</span>
      </div>

      <div style={styles.content}>
        <span style={styles.category}>{product.category}</span>
        <h3 style={styles.name}>{product.shortName}</h3>
        <div style={styles.ratingRow}>
          <span style={styles.stars}>{"★".repeat(Math.floor(product.rating))}</span>
          <span style={styles.rating}>{product.rating}</span>
          <span style={styles.reviews}>({product.reviews.toLocaleString()})</span>
        </div>
        <div style={styles.priceRow}>
          <span style={styles.currentPrice}>{product.displayPrice}</span>
          <span style={styles.originalPrice}>{product.originalPrice}</span>
          <span style={styles.discount}>{product.discount}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          style={styles.addBtn}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function NewArrivalsPage() {
  return (
    <div style={styles.root}>
      <Navbar />
      
      <div style={styles.container}>
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.hero}
        >
          <div style={styles.heroContent}>
            <span style={styles.heroBadge}>JUST DROPPED</span>
            <h1 style={styles.heroTitle}>New Arrivals</h1>
            <p style={styles.heroSubtitle}>
              Discover our latest curated pieces, fresh from the world's finest ateliers
            </p>
          </div>
        </motion.div>

        {/* New Arrivals Grid */}
        <div style={styles.grid}>
          {newArrivals.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={styles.cta}
        >
          <h2 style={styles.ctaTitle}>Be the First to Know</h2>
          <p style={styles.ctaText}>Subscribe to get notified about new arrivals and exclusive drops</p>
          <div style={styles.ctaForm}>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.ctaInput}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={styles.ctaBtn}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
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
    padding: "2rem 4vw 4rem",
  },
  hero: {
    background: "linear-gradient(135deg, #1a1508 0%, #0a0a0b 100%)",
    borderRadius: "12px",
    padding: "4rem",
    marginBottom: "3rem",
    textAlign: "center",
    border: "1px solid rgba(201,168,76,0.15)",
  },
  heroContent: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  heroBadge: {
    display: "inline-block",
    background: "#c9a84c",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.2em",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    marginBottom: "1.5rem",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: 300,
    margin: "0 0 1rem",
  },
  heroSubtitle: {
    color: "rgba(240,236,224,0.5)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1.5rem",
    marginBottom: "4rem",
  },
  card: {
    background: "linear-gradient(145deg, #111114, #0d0d0f)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  imageContainer: {
    height: "280px",
    position: "relative",
    overflow: "hidden",
    background: "#0d0d0f",
  },
  placeholder: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(145deg, #131313, #0f0f0f)",
  },
  placeholderEmoji: {
    fontSize: "3rem",
    color: "#c9a84c",
    opacity: 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease, opacity 0.3s ease",
  },
  newBadge: {
    position: "absolute",
    top: "0.75rem",
    left: "0.75rem",
    background: "#c9a84c",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.6rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
  },
  arrivalBadge: {
    position: "absolute",
    top: "0.75rem",
    right: "0.75rem",
    background: "rgba(10,10,11,0.8)",
    color: "#f0ece0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.65rem",
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  content: {
    padding: "1.25rem",
  },
  category: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  name: {
    color: "#f0ece0",
    fontSize: "1.1rem",
    fontWeight: 400,
    margin: "0.25rem 0 0.5rem",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    marginBottom: "0.75rem",
  },
  stars: {
    color: "#c9a84c",
    fontSize: "0.75rem",
  },
  rating: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  reviews: {
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  currentPrice: {
    color: "#f0ece0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.1rem",
    fontWeight: 600,
  },
  originalPrice: {
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    textDecoration: "line-through",
  },
  discount: {
    background: "#22c55e",
    color: "#fff",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.65rem",
    fontWeight: 600,
    padding: "0.2rem 0.5rem",
    borderRadius: "4px",
  },
  addBtn: {
    width: "100%",
    padding: "0.75rem",
    background: "linear-gradient(135deg, #c9a84c, #a8853a)",
    border: "none",
    borderRadius: "4px",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  cta: {
    background: "linear-gradient(145deg, #111114, #0d0d0f)",
    border: "1px solid rgba(201,168,76,0.15)",
    borderRadius: "12px",
    padding: "3rem",
    textAlign: "center",
  },
  ctaTitle: {
    fontSize: "2rem",
    fontWeight: 300,
    margin: "0 0 0.5rem",
  },
  ctaText: {
    color: "rgba(240,236,224,0.5)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
  },
  ctaForm: {
    display: "flex",
    gap: "0.75rem",
    maxWidth: "450px",
    margin: "0 auto",
  },
  ctaInput: {
    flex: 1,
    padding: "0.9rem 1.25rem",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "4px",
    color: "#f0ece0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
  },
  ctaBtn: {
    padding: "0.9rem 1.5rem",
    background: "linear-gradient(135deg, #c9a84c, #a8853a)",
    border: "none",
    borderRadius: "4px",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
  },
};
