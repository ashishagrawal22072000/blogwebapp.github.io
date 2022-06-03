import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Card from "./Card";
import movieImage from "../../Images/movie.jpg";

export default function Movie() {
  const [blog, setblog] = useState([]);
  const [loading, setLoading] = useState(true);

  const getuserblog = async () => {
    try {
      const res = await fetch("/blog/movie", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setblog(data);
      console.log(data)
      setLoading(false);

      if (!res.status === 200) {
        const err = new Error(data.error);
        throw err;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getuserblog();
  }, []);
  return (
    <>
      <Navbar />
      <div class="card bg-dark text-white">
        <img class="card-img" src={movieImage} alt="Card image" height="700px"/>
      </div>
      {loading ? (
        <>
          <div className="container d-flex justify-content-center align-item-center mt-5">
            <div className="container d-flex justify-content-center align-item-center mt-5">
              <div
                class="spinner-border mt-5"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span class="sr-only"></span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {blog.length == 0 ? (
            <>
              <h1 className="text-center">No Blog Created</h1>
              <div className="d-flex justify-content-center align-item-center my-5">
                <button className="btn btn-danger">
                  <Link
                    to="/create"
                    className="text-light fw-bold"
                    style={{ textDecoration: "none" }}
                  >
                    Create Blog
                  </Link>
                </button>
              </div>
            </>
          ) : (
            <Card data={blog} />
          )}
        </>
      )}
    </>
  );
}
