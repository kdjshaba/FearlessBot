exports.run = function (message, params, bot, db) {
  if (params === "") {
    message.reply("Please enter a question, e.g. ``!question Is butt legs?``");
    return;
  }
  db.query(
    "INSERT INTO trivia_questions (user, question, timecreated) VALUES (?, ?, now())",
    [message.author.id, params],
    function (err, result) {
      message.reply("Question #" + result.insertId + " has been registered.");
    }
  );
};

exports.interaction = function (interaction, bot, db) {
  const question = interaction.options.getString("question");
  db.query(
    "INSERT INTO trivia_questions (user, question, timecreated) VALUES (?, ?, now())",
    [interaction.user.id, question],
    function (err, result) {
      interaction.reply({
        content: "Question #" + result.insertId + " has been registered."
      });
    }
  );
};
