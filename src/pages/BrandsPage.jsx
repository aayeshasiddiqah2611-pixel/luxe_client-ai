import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import Navbar from "../components/Navbar";

const brands = [
  {
    id: "luxe-parfums",
    name: "LUXE Parfums",
    category: "Fragrance",
    description: "Exquisite fragrances crafted by master perfumers in France and the UAE",
    logo: "◈",
    founded: "2018",
    origin: "France / UAE",
    productCount: 12,
    featured: [1, 11], // Product IDs
    color: "#c9a84c",
  },
  {
    id: "luxe-horology",
    name: "LUXE Horology",
    category: "Watches",
    description: "Swiss precision meets contemporary design in every timepiece",
    logo: "◉",
    founded: "2015",
    origin: "Switzerland",
    productCount: 8,
    featured: [3, 10],
    color: "#c9a84c",
  },
  {
    id: "luxe-atelier",
    name: "LUXE Atelier",
    category: "Leather Goods & Shoes",
    description: "Handcrafted Italian leather goods made by generations of artisans",
    logo: "▣",
    founded: "2012",
    origin: "Italy",
    productCount: 24,
    featured: [2, 6, 9, 12],
    color: "#c9a84c",
  },
  {
    id: "luxe-jewellery",
    name: "LUXE Atelier",
    category: "Jewellery",
    description: "Fine jewellery featuring ethically sourced precious stones and metals",
    logo: "◆",
    founded: "2016",
    origin: "Italy",
    productCount: 15,
    featured: [5, 7],
    color: "#c9a84c",
  },
  {
    id: "luxe-couture",
    name: "LUXE Couture",
    category: "Apparel",
    description: "Silk and cashmere pieces designed for the modern sophisticate",
    logo: "✦",
    founded: "2020",
    origin: "Italy",
    productCount: 18,
    featured: [4, 8],
    color: "#c9a84c",
  },
  {
    id: "luxe-essentials",
    name: "LUXE Essentials",
    category: "Accessories",
    description: "Everyday luxury essentials crafted from the finest materials",
    logo: "◈",
    founded: "2021",
    origin: "Scotland",
    productCount: 10,
    featured: [8],
    color: "#c9a84c",
  },
];

function BrandCard({ brand, index }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products?brand=${brand.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{
        ...styles.brandCard,
        borderColor: hovered ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.06)",
      }}
    >
      <div style={styles.brandHeader}>
        <span style={{ ...styles.brandLogo, color: brand.color }}>{brand.logo}</span>
        <div style={styles.brandInfo}>
          <h2 style={styles.brandName}>{brand.name}</h2>
          <span style={styles.brandCategory}>{brand.category}</span>
        </div>
      </div>
      
      <p style={styles.brandDescription}>{brand.description}</p>
      
      <div style={styles.brandMeta}>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Founded</span>
          <span style={styles.metaValue}>{brand.founded}</span>
        </div>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Origin</span>
          <span style={styles.metaValue}>{brand.origin}</span>
        </div>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Products</span>
          <span style={styles.metaValue}>{brand.productCount}</span>
        </div>
      </div>

      <div style={styles.featuredPreview}>
        {brand.featured.slice(0, 3).map((productId, i) => {
          const product = products.find(p => p.id === productId);
          return product ? (
            <img
              key={productId}
              src={product.images[0]}
              alt={product.name}
              style={styles.previewImage}
            />
          ) : null;
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={styles.exploreBtn}
      >
        Explore {brand.name}
      </motion.button>
    </motion.div>
  );
}

export default function BrandsPage() {
  return (
    <div style={styles.root}>
      <Navbar />
      
      <div style={styles.container}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.header}
        >
          <h1 style={styles.title}>Our Brands</h1>
          <p style={styles.subtitle}>
            Discover the world-class artisans and houses behind our curated collection
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={styles.stats}
        >
          {[
            { value: "6", label: "Luxury Brands" },
            { value: "87", label: "Unique Products" },
            { value: "12", label: "Countries" },
            { value: "50+", label: "Artisan Partners" },
          ].map((stat, index) => (
            <div key={stat.label} style={styles.statItem}>
              <span style={styles.statValue}>{stat.value}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Brands Grid */}
        <div style={styles.brandsGrid}>
          {brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>

        {/* Partnership CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={styles.partnershipCta}
        >
          <h2 style={styles.ctaTitle}>Are You a Brand?</h2>
          <p style={styles.ctaText}>
            Join our curated marketplace and reach discerning customers worldwide
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={styles.ctaBtn}
          >
            Partner With Us
          </motion.button>
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
    marginBottom: "2rem",
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
    letterSpacing: "0.05em",
    maxWidth: "500px",
    margin: "0 auto",
  },
  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "4rem",
    marginBottom: "4rem",
    padding: "2rem 0",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
  },
  statValue: {
    fontSize: "2.5rem",
    fontWeight: 300,
    color: "#c9a84c",
  },
  statLabel: {
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  brandsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.5rem",
    marginBottom: "4rem",
  },
  brandCard: {
    background: "linear-gradient(145deg, #111114, #0d0d0f)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    padding: "2rem",
    cursor: "pointer",
    transition: "border-color 0.3s ease, transform 0.3s ease",
  },
  brandHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.25rem",
  },
  brandLogo: {
    fontSize: "2.5rem",
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    fontSize: "1.4rem",
    fontWeight: 400,
    margin: "0 0 0.25rem",
  },
  brandCategory: {
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  brandDescription: {
    color: "rgba(240,236,224,0.6)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    lineHeight: 1.6,
    marginBottom: "1.25rem",
  },
  brandMeta: {
    display: "flex",
    gap: "1.5rem",
    marginBottom: "1.25rem",
    paddingBottom: "1.25rem",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  metaLabel: {
    color: "rgba(240,236,224,0.3)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.65rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  metaValue: {
    color: "#f0ece0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 600,
  },
  featuredPreview: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1.25rem",
  },
  previewImage: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  exploreBtn: {
    width: "100%",
    padding: "0.75rem",
    background: "transparent",
    border: "1px solid rgba(201,168,76,0.3)",
    borderRadius: "6px",
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    fontWeight: 600,
    letterSpacing: "0.05em",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  partnershipCta: {
    background: "linear-gradient(135deg, #1a1508 0%, #0a0a0b 100%)",
    border: "1px solid rgba(201,168,76,0.15)",
    borderRadius: "12px",
    padding: "3rem",
    textAlign: "center",
  },
  ctaTitle: {
    fontSize: "1.8rem",
    fontWeight: 300,
    margin: "0 0 0.5rem",
  },
  ctaText: {
    color: "rgba(240,236,224,0.5)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
  },
  ctaBtn: {
    padding: "0.9rem 2rem",
    background: "linear-gradient(135deg, #c9a84c, #a8853a)",
    border: "none",
    borderRadius: "6px",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
  },
};
