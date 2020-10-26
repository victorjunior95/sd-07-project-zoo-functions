/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const data = require('./data');

function animalsByIds(...ids) {
  // Versao Tunada no plantao do wolf!!!
  const compare = data.animals.filter(animal => ids.includes(animal.id));
  return compare;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const catchAnimals = data.animals.filter(species => species.name === animal);
  const olderThan = catchAnimals[0].residents.every(older => older.age >= age);
  return olderThan;
}

function employeeByName(employeeName) {
  // carregado na raça
  const personName = employeeName;
  if (typeof personName === 'undefined') {
    return {};
  }
  console.log(personName);
  const getPerson = person =>
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
  data.employees.map(grup => grup.managers.forEach(grupElement => compareId.push(grupElement)));
  const cathId = compareId.some(grup => grup === id);
  return cathId;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  if (species) {
    const expectedObject = data.animals.find(item => item.name === species);
    return expectedObject.residents.length;
  }
  return data.animals.reduce((result, item) => {
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
  const result = Object.keys(paying).reduce(
    (sum, currentValue) =>
      (sum += paying[currentValue] * data.prices[currentValue])
      , 0);
  return result;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // super ajuda do meu amigo Mauro junquiera
  const days = Object.keys(data.hours);
  const times = Object.values(data.hours);
  const catchSchedule = {};
  days.map((item, i) => {
    catchSchedule[item] = `Open from ${times[i].open}am until ${times[i].close - 12}pm`;
    catchSchedule.Monday = 'CLOSED';
    return 0;
  });
  if (dayName === undefined) {
    return catchSchedule;
  }
  return { [dayName]: catchSchedule[dayName] };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const especie = data.employees.find(item => item.id === id).responsibleFor[0];
  const oldAnimal = data.animals
  .find(item => item.id === especie).residents
  .sort((a, b) => b.age - a.age)[0];
  return Object.values(oldAnimal);
}

function increasePrices(percentage) {
  // carregado pelo moises
  const catchPrices = Object.entries(data.prices);
  console.log(catchPrices);
  catchPrices.forEach((i) => {
    i[1] += (i[1] * percentage) / 100;
    i[1] = Math.round(i[1] * 100) / 100;
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
