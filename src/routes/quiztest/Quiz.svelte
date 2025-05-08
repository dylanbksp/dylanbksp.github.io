<script lang="ts">
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

    export let questionBank: string[][];

    let questionNum = 0;

    let questionOrder = shuffle(questionBank);

    $: question = questionOrder[questionNum][0];

    $: correctAnswer = questionOrder[questionNum][1];

    $: questionAnswers = shuffle(questionOrder[questionNum].slice(1));

    let correctNum = 0;

    function checkAnswer(answer: string) {
        if (answer == correctAnswer) {
            correctNum++;
        }
        questionNum++;
    }
</script>

<div id="quiz-container">
    <h1 id="question-counter">Question {questionNum + 1}</h1>

    <p>{correctNum}/{questionNum}</p>

    <p id=question>{question}</p>

    <div id=answers>
        {#each questionAnswers as answer}
            <button type="button" on:click={() => checkAnswer(answer)}>{answer}</button>
        {/each}
    </div>
</div>

<style>
    #quiz-container {
        background-color: #DAF3FD;
        border-radius: 5px;
        margin: 0 25%;
    }
    #quiz-container > * {
        text-align: center;
    }
    #answers {
        margin: auto;
        display: flex;
        justify-content: space-evenly;
        align-content: space-around;
        flex-wrap: wrap;
        row-gap: 10px;
    }
    #answers > * {
        width: 40%;
        height: 40px;
    }
</style>