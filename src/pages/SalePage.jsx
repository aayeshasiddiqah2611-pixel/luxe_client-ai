import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import Navbar from "../components/Navbar";

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

  const discountPercent = Math.round(
    ((parseFloat(product.originalPrice.replace(/[^0-9.]/g, "")) - product.price) /
      parseFloat(product.originalPrice.replace(/[^0-9.]/g, ""))) *
      100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
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
          src={product.images[0]}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          style={{
            ...styles.image,
            opacity: imageLoaded ? 1 : 0,
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div style={styles.discountBadge}>-{discountPercent}%</div>
        {product.stockCount < 20 && (
          <div style={styles.lowStockBadge}>Low Stock</div>
        )}
      </div>

      <div style={styles.content}>
        <span style={styles.brand}>{product.specifications.Brand}</span>
        <h3 style={styles.name}>{product.shortName}</h3>
        <div style={styles.ratingRow}>
          <span style={styles.stars}>{"★".repeat(Math.floor(product.rating))}</span>
          <span style={styles.rating}>{product.rating}</span>
          <span style={styles.reviews}>({product.reviews.toLocaleString()})</span>
        </div>
        <div style={styles.priceRow}>
          <span style={styles.salePrice}>{product.displayPrice}</span>
          <span style={styles.originalPrice}>{product.originalPrice}</span>
        </div>
        <div style={styles.savings}>
          You save ${(parseFloat(product.originalPrice.replace(/[^0-9.]/g, "")) - product.price).toFixed(0)}
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

export default function SalePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const saleProducts = useMemo(() => {
    return products.filter((p) => p.discount);
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return saleProducts;
    return saleProducts.filter((p) => p.category === selectedCategory);
  }, [saleProducts, selectedCategory]);

  const categories = ["All", ...new Set(saleProducts.map((p) => p.category))];

  const totalSavings = saleProducts.reduce(
    (sum, p) =>
      sum + (parseFloat(p.originalPrice.replace(/[^0-9.]/g, "")) - p.price),
    0
  );

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
            <span style={styles.heroBadge}>LIMITED TIME</span>
            <h1 style={styles.heroTitle}>Summer Sale</h1>
            <p style={styles.heroSubtitle}>
              Up to 40% off on selected luxury pieces
            </p>
            <div style={styles.heroStats}>
              <div style={styles.heroStat}>
                <span style={styles.heroStatValue}>{saleProducts.length}</span>
                <span style={styles.heroStatLabel}>Items on Sale</span>
              </div>
              <div style={styles.heroStat}>
                <span style={styles.heroStatValue}>Up to 40%</span>
                <span style={styles.heroStatLabel}>Off</span>
              </div>
              <div style={styles.heroStat}>
                <span style={styles.heroStatValue}>${Math.round(totalSavings)}</span>
                <span style={styles.heroStatLabel}>Max Savings</span>
              </div>
            </div>
          </div>
          <div style={styles.countdown}>
            <span style={styles.countdownLabel}>Sale ends in:</span>
            <div style={styles.countdownTimer}>
              {[
                { value: "03", label: "Days" },
                { value: "14", label: "Hours" },
                { value: "52", label: "Mins" },
              ].map((item, i) => (
                <div key={item.label} style={styles.timerItem}>
                  <span style={styles.timerValue}>{item.value}</span>
                  <span style={styles.timerLabel}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={styles.filterSection}
        >
          <span style={styles.filterLabel}>Filter by:</span>
          <div style={styles.filterButtons}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  ...styles.filterBtn,
                  background:
                    selectedCategory === cat
                      ? "linear-gradient(135deg, #c9a84c, #a8853a)"
                      : "transparent",
                  color: selectedCategory === cat ? "#0a0a0b" : "rgba(240,236,224,0.6)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <div style={styles.resultsCount}>
          Showing {filteredProducts.length} sale items
        </div>

        {/* Products Grid */}
        <div style={styles.grid}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>◈</span>
            <p>No sale items in this category</p>
            <button
              onClick={() => setSelectedCategory("All")}
              style={styles.resetBtn}
            >
              View All Sale Items
            </button>
          </div>
        )}
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
    padding: "3rem",
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(201,168,76,0.15)",
    flexWrap: "wrap",
    gap: "2rem",
  },
  heroContent: {
    flex: 1,
  },
  heroBadge: {
    display: "inline-block",
    background: "#ef4444",
    color: "#fff",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.2em",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    marginBottom: "1rem",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: 300,
    margin: "0 0 0.5rem",
  },
  heroSubtitle: {
    color: "rgba(240,236,224,0.5)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    marginBottom: "1.5rem",
  },
  heroStats: {
    display: "flex",
    gap: "2rem",
  },
  heroStat: {
    display: "flex",
    flexDirection: "column",
  },
  heroStatValue: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#c9a84c",
  },
  heroStatLabel: {
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  countdown: {
    textAlign: "center",
  },
  countdownLabel: {
    display: "block",
    color: "rgba(240,236,224,0.5)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    marginBottom: "0.75rem",
    letterSpacing: "0.1em",
  },
  countdownTimer: {
    display: "flex",
    gap: "0.75rem",
  },
  timerItem: {
    background: "rgba(201,168,76,0.1)",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    minWidth: "60px",
  },
  timerValue: {
    display: "block",
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#c9a84c",
  },
  timerLabel: {
    display: "block",
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.65rem",
    letterSpacing: "0.05em",
  },
  filterSection: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  filterLabel: {
    color: "rgba(240,236,224,0.5)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
  },
  filterButtons: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "0.6rem 1.2rem",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "4px",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  resultsCount: {
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    marginBottom: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1.5rem",
  },
  card: {
    background: "linear-gradient(145deg, #111114, #0d0d0f)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  imageContainer: {
    height: "260px",
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
  discountBadge: {
    position: "absolute",
    top: "0.75rem",
    left: "0.75rem",
    background: "#ef4444",
    color: "#fff",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 700,
    padding: "0.4rem 0.75rem",
    borderRadius: "4px",
  },
  lowStockBadge: {
    position: "absolute",
    top: "0.75rem",
    right: "0.75rem",
    background: "rgba(10,10,11,0.9)",
    color: "#fbbf24",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.65rem",
    fontWeight: 600,
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
    border: "1px solid rgba(251,191,72,0.3)",
  },
  content: {
    padding: "1.25rem",
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
    marginBottom: "0.25rem",
  },
  salePrice: {
    color: "#ef4444",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  originalPrice: {
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    textDecoration: "line-through",
  },
  savings: {
    color: "#22c55e",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    marginBottom: "0.75rem",
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
  emptyState: {
    textAlign: "center",
    padding: "4rem",
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
  },
  emptyIcon: {
    fontSize: "3rem",
    color: "rgba(201,168,76,0.3)",
    display: "block",
    marginBottom: "1rem",
  },
  resetBtn: {
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    background: "transparent",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
