import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../../../store/slice/item_slice";
import { motion, AnimatePresence } from "framer-motion";
import "./menu.css";

const categories = [
  "All",
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

const Menu = () => {
  const dispatch = useDispatch();
  const { itemlist, loading } = useSelector((state) => state.item);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedShop, setSelectedShop] = useState("");
  const [foodType, setFoodType] = useState("");

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  // const shopList = useMemo(() => {
  //   return [...new Set(itemlist.map((i) => i.shop?.shopname))];
  // }, [itemlist]);

  const filteredItems = useMemo(() => {
    let data = [...itemlist];
    const query = search.toLowerCase().trim();

    if (query) {
      data = data.filter(
        (i) =>
          i.itemname?.toLowerCase().includes(query) ||
          i.shop?.shopname?.toLowerCase().includes(query)
      );
    }

    if (selectedShop)
      data = data.filter((i) => i.shop?.shopname === selectedShop);

    if (foodType) data = data.filter((i) => i.foodtype === foodType);

    if (activeCategory !== "All")
      data = data.filter((i) => i.category === activeCategory);

    return data;
  }, [itemlist, search, activeCategory, selectedShop, foodType]);

  return (
    <div className="menu container-fluid">
      <div className=" container">
        {/* HERO */}
        <div className="menu-hero">
          <h1>What are you craving today?</h1>

          <div className="hero-search">
            {/* Search */}
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                placeholder="Search dishes, restaurants..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <button className="clear-btn" onClick={() => setSearch("")}>
                  ✕
                </button>
              )}
            </div>
            <div className="food-filter">
              {["", "veg", "non-veg"].map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    checked={foodType === type}
                    onChange={() => setFoodType(type)}
                  />
                  {type === "" ? "All" : type}
                </label>
              ))}
            </div>
          </div>

          <div className="category-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                className={activeCategory === cat ? "active" : ""}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="menu-wrapper">
          <div className="menu-grid">
            {loading &&
              [...Array(8)].map((_, i) => (
                <div className="skeleton-card" key={i} />
              ))}

            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item._id}
                  className="food-card"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <img src={item.foodimage} alt={item.itemname} />

                  <div className="food-info">
                    <div className="title-row">
                      <h3>{item.itemname}</h3>
                      <span className={`dot ${item.foodtype}`} />
                    </div>

                    <p className="shop">{item.shop?.shopname}</p>

                    <div className="bottom-row">
                      <span className="price">₹{item.price}</span>
                      <button>Add</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
