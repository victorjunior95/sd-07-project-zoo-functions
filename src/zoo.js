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

const { prices, employees, animals, hours } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const reduct = animals.filter(element => element.name === animal);
  return reduct[0].residents.every(newElement => newElement.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(employee => employee.firstName === employeeName
    || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const animal = [];
  const resident = [];
  const newObject = {};
  animals.forEach(element => animal.push(element.name));
  animals.forEach(element => resident.push(element.residents.length));
  animal.forEach((element, index) => {
    Object.assign(newObject, { [element]: resident[index] });
  });
  for (let i = 0; i < animal.length; i += 1) {
    if (animal[i] === species) {
      return resident[i];
    }
  }
  return newObject;
}

function entryCalculator(entrants = 0) {
  if (Object.entries(entrants).length === 0) return 0;
  const price = prices;
  let total = 0;
  Object.keys(entrants).forEach(element => (total += entrants[element] *
    price[element]));
  return total;
}

function animalMap(options) {
  
}

function schedule(dayName) {
  const result = {};
  const horarios = { ...hours };
  Object.keys(horarios).forEach((count) => {
    if (horarios[count].open !== horarios[count].close) {
      result[count] = `Open from ${horarios[count].open}am until ${horarios[count].close - 12}pm`;
    } else {
      result[count] = 'CLOSED';
    }
  });
  if (dayName === undefined) {
    return result;
  }
  return { [dayName]: result[dayName] };
}

function oldestFromFirstSpecies(id) {
  const { employees } = data;
  const firstSpecie = employees.find(element => element.id === id).responsibleFor[0];
  let animalFound = [];
  animals.filter((element) => {
    if (element.id === firstSpecie) {
      animalFound = element.residents;
    }
    return true;
  });
  const byAge = animalFound.sort((a, b) => b.age - a.age);
  return [byAge[0].name, byAge[0].sex, byAge[0].age];
}

function increasePrices(percentage) {
  Object.entries(prices).forEach((element) => {
    prices[element[0]] = Math.ceil(element[1] * (percentage + 100)) / 100;
  });
  return prices;
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
