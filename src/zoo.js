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
const { employees } = require('./data');

const data = require('./data');

function animalsByIds(ids) {
    // seu código aqui
}

function animalsOlderThan(animal, age) {
    // seu código aqui
}

function employeeByName(employeeName) {
    // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
    // seu código aqui
}

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

const coverage = {
    'Nigel Nelson': ['lions', 'tigers'],
    'Burl Bethea': ['lions', 'tigers', 'bears', 'penguins'],
    'Ola Orloff': ['otters', 'frogs', 'snakes', 'elephants'],
    'Wilburn Wishart': ['snakes', 'elephants'],
    'Stephanie Strauss': ['giraffes', 'otters'],
    'Sharonda Spry': ['otters', 'frogs'],
    'Ardith Azevado': ['tigers', 'bears'],
    'Emery Elser': ['elephants', 'bears', 'lions'],
};



function employeeCoverage(idOrName) {
    const coverage = {
        'Nigel Nelson': ['lions', 'tigers'],
        'Burl Bethea': ['lions', 'tigers', 'bears', 'penguins'],
        'Ola Orloff': ['otters', 'frogs', 'snakes', 'elephants'],
        'Wilburn Wishart': ['snakes', 'elephants'],
        'Stephanie Strauss': ['giraffes', 'otters'],
        'Sharonda Spry': ['otters', 'frogs'],
        'Ardith Azevado': ['tigers', 'bears'],
        'Emery Elser': ['elephants', 'bears', 'lions'],
    };
    if (idOrName === undefined) {
        return coverage;
    }
    const employ = employees.find(employe =>
        employe.firstName === idOrName || employe.lastName === idOrName || employe.id === idOrName, );
    const returnn = `${employ.firstName} ${employ.lastName}`;
    const coverageKeys = Object.keys(coverage);
    const coverageValues = Object.values(coverage);
    for (let i = 0; i <= 8; i += 1) {
        if (returnn === coverageKeys[i]) {
            return {
                [`${returnn}`]: coverageValues[i]
            }
        }
    }
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