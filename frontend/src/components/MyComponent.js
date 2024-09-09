// src/components/MyComponent.js

import React from "react";
import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/data`);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const MyComponent = () => {
  React.useEffect(() => {
    fetchData();
  }, []);

  return <div>Check console for data!</div>;
};

export default MyComponent;
