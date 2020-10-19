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
const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

const animalsByIds = (...ids) => animals.filter(animal => ids.includes(animal.id));

const animalsOlderThan = (animal, age) => data.animals.find(especie => especie.name === animal)
.residents.every(indice => indice.age > age);

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(indice => (
    indice.firstName === employeeName || indice.lastName === employeeName));
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

const animalList = () => {
  const resultObj = {};
  animals.forEach(({ name, residents }) => {
    resultObj[name] = residents.length;
  });
  return resultObj;
};

const animalCount = (animal) => {
  if (animal === undefined) return animalList();
  return animals.find(element => element.name === animal).residents.length;
};

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants)
    .reduce((acumulator, [person, elementPrice]) =>
    (acumulator += prices[person] * elementPrice), 0);
}

function animalMap(options) {
  // seu código aqui
}

function calendar() {
  const fullSchedule = Object.entries(hours).map(([index, { open, close }]) => {
    if (open === 0 && close === 0) {
      return [index, 'CLOSED'];
    }
    return [index, `Open from ${open}am until ${close - 12}pm`];
  });
  return Object.fromEntries(fullSchedule);
}

function schedule(dayName) {
  if (dayName === undefined) return calendar();
  const day = calendar();
  return { [dayName]: day[dayName] };
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find(func => func.id === id);
  const animalResponsavel = animals.find(index => index.id === employee.responsibleFor[0]);
  animalResponsavel.residents.sort((valueA, valueB) => valueB.age - valueA.age);
  return [animalResponsavel.residents[0].name,
    animalResponsavel.residents[0].sex, animalResponsavel.residents[0].age];
}

const increasePrices = (percentage) => {
  Object.keys(prices)
  .forEach((elementPrice) => {
    prices[elementPrice] =
    Math.ceil((prices[elementPrice] * (100 + percentage))) / 100;
  });
};

const nameAnimal = id => animals.find(indice => indice.id === id).name;

const fullList = employees.reduce((acumulator, i) => {
  acumulator[`${i.firstName} ${i.lastName}`] = i.responsibleFor.map(nameAnimal);
  return acumulator;
}, {});

function employeeCoverage(idOrName) {
  if (!idOrName) return fullList;
  const employee = employees.find(indice => indice.id === idOrName ||
  indice.firstName === idOrName || indice.lastName === idOrName);
  const result = Object.keys(fullList).find(indice => indice.includes(employee.firstName));
  return { [result]: fullList[result] };
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
