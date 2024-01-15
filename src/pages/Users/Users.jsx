import React, { useState } from "react";
import { useGlobalContext } from "../../contexts/AppContext";
import SearchBox from "../../components/SearchBox";
import { Avatar, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Users = () => {
  const { users, questions } = useGlobalContext();
  const [search, setSearch] = useState("");

  return (
    <div className="users-container">
      <div className="top">
        <Typography fontSize={32} fontWeight="bold" mb={3}>
          Users
        </Typography>
        <SearchBox
          fromTags={true}
          title="Filter by user name"
          search={search}
          handleChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <Grid container justifyContent="space-between" mt={2}>
        {users
          ?.filter((item) => item.name.toLowerCase().includes(search))
          ?.map((item, ind) => {
            const userQuestionsTags = [
              ...questions?.map((e) => {
                if (e?.user?._id === item?._id) return e.tags;
              }),
            ];
            const arr = [
              ...new Set([
                ...(userQuestionsTags.length > 0 ? userQuestionsTags : []),
                ...(item?.tags).map((tag) => tag),
              ]),
            ];

            return (
              <Grid
                item
                md={4}
                xs={12}
                key={ind}
                className="Grid user-box border bg-light border-1 border-info rounded-2 shadow-sm"
              >
                <Grid container spacing={1}>
                  <Grid item md={2} xs={2}>
                    <Avatar src={item?.profile} alt={item?.name} />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <Link to={`../users/${item?._id}`} className="link fs-4">
                      {item?.name}
                    </Link>
                    <Typography
                      fontSize={14}
                      textAlign="justify"
                      color="secondary"
                    >
                      {arr[0] === undefined
                        ? arr.join(",").substring(1, 32)
                        : arr.join(",").substring(0, 32)}
                      ...
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Users;
