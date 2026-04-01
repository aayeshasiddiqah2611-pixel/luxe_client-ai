import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartSidebar() {
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
                        <span style={cartStyles.itemName}>{item.shortName || item.name}</span>
                        <span style={cartStyles.itemPrice}>${item.price.toLocaleString()}</span>
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
    fontSize: "0.8rem",
    letterSpacing: "0.1em",
    cursor: "pointer",
    borderRadius: "2px",
  },
};
