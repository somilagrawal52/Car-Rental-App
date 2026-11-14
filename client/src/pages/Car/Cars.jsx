import React, { useEffect, useState, useMemo } from "react";
import CarCard from "../../Components/CarCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../Store/feature/CarSlice.js";
import { useLocation } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, RotateCcw, Car } from "lucide-react";

const Cars = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { cars, loading } = useSelector((state) => state.car);

  // Read initial category from URL if present
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "All";

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [selectedTransmission, setSelectedTransmission] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    const cat = queryParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [location.search]);

  // Categories list
  const categories = ["All", "Luxury", "SUV", "Sedan", "Electric", "Hatchback"];

  // Filter and Sort Logic
  const filteredCars = useMemo(() => {
    if (!cars || !Array.isArray(cars)) return [];

    return cars
      .filter((car) => {
        // Search term matching (name, model, about, category)
        const matchesSearch =
          !searchTerm ||
          car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.about?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.category?.toLowerCase().includes(searchTerm.toLowerCase());

        // Category matching
        const matchesCategory =
          selectedCategory === "All" ||
          car.category?.toLowerCase() === selectedCategory.toLowerCase();

        // Fuel matching
        const matchesFuel =
          selectedFuel === "All" ||
          car.fuel?.toLowerCase() === selectedFuel.toLowerCase();

        // Transmission matching
        const isCarAuto =
          car.transmission === true ||
          car.transmission === "true" ||
          car.transmission === "Automatic";
        const matchesTransmission =
          selectedTransmission === "All" ||
          (selectedTransmission === "Automatic" && isCarAuto) ||
          (selectedTransmission === "Manual" && !isCarAuto);

        return (
          matchesSearch &&
          matchesCategory &&
          matchesFuel &&
          matchesTransmission
        );
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
        if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
        if (sortBy === "year-new") return (b.year || 0) - (a.year || 0);
        return 0;
      });
  }, [cars, searchTerm, selectedCategory, selectedFuel, selectedTransmission, sortBy]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedFuel("All");
    setSelectedTransmission("All");
    setSortBy("default");
  };

  return (
    <div className="container py-5" style={{ minHeight: "85vh" }}>
      {/* Page Header */}
      <div className="text-center mb-4">
        <span
          className="text-primary fw-bold text-uppercase small"
          style={{ letterSpacing: "1px" }}
        >
          Self-Drive Collection
        </span>
        <h2 className="fw-bold text-dark mt-1">Explore Our Premium Fleet</h2>
        <p className="text-muted max-w-600 mx-auto">
          Every vehicle is 100% sanitized, insured, and verified with zero security deposit options.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-4 shadow-sm border border-light mb-4">
        <div className="row g-3 align-items-center">
          {/* Search Input */}
          <div className="col-lg-4 col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <Search size={16} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0"
                placeholder="Search by brand, model or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Fuel Filter */}
          <div className="col-lg-2 col-md-3 col-6">
            <select
              className="form-select bg-light"
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
            >
              <option value="All">All Fuels</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Transmission Filter */}
          <div className="col-lg-2 col-md-3 col-6">
            <select
              className="form-select bg-light"
              value={selectedTransmission}
              onChange={(e) => setSelectedTransmission(e.target.value)}
            >
              <option value="All">Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="col-lg-3 col-md-6 col-8">
            <select
              className="form-select bg-light"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort by: Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="col-lg-1 col-md-6 col-4 text-end">
            <button
              onClick={resetFilters}
              className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-1"
              title="Reset Filters"
            >
              <RotateCcw size={15} />
              <span className="d-none d-lg-inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Category Pills Row */}
        <div className="d-flex gap-2 flex-wrap mt-3 pt-3 border-top border-light">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`category-filter-pill ${
                selectedCategory === cat ? "active" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="d-flex justify-content-between align-items-center mb-3 px-1">
        <span className="text-muted small fw-semibold">
          Showing <span className="text-dark fw-bold">{filteredCars.length}</span> verified cars available
        </span>
      </div>

      {/* Cars Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-2">Loading fleet vehicles...</p>
        </div>
      ) : filteredCars.length > 0 ? (
        <div className="row">
          {filteredCars.map((car) => (
            <CarCard key={car._id || car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-white rounded-4 border border-light p-5 my-4">
          <Car size={48} className="text-muted mb-3" />
          <h4 className="fw-bold text-dark">No matching vehicles found</h4>
          <p className="text-muted mb-4">
            Try adjusting your search criteria or resetting filters to explore all available fleet options.
          </p>
          <button onClick={resetFilters} className="btn btn-primary-custom">
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Cars;
