const { animals, hours } = require('./data');
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

const data = require('./data');


function animalsByIds(...ids) {
  // seu código aqui
  // aqui
  return animals.filter((animal) => {
    if (ids.includes(animal.id)) {
      return true;
    }
    return false;
  });
}

function animalsOlderThan(specie, age) {
  // seu código aqui
  const selectedAnimals = data.animals.find(animal => animal.name === specie);
  const residents = selectedAnimals.residents;
  const verify = residents.every(resident => resident.age >= age);
  return (verify);
}

function employeeByName(employeeName = '') {
  // seu código aqui
  if (employeeName === '') {
    return ({});
  }

  const employeeOutput = data.employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return (employeeOutput);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const receivedPersonalInfo = personalInfo;
  const receivedAssociatedWith = associatedWith;

  const newEmployee = {
    id: receivedPersonalInfo.id,
    firstName: receivedPersonalInfo.firstName,
    lastName: receivedPersonalInfo.lastName,
    managers: receivedAssociatedWith.managers,
    responsibleFor: receivedAssociatedWith.responsibleFor,
  };

  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(inputSpecies = '') {
  // seu código aqui
  if (inputSpecies === '') {
    const speciesAndCount = {};
    data.animals.forEach((element) => {
      speciesAndCount[element.name] = element.residents.length;
    });
    return (speciesAndCount);
  }

  const selectedSpecies = data.animals.find(animal => animal.name === inputSpecies);
  return (selectedSpecies.residents.length);
}

function entryCalculator(entrants = '') {
  // seu código aqui
  if (entrants === '' || entrants === {}) {
    return 0;
  }
  let totalEntrancesPrice = 0;
  if (entrants.Adult > 0) {
    totalEntrancesPrice += (entrants.Adult * data.prices.Adult);
  }
  if (entrants.Senior > 0) {
    totalEntrancesPrice += (entrants.Senior * data.prices.Senior);
  }
  if (entrants.Child > 0) {
    totalEntrancesPrice += (entrants.Child * data.prices.Child);
  }

  return totalEntrancesPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName = '') {
  // seu código aqui
  const timeTable = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (dayName === '') {
    return timeTable;
  }
  const selectedDay = hours.find(element => element.key === dayName);
  if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  const saida = `{ ${selectedDay.key}: Open from ${selectedDay.open}am until ${selectedDay.close - 12}pm}`;
  return (saida);
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
  const actualPrices = data.prices;
  actualPrices.Adult += Math.round(actualPrices.Adult * percentage).toFixed(2) / 100;
  actualPrices.Senior += Math.round(actualPrices.Senior * percentage).toFixed(2) / 100;
  actualPrices.Child += Math.round(actualPrices.Child * percentage).toFixed(2) / 100;
  data.prices = {
    Adult: Math.round(actualPrices.Adult * 100) / 100,
    Senior: Math.round(actualPrices.Senior * 100) / 100,
    Child: Math.round(actualPrices.Child * 100) / 100,
  };
}

function employeeCoverage(idOrNamec = '') {
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
