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
  const result = [];
  if (ids !== undefined) {
    for (let i = 0; i < ids.length; i += 1) {
      data.animals.filter((animal) => {
        if (animal.id === ids[i]) {
          result.push(animal);
          return true;
        }
        return false;
      });
    }
  }
  return result;
}
function animalsOlderThan(animal, age) {
  // seu código aqui
  const lista = data.animals.find(bicho => bicho.name === animal)
  .residents.every(item => item.age >= age);
  return (lista);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  // seu código aqui
  return data.employees
  .find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
    // seu código aqui
  const gerente = data.employees.filter(item => item.managers.includes(id));
  return (gerente.length > 0);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const worker = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(worker);
}

function animalCount(species) {
  const animais = {};
  data.animals.forEach((item) => {
    const linha = item.name;
    const quant = item.residents.length;
    animais[linha] = quant;
  });
  if (species === undefined) {
    return animais;
  }
  return animais[species];
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || entrants === []) return 0;
  let total = 0;
  const { Adult, Child, Senior } = entrants;
  if (Adult !== undefined) total += (Adult * 49.99);
  if (Child !== undefined) total += (Child * 20.99);
  if (Senior !== undefined) total += (Senior * 24.99);
  return total;
}

function schedule(dayName) {
  // seu código aqui
  const days = Object.keys(data.hours);
  const times = Object.values(data.hours);
  const timeTable = {};
  days.map((item, i) => {
    timeTable[item] = `Open from ${times[i].open}am until ${times[i].close - 12}pm`;
    timeTable.Monday = 'CLOSED';
    return 0;
  });
  if (dayName === undefined) {
    return timeTable;
  }
    return { [dayName]: timeTable[dayName] };
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
  // animalMap,
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
