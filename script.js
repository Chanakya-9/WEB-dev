const buttonColors = ["red", "blue", "green", "yellow"];
        let gamePattern = [];
        let userClickedPattern = [];
        let started = false;
        let level = 0;

        const restartBtn = document.getElementById("restart-btn");
        const levelTitle = document.getElementById("level-title");
        const scoreDisplay = document.getElementById("final-score");

        restartBtn.addEventListener("click", startGame);

        document.querySelectorAll(".btn").forEach(button => {
            button.addEventListener("click", function () {
                if (!started) return;

                const userChosenColor = this.id;
                userClickedPattern.push(userChosenColor);

                animatePress(userChosenColor);
                checkAnswer(userClickedPattern.length - 1);
            });
        });

        function startGame() {
            level = 0;
            gamePattern = [];
            started = true;
            restartBtn.style.display = "none";
            scoreDisplay.style.display = "none";
            levelTitle.textContent = "Level " + level;
            restartBtn.textContent = "Restart Game";
            nextSequence();
        }

        function nextSequence() {
            userClickedPattern = [];
            level++;
            levelTitle.textContent = "Level " + level;

            const randomColor = buttonColors[Math.floor(Math.random() * 4)];
            gamePattern.push(randomColor);
            console.log(gamePattern);

            const btn = document.getElementById(randomColor);
            btn.classList.add("pressed");
            setTimeout(() => btn.classList.remove("pressed"), 200);


        }

        

        function animatePress(color) {
            const button = document.getElementById(color);
            button.classList.add("pressed");
            setTimeout(() => button.classList.remove("pressed"), 100);
        }

        function checkAnswer(currentLevel) {
            if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
                if (userClickedPattern.length === gamePattern.length) {
                    setTimeout(nextSequence, 1000);
                }
            } else {

                document.body.classList.add("game-over");
                setTimeout(() => document.body.classList.remove("game-over"), 200);

                levelTitle.textContent = "Game Over!";
                scoreDisplay.textContent = "Score: " + (level - 1);
                scoreDisplay.style.display = "block";
                restartBtn.style.display = "inline-block";
                started = false;
            }
        }