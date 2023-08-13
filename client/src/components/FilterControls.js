function FilterControls({ clearFilteredList }) {
  return (
    <div className="filter-controls">
      {/* Other controls */}
      <button onClick={clearFilteredList}>Clear Filter</button>
    </div>
  );
}

export default FilterControls;