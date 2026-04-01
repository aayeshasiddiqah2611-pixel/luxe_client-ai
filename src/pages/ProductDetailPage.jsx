import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { getProductById, products } from "../data/products";

function Navbar() {
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

function ImageGallery({ images, productName }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div style={galleryStyles.container}>
      <div style={galleryStyles.thumbnails}>
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedIndex(idx)}
            style={{
              ...galleryStyles.thumb,
              borderColor: selectedIndex === idx ? "#c9a84c" : "rgba(255,255,255,0.1)",
              opacity: selectedIndex === idx ? 1 : 0.6,
            }}
          >
            <img src={img} alt={`${productName} ${idx + 1}`} style={galleryStyles.thumbImg} />
          </motion.div>
        ))}
      </div>

      <div
        style={galleryStyles.mainImage}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex]}
            alt={productName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: isZoomed ? 1.1 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={galleryStyles.mainImg}
          />
        </AnimatePresence>
        <div style={galleryStyles.zoomHint}>Hover to zoom</div>
      </div>
    </div>
  );
}

function StarRating({ rating, reviews }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div style={ratingStyles.container}>
      <div style={ratingStyles.stars}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={ratingStyles.star}>
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "½" : "☆"}
          </span>
        ))}
      </div>
      <span style={ratingStyles.rating}>{rating}</span>
      <span style={ratingStyles.reviews}>({reviews.toLocaleString()} ratings)</span>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addedToCart, setAddedToCart] = useState(false);

  const product = getProductById(id);

  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
    window.scrollTo(0, 0);
  }, [product, navigate]);

  if (!product) return null;

  const cartItem = cartItems.find(item => item.id === product.id);
  const inCartQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={pageStyles.root}>
      <Navbar />

      <div style={pageStyles.container}>
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={pageStyles.breadcrumb}
        >
          <Link to="/" style={pageStyles.breadLink}>Home</Link>
          <span style={pageStyles.breadSep}>›</span>
          <Link to="/products" style={pageStyles.breadLink}>Products</Link>
          <span style={pageStyles.breadSep}>›</span>
          <span style={pageStyles.breadCurrent}>{product.category}</span>
          <span style={pageStyles.breadSep}>›</span>
          <span style={pageStyles.breadCurrent}>{product.name}</span>
        </motion.div>

        {/* Main Product Section */}
        <div style={pageStyles.mainSection}>
          {/* Left - Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={pageStyles.imageSection}
          >
            <ImageGallery images={product.images} productName={product.name} />
          </motion.div>

          {/* Right - Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={pageStyles.detailsSection}
          >
            <span style={pageStyles.brand}>{product.specifications.Brand}</span>
            <h1 style={pageStyles.title}>{product.name}</h1>

            <StarRating rating={product.rating} reviews={product.reviews} />

            <div style={pageStyles.priceSection}>
              <div style={pageStyles.priceRow}>
                <span style={pageStyles.currentPrice}>{product.displayPrice}</span>
                <span style={pageStyles.originalPrice}>{product.originalPrice}</span>
                <span style={pageStyles.discount}>{product.discount}</span>
              </div>
              <p style={pageStyles.taxInfo}>Inclusive of all taxes</p>
            </div>

            <div style={pageStyles.offers}>
              <p style={pageStyles.offerTitle}>✦ Offers Available</p>
              <ul style={pageStyles.offerList}>
                <li>10% off on first purchase with code LUXE10</li>
                <li>Free premium gift packaging</li>
                <li>EMI starting at ${Math.round(product.price / 12)}/month</li>
              </ul>
            </div>

            <div style={pageStyles.deliveryInfo}>
              <p style={pageStyles.deliveryText}>
                <span style={pageStyles.deliveryIcon}>🚚</span>
                {product.delivery}
              </p>
              <p style={pageStyles.returnText}>
                <span style={pageStyles.returnIcon}>↩</span>
                {product.returnPolicy}
              </p>
            </div>

            <div style={pageStyles.stockInfo}>
              {product.stockCount < 20 ? (
                <span style={pageStyles.lowStock}>Only {product.stockCount} left in stock!</span>
              ) : (
                <span style={pageStyles.inStock}>✓ In Stock</span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div style={pageStyles.actionSection}>
              <div style={pageStyles.quantitySelector}>
                <span style={pageStyles.qtyLabel}>Quantity:</span>
                <div style={pageStyles.qtyControls}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={pageStyles.qtyBtn}
                  >
                    −
                  </button>
                  <span style={pageStyles.qtyValue}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(5, quantity + 1))}
                    style={pageStyles.qtyBtn}
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={pageStyles.buttonRow}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  style={{
                    ...pageStyles.addToCartBtn,
                    background: addedToCart
                      ? "linear-gradient(135deg, #22c55e, #16a34a)"
                      : "linear-gradient(135deg, #c9a84c, #a8853a)",
                  }}
                >
                  {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={pageStyles.buyNowBtn}
                >
                  Buy Now
                </motion.button>
              </div>
            </div>

            {inCartQuantity > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={pageStyles.inCartMsg}
              >
                {inCartQuantity} in cart
              </motion.p>
            )}

            <div style={pageStyles.warrantyInfo}>
              <span style={pageStyles.warrantyIcon}>🛡</span>
              <span>{product.warranty}</span>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={pageStyles.tabsSection}
        >
          <div style={pageStyles.tabHeaders}>
            {["description", "highlights", "specifications"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...pageStyles.tabBtn,
                  borderBottom: activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent",
                  color: activeTab === tab ? "#c9a84c" : "rgba(240,236,224,0.5)",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div style={pageStyles.tabContent}>
            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={pageStyles.tabPanel}
              >
                <p style={pageStyles.description}>{product.description}</p>
              </motion.div>
            )}

            {activeTab === "highlights" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={pageStyles.tabPanel}
              >
                <ul style={pageStyles.highlightsList}>
                  {product.highlights.map((highlight, idx) => (
                    <li key={idx} style={pageStyles.highlightItem}>
                      <span style={pageStyles.highlightBullet}>◆</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === "specifications" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={pageStyles.tabPanel}
              >
                <table style={pageStyles.specsTable}>
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} style={pageStyles.specRow}>
                        <td style={pageStyles.specKey}>{key}</td>
                        <td style={pageStyles.specValue}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={pageStyles.relatedSection}
          >
            <h2 style={pageStyles.relatedTitle}>You May Also Like</h2>
            <div style={pageStyles.relatedGrid}>
              {relatedProducts.map((item, idx) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={pageStyles.relatedCard}
                  >
                    <img src={item.images[0]} alt={item.name} style={pageStyles.relatedImg} />
                    <p style={pageStyles.relatedName}>{item.shortName}</p>
                    <p style={pageStyles.relatedPrice}>{item.displayPrice}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
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
    transition: "color 0.2s",
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

const galleryStyles = {
  container: {
    display: "flex",
    gap: "1rem",
  },
  thumbnails: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  thumb: {
    width: "70px",
    height: "70px",
    border: "2px solid rgba(255,255,255,0.1)",
    borderRadius: "4px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  thumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  mainImage: {
    flex: 1,
    background: "#111",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative",
    minHeight: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    maxHeight: "500px",
  },
  zoomHint: {
    position: "absolute",
    bottom: "1rem",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0,0,0,0.7)",
    color: "rgba(240,236,224,0.6)",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    fontSize: "0.75rem",
    fontFamily: "'Montserrat', sans-serif",
  },
};

const ratingStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  stars: {
    display: "flex",
    gap: "0.1rem",
  },
  star: {
    color: "#c9a84c",
    fontSize: "1.1rem",
  },
  rating: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  reviews: {
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
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
    padding: "2rem 4vw",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "2rem",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
  },
  breadLink: {
    color: "rgba(240,236,224,0.5)",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  breadSep: {
    color: "rgba(240,236,224,0.3)",
  },
  breadCurrent: {
    color: "rgba(240,236,224,0.7)",
  },
  mainSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4rem",
    marginBottom: "4rem",
  },
  imageSection: {
    position: "sticky",
    top: "100px",
    height: "fit-content",
  },
  detailsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  brand: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 400,
    margin: "0 0 0.5rem",
    lineHeight: 1.2,
  },
  priceSection: {
    padding: "1.5rem 0",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "0.5rem",
  },
  currentPrice: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#f0ece0",
  },
  originalPrice: {
    fontSize: "1.2rem",
    color: "rgba(240,236,224,0.4)",
    textDecoration: "line-through",
  },
  discount: {
    background: "#c9a84c",
    color: "#0a0a0b",
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    fontSize: "0.75rem",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
  },
  taxInfo: {
    color: "rgba(240,236,224,0.4)",
    fontSize: "0.8rem",
    fontFamily: "'Montserrat', sans-serif",
    margin: 0,
  },
  offers: {
    background: "rgba(201,168,76,0.05)",
    border: "1px solid rgba(201,168,76,0.15)",
    borderRadius: "8px",
    padding: "1rem",
  },
  offerTitle: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 600,
    margin: "0 0 0.75rem",
  },
  offerList: {
    margin: 0,
    paddingLeft: "1.25rem",
    color: "rgba(240,236,224,0.7)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    lineHeight: 1.8,
  },
  deliveryInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  deliveryText: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "rgba(240,236,224,0.7)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    margin: 0,
  },
  deliveryIcon: {
    fontSize: "1rem",
  },
  returnText: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "rgba(240,236,224,0.7)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    margin: 0,
  },
  returnIcon: {
    fontSize: "1rem",
  },
  stockInfo: {
    marginTop: "0.5rem",
  },
  inStock: {
    color: "#22c55e",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
  },
  lowStock: {
    color: "#ef4444",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  actionSection: {
    marginTop: "1rem",
  },
  quantitySelector: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem",
  },
  qtyLabel: {
    color: "rgba(240,236,224,0.6)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
  },
  qtyControls: {
    display: "flex",
    alignItems: "center",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "4px",
    overflow: "hidden",
  },
  qtyBtn: {
    width: "36px",
    height: "36px",
    background: "transparent",
    border: "none",
    color: "#f0ece0",
    fontSize: "1.2rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyValue: {
    width: "40px",
    textAlign: "center",
    color: "#f0ece0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
  },
  buttonRow: {
    display: "flex",
    gap: "1rem",
  },
  addToCartBtn: {
    flex: 1,
    padding: "1rem 2rem",
    border: "none",
    borderRadius: "4px",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  buyNowBtn: {
    flex: 1,
    padding: "1rem 2rem",
    background: "transparent",
    border: "2px solid #c9a84c",
    borderRadius: "4px",
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  inCartMsg: {
    color: "#22c55e",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    textAlign: "center",
  },
  warrantyInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "rgba(240,236,224,0.5)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    marginTop: "0.5rem",
  },
  warrantyIcon: {
    fontSize: "1rem",
  },
  tabsSection: {
    marginBottom: "4rem",
  },
  tabHeaders: {
    display: "flex",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    marginBottom: "1.5rem",
  },
  tabBtn: {
    padding: "1rem 2rem",
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    color: "rgba(240,236,224,0.5)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  tabContent: {
    minHeight: "200px",
  },
  tabPanel: {
    animation: "fadeIn 0.3s ease",
  },
  description: {
    color: "rgba(240,236,224,0.8)",
    fontSize: "1.1rem",
    lineHeight: 1.8,
    maxWidth: "800px",
  },
  highlightsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "grid",
    gap: "0.75rem",
  },
  highlightItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    color: "rgba(240,236,224,0.8)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
  },
  highlightBullet: {
    color: "#c9a84c",
  },
  specsTable: {
    width: "100%",
    maxWidth: "600px",
    borderCollapse: "collapse",
  },
  specRow: {
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  specKey: {
    padding: "1rem 0",
    color: "rgba(240,236,224,0.5)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    width: "40%",
  },
  specValue: {
    padding: "1rem 0",
    color: "rgba(240,236,224,0.9)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
  },
  relatedSection: {
    marginTop: "4rem",
    paddingTop: "4rem",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  relatedTitle: {
    fontSize: "1.5rem",
    fontWeight: 400,
    marginBottom: "2rem",
  },
  relatedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1.5rem",
  },
  relatedCard: {
    background: "linear-gradient(145deg, #111114, #0d0d0f)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "8px",
    overflow: "hidden",
    padding: "1rem",
    transition: "all 0.3s",
  },
  relatedImg: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "4px",
    marginBottom: "0.75rem",
  },
  relatedName: {
    color: "#f0ece0",
    fontSize: "0.9rem",
    margin: "0 0 0.5rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  relatedPrice: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 600,
    margin: 0,
  },
};
