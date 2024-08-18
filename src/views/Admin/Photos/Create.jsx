//import hook useState from react
import { useState } from "react";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

export default function PhotosCreate(props) {
  //state
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  //state errors
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "storePhoto"
  const storePhoto = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("image", image);
    formData.append("caption", caption);

    await Api.post("/api/admin/photos", formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //set input file to null
        document.getElementById("file").value = "";

        //fetch data
        props.fetchData();
      })
      .catch((error) => {
        //set state "errors"
        setErros(error.response.data);
      });
  };

  return (
    <div className="card border-0 rounded shadow-sm border-top-success">
      <div className="card-body">
        <form onSubmit={storePhoto}>
          <div className="mb-3">
            <label className="form-label fw-bold">Image</label>
            <input
              type="file"
              id="file"
              className="form-control"
              accept="images/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          {errors.image && (
            <div className="alert alert-danger">{errors.image[0]}</div>
          )}

          <div className="mb-3">
            <label className="form-label fw-bold">Caption</label>
            <input
              type="text"
              className="form-control"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter Title Photo"
            />
          </div>
          {errors.caption && (
            <div className="alert alert-danger">{errors.caption[0]}</div>
          )}
          <div>
            <button type="submit" className="btn btn-md btn-primary me-2">
              <i className="fa fa-save"></i> Upload
            </button>
            <button type="reset" className="btn btn-md btn-warning">
              <i className="fa fa-redo"></i> Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
