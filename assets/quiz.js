// Multiple-choice quiz component. Markup:
//   <div class="quiz" data-answer="2">           (0-based index of the right option)
//     <p class="q">Question</p>
//     <ol class="options"><li><button>…</button></li>…</ol>
//     <div class="feedback">Explanation shown after any pick</div>
//   </div>
//   <p class="quiz-score"></p>                    (optional, shows the running score)
// The first pick counts. After it, the right answer is revealed and the options lock.
document.addEventListener("DOMContentLoaded", () => {
  const quizzes = [...document.querySelectorAll(".quiz")];
  const score = document.querySelector(".quiz-score");
  let answered = 0;
  let correct = 0;

  const updateScore = () => {
    if (!score) return;
    score.textContent = answered === quizzes.length
      ? `${correct} of ${quizzes.length} on the first try`
      : `${answered} of ${quizzes.length} answered`;
  };

  quizzes.forEach((quiz) => {
    const answer = Number(quiz.dataset.answer);
    const buttons = [...quiz.querySelectorAll(".options button")];
    const feedback = quiz.querySelector(".feedback");

    buttons.forEach((button, i) => {
      button.addEventListener("click", () => {
        buttons.forEach((b) => (b.disabled = true));
        buttons[answer].classList.add("right");
        if (i !== answer) button.classList.add("wrong");
        else correct++;
        answered++;
        if (feedback) {
          feedback.insertAdjacentHTML("afterbegin", i === answer ? "<strong>Right.</strong> " : "<strong>Not quite.</strong> ");
          feedback.classList.add("show");
        }
        updateScore();
      });
    });
  });

  updateScore();
});
