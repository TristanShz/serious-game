import { useGameStore } from "../_stores/GameContext";
import clsx from "clsx";
import { Answer } from "./Answer";
import { Timer } from "./Timer";
import { observer } from "mobx-react-lite";

const Question = observer(() => {
  const gameStore = useGameStore();
  const question = gameStore.quizz.questions[gameStore.currentQuestion - 1];
  return (
    <div className={"px-8 py-12 flex flex-col justify-between h-full"}>
      <Timer minutes={gameStore.timer / 60} seconds={gameStore.timer % 60} />
      <div className={"flex flex-col gap-8"}>
        <div className={"flex flex-col gap-4"}>
          <div className={"flex gap-2 text-4xl text-quizz-title font-bold"}>
            <span>Question</span>
            <span>{gameStore.currentQuestion < 10 ? "0" : ""}{gameStore.currentQuestion}</span>
            <span
              className={"text-quizz-title-light"}>/ {gameStore.quizz.questions.length < 10 ? "0" : ""}{gameStore.quizz.questions.length}</span>
          </div>
          <div className={"flex gap-1"}>
            {
              gameStore.userAnswers?.answers.map((answer, index) => {
                if (answer.answered) {
                  return <div
                    className={clsx("w-14 h-4 bg-stone-300", gameStore.userAnswers.rates[index] ? "bg-quizz-answer-true" : "bg-quizz-answer-false")}></div>;
                } else {
                  return <div className={clsx("w-14 h-4 bg-stone-300")}></div>;
                }
              })
            }
          </div>
        </div>
        <p className={"text-xl font-medium"}>{question.text}</p>
      </div>
      <div className={"flex flex-wrap gap-8"}>
        {
          question.answers.map(answer => {
            return <Answer key={answer.text} text={answer.text} />;
          })
        }
      </div>
    </div>
  );
});

export default Question;
