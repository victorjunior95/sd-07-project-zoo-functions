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

const { employees, animals, prices } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  if (ids.length === 0) {
    return ids;
  }
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const a = data.animals.find(resultado => resultado.name === animal);
  return a.residents.every(animalzinho => animalzinho.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  const a = {};
  if (employeeName === undefined) {
    return a;
  }
  return employees.find(nome => nome.firstName === employeeName || nome.lastName === employeeName);
}
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui pedi ajuda do Bruno Sordi para entender como o assign funcionava;
  const colaborador = Object.assign(personalInfo, associatedWith);
  return colaborador;
}

function isManager(id) {
  // seu código aqui
  return employees.some(isso => isso.managers.some(numero => numero === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
    // seu código aqui
  const a = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  employees.push(a);
}


function animalCount(species) {
  // seu código aqui

  if (!species) {
    const obj = {};
    animals.forEach((i) => {
      obj[i.name] = i.residents.length;
    });
    return obj;
  }
  const r = animals.find(a => a.name === species);
  return r.residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  // usei um pedaço de codigo de uma página do stackoverflow
  if (!entrants) {
    return 0;
  }
  if (Object.keys(entrants).length === 0) {
    return 0;
  }
  Object.keys(entrants).forEach((i) => {
    console.log(i);
    if (i === Object.keys(prices)) {
      let a = 0;
      a += Object.values(prices) * Object.values(i);
      console.log(a);
    }
  });
  return 0;
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
