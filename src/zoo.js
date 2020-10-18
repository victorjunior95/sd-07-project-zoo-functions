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
  const idAnimals = animals.filter((animal, i) => animal.id === ids[i]);
  if (idAnimals !== undefined) {
    arr = idAnimals;
  }

  return arr;
}

function animalsOlderThan(animal, age) {
  return animals.some(
    animalName =>
      animalName.name === animal &&
      animalName.residents.every(residents => residents.age >= age),
  );
}

function employeeByName(employeeName) {
  let obj = {};

  const employInput = employees.find(
    employ =>
      employ.firstName === employeeName || employ.lastName === employeeName,
  );
  // find retorna o valor do primeiro elemento do array q satisfizer a função teste provida.

  if (employInput !== undefined) {
    obj = employInput;
  }
  return obj;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(man => man.id === id && man.managers.length === 1);
}
// some testa se ao menos um dos elementos do array pasasa no teste e retorna true.
function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(species) {
  const obj = {
    lions: 4,
    tigers: 2,
    bears: 3,
    penguins: 4,
    otters: 4,
    frogs: 2,
    snakes: 2,
    elephants: 4,
    giraffes: 6,
  };
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  for (let i = 0; i <= keys.length - 1; i += 1) {
    if (keys[i] === species) {
      return values[i];
    }
  }
  return obj;
}

function entryCalculator(entrants = 0) {
  // seu código aqui
  if (Object.values(entrants).length === 0) {
    entrants = 0;
  } else if (Object.values(entrants).length > 0) {
    const { Adult = 0, Senior = 0, Child = 0 } = entrants;
    entrants = (Adult * prices.Adult) + (Senior * prices.Senior) + (Child * prices.Child);
  }
  return entrants;
}
// consultei o repositorio de krammer para refatoramento desta funçao
// https://github.com/tryber/sd-07-project-zoo-functions/blob/544898ad4e7bca13bb04afc1dfabe4c7ee1da3ca/src/zoo.js

function animalMap(options) {
  // seu código aqui
}

function scheduleAux() {
  const obj = {};
  Object.entries(data.hours).forEach((time) => {
    if (time[0] === 'Monday') {
      obj[time[0]] = 'CLOSED';
    } else {
      obj[time[0]] = `Open from ${time[1].open}am until ${
        time[1].close - 12
      }pm`;
    }
  });
  return obj;
}

function schedule(dayName) {
  if (dayName === undefined) {
    return scheduleAux();
  }
  const obj1 = {};
  Object.entries(scheduleAux()).forEach((week) => {
    if (week[0] === dayName) {
      obj1[week[0]] = week[1];
    }
  });
  return obj1;
}
// consultei o repositório de Kramer para a refatoração desta função
// ( codeclimate não aceitou minha solução)
// Eu não havia me atentado ao fato de que deveria relacionar
//  a função á propriedade hours de data.js.
// https://github.com/tryber/sd-07-project-zoo-functions/blob/544898ad4e7bca13bb04afc1dfabe4c7ee1da3ca/src/zoo.js

function oldestFromFirstSpecies(id) {}

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  data.prices.Adult = Math.round(data.prices.Adult * increase * 100) / 100;
  data.prices.Senior = Math.round(data.prices.Senior * increase * 100) / 100;
  data.prices.Child = Math.round(data.prices.Child * increase * 100) / 100;
}
// consultei o repositório de Kramer para a refatoração desta função.
// https://github.com/tryber/sd-07-project-zoo-functions/blob/544898ad4e7bca13bb04afc1dfabe4c7ee1da3ca/src/zoo.js
const employeeAnimal = (responsibleFor) => {
  const arrayOfAnimal = [];
  responsibleFor.forEach((animalId) => {
    animals.filter(({ id, name }) => {
      if (id === animalId) {
        arrayOfAnimal.push(name);
      }
      return false;
    });
  });
  return arrayOfAnimal;
};

const withNameId = (idOrname) => {
  const newObject = {};
  employees.filter(({ id, firstName, lastName, responsibleFor }) => {
    if (idOrname === id || idOrname === firstName || idOrname === lastName) {
      newObject[`${firstName} ${lastName}`] = employeeAnimal(responsibleFor);
    }
    return false;
  });
  return newObject;
};

function employeeCoverage(idOrName) {
  // seu código aqui
  const newObject = {};
  if (!idOrName) {
    employees.forEach(({ firstName, lastName, responsibleFor }) => {
      newObject[`${firstName} ${lastName}`] = employeeAnimal(responsibleFor);
    });
  } else {
    return withNameId(idOrName);
  }
  return newObject;
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
