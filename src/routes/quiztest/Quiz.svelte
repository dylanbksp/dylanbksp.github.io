<script lang="ts">
	import { cubicOut } from 'svelte/easing';
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

    async function checkAnswer(answer: string) {
        wasCorrect = answer == correctAnswer;
        if (wasCorrect) {
            correctNum++;
        }
        showResult = true;
        await new Promise(r => setTimeout(r, 5000));
        nextQuestion();
    }

    function nextQuestion() {
        questionNum++;
        showResult = false;
    }
</script>

<div id="quiz-container">
    {#if (questionNum + 1 != questionBank.length)}
        <div id="question-container" style="--question-blur: { showResult ? 8 : 0 }" transition:fade>
            <h1 id="question-counter">Question {questionNum + 1}</h1>

            <p id="ratio">{correctNum}/{questionNum}</p>

            <p id="question">{question}</p>

            <div id="answers">
                {#each questionAnswers as answer}
                    <button type="button" onclick={() => checkAnswer(answer)}>{answer}</button>
                {/each}
            </div>
        </div>
        {#if showResult}
            <div id="result-popup" in:fade={{ delay: 500, easing: cubicOut, duration: 1000 }} 
                                   out:fade={{ easing: cubicOut, duration: 1000 }}>
                {#if wasCorrect}
                    <h1>Correct!</h1>
                {:else}
                    <h1>Incorrect...</h1>
                {/if}

                
            </div>
        {/if}
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
        filter: blur(calc(var(--question-blur) * 1px));
        transition: filter 500ms ease-out;
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
</style>