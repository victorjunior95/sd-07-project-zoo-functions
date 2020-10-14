const { animals } = require('./data');
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
  const id = [...ids];
  const scanId = animals.filter(animal => animal.id === id[0] || animal.id === id[1]);
  return scanId;
}

function animalsOlderThan(animal, age) {
  const jaula = animals.find(animalo => animalo.name === animal);
  const idades = jaula.residents.every(bixos => bixos.age >= age);
  return idades;
}

function employeeByName(employeeName) {
  const nomes = data.employees;
  const nome = nomes.filter(n => n.firstName === employeeName || n.lastName === employeeName);
  if (nome[0] === undefined) {
    return {};
  }
  return nome[0];
}

function createEmployee(personalInfo, associatedWith) {
  const novo = personalInfo;
  const {managers, responsibleFor} = associatedWith;
  novo.managers = managers;
  novo.responsibleFor = responsibleFor;
  console.log(novo);
  return novo
}
createEmployee({
  id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
  firstName: 'John',
  lastName: 'Doe',
}, {
  managers: [
    'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
    '9e7d4524-363c-416a-8759-8aa7e50c0992'
  ],
  responsibleFor: [
    '0938aa23-f153-4937-9f88-4858b24d6bce',
    '89be95b3-47e4-4c5b-b687-1fabf2afa274',
    'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5'
  ]
});

function isManager(id) {
  // seu código aqui
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
