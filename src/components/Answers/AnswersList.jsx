import React from "react";
import "./Answers.css";
import AnswerCard from "./AnswerCard";

const AnswersList = ({ questionAnswers, sortValue }) => {
  const sortedArray = () => {
    if (sortValue === 0) {
      return questionAnswers?.sort(
        (itemB, itemA) =>
          itemA.upVotes.length +
          itemA.downVotes.length -
          (itemB.upVotes.length + itemB.downVotes.length)
      );
    } else if (sortValue === 1) {
      return questionAnswers?.sort(
        (itemB, itemA) =>
          itemB.upVotes.length +
          itemB.downVotes.length -
          itemA.upVotes.length +
          itemA.downVotes.length
      );
    } else if (sortValue === 2) {
      return questionAnswers?.sort(
        (itemB, itemA) =>
          new Date(itemB.answeredOn).toLocaleString() -
          new Date(itemA.answeredOn).toLocaleString()
      );
    }

    return questionAnswers;
  };

  console.log(sortedArray());

  return (
    <div className="answers-lists">
      {sortedArray()?.map((item, ind) => (
        <AnswerCard answer={item} key={ind} />
      ))}
    </div>
  );
};

export default AnswersList;
