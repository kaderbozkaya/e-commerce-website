import axios from "axios";
import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";

import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
  const [state, setState] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setState(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCategory = async (category) => {
    setCurrentCategory(category);
    try {
      const url =
        category === "All"
          ? "https://fakestoreapi.com/products"
          : `https://fakestoreapi.com/products/category/${category}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        setFilteredData(response.data);
        const newPath = category === "All" ? "/" : `/${category}`;
        window.history.pushState({}, "", newPath);
      } else {
        console.error("Failed to load category");
      }
    } catch (error) {
      console.error("Error handling category:", error);
    }
  };

  return (
    <>
      <Categories handleCategory={handleCategory} />

      {filteredData.map((item) => (
        <>
          <Container className="py-4">
            <Row className="justify-content-center">
              <Col
                xs={9}
                md={7}
                lg={6}
                xl={4}
                className="mb-3 mx-auto text-center"
              >
                <div key={item.id} className="bg-red-300 p-4 w-28">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-28 h-28"
                  />
                  <p className="font-bold">{item.title}</p>
                  <p>{item.price}</p>
                  {/* <p>{item.category}</p> */}
                </div>
              </Col>
            </Row>
          </Container>
        </>
      ))}
    </>
  );
}
