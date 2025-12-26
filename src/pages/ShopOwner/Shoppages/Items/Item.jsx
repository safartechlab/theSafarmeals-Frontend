import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlusCircle } from "react-icons/fi";
import { BiFoodTag } from "react-icons/bi";

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

  useEffect(() => {
    if (shop?._id) dispatch(getitems(shop._id));
  }, [shop?._id, dispatch]);

  useEffect(() => {
    return () =>
      preview && preview.startsWith("blob:") && URL.revokeObjectURL(preview);
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
    setForm({ itemname: "", price: "", category: "", foodtype: "" });
    setImage(null);
    setPreview(null);
    setIsEdit(false);
    setEditItem(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!form.itemname || !form.price || !form.category || !form.foodtype) {
      dispatch(showToast({ message: "Please fill all fields", type: "error" }));
      return;
    }

    const formData = new FormData();
    formData.append("itemname", form.itemname);
    formData.append("price", Number(form.price)); // ensure number
    formData.append("category", form.category);
    formData.append("foodtype", form.foodtype);

    // Only append image if selected
    if (image) {
      formData.append("foodimage", image);
    } else if (!isEdit) {
      // If adding new item, image is required
      dispatch(
        showToast({ message: "Please upload item image", type: "error" })
      );
      return;
    }

    try {
      if (isEdit) {
        await dispatch(updateitem({ itemId: editItem._id, data: formData }));
        dispatch(
          showToast({ message: "Item updated successfully", type: "success" })
        );
      } else {
        await dispatch(additem({ shopId: shop._id, data: formData }));
        dispatch(
          showToast({ message: "Item added successfully", type: "success" })
        );
      }

      resetForm();
    } catch (error) {
      console.error(error); // log the backend error for debugging
      dispatch(showToast({ message: "Action failed", type: "error" }));
    }
  };

  return (
    <div>
      <button
        style={styles.addButton}
        disabled={!shop}
        onClick={() => setShowModal(true)}
      >
        <FiPlusCircle size={22} /> Add Item
      </button>

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
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
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
                  {isEdit ? "Update" : "Add"}
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

      <div style={styles.list}>
        {items.map((item) => (
          <div key={item._id} style={styles.listRow}>
            <img
              src={item.foodimage}
              alt={item.itemname}
              style={styles.listImage}
            />

            <div style={styles.listInfo}>
              <h4 style={styles.itemTitle}>{item.itemname}</h4>
              <p style={styles.meta}>{item.category}</p>

              <div style={styles.foodBadge}>
                <BiFoodTag
                  style={{
                    color: item.foodtype === "veg" ? "#2ecc71" : "#e74c3c",
                  }}
                />
                <span>{item.foodtype}</span>
              </div>
            </div>

            <div style={styles.price}>₹{item.price}</div>

            <div style={styles.actions}>
              <button
                style={styles.editBtn}
                onClick={() => {
                  setEditItem(item);
                  setForm(item);
                  setPreview(item.foodimage);
                  setIsEdit(true);
                  setShowModal(true);
                }}
              >
                Edit
              </button>

              <button
                style={{ ...styles.editBtn, background: "#d9534f" }}
                onClick={() => dispatch(deleteitem(item._id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;

/* ================= STYLES ================= */
const styles = {
  addButton: {
    background: "linear-gradient(135deg,#FF7F50,#FF4500)",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    padding: "12px 22px",
    fontSize: "17px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    marginBottom: "18px",
  },

  list: { display: "flex", flexDirection: "column", gap: "12px" },

  listRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#fff",
    padding: "12px",
    borderRadius: "14px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
  },

  listImage: {
    width: "70px",
    height: "70px",
    borderRadius: "12px",
    objectFit: "cover",
  },

  listInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  itemTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
  },

  meta: {
    fontSize: "12px",
    color: "#888",
    textTransform: "capitalize",
  },
  foodBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    fontWeight: "600",
    padding: "3px 8px",
    borderRadius: "8px",
    background: "#f5f5f5",
    width: "fit-content",
    textTransform: "capitalize",
  },

  food: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    fontWeight: "500",
  },

  price: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#ff671e",
    minWidth: "80px",
    textAlign: "right",
  },

  actions: { display: "flex", gap: "8px" },

  editBtn: {
    background: "#ff671e",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "10px",
    cursor: "pointer",
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
