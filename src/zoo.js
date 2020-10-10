const { animals } = require('./data');
const { employees } = require('./data');
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
    let arr = [];
    const idAnimals = animals.filter((animal, i) => (animal.id === ids[i]));
    if (idAnimals !== undefined) {
        arr = idAnimals;
    }

    return arr;
}

function animalsOlderThan(animal, age) {
    return animals.some(animalName => animalName.name === animal &&
        animalName.residents.every(residents => residents.age >= age));
}


function employeeByName(employeeName) {
    let obj = {};

    const employInput = employees.find(employ => employ.firstName === employeeName ||
        employ.lastName === employeeName);

    if (employInput !== undefined) {
        obj = employInput;
    }
    return obj;
}

function createEmployee(personalInfo, associatedWith) {
    return {...personalInfo, ...associatedWith }
}

function isManager(id) {

}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {}

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
