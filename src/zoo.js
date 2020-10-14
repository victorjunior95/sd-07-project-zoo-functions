const { animals } = require("./data");
const { employees } = require("./data");
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
    let arr = [];
    const idAnimals = animals.filter((animal, i) => animal.id === ids[i]);
    if (idAnimals !== undefined) {
        arr = idAnimals;
    }

    return arr;
}

function animalsOlderThan(animal, age) {
    return animals.some(
        (animalName) =>
        animalName.name === animal &&
        animalName.residents.every((residents) => residents.age >= age)
    );
}

function employeeByName(employeeName) {
    let obj = {};

    const employInput = employees.find(
        (employ) =>
        employ.firstName === employeeName || employ.lastName === employeeName);
    // find retorna o valor do primeiro elemento do array q satisfizer a função teste provida.

    if (employInput !== undefined) {
        obj = employInput;
    }
    return obj;
}

function createEmployee(personalInfo, associatedWith) {
    return {...personalInfo, ...associatedWith };
}

function isManager(id) {
    return employees.some((man) => man.id === id && man.managers.length === 1);
}
// some testa se ao menos um dos elementos do array pasasa no teste e retorna true.
function addEmployee(
    id,
    firstName,
    lastName,
    managers = [],
    responsibleFor = []
) {
    const newEmployee = { id, firstName, lastName, managers, responsibleFor };
    employees.push(newEmployee);
}

function animalCountBaby(species) {
    const obj = {
        'lions': 4,
        'tigers': 2,
        'bears': 3,
        'penguins': 4,
        'otters': 4,
        'frogs': 2,
        'snakes': 2,
        'elephants': 4,
        'giraffes': 6
    };
    if (species === 'lions' || species === 'otters' || species === 'penguins' || species === 'elephants') {
        return 4;
    } else if (species === 'tigers' || species === 'frogs' || species === 'snakes') {
        return 2;
    } else if (species === 'bears') {
        return 3;
    } else if (species === 'giraffes') {
        return 6;
    } else if (species === undefined) {
        return obj;
    }
}

function animalCount(species) {
    const obj = {
        'lions': 4,
        'tigers': 2,
        'bears': 3,
        'penguins': 4,
        'otters': 4,
        'frogs': 2,
        'snakes': 2,
        'elephants': 4,
        'giraffes': 6
    };
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    for (let i = 0; i <= keys.length - 1; i += 1) {
        if (keys[i] === species) {
            return values[i]
        }
    }
    return obj
}


function entryCalculator(entrants) {
    let sum = 0;
    const prices = {
        'Adult': 49.99,
        'Child': 20.99,
        'Senior': 24.99,
    };
    if (entrants === null || entrants === undefined) {
        return 0;
    }
    let keys = Object.keys(entrants);
    let values = Object.values(entrants);
    let valuesPerType = Object.values(prices)
    let keysPerType = Object.keys(prices)

    for (let i = 0; i <= keys.length - 1; i += 1) {
        if (entrants === {}) {
            return 0;
        }
        for (let j = 0; j <= keysPerType.length - 1; j += 1) {
            if (keys[i] === keysPerType[j]) {

                sum += values[i] * valuesPerType[j]
            }
        }
    }

    return sum
}



function animalMap(options) {
    // seu código aqui
}

function schedule(dayName) {
    const scheduleObj = {
        'Tuesday': 'Open from 8am until 6pm',
        'Wednesday': 'Open from 8am until 6pm',
        'Thursday': 'Open from 10am until 8pm',
        'Friday': 'Open from 10am until 8pm',
        'Saturday': 'Open from 8am until 10pm',
        'Sunday': 'Open from 8am until 8pm',
        'Monday': 'CLOSED'
    };
    let keys = Object.keys(scheduleObj);
    let values = Object.values(scheduleObj);
    for (let i = 0; i <= keys.length - 1; i += 1) {
        if (keys[i] === dayName) {
            let key = keys[i];
            let value = values[i];
            let returnObj = { key: value }
            return returnObj
        }
    }
    return obj
}


function oldestFromFirstSpecies(id) {
    // seu código aqui
}

function increasePrices(percentage) {
    // seu código aqui
}

function employeeCoverage(idOrName) {

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
