import "./App.css";
import questions from "../questions.json";
import QuizComponent from "./components/QuizComponent/QuizComponent";

function App() {
  return (
    <>
      <QuizComponent questions={questions} />
    </>
  );
}

export default App;
