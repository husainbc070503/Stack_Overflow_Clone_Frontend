import { Chip, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchBox from "../../components/SearchBox";
import { TagsList } from "./TagsList";

const Tags = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="tags-container">
      <div className="top">
        <Typography fontSize={32} fontWeight="bold" mb={2}>
          Tags
        </Typography>
        <Typography textAlign="justify" mb={3} fontSize={15}>
          A tag is a keyword or label that categorizes your question with other,
          similar questions. Using the right tags makes it easier for others to
          find and answer your question.
        </Typography>
        <SearchBox
          fromTags={true}
          title="Filter by tag name"
          search={search}
          handleChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <Grid container justifyContent="space-between" mt={2}>
        {TagsList?.filter((item) =>
          item.tagName.toLowerCase().includes(search)
        )?.map((item, ind) => (
          <Grid
            item
            md={4}
            xs={12}
            key={ind}
            className="Grid tag-box border border-1 border-light rounded-2 shadow-sm"
          >
            <Chip label={item.tagName} color="primary" variant="outlined" />
            <Typography fontSize={14} textAlign="justify" mt={1}>
              {item.tagDesc}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Tags;
