<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';

    // Function to apply the Fisher-Yates Shuffle
    function shuffle(array: any[]) {

        // Iterate over the array in reverse order
        for (let i = array.length - 1; i > 0; i--) {

            // Generate Random Index
            const j = Math.floor(Math.random() * (i + 1));

            // Swap elements
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    interface Info {
        title : string;
        description : string;
    }

    let { info, questionBank }: { info: Info, questionBank: Object[] } = $props();

    let quizType = $state(""); // either "" or "multiple"

    let questionNum = $state(0);

    let questionOrder = shuffle(questionBank);

    questionOrder.push({});

    function resetQuestions() {
        questionNum = 0;
        questionOrder = shuffle(questionBank);
        questionOrder.push({});
    }

    let question = $derived(questionOrder[questionNum]["question"]);

    let correctAnswerIndex = $derived(questionOrder[questionNum]["correctAnswer"]);

    let correctAnswer = $derived(questionOrder[questionNum]["answers"][correctAnswerIndex]);

    let questionAnswers = $derived.by(() => {
        let shuffledAnswers = shuffle([...questionOrder[questionNum]["answers"]]);
        let answerPool = shuffledAnswers.slice(0,4);
        //alert(answerPool);
        //alert(correctAnswer);
        if (!(answerPool.includes(correctAnswer))) {
            answerPool.splice(Math.floor(Math.random() * 4), 1, correctAnswer);
        }
        return answerPool;
    });

    let correctNum = $state(0);

    let wasCorrect = $state(false);

    let showResult = $state(false);

    let chosenAnswer = $state("");

    let explanation = $derived.by(() => {
        if ("explanation" in questionOrder[questionNum]) {
            return questionOrder[questionNum]["explanation"];
        } else if ("explanations" in questionOrder[questionNum]) {
            return questionOrder[questionNum]["explanations"][questionOrder[questionNum]["answers"].indexOf(chosenAnswer)];
        }
    });

    function checkAnswer(answer: string) {
        chosenAnswer = answer;
        wasCorrect = answer == correctAnswer;
        showResult = true;
        //await new Promise(r => setTimeout(r, 5000));
        //nextQuestion();
    }

    function nextQuestion() {
        if (wasCorrect) {
            correctNum++;
        }
        questionNum++;
        if (questionNum + 1 == questionBank.length) {
            quizType = "done";
        }
        showResult = false;
    }

    function getLetterGrade(score: number) {
        let roundedScore = Math.round(score * 100)
        if (roundedScore == 100) {
            return "P";
        } else if (roundedScore >= 90) {
            return "A";
        } else if (roundedScore >= 80) {
            return "B";
        } else if (roundedScore >= 75) {
            return "C";
        } else if (roundedScore >= 70) {
            return "D";
        } else if (roundedScore > 0) {
            return "F";
        } else {
            return "Z";
        }
    }
</script>

<div id="quiz-container">
    {#if !quizType}
        <div id="type-chooser" transition:fade={{ easing: cubicIn, duration: 1000 }}>
            <h1>{info["title"]}</h1>
            <p>{info["description"]}</p>
            <div class="answers">
                <button type="button" onclick={() => {quizType = "multiple"}}>Multiple Choice</button>
            </div>
        </div>
    {:else if (quizType == "multiple")}
        <div in:fade={{ delay: 1000, easing: cubicOut, duration: 1000 }}
            out:fade={{              easing: cubicOut, duration: 1000 }}>
            {#if (questionNum + 1 != questionBank.length)}
                <div id="question-container" style="--question-blur: { showResult ? 8 : 0 }" transition:fade>
                    <p id="ratio">{correctNum}/{questionNum}</p>

                    <h1 id="question-counter">Question {questionNum + 1}</h1>
                    
                    <div class="horizontal-center-separator"></div>

                    <p id="question">{question}</p>
                    
                    <div class="horizontal-center-separator"></div>

                    <div class="answers">
                        {#each questionAnswers as answer}
                            <button type="button" onclick={() => checkAnswer(answer)}>{answer}</button>
                        {/each}
                    </div>
                </div>
                {#if showResult}
                    <div id="result-popup" in:fade={{ delay: 500, easing: cubicOut, duration: 1000 }} 
                                          out:fade={{             easing: cubicOut, duration: 1000 }}>
                        {#if wasCorrect}
                            <h1>Correct!</h1>
                        {:else}
                            <h1>Incorrect...</h1>
                        {/if}
                        <div class="horizontal-center-separator"></div>
                        <div id="commentary">
                            <div id="your-answer">
                                <h2>Your Answer</h2>
                                <div class="horizontal-left-separator"></div>
                                <p>{chosenAnswer}</p>
                            </div>
                            {#if !wasCorrect}
                                <div id="correct-answer">
                                    <h2>Correct Answer</h2>
                                    <div class="horizontal-left-separator"></div>
                                    <p>{correctAnswer}</p>
                                </div>
                            {/if}
                            <div id="explanation">
                                <h2>Explanation</h2>
                                <div class="horizontal-left-separator"></div>
                                <p>{explanation}</p>
                            </div>
                            <div id="next-bar" class="horizontal-right-separator"></div>
                            <div id="next-button">
                                <button type="button" onclick={() => nextQuestion()}>Next</button>
                            </div>
                        </div>
                    </div>
                {/if}
            {/if}
        </div>
    {:else if (quizType == "done")}
        <div id="final-result" in:fade={{ delay: 1000, easing: cubicOut, duration: 1000 }}>
            <h1>Your Final Score</h1>
            <div id="result-data-container">
                <h1 id="final-ratio">{correctNum}/{questionNum}</h1>
                <!--<p id="letter-score">{getLetterGrade(correctNum / questionNum)}</p>-->
            </div>
            <div class="answers">
                <button type="button" onclick={() => {resetQuestions(); quizType = "multiple"}}>Restart</button>
                <button type="button" onclick={() => {resetQuestions(); quizType = ""}}>Finish</button>
            </div>
        </div>
    {/if}
</div>

<style>
    #quiz-container {
        /* background-color: #DAF3FD; */
        background-image: linear-gradient(#EFF6FE, #FFFFFF);
        /* border-radius: 5px; */
        margin: 0 25%;
        position: relative;
    }
    #type-chooser {
        padding: 10px;
    }
    #type-chooser > * {
        text-align: center;
    }
    #question-container {
        position: relative;
        text-align: center;
        filter: blur(calc(var(--question-blur) * 1px));
        transition: filter 500ms ease-out;
        padding: 10px;
    }
    #final-result {
        text-align: center;
        padding: 10px;
    }
    #final-result > h1 {
        font-size: 24px;
    }
    #result-data-container {
        display: grid;
    }
    /*
    #letter-score {
        font-size: 160px;
        font-weight: bold;
        transform: rotate(10deg);
        filter: opacity(0.3);
        mask: linear-gradient(#FFFFFFFF, #00000000), alpha;
        grid-column: 1;
        grid-row: 1;
        margin: -72px;
        user-select: none;
    }
        */  
    #question {
        line-height: 50px;
    }
    #ratio {
        position: absolute;
        top: -10px;
        right: 10px;
    }
    #final-ratio {
        font-size: 36px;
        font-weight: normal;
        grid-column: 1;
        grid-row: 1;
    }
    .horizontal-left-separator {
        background-image: linear-gradient(to right, #D4DEE4FF, #D4DEE400);
        height: 1px;
    }
    .horizontal-center-separator {
        background-image: linear-gradient(to right, #D4DEE400, #D4DEE4FF, #D4DEE400);
        height: 1px;
    }
    .horizontal-right-separator {
        background-image: linear-gradient(to right, #D4DEE400, #D4DEE4FF);
        height: 1px;
    }
    .answers {
        margin: 13.4px auto;
        display: flex;
        justify-content: space-evenly;
        align-content: space-around;
        flex-wrap: wrap;
        row-gap: 10px;
    }
    .answers > * {
        width: 40%;
        height: 40px;
    }
    #result-popup {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #FFFFFF88;
        text-align: center;
    }
    #result-popup > h1 {
        font-size: 24px;
    }
    #commentary {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 1fr 1fr 13.5px 40px;
        text-align: left;
        margin: 13.4px;
    }
    /*
    #commentary > :not(#next-button, #next-bar) {
        background: #FFFFFF88;
        border-radius: 5px;
    }
    */
    #your-answer {
        grid-column: 1;
        grid-row: 1;
    }
    #correct-answer {
        grid-column: 1;
        grid-row: 2;
    }
    #explanation {
        grid-column: 2;
        grid-row: 1 / 3;
    }
    #next-bar {
        grid-column: 1 / 3;
        grid-row: 3;
    }
    #next-button {
        grid-column: 2;
        grid-row: 4;
        margin-left: auto;
    }
</style>