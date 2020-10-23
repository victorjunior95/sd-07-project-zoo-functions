/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require("./data");

function animalsByIds(...ids) {
  // Versao Tunada em aula e ingles!!!
  const compare = data.animals.filter((animal) => ids.includes(animal.id));
  return compare;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const catchAnimals = data.animals.filter(
    (species) => species.name === animal
  );
  const olderThan = catchAnimals[0].residents.every(
    (older) => older.age >= age
  );
  return olderThan;
}

function employeeByName(employeeName) {
  // carregado na raça
  const personName = employeeName;
  if (typeof personName === "undefined") {
    return {};
  }
  console.log(personName);
  const getPerson = (person) =>
    personName === person.firstName || personName === person.lastName;
  const findPerson = data.employees.find(getPerson);
  return findPerson;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const plusEmployee = { ...personalInfo, ...associatedWith };
  return plusEmployee;
}
function isManager(id) {
  // try hard my friend
  const compareId = [];
  data.employees.map((grup) =>
    grup.managers.forEach((grupElement) => compareId.push(grupElement))
  );
  const cathId = compareId.some((grup) => grup === id);
  return cathId;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []
) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  if (species) {
    const expectedObject = animals.find((item) => item.name === species);
    return expectedObject.residents.length;
  }
  return animals.reduce((result, item) => {
    const currentName = item.name;
    const currentLength = item.residents.length;
    result[currentName] = currentLength;
    return result;
  }, {});
}
function entryCalculator(entrants) {
  // versao tunada credito ao nosso embaixaTrybe
  const paying = { ...entrants };

  if (paying === undefined || paying === []) {
    return 0;
  }
  return Object.keys(paying).reduce(
    (sum, currentValue) =>
      sum + entrants[currentValue] * data.prices[currentValue],
    0
  );
}

function animalMap(options) {
  const catchPrices = data.prices;
  for (let i in catchPrices) {
    const increase = catchPrices[i] * (percentage / 100);
    const around = Math.round((catchPrices[i] + increase) * 100) / 100;
    catchPrices[i] = around;
  }
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // carregado pelo moises
  const catchPrices = Object.entries(data.prices);

  catchPrices.forEach((i) => {
    i[1] += (i[1] * percentage) / 100;
    i[1] = Math.round(i[1]*100) / 100;
    data.prices[i[0]] = i[1];
  });
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
