import { Chip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/AppContext";

const WidgetTags = () => {
  const { questions } = useGlobalContext();
  const [qtags, setQtags] = useState([]);

  const tags = [
    ...new Set([
      "C++",
      "CSS",
      "Express.js",
      "Firebase",
      "HTML5",
      "Javascript",
      "MERN",
      "MongoDB",
      "MySQL",
      "Next.js",
      "Node.js",
      "PhP",
      "Python",
      "React",
      ...qtags,
    ]),
  ];

  useEffect(() => {
    const arr = [];
    questions?.map((item) => {
      item?.tags?.map((e) => arr.push(e));
    });

    setQtags([...qtags, ...arr]);
  }, [questions]);

  return (
    <div className="right-side-tags">
      <div className="heading">
        <Typography
          fontWeight="bold"
          padding={2}
          fontSize={20}
          textTransform="capitalize"
        >
          watched tags
        </Typography>
      </div>
      <div className="tags">
        {tags.map((item, ind) => (
          <Chip className="m-1" label={item} key={ind} variant="outlined" />
        ))}
      </div>
    </div>
  );
};

export default WidgetTags;
