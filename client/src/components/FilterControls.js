function FilterControls({ clearFilteredList }) {
  return (
    <div className="clear-filter">
      {/* Other controls */}
      <button onClick={clearFilteredList}>Clear Filter</button>
    </div>
  );
}

export default FilterControls;