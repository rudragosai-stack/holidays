import React from "react";

const FilterSidebar = ({ filters, onClearAll, onToggleLocation, onToggleActivity, onToggleTourType, filteredCount, totalCount }) => {
  return (
    <div className="main-sidebar mt-0">
      <div className="single-sidebar-widget mb-4">
        <div className="wid-title">
          <h3>Filter Results</h3>
        </div>
        <div className="filter-summary">
          <p className="mb-2">
            <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> tours
          </p>
          {(filters.locations.some((loc) => loc.selected) || filters.activities.some((act) => act.selected) || filters.tourTypes.some((type) => type.selected)) && (
            <button className="btn btn-sm btn-outline-secondary" onClick={onClearAll}>
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      <div className="single-sidebar-widget">
        <div className="wid-title">
          <h3>Destination Category</h3>
        </div>
        <div className="categories-list">
          {filters.locations.map((location, index) => (
            <label key={index} className="checkbox-single d-flex justify-content-between align-items-center">
              <span className="d-flex gap-xl-3 gap-2 align-items-center">
                <span className="checkbox-area d-center">
                  <input type="checkbox" checked={location.selected || false} onChange={() => onToggleLocation(location.name)} />
                  <span className="checkmark d-center"></span>
                </span>
                <span className="text-color">{location.name}</span>
              </span>
              <span className="text-color">{location.count}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="single-sidebar-widget">
        <div className="wid-title">
          <h3>Activities</h3>
        </div>
        <div className="categories-list">
          {filters.activities.map((activity, index) => (
            <label key={index} className="checkbox-single d-flex justify-content-between align-items-center">
              <span className="d-flex gap-xl-3 gap-2 align-items-center">
                <span className="checkbox-area d-center">
                  <input type="checkbox" checked={activity.selected || false} onChange={() => onToggleActivity(activity.name)} />
                  <span className="checkmark d-center"></span>
                </span>
                <span className="text-color">{activity.name}</span>
              </span>
              <span className="text-color">{activity.count}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="single-sidebar-widget">
        <div className="wid-title style-2">
          <h3>Difficulty Level</h3>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <div className="categories-list">
          {filters.tourTypes.map((type, index) => (
            <label key={index} className="checkbox-single d-flex justify-content-between align-items-center">
              <span className="d-flex gap-xl-3 gap-2 align-items-center">
                <span className="checkbox-area d-center">
                  <input type="checkbox" checked={type.selected || false} onChange={() => onToggleTourType(type.value)} />
                  <span className="checkmark d-center"></span>
                </span>
                <span className="text-color">{type.name}</span>
              </span>
              <span className="text-color">{type.count}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
