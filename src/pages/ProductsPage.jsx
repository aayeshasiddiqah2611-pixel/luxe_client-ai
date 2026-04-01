import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { products as allProducts, categories } from "../data/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

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
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
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
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={cardStyles.quickView}
            >
              Quick View
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={cardStyles.body}>
        <span style={cardStyles.brand}>{product.specifications.Brand}</span>
        <span style={cardStyles.name} title={product.name}>{product.shortName}</span>
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            style={cardStyles.addBtn}
          >
            Add to Cart
          </motion.button>
        </div>
        <p style={cardStyles.delivery}>{product.delivery}</p>
      </div>
    </motion.div>
  );
}

function CartSidebar() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={cartStyles.overlay}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={cartStyles.sidebar}
          >
            <div style={cartStyles.header}>
              <h3 style={cartStyles.title}>Shopping Cart</h3>
              <button onClick={() => setIsCartOpen(false)} style={cartStyles.closeBtn}>✕</button>
            </div>

            {cartItems.length === 0 ? (
              <div style={cartStyles.empty}>
                <span style={cartStyles.emptyIcon}>◈</span>
                <p>Your cart is empty</p>
                <button onClick={() => setIsCartOpen(false)} style={cartStyles.continueBtn}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div style={cartStyles.items}>
                  {cartItems.map((item) => (
                    <div key={item.id} style={cartStyles.item}>
                      <div style={cartStyles.itemEmoji}>{item.emoji}</div>
                      <div style={cartStyles.itemDetails}>
                        <span style={cartStyles.itemName}>{item.name}</span>
                        <span style={cartStyles.itemPrice}>{item.price}</span>
                        <div style={cartStyles.quantityRow}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={cartStyles.qtyBtn}
                          >
                            −
                          </button>
                          <span style={cartStyles.qty}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={cartStyles.qtyBtn}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={cartStyles.removeBtn}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div style={cartStyles.footer}>
                  <div style={cartStyles.totalRow}>
                    <span>Subtotal</span>
                    <span style={cartStyles.total}>${cartTotal.toLocaleString()}</span>
                  </div>
                  <p style={cartStyles.shipping}>Shipping & taxes calculated at checkout</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    style={cartStyles.checkoutBtn}
                  >
                    Proceed to Checkout
                  </motion.button>
                  <button onClick={clearCart} style={cartStyles.clearBtn}>
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div style={pageStyles.root}>
      <Navbar />

      <div style={pageStyles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={pageStyles.header}
        >
          <h1 style={pageStyles.title}>All Products</h1>
          <p style={pageStyles.subtitle}>Discover our curated collection of luxury items</p>
        </motion.div>

        <div style={pageStyles.controls}>
          <div style={pageStyles.searchBox}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={pageStyles.searchInput}
            />
          </div>

          <div style={pageStyles.filterRow}>
            <div style={pageStyles.categories}>
              {categories.map((cat) => (
                <motion.button
                  key={cat.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(cat.name)}
                  style={{
                    ...pageStyles.categoryBtn,
                    background: selectedCategory === cat.name
                      ? "linear-gradient(135deg, #c9a84c, #a8853a)"
                      : "transparent",
                    color: selectedCategory === cat.name ? "#0a0a0b" : "rgba(240,236,224,0.6)",
                  }}
                >
                  {cat.name}
                </motion.button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={pageStyles.sortSelect}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={pageStyles.results}>
          <span style={pageStyles.count}>{filteredProducts.length} products</span>
        </div>

        <div style={pageStyles.grid}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={pageStyles.noResults}>
            <span style={pageStyles.noResultsIcon}>◈</span>
            <p>No products found</p>
            <button onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }} style={pageStyles.resetBtn}>
              Reset Filters
            </button>
          </div>
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
  quickView: {
    position: "absolute",
    bottom: "0.75rem",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(10,10,11,0.9)",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    padding: "0.5rem 1rem",
    borderRadius: "2px",
  },
  body: {
    padding: "1.2rem 1.25rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
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
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  stars: {
    color: "#c9a84c",
    fontSize: "0.8rem",
    letterSpacing: "0.1em",
  },
  reviews: {
    color: "rgba(240,236,224,0.3)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.7rem",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.5rem",
  },
  price: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
  },
  addBtn: {
    padding: "0.5rem 1rem",
    background: "linear-gradient(135deg, #c9a84c, #a8853a)",
    border: "none",
    borderRadius: "2px",
    color: "#0a0a0b",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  imageContainer: {
    height: "260px",
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
  ratingNum: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 600,
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
  delivery: {
    color: "#22c55e",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.7rem",
    margin: "0.25rem 0 0",
  },
};

const cartStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    zIndex: 200,
  },
  sidebar: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "400px",
    maxWidth: "100%",
    height: "100vh",
    background: "linear-gradient(180deg, #111114, #0a0a0b)",
    borderLeft: "1px solid rgba(201,168,76,0.15)",
    zIndex: 201,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  title: {
    color: "#f0ece0",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.5rem",
    fontWeight: 400,
    margin: 0,
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "rgba(240,236,224,0.5)",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  empty: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
  },
  emptyIcon: {
    fontSize: "3rem",
    color: "rgba(201,168,76,0.3)",
  },
  continueBtn: {
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    background: "transparent",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    letterSpacing: "0.1em",
    cursor: "pointer",
    borderRadius: "2px",
  },
  items: {
    flex: 1,
    overflowY: "auto",
    padding: "1rem",
  },
  item: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.04)",
    borderRadius: "2px",
    marginBottom: "0.75rem",
  },
  itemEmoji: {
    fontSize: "2rem",
    color: "#c9a84c",
  },
  itemDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  itemName: {
    color: "#f0ece0",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem",
  },
  itemPrice: {
    color: "#c9a84c",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 600,
  },
  quantityRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginTop: "0.5rem",
  },
  qtyBtn: {
    width: "28px",
    height: "28px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(240,236,224,0.6)",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  qty: {
    color: "#f0ece0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    minWidth: "20px",
    textAlign: "center",
  },
  removeBtn: {
    background: "none",
    border: "none",
    color: "rgba(240,236,224,0.3)",
    fontSize: "0.9rem",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
  footer: {
    padding: "1.5rem",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(0,0,0,0.3)",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
    color: "rgba(240,236,224,0.6)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
  },
  total: {
    color: "#f0ece0",
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  shipping: {
    color: "rgba(240,236,224,0.3)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    marginBottom: "1rem",
  },
  checkoutBtn: {
    width: "100%",
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
    marginBottom: "0.75rem",
  },
  clearBtn: {
    width: "100%",
    padding: "0.75rem",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    cursor: "pointer",
    borderRadius: "2px",
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
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  title: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 300,
    margin: "0 0 0.5rem",
  },
  subtitle: {
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    letterSpacing: "0.05em",
  },
  controls: {
    marginBottom: "2rem",
  },
  searchBox: {
    marginBottom: "1.5rem",
  },
  searchInput: {
    width: "100%",
    maxWidth: "400px",
    padding: "0.9rem 1.25rem",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "2px",
    color: "#f0ece0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
  },
  filterRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  },
  categories: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  categoryBtn: {
    padding: "0.6rem 1.2rem",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "2px",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  sortSelect: {
    padding: "0.6rem 1rem",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "2px",
    color: "rgba(240,236,224,0.6)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    cursor: "pointer",
  },
  results: {
    marginBottom: "1.5rem",
  },
  count: {
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    letterSpacing: "0.05em",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  noResults: {
    textAlign: "center",
    padding: "4rem 2rem",
    color: "rgba(240,236,224,0.4)",
    fontFamily: "'Montserrat', sans-serif",
  },
  noResultsIcon: {
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
    letterSpacing: "0.1em",
    cursor: "pointer",
    borderRadius: "2px",
  },
};
