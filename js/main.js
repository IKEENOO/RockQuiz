const questions = [
	{
		question: "Which Red Hot Chili Peppers album went platinum in 1991?",
		answers: ["Mother's Milk", 
			"Blood Sugar Sex Magik", 
			"One Hot Minute", 
			"Californication"
		],
		image: "rhcp",
		correct: 2,
	},
	{
		question: "Who is the founder of AC/DC?",
		answers: [
			"Angus Young",
			"Malcolm Young",
			"Brian Johnson",
			"Bon Scott",
		],
		image: "acdc",
		correct: 2,
	},
	{
		question: "Who is the main vocalist of Rammstein?",
		answers: [
			"Richard Kruspe",
			"Flake Lorenz",
			"Oliver Riedel",
			"Till Lindemann",
		],
		image: "rammstein",
		correct: 4,
	},
	{
		question: "Who wrote the lyrics to 'Zombies'?",
		answers: [
			"Dolores O'Riordan",
			"Noel Hogan",
			"Kurt Cobain",
			"John Lennon",
		],
		image: "dolores",
		correct: 1,
	},
	{
		question: "What was the name of the drummer in KISS?",
		answers: [
			"The Demon",
			"The Starman",
			"The Catman",
			"The Spaceman",
		],
		image: "kiss",
		correct: 3,
	},
	{
		question: "Which AC/DC album was released in 1980 and became extremely popular?",
		answers: [
			"High Voltage",
			"Highway to Hell",
			"Powerage",
			"Back in Black",
		],
		image: "backinclack",
		correct: 4,
	},
	{
		question: "Which of these albums won a Grammy?",
		answers: [
			"Toxicity",
			"Mezmerize",
			"Steal This Album!",
			"Black Ice",
		],
		image: "toxicity",
		correct: 1,
	},
	{
		question: "What was the biggest hit on the Nevermind album?",
		answers: [
			"Smells Like Teen Spirit",
			"Lithium",
			"Come as You Are",
			"Something in the way",
		],
		image: "nevermind",
		correct: 1,
	},
	{
		question: "What is the name of Green Day's 2005 Grammy-winning album?",
		answers: [
			"Insomniac",
			"American Idiot",
			"Nimrod",
			"Warning",
		],
		image: "greenday",
		correct: 2,
	}
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const imageContainer = document.querySelector('#background');
const startBtn = document.querySelector('#submit');
const submitBtn = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage();
startQuiz();

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}
function startQuiz() {
	const startTemplate = 
		`<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>`;
	let title = '🎸 Rock Quiz 🎸';
	let message = 'This quiz will test how well you know and understand rock music.';
	let letStart = "🎵 Well, let's start! 🎵";
	const showStart = startTemplate
								.replace('%title%', title)
								.replace('%message%', message)
								.replace('%result%', letStart);
	headerContainer.innerHTML = showStart;
	startBtn.blur();
	startBtn.innerHTML = '😈 Start 😈';
	startBtn.onclick = function() {
		showQuestion();
		submitBtn.innerHTML = 'Next';
		submitBtn.onclick = checkAnswer;

	}
}
function showQuestion() {
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;
	const imageTemplate = 
		`.image__block {
			background-image: url(assets/%rock%.jpg);
		}`;
	const image = imageTemplate.replace('%rock%', questions[questionIndex]['image']);
	imageContainer.innerHTML = image;
	let answerNumber = 1;
	for(answerText of questions[questionIndex]['answers']){
		const questionTemplate = 
		`<li>
			<label class="radio__button">
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span class="check__radio">%answer%</span>
			</label>
		</li>`;
		const answerHTML = questionTemplate
										.replace('%answer%', answerText)
										.replace('%number%', answerNumber);
		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}
}

function checkAnswer() {
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	if (!checkedRadio) submitBtn.blur();
	const userAnswer = parseInt(checkedRadio.value);
	if(userAnswer === questions[questionIndex]['correct']) score++;
	if(questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	}
	else {
		clearPage();
		showResults();
	}
}

function showResults() {
	const imageTemplate = 
		`.image__block {
			background-image: url(assets/%rock%.jpg);
		}`;
	const final = 'final';
	const image = imageTemplate.replace('%rock%', final);
	imageContainer.innerHTML = image;
	const resultTemplate = 
		`<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>`;
	let title, message;
	if(score === questions.length){
		title = '🤘 Great 🤘';
		message = 'Your love for rock music is incredible! Hurry up to raise a real rock flag and team up with real rockers!';
	}
	else if((score * 100)/questions.length >= 50) {
		title = '🎶 Cool 🎶';
		message = 'Wow, you definitely know your rock music! Hold a star ticket for the next concert in your city!';
	}
	else {
		title = '🥁 Well 🥁';
		message = "Don't be discouraged, rock music is a complex topic. Hold on to your guitar and keep rehearsing!";
	}
	let result = `${score} out of ${questions.length}`;
	const finalMessage = resultTemplate
									.replace('%title%', title)
									.replace('%message%', message)
									.replace('%result%', result);
	headerContainer.innerHTML = finalMessage;
	submitBtn.blur();
	submitBtn.innerHTML = '😈 Start over 😈';
	submitBtn.onclick = function() { history.go(); }
}