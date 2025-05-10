<script lang="ts">
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

    let { questionBank }: { questionBank: string[][] } = $props();

    let questionNum = $state(0);

    let questionOrder = shuffle(questionBank);

    questionOrder.push(["","","","",""]);

    let question = $derived(questionOrder[questionNum][0]);

    let correctAnswer = $derived(questionOrder[questionNum][1]);

    let questionAnswers = $derived(shuffle(questionOrder[questionNum].slice(1)));

    let correctNum = $state(0);

    let wasCorrect = $state(false);

    let showResult = $state(false);

    function checkAnswer(answer: string) {
        wasCorrect = answer == correctAnswer;
        showResult = true;
    }
</script>

<div id="quiz-container">
    {#if (questionNum + 1 != questionBank.length)}
        <div id="question-container" transition:fade>
            <h1 id="question-counter">Question {questionNum + 1}</h1>

            <p id="ratio">{correctNum}/{questionNum}</p>

            <p id="question">{question}</p>

            <div id="answers">
                {#each questionAnswers as answer}
                    <button type="button" onclick={() => checkAnswer(answer)}>{answer}</button>
                {/each}
            </div>
        </div>
        {#key showResult}
            {#if showResult}
                {#if wasCorrect}
                    <p>nice</p>
                {:else}
                    <p>bruh</p>
                {/if}
            {/if}
        {/key}
    {/if}
</div>

<style>
    #quiz-container {
        background-color: #DAF3FD;
        border-radius: 5px;
        margin: 0 25%;
        position: relative;
    }
    #question-container {
        position: relative;
        text-align: center;
        padding: 2% 2% 4% 2%;
    }
    #ratio {
        position: absolute;
        top: -10px;
        right: 10px;
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