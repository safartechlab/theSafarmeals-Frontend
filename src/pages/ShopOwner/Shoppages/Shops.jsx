import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addshop, getshop } from "../../../store/slice/shop_slice";
import { FiPlusCircle } from "react-icons/fi";

const Shops = () => {
  const dispatch = useDispatch();
  const shoplist = useSelector((state) => state.shop?.shoplist || []);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    shopname: "",
    city: "",
    state: "",
    address: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch shops on load
  useEffect(() => {
    dispatch(getshop());
  }, [dispatch]);

  // Cleanup preview URL
  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload shop image");

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    data.append("image", image);

    dispatch(addshop(data));
    setForm({ shopname: "", city: "", state: "", address: "" });
    setImage(null);
    setPreview(null);
    setShowModal(false); // close modal
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.addButton}
        onClick={() => setShowModal(true)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <FiPlusCircle size={28} />
        Add Shop
        <span style={styles.slogan}>Start Your Food Journey!</span>
      </button>

      {/* MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <h2 style={styles.modalTitle}>🏪 Add Your Shop</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="shopname"
                placeholder="Shop Name"
                value={form.shopname}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <div style={styles.row}>
                <input
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <input
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <textarea
                name="address"
                placeholder="Full Address"
                value={form.address}
                onChange={handleChange}
                style={styles.textarea}
                required
              />
              <label style={styles.uploadBox}>
                {preview ? (
                  <img src={preview} alt="preview" style={styles.preview} />
                ) : (
                  <span>📷 Upload Shop Image</span>
                )}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={styles.button}>
                  Add Shop
                </button>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SHOP LIST */}
      <div style={styles.listContainer}>
        <h3 style={styles.listTitle}>Your Shops</h3>
        {shoplist.length === 0 ? (
          <p style={{ textAlign: "center" }}>No shops added yet</p>
        ) : (
          <div style={styles.grid}>
            {shoplist.map((shop) => (
              <div key={shop._id} style={styles.shopCard}>
                <img
                  src={shop.image}
                  alt={shop.shopname}
                  style={styles.shopImage}
                />
                <div style={styles.shopInfo}>
                  <h4>{shop.shopname}</h4>
                  <p>
                    {shop.city}, {shop.state}
                  </p>
                  <small>{shop.address}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shops;

const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#f7f7f7",
    
  },
  addButton: {
    background: "linear-gradient(135deg, #FF7F50, #FF4500)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "16px 24px",
    fontSize: "24px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  slogan: {
    fontSize: "12px",
    fontWeight: "400",
    opacity: 0.9,
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    zIndex: 1000,
  },
  modalContainer: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "900px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    overflowY: "auto",
    maxHeight: "90vh",
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#ff671e",
    fontSize: "24px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "12px",
  },
  row: { display: "flex", gap: "10px" },
  uploadBox: {
    height: "140px",
    border: "2px dashed #ff671e",
    borderRadius: "10px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "#ff671e",
    overflow: "hidden",
  },
  preview: { width: "100%", height: "100%", objectFit: "cover" },
  button: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#ff671e",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  cancelButton: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#aaa",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  listContainer: { width: "100%", maxWidth: "900px", },
  listTitle: { marginBottom: "15px", color: "#ff671e", textAlign: "center", marginTop: "30px"},
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
  },
  shopCard: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  shopImage: { width: "100%", height: "150px", objectFit: "cover" },
  shopInfo: { padding: "10px" },
};
