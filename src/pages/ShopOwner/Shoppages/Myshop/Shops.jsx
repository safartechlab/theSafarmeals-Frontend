import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlusCircle, FiEdit, FiTrash2 } from "react-icons/fi";
import Item from "../Items/Item";

import { showToast } from "../../../../store/slice/toast_slice";
import {
  addshop,
  getshop,
  updateshop,
  deleteshop,
} from "../../../../store/slice/shop_slice";

const Shops = () => {
  const dispatch = useDispatch();
  const shoplist = useSelector((state) => state.shop?.shoplist || []);

  const [showModal, setShowModal] = useState(false);
  const [editShop, setEditShop] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const [form, setForm] = useState({
    shopname: "",
    city: "",
    state: "",
    address: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(getshop());
  }, [dispatch]);

  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm({ shopname: "", city: "", state: "", address: "" });
    setImage(null);
    setPreview(null);
    setEditShop(null);
    setIsEdit(false);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append("image", image);

    if (isEdit) {
      dispatch(updateshop({ id: editShop._id, data }));
      dispatch(showToast({ message: "Shop updated successfully", type: "success" }));
    } else {
      if (!image) {
        dispatch(showToast({ message: "Please upload shop image", type: "error" }));
        return;
      }
      dispatch(addshop(data));
      dispatch(showToast({ message: "Shop added successfully", type: "success" }));
    }

    resetForm();
  };

  return (
    <div style={styles.container}>
      {/* ADD SHOP BUTTON */}
      <button style={styles.addButton} onClick={() => setShowModal(true)}>
        <FiPlusCircle size={28} />
        Add Shop
      </button>

      {/* MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <h2 style={styles.modalTitle}>
              {isEdit ? "✏️ Edit Shop" : "🏪 Add Your Shop"}
            </h2>

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
                <input type="file" hidden onChange={handleImage} />
              </label>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={styles.button}>
                  {isEdit ? "Update Shop" : "Add Shop"}
                </button>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SHOPS LIST */}
      <div style={styles.listContainer}>
        <p style={styles.myshop}>My Shops </p>
        {shoplist.length === 0 ? (
          <p style={styles.emptyText}>No shops added yet</p>
        ) : (
          shoplist.map((shop) => (
            <div
              key={shop._id}
              style={{
                ...styles.listRow,
                border:
                  selectedShop?._id === shop._id
                    ? "2px solid #ff671e"
                    : "1px solid #eee",
              }}
              onClick={() => setSelectedShop(shop)}
            >
              <img src={shop.image} alt={shop.shopname} style={styles.listImage} />

              <div style={styles.listInfo}>
                <h3 style={styles.shopName}>{shop.shopname}</h3>
                <p style={styles.shopAddress}>
                  {shop.address}, {shop.city}, {shop.state}
                </p>
              </div>

              <div style={styles.actions}>
                <button
                  style={styles.iconButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditShop(shop);
                    setForm({
                      shopname: shop.shopname,
                      city: shop.city,
                      state: shop.state,
                      address: shop.address,
                    });
                    setPreview(shop.image);
                    setIsEdit(true);
                    setShowModal(true);
                  }}
                >
                  <FiEdit />
                </button>

                <button
                  style={{ ...styles.iconButton, background: "#d9534f" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteshop(shop._id));
                    setSelectedShop(null);
                    dispatch(
                      showToast({
                        message: "Shop Deleted Successfully",
                        type: "error",
                      })
                    );
                  }}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT – ITEMS */}
      <div style={styles.rightPane}>
        {selectedShop ? (
          <>
            <h3 style={{ color: "#ff671e" }}>
              Items for {selectedShop.shopname}
            </h3>

            <Item shop={selectedShop} />
          </>
        ) : (
          <p style={{ textAlign: "center", marginTop: "40px" }}>
            👈 Select a shop to manage items
          </p>
        )}
      </div>
    </div>
  );
};

export default Shops;

// ===== STYLES =====
const styles = {

  myshop:{
    fontSize : "24px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: "700",
  },
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "#f7f7f7",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  addButton: {
    background: "linear-gradient(135deg, #FF7F50, #FF4500)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 20px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
    boxShadow: "0 6px 20px rgba(255,103,30,0.3)",
    transition: "all 0.2s ease",
  },

  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  listRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px 16px",
    borderRadius: "12px",
    background: "#fff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },

  listImage: {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    objectFit: "cover",
  },

  listInfo: {
    flex: 1,
  },

  shopName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
  },

  shopAddress: {
    margin: "4px 0 0",
    fontSize: "14px",
    color: "#777",
  },

  actions: {
    display: "flex",
    gap: "8px",
  },

  iconButton: {
    background: "#ff671e",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    padding: "8px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },

  rightPane: {
    marginTop: "40px",
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  emptyText: {
    textAlign: "center",
    color: "#555",
    fontStyle: "italic",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(4px)",
    zIndex: 1000,
  },

  modalContainer: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  },

  modalTitle: {
    textAlign: "center",
    color: "#ff671e",
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "15px",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "15px",
  },

  row: {
    display: "flex",
    gap: "12px",
  },

  uploadBox: {
    height: "140px",
    border: "2px dashed #ff671e",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "16px",
    cursor: "pointer",
    color: "#ff671e",
    fontWeight: "600",
    fontSize: "14px",
  },

  preview: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  },

  button: {
    flex: 1,
    padding: "12px",
    background: "#ff671e",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },

  cancelButton: {
    flex: 1,
    padding: "12px",
    background: "#999",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
