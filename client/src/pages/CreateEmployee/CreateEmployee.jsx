import { useState } from "react";
import LabelledInput from "../../components/LabelledInput/LabelledInput";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./CreateEmployee.scss";
import imgIcon from "../../assets/image_icon.png";

export default function CreateEmployee() {
  const { user } = useUser();
  const [error, setError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "M",
    course: [],
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let filename = null;
      if (formData.image) {
        const uploadData = new FormData();
        filename = formData.image.name;
        uploadData.append("filename", filename);

        // Append the image file directly
        uploadData.append("image", formData.image, filename);

        const options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: uploadData,
        };

        await fetch("http://localhost:3000/upload/image", options);
      } else {
        setEmptyFields(true);
        setTimeout(() => {
          setEmptyFields(false);
        }, 2500);
        return;
      }

      if (
        formData.name === "" ||
        formData.email === "" ||
        formData.mobile === "" ||
        formData.designation === "" ||
        formData.gender === "" ||
        formData.course === ""
      ) {
        setEmptyFields(true);
        setTimeout(() => {
          setEmptyFields(false);
        }, 2500);
        return;
      }

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: filename,
        }),
      };

      const response = await fetch("http://localhost:3000/emp/create", options);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      navigate(`/allEmployee`);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhotoFile(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="CreateEmployee">
      <h1 className="CreateEmployee_Heading">Create Employee</h1>
      <div className="CreateEmployee_Content">
        <div className="CreateEmployee_Content_FormContainer">
          <form
            className="CreateEmployee_Content_FormContainer_Form"
            onSubmit={handleSubmit}
          >
            <LabelledInput
              label={"Name"}
              value={formData.name}
              placeholder={"Name"}
              type="text"
              name="name"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
            />
            <LabelledInput
              label={"Email"}
              value={formData.email}
              placeholder={"Email"}
              type="email"
              name="email"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label={"Mobile No."}
              value={formData.mobile}
              type="number"
              placeholder={"Mobile No."}
              name="mobile"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  mobile: e.target.value,
                });
              }}
            />
            <div style={{ marginBottom: "12px" }}>
              <label className="UpdateEmployee_Content_FormContainer_Form_Label">
                Designation{" "}
              </label>
              <select
                value={formData.designation}
                name="designation"
                className="UpdateEmployee_Content_FormContainer_Form_Select"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    designation: e.target.value,
                  });
                }}
              >
                <option value="">Select designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label className="UpdateEmployee_Content_FormContainer_Form_Label">
                Gender
              </label>
              <div>
                <input
                  type="radio"
                  value="M"
                  checked={formData.gender === "M"}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      gender: e.target.value,
                    });
                  }}
                />
                M
                <input
                  type="radio"
                  value="F"
                  checked={formData.gender === "F"}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      gender: e.target.value,
                    });
                  }}
                />
                F
              </div>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label className="UpdateEmployee_Content_FormContainer_Form_Label">
                Course:
              </label>
              <div>
                <input
                  type="checkbox"
                  value="MCA"
                  checked={formData.course.includes("MCA")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        course: [...formData.course, e.target.value],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        course: formData.course.filter(
                          (course) => course !== e.target.value
                        ),
                      });
                    }
                  }}
                />
                MCA
                <input
                  type="checkbox"
                  value="BCA"
                  checked={formData.course.includes("BCA")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        course: [...formData.course, e.target.value],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        course: formData.course.filter(
                          (course) => course !== e.target.value
                        ),
                      });
                    }
                  }}
                />
                BCA
                <input
                  type="checkbox"
                  value="BSC"
                  checked={formData.course.includes("BSC")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        course: [...formData.course, e.target.value],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        course: formData.course.filter(
                          (course) => course !== e.target.value
                        ),
                      });
                    }
                  }}
                />
                BSC
              </div>
              {/* </label> */}
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label htmlFor="image">
                Photo <img style={{ height: "1.2em" }} src={imgIcon} alt="" />
              </label>
              <input
                type="file"
                id="image"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              {photoFile && (
                <div style={{ marginTop: "12px" }}>
                  <img
                    style={{ height: "30px", width: "30px" }}
                    src={photoFile}
                    alt=""
                  />
                </div>
              )}
            </div>

            <button
              className="CreateEmployee_Content_FormContainer_Form_Button"
              type="submit"
            >
              Create
            </button>
            {error && (
              <div
                className={"CreateEmployee_Content_FormContainer_Form_Error"}
              >
                There was an error creating a listing! Try again.
              </div>
            )}
            {emptyFields && (
              <div
                className={"CreateEmployee_Content_FormContainer_Form_Error"}
              >
                All fields must be filled!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
