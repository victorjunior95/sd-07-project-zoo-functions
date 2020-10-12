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
  return data.animals.filter(animais => ids.includes(animais.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const findAnimal = data.animals.filter(element => element.name === animal);
  return findAnimal[0].residents.every(elementos => elementos.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(element =>
    element.firstName === employeeName || element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  data.animals = { ...personalInfo, ...associatedWith };
  const newArray = data.animals;
  return newArray;
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(({ managers }) => managers[0] === id || managers[1] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  const animais = [];
  const residentes = [];
  const newObject = {};
  data.animals.forEach(element => animais.push(element.name));
  data.animals.forEach(element => residentes.push(element.residents.length));
  animais.forEach((element, index) => {
    Object.assign(newObject, { [element]: residentes[index] });
  });
  for (let count = 0; count < animais.length; count += 1) {
    if (animais[count] === species) {
      return residentes[count];
    }
  }
  return newObject;
}

function entryCalculator(entrants = 0) {
  // seu código aqui
  if (Object.entries(entrants).length === 0) return 0;
  const preco = data.prices;
  let total = 0;
  Object.keys(entrants).forEach(element => (total += entrants[element] * preco[element]));
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
// seu código aqui
  const resultado = {};
  const horarios = { ...data.hours };
  Object.keys(horarios).forEach((count) => {
    if (horarios[count].open !== horarios[count].close) {
      resultado[count] = `Open from ${horarios[count].open}am until ${horarios[count].close - 12}pm`;
    } else {
      resultado[count] = 'CLOSED';
    }
  });
  if (dayName === undefined) {
    return resultado;
  }
  return { [dayName]: resultado[dayName] };
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
