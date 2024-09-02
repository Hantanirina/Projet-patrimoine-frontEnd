export const fetchPossessions = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/possessions");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
};

export const updatePossession = async (id, updatedData) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/possessions/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const closePossession = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/possessions/${id}/close`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la clôture de la possession");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
