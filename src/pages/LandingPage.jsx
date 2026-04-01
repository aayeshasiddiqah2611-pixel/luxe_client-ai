import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { products as allProducts, categories } from "../data/products";

// Use first 6 products for featured section
const featuredProducts = allProducts.slice(0, 6);

// ── Sub-components ───────────────────────────────────────────────────────────

function Navbar({ scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();

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
      style={{
        ...navStyles.nav,
        background: scrolled ? "rgba(10,10,11,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.1)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <div style={navStyles.logo}>
          <span style={navStyles.logoSym}>◆</span>
          <span style={navStyles.logoTxt}>LUXE</span>
        </div>
      </Link>

      {/* Desktop links */}
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

function HeroSection() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const words = ["Rare.", "Refined.", "Yours."];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} style={heroStyles.section}>
      {/* Parallax bg elements */}
      <motion.div style={{ ...heroStyles.bgOrb1, y }} />
      <motion.div style={{ ...heroStyles.bgOrb2, y: useTransform(scrollYProgress, [0, 1], [0, 60]) }} />
      <div style={heroStyles.gridOverlay} />

      <motion.div style={{ ...heroStyles.content, opacity }}>
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ delay: 0.4, duration: 1 }}
          style={heroStyles.eyebrow}
        >
          NEW SEASON 2026
        </motion.p>

        <h1 style={heroStyles.headline}>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={heroStyles.headlineLine}
          >
            Discover the
          </motion.span>
          <br />
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              style={heroStyles.headlineAccent}
            >
              {words[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          style={heroStyles.body}
        >
          Hand-curated pieces from the world's most<br />
          coveted ateliers — delivered to your door.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={heroStyles.btnRow}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(201,168,76,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/products")}
            style={heroStyles.primaryBtn}
          >
            Shop Now
          </motion.button>
          <motion.button
            whileHover={{ borderColor: "rgba(201,168,76,0.6)", color: "#c9a84c" }}
            onClick={() => navigate("/lookbook")}
            style={heroStyles.secondaryBtn}
          >
            View Lookbook →
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={heroStyles.stats}
        >
          {[["10K+", "Products"], ["180+", "Brands"], ["4.9★", "Rating"]].map(([val, lbl]) => (
            <div key={lbl} style={heroStyles.stat}>
              <span style={heroStyles.statVal}>{val}</span>
              <span style={heroStyles.statLbl}>{lbl}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        style={heroStyles.scrollIndicator}
      >
        <div style={heroStyles.scrollLine} />
        <span style={heroStyles.scrollText}>SCROLL</span>
      </motion.div>
    </section>
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

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}
      style={{
        ...cardStyles.card,
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        borderColor: hovered ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.06)",
        boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.1)" : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Product Image */}
      <div style={cardStyles.imageContainer}>
        {!imageLoaded && (
          <div style={cardStyles.imagePlaceholder}>
            <span style={cardStyles.placeholderEmoji}>{product.emoji}</span>
          </div>
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          style={{
            ...cardStyles.productImage,
            opacity: imageLoaded ? 1 : 0,
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <span style={cardStyles.tag}>{product.tag}</span>
        {product.discount && (
          <span style={cardStyles.discountBadge}>{product.discount}</span>
        )}
      </div>

      <div style={cardStyles.body}>
        <span style={cardStyles.brand}>{product.specifications.Brand}</span>
        <div style={cardStyles.nameRow}>
          <span style={cardStyles.name}>{product.shortName}</span>
        </div>
        <div style={cardStyles.ratingRow}>
          <span style={cardStyles.stars}>{"★".repeat(Math.floor(product.rating))}</span>
          <span style={cardStyles.ratingNum}>{product.rating}</span>
          <span style={cardStyles.reviews}>({product.reviews.toLocaleString()})</span>
        </div>
        <div style={cardStyles.priceRow}>
          <div style={cardStyles.priceCol}>
            <span style={cardStyles.currentPrice}>{product.displayPrice}</span>
            <span style={cardStyles.originalPrice}>{product.originalPrice}</span>
          </div>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              onClick={handleAddToCart}
              style={cardStyles.addBtn}
            >
              Add to Cart
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={pageStyles.root}>
      <Navbar scrolled={scrolled} />
      <HeroSection />

      {/* ── Products Section ── */}
      <section style={pageStyles.section}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={pageStyles.sectionHeader}
        >
          <span style={pageStyles.eyebrow}>CURATED FOR YOU</span>
          <h2 style={pageStyles.sectionTitle}>Featured Pieces</h2>
          <div style={pageStyles.titleUnderline} />
        </motion.div>

        <div style={pageStyles.productGrid}>
          {featuredProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <Link to="/products" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.03, borderColor: "#c9a84c", color: "#c9a84c" }}
              style={pageStyles.viewAllBtn}
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ── Banner ── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={pageStyles.banner}
      >
        <div style={pageStyles.bannerOverlay} />
        <div style={pageStyles.bannerContent}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={pageStyles.bannerEyebrow}
          >
            LIMITED TIME
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={pageStyles.bannerTitle}
          >
            Summer Edit: Up to 40% Off
          </motion.h2>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={pageStyles.bannerBtn}
            >
              Shop the Edit
            </motion.button>
          </Link>
        </div>
      </motion.section>

      {/* ── Categories ── */}
      <section style={pageStyles.section}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={pageStyles.sectionHeader}
        >
          <span style={pageStyles.eyebrow}>EXPLORE</span>
          <h2 style={pageStyles.sectionTitle}>Shop by Category</h2>
          <div style={pageStyles.titleUnderline} />
        </motion.div>

        <div style={pageStyles.catGrid}>
          {categories.map((cat, i) => (
            <Link key={cat.name} to="/products" style={{ textDecoration: "none" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.93 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.04, borderColor: "rgba(201,168,76,0.4)" }}
                style={pageStyles.catCard}
              >
                <span style={pageStyles.catIcon}>{cat.icon}</span>
                <span style={pageStyles.catName}>{cat.name}</span>
                <span style={pageStyles.catCount}>{cat.count}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={footerStyles.footer}>
        <div style={footerStyles.top}>
          <div style={footerStyles.brand}>
            <div style={footerStyles.logo}>
              <span style={{ color: "#c9a84c" }}>◆</span>
              <span style={footerStyles.logoTxt}>LUXE</span>
            </div>
            <p style={footerStyles.tagline}>Curated luxury, reimagined.</p>
          </div>
          {[
            { title: "Shop", links: ["New Arrivals", "Collections", "Brands", "Sale"] },
            { title: "Help", links: ["FAQ", "Shipping", "Returns", "Contact"] },
            { title: "Company", links: ["About", "Careers", "Press", "Privacy"] },
          ].map((col) => (
            <div key={col.title} style={footerStyles.col}>
              <span style={footerStyles.colTitle}>{col.title}</span>
              {col.links.map((l) => (
                <a key={l} href="#" style={footerStyles.footLink}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={footerStyles.bottom}>
          <span style={footerStyles.copyright}>© 2026 LUXE. All rights reserved.</span>
          <div style={footerStyles.socials}>
            {["◈ Instagram", "▣ Pinterest", "◉ TikTok"].map((s) => (
              <a key={s} href="#" style={footerStyles.socialLink}>{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

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
    transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
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
    transition: "color 0.2s",
    cursor: "pointer",
  },
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
  actions: { display: "flex", alignItems: "center", gap: "1.2rem" },
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

const heroStyles = {
  section: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0a0a0b",
    overflow: "hidden",
    padding: "0 6vw",
  },
  bgOrb1: {
    position: "absolute",
    top: "10%",
    left: "60%",
    width: "700px",
    height: "700px",
    background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)",
    pointerEvents: "none",
  },
  bgOrb2: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    maxWidth: "680px",
    zIndex: 2,
  },
  eyebrow: {
    display: "block",
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.4em",
    marginBottom: "1.5rem",
  },
  headline: {
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
    fontWeight: 300,
    color: "#f0ece0",
    margin: "0 0 1.5rem",
    lineHeight: 1.05,
  },
  headlineLine: { display: "inline" },
  headlineAccent: {
    display: "inline-block",
    color: "#c9a84c",
    fontStyle: "italic",
  },
  body: {
    color: "rgba(240,236,224,0.45)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    lineHeight: 1.8,
    letterSpacing: "0.04em",
    marginBottom: "2.5rem",
  },
  btnRow: { display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3.5rem" },
  primaryBtn: {
    padding: "1rem 2.5rem",
    background: "linear-gradient(135deg, #c9a84c, #a8853a)",
    border: "none",
    borderRadius: "2px",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.82rem",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "box-shadow 0.3s",
  },
  secondaryBtn: {
    padding: "1rem 2rem",
    background: "transparent",
    border: "1px solid rgba(240,236,224,0.2)",
    borderRadius: "2px",
    color: "rgba(240,236,224,0.6)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.82rem",
    letterSpacing: "0.1em",
    cursor: "pointer",
    transition: "border-color 0.25s, color 0.25s",
  },
  stats: { display: "flex", gap: "3rem" },
  stat: { display: "flex", flexDirection: "column", gap: "0.2rem" },
  statVal: {
    color: "#f0ece0",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.5rem",
    fontWeight: 400,
  },
  statLbl: {
    color: "rgba(240,236,224,0.3)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.68rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
  scrollIndicator: {
    position: "absolute",
    bottom: "2.5rem",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
  },
  scrollLine: {
    width: "1px",
    height: "40px",
    background: "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)",
  },
  scrollText: {
    color: "rgba(201,168,76,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.6rem",
    letterSpacing: "0.3em",
  },
};

const cardStyles = {
  card: {
    background: "linear-gradient(145deg, #111114, #0d0d0f)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "2px",
    overflow: "hidden",
    transition: "transform 0.4s ease, border-color 0.4s, box-shadow 0.4s",
    cursor: "pointer",
  },
  img: {
    height: "220px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transition: "background 0.4s",
  },
  emoji: {
    fontSize: "3rem",
    color: "#c9a84c",
    display: "block",
  },
  tag: {
    position: "absolute",
    top: "0.75rem",
    left: "0.75rem",
    background: "rgba(201,168,76,0.12)",
    border: "1px solid rgba(201,168,76,0.25)",
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.6rem",
    fontWeight: 700,
    letterSpacing: "0.2em",
    padding: "0.3rem 0.6rem",
    borderRadius: "1px",
  },
  body: {
    padding: "1.2rem 1.25rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    minHeight: "90px",
  },
  category: {
    color: "rgba(201,168,76,0.5)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
  },
  nameRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  name: {
    color: "#f0ece0",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.2rem",
    fontWeight: 400,
  },
  price: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.88rem",
    fontWeight: 600,
  },
  addBtn: {
    marginTop: "0.6rem",
    padding: "0.6rem",
    background: "linear-gradient(135deg, #c9a84c, #a8853a)",
    border: "none",
    borderRadius: "2px",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  imageContainer: {
    height: "220px",
    position: "relative",
    overflow: "hidden",
    background: "#0d0d0f",
  },
  imagePlaceholder: {
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
  brand: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    marginTop: "0.25rem",
  },
  stars: {
    color: "#c9a84c",
    fontSize: "0.75rem",
    letterSpacing: "0.05em",
  },
  ratingNum: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 600,
  },
  reviews: {
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.7rem",
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0.25rem",
  },
  priceCol: {
    display: "flex",
    flexDirection: "column",
    gap: "0.1rem",
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
    fontSize: "0.75rem",
    textDecoration: "line-through",
  },
};

const pageStyles = {
  root: {
    background: "#0a0a0b",
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    color: "#f0ece0",
    overflowX: "hidden",
  },
  section: {
    padding: "7rem 6vw",
    background: "#0a0a0b",
  },
  sectionHeader: {
    marginBottom: "3.5rem",
    maxWidth: "400px",
  },
  eyebrow: {
    display: "block",
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.4em",
    marginBottom: "0.75rem",
  },
  sectionTitle: {
    color: "#f0ece0",
    fontSize: "2.5rem",
    fontWeight: 300,
    margin: "0 0 1rem",
    lineHeight: 1.1,
  },
  titleUnderline: {
    width: "36px",
    height: "1px",
    background: "linear-gradient(90deg, #c9a84c, transparent)",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.5rem",
  },
  viewAllBtn: {
    padding: "0.9rem 2.5rem",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "2px",
    color: "rgba(240,236,224,0.5)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "border-color 0.25s, color 0.25s",
  },
  banner: {
    position: "relative",
    margin: "0 6vw",
    borderRadius: "2px",
    overflow: "hidden",
    background: "linear-gradient(135deg, #1a1508, #0f0e08, #0a0a0b)",
    border: "1px solid rgba(201,168,76,0.15)",
    padding: "5rem 4rem",
    marginBottom: "0",
  },
  bannerOverlay: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)",
    pointerEvents: "none",
  },
  bannerContent: { position: "relative", zIndex: 2, maxWidth: "500px" },
  bannerEyebrow: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.4em",
    marginBottom: "1rem",
  },
  bannerTitle: {
    color: "#f0ece0",
    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
    fontWeight: 300,
    margin: "0 0 2rem",
    lineHeight: 1.15,
  },
  bannerBtn: {
    padding: "0.9rem 2rem",
    background: "linear-gradient(135deg, #c9a84c, #a8853a)",
    border: "none",
    borderRadius: "2px",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  catGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
  },
  catCard: {
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "2px",
    background: "rgba(255,255,255,0.02)",
    padding: "2rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    cursor: "pointer",
    transition: "transform 0.3s, border-color 0.3s",
  },
  catIcon: { color: "#c9a84c", fontSize: "1.4rem", marginBottom: "0.25rem" },
  catName: {
    color: "#f0ece0",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.25rem",
    fontWeight: 400,
  },
  catCount: {
    color: "rgba(240,236,224,0.3)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
  },
};

const footerStyles = {
  footer: {
    background: "#060608",
    borderTop: "1px solid rgba(201,168,76,0.1)",
    padding: "5rem 6vw 2rem",
    fontFamily: "'Montserrat', sans-serif",
  },
  top: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "3rem",
    marginBottom: "4rem",
  },
  brand: {},
  logo: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" },
  logoTxt: {
    color: "#c9a84c",
    fontWeight: 700,
    fontSize: "0.8rem",
    letterSpacing: "0.4em",
  },
  tagline: {
    color: "rgba(240,236,224,0.25)",
    fontSize: "0.78rem",
    lineHeight: 1.6,
    letterSpacing: "0.05em",
    maxWidth: "200px",
  },
  col: { display: "flex", flexDirection: "column", gap: "0.9rem" },
  colTitle: {
    color: "rgba(240,236,224,0.6)",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: "0.25rem",
  },
  footLink: {
    color: "rgba(240,236,224,0.28)",
    fontSize: "0.78rem",
    textDecoration: "none",
    letterSpacing: "0.04em",
    transition: "color 0.2s",
  },
  bottom: {
    borderTop: "1px solid rgba(255,255,255,0.05)",
    paddingTop: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  },
  copyright: {
    color: "rgba(240,236,224,0.2)",
    fontSize: "0.72rem",
    letterSpacing: "0.08em",
  },
  socials: { display: "flex", gap: "1.5rem" },
  socialLink: {
    color: "rgba(240,236,224,0.25)",
    fontSize: "0.72rem",
    letterSpacing: "0.08em",
    textDecoration: "none",
  },
};
