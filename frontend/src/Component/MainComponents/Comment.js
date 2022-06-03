import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

export default function Comment({ data }) {
  console.log("Our Blog Is", data);
  const [comments, setComments] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const { id } = useParams();
  const postComment = async (e) => {
    e.preventDefault();

    const { name, email, comment } = comments;
    const res = await fetch("/blog/comment", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, name, email, comment }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      toast.success(data.message);
      setComments({
        name: "",
        email: "",
        comment: "",
      });

      //   calldata();
    } else {
      toast.error(data.error);
    }
  };
  return (
    <div>
      <div className="container-fluid my-3 p-5">
        <h1>Leave A Comment</h1>
        <form>
          <div class="mb-3">
            <textarea
              type="text"
              class="form-control"
              id="comment"
              aria-describedby="emailHelp"
              style={{ height: "200px" }}
              placeholder="Comment"
              value={comments.comment}
              onChange={(e) =>
                setComments({ ...comments, comment: e.target.value })
              }
            />
          </div>
          <div class="mb-3 d-flex">
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Name"
              value={comments.name}
              onChange={(e) =>
                setComments({ ...comments, name: e.target.value })
              }
            />
            <input
              type="email"
              class="form-control mx-3"
              id="name"
              placeholder="Email"
              value={comments.email}
              onChange={(e) =>
                setComments({ ...comments, email: e.target.value })
              }
            />
          </div>

          <button type="submit" class="btn btn-danger" onClick={postComment}>
            Post Comment
          </button>
        </form>
        <div className="container-fluid my-5">
          <h1>{data.comments?.length}Comments</h1>
          <div className="d-flex justify-content-start">
            {data.comments?.map((ele) => {
              return (
                <>
                  <div className="border p-3 border-5 mx-5 container-fluid">
                    <div className="d-flex">
                      <h3 className="fw-bold bg-dark text-light p-3 rounded-circle">{ele?.name.slice(0, 2)}</h3>
                      <span className="mx-3 my-3">{ele?.email}</span>
                    </div>

                    <p>{ele?.comment}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
