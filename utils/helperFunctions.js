const confirmAnswerValidator = (answer) => {
  if (answer !== "") {
    return true;
  }
  return "Please enter at least one character.";
};

const confirmDigitValidator = (answer) => {
  if (answer.match(/^[1-9]\d*$/)) {
    return true;
  }
  return "Please only enter numbers.";
};

const confirmEmailValidator = (answer) => {
  if (answer.match(/\S+@\S+\.\S+/)) {
    return true;
  }
  return "Please a valid email format.";
};

function writeToFile(fileName, data) {
  fs.writeFile(fileName, generateTeam(data), (err) =>
    err ? console.log(err) : console.log("Team Generated!")
  );
}

module.exports = confirmAnswerValidator;
module.exports = confirmDigitValidator;
module.exports = confirmEmailValidator;
