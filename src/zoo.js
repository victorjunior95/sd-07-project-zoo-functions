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
  const animalsId = ids;

  if (animalsId.length === 0) {
    return [];
  }

  const animals = [];

  animalsId.forEach((animal) => {
    const uniqueAnimal = data.animals.filter(element => element.id === animal);

    animals.push(uniqueAnimal[0]);
  });

  return animals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalToFind = animal;

  const animals = data.animals.filter(dataAnimal => dataAnimal.name === animalToFind);

  const isMinimumAge = animals[0].residents.every(resident => resident.age >= age);

  return isMinimumAge;
}

function employeeByName(employeeName = {}) {
  // seu código aqui
  const nameOrSurname = employeeName;

  if (Object.keys(nameOrSurname).length === 0) {
    return {};
  }

  const employee = data.employees.filter(info =>
    (info.firstName === nameOrSurname) || (info.lastName === nameOrSurname),
  );

  return employee[0];
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = personalInfo;

  newEmployee.managers = associatedWith.managers;
  newEmployee.responsibleFor = associatedWith.responsibleFor;

  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const idEmployee = id;

  const isAManager = data.employees.some(person =>
    person.managers[0] === idEmployee,
  );

  return isAManager;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(...species) {
  // seu código aqui
  if (species.length === 0) {
    const objAnimal = {};

    data.animals.forEach((animal) => { objAnimal[animal.name] = animal.residents.length; });

    return objAnimal;
  }
  const animalName = species[0];

  const specie = data.animals.filter(animal => animal.name === animalName);

  const numberOfAnimals = specie[0].residents.length;

  return numberOfAnimals;
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
