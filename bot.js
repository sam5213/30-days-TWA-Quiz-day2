const { Telegraf } = require('telegraf');


const bot = new Telegraf(process.env.BOT_TOKEN_DAY1);

const questions = [
  {
    question: "Какой язык программироавния используется для разработки телеграм-ботов?",
    answer: "JavaScript"
  },
  {
    question: "Какой протокол используется для передачи данных в интернете?",
    answer: "HTTP"
  },
  {
    question: "Что такое HTML?",
    answer: "Язык разметки"
  }
]

let currentQuestionIndex = 0;
let currentAnswerCount = 0;

bot.start((ctx) => {
    currentQuestionIndex = 0;
    currentAnswerCount = 0;
    ctx.reply("Привет! Давай сыграем в квиз c нескольки вопросами. " + questions[currentQuestionIndex].question);
});

bot.on('text', (ctx) => {
    const userAnswer = ctx.message.text;

    if (userAnswer.toLowerCase() == questions[currentQuestionIndex].answer.toLowerCase()) {
        currentAnswerCount++
        ctx.reply("Правильно! Молодец!");
    } else {
        ctx.reply("Неправильно. Попробуй следующий вопрос!");
        
    }

    currentQuestionIndex++;
    console.log(`Текущий индекс вопроса: ${currentQuestionIndex}`);
    if (currentQuestionIndex < questions.length) {
        ctx.reply(questions[currentQuestionIndex].question);
    } else {
        ctx.reply(`Квиз завершен! Вы ответили правильно на ${currentAnswerCount} вопросов из ${questions.length} вопросов.`);
        currentQuestionIndex = 0;
    }
});

bot.launch()
    .then(() => {
        console.log("Бот запущен!");
    })
    .catch((error) => {
        console.error("Ошибка при запуске бота: ", error);
    });
