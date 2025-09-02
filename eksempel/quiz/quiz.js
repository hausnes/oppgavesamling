const questions = [
    {
        question: "Hvilken HTML-tagg brukes for å lage en overskrift på høyeste nivå?",
        answers: [
            { text: "<h1>", correct: true, rationale: "<h1>-taggen definerer den viktigste overskriften på en side, og er den mest semantisk betydningsfulle overskriften." },
            { text: "<header>", correct: false, rationale: "<header>-taggen representerer et innledende avsnitt eller en gruppe navigasjonslenker for innholdet i et dokument, ikke en overskriftstagg." },
            { text: "<p>", correct: false, rationale: "<p>-taggen brukes til å definere et tekstavsnitt." },
            { text: "<heading>", correct: false, rationale: "Det er ingen standard <heading>-tagg i HTML; overskrifter defineres med h1 til h6." }
        ]
    },
    {
        question: "Hvilken CSS-egenskap brukes for å endre bakgrunnsfargen til et element?",
        answers: [
            { text: "font-color", correct: false, rationale: "font-color er en utdatert egenskap som brukes til å endre tekstfarge, ikke bakgrunnsfarge." },
            { text: "background-color", correct: true, rationale: "background-color er den korrekte CSS-egenskapen for å endre fargen på et elements bakgrunn." },
            { text: "bg-color", correct: false, rationale: "bg-color er en uformell forkortelse og er ikke en gyldig CSS-egenskap." },
            { text: "color", correct: false, rationale: "color-egenskapen brukes til å endre fargen på elementets tekst, ikke bakgrunnen." }
        ]
    },
    {
        question: "Hva er den korrekte måten å referere til en ekstern JavaScript-fil kalt 'script.js' i en HTML-fil?",
        answers: [
            { text: "<link rel='stylesheet' href='script.js'>", correct: false, rationale: "Denne taggen brukes for å koble til en ekstern stilark (CSS) fil." },
            { text: "<script src='script.js'></script>", correct: true, rationale: "Riktig tagg for å inkludere en ekstern JavaScript-fil er <script> med src-attributten." },
            { text: "<js href='script.js'>", correct: false, rationale: "Dette er ikke en gyldig HTML-tagg for å inkludere en JavaScript-fil." },
            { text: "<script link='script.js'></script>", correct: false, rationale: "Den korrekte attributten for kilden til skriptet er 'src', ikke 'link'." }
        ]
    },
    {
        question: "Hvilken CSS-selektor ville du brukt for å velge et element med id 'hoved-tekst'?",
        answers: [
            { text: ".hoved-tekst", correct: false, rationale: "Punktum (.) brukes for å velge elementer med en spesifikk klasse, ikke en id." },
            { text: "<hoved-tekst>", correct: false, rationale: "Dette er en HTML-tagg, ikke en CSS-selektor." },
            { text: "#hoved-tekst", correct: true, rationale: "Hektegnet (#) brukes spesifikt for å velge et element basert på dets unike id." },
            { text: "id=hoved-tekst", correct: false, rationale: "Dette er syntaks for HTML-attributter, ikke en CSS-selektor." }
        ]
    },
    {
        question: "Hva er resultatet av `document.getElementById('minKnapp').innerHTML = 'Klikk meg!';` ?",
        answers: [
            { text: "Ingen ting skjer fordi koden er feil.", correct: false, rationale: "Dette er en vanlig og korrekt måte å manipulere DOM-en på." },
            { text: "HTML-elementet med id 'minKnapp' forsvinner fra siden.", correct: false, rationale: "Koden endrer innholdet i elementet, den fjerner det ikke." },
            { text: "Teksten inni HTML-elementet med id 'minKnapp' endres til 'Klikk meg!'.", correct: true, rationale: "innerHTML-egenskapen endrer HTML-innholdet (tekst og eventuelle tagger) i det valgte elementet." },
            { text: "Det opprettes et nytt element med teksten 'Klikk meg!'.", correct: false, rationale: "Koden manipulerer et eksisterende element, den oppretter ikke et nytt." }
        ]
    },
    {
        question: "I JavaScript, hvilken datatype brukes for å representere en liste av verdier?",
        answers: [
            { text: "object", correct: false, rationale: "Et objekt lagrer key-value-par, ikke en indeksert liste av verdier." },
            { text: "string", correct: false, rationale: "En string er en sekvens av tegn." },
            { text: "array", correct: true, rationale: "En array er en spesiell type objekt som brukes for å lagre en indeksert samling av elementer." },
            { text: "list", correct: false, rationale: "Mens andre programmeringsspråk bruker 'list', er 'array' det korrekte navnet på denne datatypen i JavaScript." }
        ]
    },
    {
        question: "Hvilken CSS-egenskap er en del av 'box model' og kontrollerer avstanden mellom elementets innhold og rammen (border)?",
        answers: [
            { text: "margin", correct: false, rationale: "margin kontrollerer avstanden mellom et element og andre elementer rundt det." },
            { text: "padding", correct: true, rationale: "padding skaper plass i et element, mellom innholdet og rammen." },
            { text: "border", correct: false, rationale: "border er selve rammen rundt elementet, ikke plassen mellom innholdet og rammen." },
            { text: "spacing", correct: false, rationale: "Det er ingen standard CSS-egenskap kalt 'spacing'." }
        ]
    },
    {
        question: "Hvilket av følgende er et eksempel på en korrekt måte å deklarere en konstant i JavaScript?",
        answers: [
            { text: "var x = 10;", correct: false, rationale: "var er en eldre måte å deklarere variabler på, og den skaper ikke en konstant." },
            { text: "let y = 20;", correct: false, rationale: "let brukes til å deklarere variabler som kan endres, ikke konstanter." },
            { text: "const z = 30;", correct: true, rationale: "const er nøkkelordet som brukes for å deklarere en variabel som ikke kan endres etter tildeling." },
            { text: "constant a = 40;", correct: false, rationale: "constant er ikke et gyldig nøkkelord for deklarering av konstanter i JavaScript." }
        ]
    },
    {
        question: "Hva er formålet med `<head>`-seksjonen i et HTML-dokument?",
        answers: [
            { text: "Å vise synlig innhold til brukeren.", correct: false, rationale: "Synlig innhold vises i <body>-seksjonen av dokumentet." },
            { text: "Å definere metadata, lenker til stilark og skript, og tittel for siden.", correct: true, rationale: " `<head>`-seksjonen inneholder metadata om HTML-dokumentet som ikke vises direkte på siden." },
            { text: "Å skrive JavaScript-kode som kjøres når siden lastes.", correct: false, rationale: "Selv om <script>-tagger kan plasseres i `<head>`, er formålet med `<head>`-seksjonen bredere og handler om metadata." },
            { text: "Å skrive HTML-kode som ikke er synlig for brukere.", correct: false, rationale: "All kode i HTML-dokumentet er teknisk sett ikke synlig, men <head>-seksjonen er spesifikt for metadata." }
        ]
    },
    {
        question: "Hvilken JavaScript-metode brukes for å legge til en hendelseslytter (event listener) på et element?",
        answers: [
            { text: "attachEvent()", correct: false, rationale: "Dette er en eldre, utdatert metode som ikke lenger er anbefalt." },
            { text: "onEvent()", correct: false, rationale: "Dette er ikke en gyldig metode for å legge til hendelseslytter." },
            { text: "addEventListener()", correct: true, rationale: "addEventListener() er den moderne og foretrukne metoden for å feste hendelseslyttere til et element." },
            { text: "setEventHandler()", correct: false, rationale: "Dette er ikke en standard JavaScript-metode." }
        ]
    }
];

let currentQuestionIndex = 0;
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-btn");

function startQuiz() {
    currentQuestionIndex = 0;
    showQuestion();
    nextButton.style.display = "none";
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    resultElement.innerText = "";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    nextButton.style.display = "none";
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("wrong");
        }
    });

    const currentQuestion = questions[currentQuestionIndex];
    resultElement.innerText = isCorrect ? `Riktig! 🎉` : `Feil. 😞 ${currentQuestion.answers.find(a => a.correct).rationale}`;
    
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert("Quizen er ferdig! Du kan oppdatere siden for å starte på nytt.");
    }
});

startQuiz();