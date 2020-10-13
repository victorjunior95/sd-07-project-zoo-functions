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

const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const listaAnimal = [];
  ids.forEach((idAtual) => {
    for (let index = 0; index < animals.length; index += 1) {
      if (idAtual === animals[index].id) {
        listaAnimal.push(animals[index]);
      }
    }
  });
  return listaAnimal;
}

function animalsOlderThan(animal, age) {
  const animalObject = animals.find(animalAtual => animalAtual.name === animal);
  return animalObject.residents.every(redidentAtual => redidentAtual.age > age);
}

function employeeByName(emplName) {
  if (emplName !== undefined) {
    return data.employees.find(atl => atl.firstName === emplName || atl.lastName === emplName);
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return data.employees.find(empregadoAtual => empregadoAtual.id === id);
}

function isManager(id) {
  return data.employees.some(empregadoAtual => empregadoAtual.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
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
