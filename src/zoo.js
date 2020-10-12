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

const [animals, employees, prices, hours] = [data.animals, data.employees, data.prices, data.hours];

const animalsByIds = (...ids) => ids.map(id => animals.find(animal => id === animal.id));

const animalsOlderThan = (animal, age) => animals.find(element =>
  element.name === animal).residents.every(element => element.age >= age);

const nameOrLast = nam => employees.find(element =>
  element.firstName === nam || element.lastName === nam);

const employeeByName = employeeName => (employeeName === undefined ? {} : nameOrLast(employeeName));

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = id => employees.some(element => element.managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const obj = { id, firstName, lastName, managers, responsibleFor };
  Object.entries(obj).forEach((element) => { obj[element[0]] = element[1]; });
  // for (let nam in obj) { nam = obj[nam] };
  employees.push(obj);
};

const getLengthList = () =>
  animals.reduce((acc, str) => {
    acc[str.name] = str.residents.length;
    return acc;
  }, {});

const animalCount = (species = getLengthList()) => {
  if (typeof species !== 'string') return species;
  return animals.find(element => element.name === species).residents.length;
};

const whatValue = (value) => {
  switch (value) {
    case 'Adult':
      return prices.Adult;
    case 'Senior':
      return prices.Senior;
    case 'Child':
      return prices.Child;
    default:
      return value;
  }
};

const entryCalculator = (entrants = 0) =>
  Object.entries(entrants).reduce((acc, current) =>
    acc + (current[1] * whatValue(current[0])), 0);

function animalMap(options) {
  /** Sem parâmetros, retorna animais categorizados por localização
   * Com a opção includeNames: true especificada, retorna nomes de animais
   * Com a opção sorted: true especificada, retorna nomes de animais ordenados
   * Com a opção sex: 'female' ou sex: 'male' especificada, retorna somente
   nomes de animais macho/fêmea
   * Com a opção sex: 'female' ou sex: 'male' especificada e a opção sort:
   true especificada,
   retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
   * Só retorna informações ordenadas e com sexo se a opção includeNames:
   true for especificada */
}

const listHours = (input = Object.keys(hours)) => input.reduce((acc, curr) => {
  if (hours[curr].close !== 0) {
    acc[curr] = `Open from ${hours[curr].open}am until ${(hours[curr].close - 12)}pm`;
  } else {
    acc[curr] = 'CLOSED';
  }
  return acc;
}, {});

const schedule = (dayName = listHours()) => {
  if (typeof dayName === 'string') return listHours([dayName]);
  return dayName;
};

function oldestFromFirstSpecies(id) {
  const specieId = employees.find(employee => employee.id === id).responsibleFor[0];
  const animalsArr = animals.find(specie => specie.id === specieId).residents;
  const animal = animalsArr.reduce((cc, crr) => (crr.age < cc.age ? cc : crr));
  return Object.values(animal);
}

const calculatorPrecision = (value, percent) => {
  const valuePrecision = value * 100;
  const percentPrecision = percent / 100;
  return (Math.round((valuePrecision * percentPrecision) + valuePrecision)) / 100;
};

const increasePrices = percentage => Object.entries(prices).forEach(function (item) {
  prices[item[0]] = calculatorPrecision(item[1], percentage);
});

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
