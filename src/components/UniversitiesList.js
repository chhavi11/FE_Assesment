import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UniversitiesList = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    getUniversitiesList();
  }, []);

  const getUniversitiesList = async () => {
    try {
      let list = await fetch(
        "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates"
      );
      list = await list.json();
      setData(list);
      setFilteredData(list);
      localStorage.setItem("list", JSON.stringify(list));
    } catch (error) {
      let list = JSON.parse(localStorage.getItem("list"));
      setData(list);
      setFilteredData(list);
    }
  };

  const handleDelete = (name)=>{
      const newData = data.filter((e)=> e.name!==name)
      setFilteredData(newData)
  }

  const handleSorting = () => {
    const sortedArray = [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name); // Ascending sort
      } else {
        return b.name.localeCompare(a.name); // Descending sort
      }
    });
    setFilteredData(sortedArray);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  const handleSearch =(event)=>{
   let key =  event.target.value;
   let filterData =  data.filter((item)=> item.name.toLowerCase().includes(key))
   setFilteredData(filterData)
  }
  return (
    <div className="university">
      <h2 className='university-header'>UniversitiesList</h2>
      <button className='sort-btn' data-testid="sort-btn" onClick={handleSorting}>Sort List</button>
      <input placeholder="Search" className='filter-list' onChange={(event)=>handleSearch(event)}/>
      {filteredData.map((item, index) => {
        return (
          <ul className='university-list' key={index} data-testid="university-list">
            <li data-testid="university-name">
              <Link className="university-links" to={`/detail/${index}`}>{item.name}</Link>
              <button className='delete-btn' onClick={()=>handleDelete(item.name)}>Delete</button>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default UniversitiesList;
