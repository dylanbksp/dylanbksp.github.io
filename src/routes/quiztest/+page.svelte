<script>
    import Quiz from "./Quiz.svelte";

    let testQuestions = [["What is 4 + 2?", "6", "4", "2", "8"],
                         ["What is 1 + 1?", "2", "5", "0", "1"],
                         ["Which fruit is yellow?", "Banana", "Orange", "Grape", "Lime"]];
</script>

<Quiz questionBank={testQuestions}/>