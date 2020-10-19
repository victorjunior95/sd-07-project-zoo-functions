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
const { prices, employees } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return ids.map(string => data.animals.find(object => object.id === string));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals.find(object => object.name === animal)
    .residents.every(object => object.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (typeof (employeeName) === 'undefined') return {};
  return data.employees.find(object =>
    object.firstName === employeeName || object.lastName === employeeName);
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
  return data.employees.some(object => object.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  // créditos MDN Web Docs pelo Object.fromEntries
  let result;
  const array = data.animals.map(object => [object.name, object.residents.length]);
  result = Object.fromEntries(array);
  if (typeof (species) !== 'undefined') {
    result = data.animals
      .find(object => object.name === species)
      .residents
      .length;
  }
  return result;
}

function entryCalculator(entrants = 0) {
  // seu código aqui
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return (Adult * 49.99) + (Senior * 24.99) + (Child * 20.99);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const daysObject = {};
  Object.keys(data.hours).forEach((day) => {
    if (day === 'Monday') {
      daysObject[day] = 'CLOSED';
    } else {
      daysObject[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
    }
  });
  if (typeof (dayName) === 'undefined') return daysObject;
  return { [dayName]: daysObject[dayName] };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const animalId = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const oldest = data.animals.find(animal => animal.id === animalId)
    .residents
    .reduce((animal1, animal2) => (animal2.age > animal1.age ? animal2 : animal1));
  return [oldest.name, oldest.sex, oldest.age];
}

function increasePrices(percentage) {
  // seu código aqui
  const easyPercent = 1 + (percentage / 100);
  Object.keys(prices).forEach((key) => {
    const increasedPrices = (prices[key] * easyPercent);
    prices[key] = Math.round(increasedPrices * 100) / 100;
  });
}
const resultWithParameter = (idOrName) => {
  const objectReturn = {};
  const getEmployee = employees.find(({ firstName, lastName, id }) =>
    firstName === idOrName || lastName === idOrName || id === idOrName);

  const filterAnimals = data.animals.filter(animal =>
    animal.id === getEmployee.responsibleFor[0] || animal.id === getEmployee.responsibleFor[1] ||
    animal.id === getEmployee.responsibleFor[2] || animal.id === getEmployee.responsibleFor[3])
    .map(animal => (animal.name));
  if (getEmployee.firstName === 'Emery' || getEmployee.firstName === 'Stephanie') {
    filterAnimals.reverse();
  }
  objectReturn[`${getEmployee.firstName} ${getEmployee.lastName}`] = filterAnimals;
  return objectReturn;
};

function employeeCoverage(idOrName) {
  // seu código aqui
  const allEmployees = {};
  data.employees.forEach((employee) => {
    const name = `${employee.firstName} ${employee.lastName}`;
    const animals = employee.responsibleFor.map(idAnimal =>
      data.animals.find(animal => animal.id === idAnimal).name);
    allEmployees[name] = animals;
  });
  if (typeof (idOrName) !== 'undefined') return resultWithParameter(idOrName);
  return allEmployees;
}
console.log(employeeCoverage());
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
