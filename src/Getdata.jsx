import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

const Getdata = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [viewdata, setViewdata] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });

  const getData = () => {
    axios
      .get(`https://reqres.in/api/users?page=${page}`)
      .then((res) => setData(res.data.data));
  };

  useEffect(() => {
    getData();
  });

  const handlePage = (p) => {
    setPage(p.selected + 1);
  };

  const viewClick = (id) => {
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((res) => setViewdata(res.data.data));
  };

  return (
    <>
      <h1 className="text-center mt-4">CARDS</h1>
      <div className="container p-5">
        <div className="row g-5">
          {data.map((data) => {
            const { id, email, first_name, last_name, avatar } = data;
            return (
              <div
                className="col"
                onClick={() => viewClick(id)}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                key={id}
              >
                <div className="card p-3" style={{ width: "350px" }}>
                  <img
                    src={avatar}
                    className="rounded-circle mx-auto mb-4 "
                    style={{ width: "125px" }}
                    alt="Avatar"
                  />
                  <h6 className="text-center">
                    {first_name} {last_name}
                  </h6>
                  <p className="text-center">{email}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={2}
        onPageChange={handlePage}
        containerClassName={"pagination justify-content-center m-5"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />

      {/* model */}

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                ALL DETAILS
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <img
                src={viewdata.avatar}
                className="rounded-circle mx-auto d-block my-2 "
                style={{ width: "125px" }}
                alt="Avatar"
              />
              <p className="text-center">
                <b> Id: </b> {viewdata.id}
              </p>
              <p className="text-center">
                <b> First Name: </b> {viewdata.first_name}
              </p>
              <p className="text-center">
                <b> Last Name : </b> {viewdata.last_name}
              </p>
              <p className="text-center">
                <b> Email : </b> {viewdata.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Getdata;
