<script>
    import Quiz from "./Quiz.svelte";

    // let testQuestions = [["What is 4 + 2?", "6", "4", "2", "8"],
    //                     ["What is 1 + 1?", "2", "5", "0", "1"],
    //                     ["Which fruit is yellow?", "Banana", "Orange", "Grape", "Lime"]];

    let arithmeticAnswers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    let testQuestions = [{"question": "What is 4 + 2?",
                          "correctAnswer": 6,
                          "answers": arithmeticAnswers,
                          "explanation": "If you add 4 and 2 together, you get 6."},
                         {"question": "What is 1 + 1?",
                          "correctAnswer": 2,
                          "answers": arithmeticAnswers,
                          "explanation": "The expression \"1 + 1\" is equivalent to incrementing the number 1, which is " +
                                        "equal to 2."},
                         {"question": "Which fruit is yellow?",
                          "correctAnswer": 0,
                          "answers": ["Banana", "Grape", "Orange", "Lime"],
                          "explanations": ["Although bananas aren't always yellow, they are usually depicted as yellow.",
                                           "There are many variations of the modern grape, typically purple and green, neither of which are yellow.",
                                           "Although they are close together in terms of hue, orange is not the same color as yellow.",
                                           "This could be mistaken by the common yellow lemon, due to its similar color range and sourness, but limes are green instead of yellow."]
                         }];
</script>

<Quiz questionBank={testQuestions}/>