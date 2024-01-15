import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../contexts/AppContext";
import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import moment from "moment";
import CakeIcon from "@mui/icons-material/Cake";
import LeftSidebar from "../../components/Left-Sidebar/LeftSidebar";
import InputField from "../../components/InputField";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

const SingleUser = () => {
  const { id } = useParams();
  const { users, user, questions, updateProfile } = useGlobalContext();
  const [singleUser, setSingleUser] = useState({});
  const userQuestions = questions?.filter((item) => item?.user?._id === id);
  const [questionTags, setQuestionTags] = useState([]);

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editDetails, setEditDetails] = useState({});
  const handleChange = (e) =>
    setEditDetails({ ...editDetails, [e.target.name]: e.target.value });

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error(`Please upload profile pic`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Only JPEG or PNG images are accepted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "stack-overflow-clone");
      data.append("cloud", "dm7x7knbb");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const finalRes = await res.json();
      if (finalRes) {
        toast.success("Profile Picture Uploaded!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setEditDetails({ ...editDetails, profile: finalRes.url });
      } else {
        toast.error("Failed to upload image! Try again later!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const arr = editDetails?.tags.split(", ");
    updateProfile(editDetails, arr, setEdit, setEditDetails, setLoading);
  };

  useEffect(() => {
    const arr = [];
    userQuestions?.forEach((item) => {
      item?.tags?.forEach((e) => arr.push(e));
    });

    setQuestionTags([...new Set(arr)]);
    setSingleUser(users?.filter((item) => item?._id === id)[0]);
  }, [userQuestions, user, id]);

  useEffect(() => {
    setEditDetails({ ...singleUser, tags: singleUser?.tags?.join(", ") });
  }, [edit]);

  return (
    <Container maxWidth="xl" className="Container container">
      <Box>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <LeftSidebar />
          </Grid>
          <Grid item md={10} xs={12}>
            <div className="users-container">
              <Grid container spacing={2} alignItems="flex-start">
                <Grid item md={2}>
                  <div className="user-profile">
                    <img src={singleUser?.profile} alt={singleUser?.name} />
                    {edit && (
                      <>
                        <label htmlFor="profile" className="pen-icon">
                          <EditIcon className="fs-5" />
                        </label>
                        <input
                          type="file"
                          id="profile"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => handleUpload(e.target.files[0])}
                        />
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item md={10}>
                  <div>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                      rowSpacing={2}
                    >
                      <Grid item md={6} xs={12}>
                        <Typography fontSize={26} fontWeight="bold">
                          {singleUser?.name}
                        </Typography>
                      </Grid>
                      <Grid item md={6} className="Grid button" textAlign="end">
                        {singleUser?._id === user?.user?._id && !edit && (
                          <Button
                            variant="contained"
                            onClick={() => setEdit(true)}
                          >
                            Edit Profile
                          </Button>
                        )}
                      </Grid>
                    </Grid>

                    <Typography fontSize={16} color="secondary" mb={2}>
                      <CakeIcon className="fs-5 me-2" />
                      Joined {moment(new Date(singleUser?.createdAt)).fromNow()}
                    </Typography>
                    <div className="tags">
                      {[
                        ...new Set([
                          ...questionTags,
                          ...(singleUser?.tags || []).map((tag) => tag),
                        ]),
                      ].map((e) => (
                        <Chip
                          label={e}
                          color="primary"
                          variant="outlined"
                          className="m-1"
                        />
                      ))}
                    </div>
                  </div>
                </Grid>
              </Grid>
              {singleUser?.about && !edit && (
                <div className="mt-4">
                  <Typography fontWeight="bold" fontSize={26}>
                    About
                  </Typography>
                  <Typography
                    fontSize={16}
                    textAlign="justify"
                    color="secondary"
                  >
                    {singleUser?.about}
                  </Typography>
                </div>
              )}
              {edit && (
                <div className="mt-5">
                  <Typography fontSize={24} fontWeight="bold" mb={3}>
                    Edit Profile
                  </Typography>
                  <div className="profile-form rounded-2">
                    <InputField
                      title="Display Name"
                      type="text"
                      others="name"
                      value={editDetails?.name}
                      onChange={handleChange}
                    />
                    <InputField
                      title="Email"
                      type="email"
                      others="email"
                      value={editDetails?.email}
                      onChange={handleChange}
                    />
                    <InputField
                      title="About Me"
                      type="text"
                      others="about"
                      value={editDetails?.about}
                      onChange={handleChange}
                      multiline={true}
                      rows={5}
                    />
                    <InputField
                      title="Tags"
                      type="text"
                      fromAskQuestion={true}
                      text="Add tags separated using comma"
                      others="tags"
                      value={editDetails?.tags}
                      onChange={handleChange}
                      placeholder="e.g. C++, Java, Python"
                      multiline={true}
                      rows={2}
                    />
                  </div>
                  <Button
                    variant="contained"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className="ms-2"
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SingleUser;
