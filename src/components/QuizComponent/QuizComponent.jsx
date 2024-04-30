import { useState } from "react";
import css from "./QuizComponent.module.css";
import { IconContext } from "react-icons";
import { FaCheckCircle } from "react-icons/fa";

const QuizComponent = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [iconColors, setIconColors] = useState(
    Array(questions.length).fill("lightgrey")
  );
const [lock, setLock] = useState(false)

  const handleAnswerClick = (index, answer) => {
    if(lock === false){

      setAnswerIndex(index);
      setIsAnswered(true);
  
      const newIconColors = [...iconColors];
      newIconColors[currentIndex] = answer.isCorrect ? "green" : "red";
      setIconColors(newIconColors);
      setLock(true)
    }
  };

  const nextQuestion = () => {
    setIsAnswered(false);
    setAnswerIndex(null);
    setCurrentIndex(currentIndex + 1);
    setLock(false)
  };

  const { question, answers } = questions[currentIndex];

  return (
    <>
      <h3 className={css.title}>
        Question {currentIndex + 1} of {questions.length}
      </h3>
      <hr />
      <h2>{question}</h2>
      <ul className={css.list}>
        {answers.map((answer, index) => (
          <li
            className={`${css.item} ${
              isAnswered && answerIndex === index
                ? answer.isCorrect
                  ? css.isCorrect
                  : css.notCorrect
                : css.item
            }`}
            key={index}
            onClick={() => handleAnswerClick(index, answer)}
          >
            {answer.text}
          </li>
        ))}
      </ul>

      <button
        className={css.btn}
        onClick={nextQuestion}
        disabled={currentIndex + 1 === questions.length}
      >
        Next
      </button>
      <div className={css.icons}>
        {iconColors.map((color, index) => (
          <IconContext.Provider value={{ color: color, size: 40 }} key={index}>
            <FaCheckCircle />
          </IconContext.Provider>
        ))}
      </div>
    </>
  );
};

export default QuizComponent;
