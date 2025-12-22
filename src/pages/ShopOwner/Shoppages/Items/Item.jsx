import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlusCircle } from "react-icons/fi";

import { showToast } from "../../../../store/slice/toast_slice";
import {
  additem,
  getitems,
  updateitem,
  deleteitem,
} from "../../../../store/slice/item_slice";

const Item = ({ shop }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.itemlist);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const categories = [
    "Snacks",
    "Gujrati Thali",
    "Breakfast",
    "Lunch",
    "Main Course",
    "Desserts",
    "Pizza",
    "Burgers",
    "Sandwiches",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ];

  const [form, setForm] = useState({
    itemname: "",
    price: "",
    category: "",
    foodtype: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ================= FETCH ITEMS ================= */
  useEffect(() => {
    if (shop?._id) {
      dispatch(getitems(shop._id));
    }
  }, [shop?._id, dispatch]);

  useEffect(() => {
    return () =>
      preview && preview.startsWith("blob:") && URL.revokeObjectURL(preview);
  }, [preview]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm({ itemname: "", price: "", category: "", foodtype: "" });
    setImage(null);
    setPreview(null);
    setIsEdit(false);
    setEditItem(null);
    setShowModal(false);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    try {
      if (isEdit) {
        if (image) {
          formData.append("foodimage", image); // ✅ only once
        }

        await dispatch(
          updateitem({
            itemId: editItem._id,
            data: formData,
          })
        );

        dispatch(
          showToast({ message: "Item updated successfully", type: "success" })
        );
      } else {
        if (!image) {
          dispatch(
            showToast({ message: "Please upload item image", type: "error" })
          );
          return;
        }

        formData.append("foodimage", image); // ✅ ONLY HERE
        await dispatch(additem({ shopId: shop._id, data: formData }));

        dispatch(
          showToast({ message: "Item added successfully", type: "success" })
        );
      }

      resetForm();
    } catch (error) {
      dispatch(
        showToast({
          message: isEdit ? "Failed to update item" : "Failed to add item",
          type: "error",
        })
      );
    }
  };

  /* ================= RENDER ================= */
  return (
    <div>
      {/* ADD ITEM BUTTON */}
      <button
        style={styles.addButton}
        disabled={!shop}
        onClick={() => setShowModal(true)}
      >
        <FiPlusCircle size={22} />
        Add Item
      </button>

      {/* MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <h3 style={styles.modalTitle}>
              {isEdit ? "✏️ Edit Item" : "🍽️ Add Item"}
            </h3>

            <form onSubmit={handleSubmit}>
              <input
                name="itemname"
                placeholder="Item Name"
                value={form.itemname}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <input
                name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                name="foodtype"
                value={form.foodtype}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">Food Type</option>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
              </select>

              <label style={styles.uploadBox}>
                {preview ? (
                  <img src={preview} alt="preview" style={styles.preview} />
                ) : (
                  <span>📷 Upload Item Image</span>
                )}
                <input type="file" hidden onChange={handleImage} />
              </label>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={styles.button}>
                  {isEdit ? "Update Item" : "Add Item"}
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

      {/* ITEM LIST */}
      {items.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No items added yet</p>
      ) : (
        <div style={styles.list}>
          {items.map((item) => (
            <div
              key={item._id}
              style={styles.listRow}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#fff6f1")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
            >
              {/* IMAGE */}
              <img
                src={item.foodimage}
                alt={item.itemname}
                style={styles.listImage}
              />

              {/* DETAILS */}
              <div style={styles.listInfo}>
                <h4 style={{ margin: 0 }}>{item.itemname}</h4>
                <p style={styles.meta}>
                  {item.category} • {item.foodtype}
                </p>
              </div>

              {/* PRICE */}
              <div style={styles.price}>₹{item.price}</div>

              {/* ACTIONS */}
              <div style={styles.actions}>
                <button
                  style={styles.editBtn}
                  onClick={() => {
                    setEditItem(item);
                    setForm({
                      itemname: item.itemname,
                      price: item.price,
                      category: item.category,
                      foodtype: item.foodtype,
                    });
                    setPreview(item.foodimage);
                    setIsEdit(true);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>

                <button
                  style={{ ...styles.editBtn, background: "#d9534f" }}
                  onClick={() => {
                    dispatch(deleteitem(item._id));
                    dispatch(
                      showToast({ message: "Item deleted", type: "error" })
                    );
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Item;

/* ================= STYLES ================= */
const styles = {
  addButton: {
    background: "linear-gradient(135deg, #FF7F50, #FF4500)",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    padding: "12px 22px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "18px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "15px",
  },

  listRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#fff",
    padding: "12px",
    borderRadius: "14px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
    transition: "background 0.2s ease",
  },

  listImage: {
    width: "70px",
    height: "70px",
    borderRadius: "12px",
    objectFit: "cover",
  },

  listInfo: {
    flex: 1,
  },

  meta: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#777",
  },

  price: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#ff671e",
    minWidth: "80px",
    textAlign: "right",
  },

  actions: {
    display: "flex",
    gap: "8px",
  },

  editBtn: {
    background: "#ff671e",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    zIndex: 1000,
  },

  modalContainer: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "520px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
  },

  modalTitle: {
    textAlign: "center",
    color: "#ff671e",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "15px",
  },

  uploadBox: {
    height: "150px",
    border: "2px dashed #ff671e",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "18px",
    cursor: "pointer",
    color: "#ff671e",
    fontWeight: "600",
  },

  preview: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "12px",
  },

  button: {
    flex: 1,
    padding: "14px",
    background: "#ff671e",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },

  cancelButton: {
    flex: 1,
    padding: "14px",
    background: "#999",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 10px 22px rgba(0,0,0,0.12)",
    overflow: "hidden",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },

  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
  },
};

