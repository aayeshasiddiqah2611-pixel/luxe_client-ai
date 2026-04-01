import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import Navbar from "../components/Navbar";

const collections = [
  {
    id: "evening",
    name: "Evening Elegance",
    description: "Sophisticated pieces for your most memorable nights",
    image: "https://images.unsplash.com/photo-1595777457583-531eba835eb1?w=800&h=600&fit=crop",
    productIds: [2, 4, 5, 6], // Clutch, Dress, Pendant, Oxford
  },
  {
    id: "timeless",
    name: "Timeless Luxury",
    description: "Heritage pieces that transcend generations",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
    productIds: [3, 7, 10], // Watches, Ring, Chronograph
  },
  {
    id: "essentials",
    name: "Modern Essentials",
    description: "Everyday luxury for the contemporary lifestyle",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=600&fit=crop",
    productIds: [1, 8, 9, 11], // Fragrances, Scarf, Tote
  },
  {
    id: "statement",
    name: "Statement Pieces",
    description: "Bold accessories that command attention",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=600&fit=crop",
    productIds: [2, 5, 9, 12], // Clutch, Pendant, Tote, Loafers
  },
];

function CollectionCard({ collection, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onClick={() => navigate(`/collections/${collection.id}`)}
      style={styles.collectionCard}
    >
      <div style={styles.imageContainer}>
        <img src={collection.image} alt={collection.name} style={styles.image} />
        <div style={styles.overlay} />
      </div>
      <div style={styles.content}>
        <h2 style={styles.name}>{collection.name}</h2>
        <p style={styles.description}>{collection.description}</p>
        <span style={styles.count}>{collection.productIds.length} items</span>
      </div>
    </motion.div>
  );
}

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{
        ...styles.productCard,
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      <div style={styles.productImageContainer}>
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
            ...styles.productImage,
            opacity: imageLoaded ? 1 : 0,
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {product.discount && (
          <span style={styles.discountBadge}>{product.discount}</span>
        )}
      </div>
      <div style={styles.productInfo}>
        <span style={styles.brand}>{product.specifications.Brand}</span>
        <h3 style={styles.productName}>{product.shortName}</h3>
        <div style={styles.ratingRow}>
          <span style={styles.stars}>{"★".repeat(Math.floor(product.rating))}</span>
          <span style={styles.ratingNum}>{product.rating}</span>
        </div>
        <div style={styles.priceRow}>
          <span style={styles.currentPrice}>{product.displayPrice}</span>
          <span style={styles.originalPrice}>{product.originalPrice}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          style={styles.addBtn}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState(null);

  const featuredProducts = products.slice(0, 4);

  return (
    <div style={styles.root}>
      <Navbar />
      
      <div style={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.header}
        >
          <h1 style={styles.title}>Curated Collections</h1>
          <p style={styles.subtitle}>Explore our handpicked selections for every occasion</p>
        </motion.div>

        {/* Collections Grid */}
        <div style={styles.collectionsGrid}>
          {collections.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))}
        </div>

        {/* Featured from Collections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={styles.featuredSection}
        >
          <h2 style={styles.sectionTitle}>Featured Pieces</h2>
          <div style={styles.productsGrid}>
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
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
  collectionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1.5rem",
    marginBottom: "5rem",
  },
  collectionCard: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    height: "400px",
    transition: "transform 0.3s ease",
  },
  imageContainer: {
    position: "absolute",
    inset: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "2rem",
  },
  name: {
    fontSize: "2rem",
    fontWeight: 400,
    margin: "0 0 0.5rem",
  },
  description: {
    color: "rgba(240,236,224,0.7)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    margin: "0 0 1rem",
    lineHeight: 1.5,
  },
  count: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  featuredSection: {
    borderTop: "1px solid rgba(255,255,255,0.06)",
    paddingTop: "4rem",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: 300,
    marginBottom: "2rem",
    textAlign: "center",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1.5rem",
  },
  productCard: {
    background: "linear-gradient(145deg, #111114, #0d0d0f)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  productImageContainer: {
    height: "220px",
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
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease, opacity 0.3s ease",
  },
  discountBadge: {
    position: "absolute",
    top: "0.75rem",
    right: "0.75rem",
    background: "#22c55e",
    color: "#fff",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.6rem",
    fontWeight: 700,
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
  },
  productInfo: {
    padding: "1.25rem",
  },
  brand: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  productName: {
    color: "#f0ece0",
    fontSize: "1.1rem",
    fontWeight: 400,
    margin: "0.25rem 0",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    marginBottom: "0.5rem",
  },
  stars: {
    color: "#c9a84c",
    fontSize: "0.75rem",
  },
  ratingNum: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 600,
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.75rem",
  },
  currentPrice: {
    color: "#f0ece0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
  },
  originalPrice: {
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    textDecoration: "line-through",
  },
  addBtn: {
    width: "100%",
    padding: "0.6rem",
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
