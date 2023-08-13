function FilterControls({ clearFilteredList }) {
  return (
    <div>
      {/* Other controls */}
      <button onClick={clearFilteredList}>Clear Filter</button>
    </div>
  );
}

export default FilterControls;