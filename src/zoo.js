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

const animalsByIds = (...ids) => data.animals.filter(animal => ids.includes(animal.id));

const animalsOlderThan = (animal, age) => data.animals
  .find(animalName => animalName.name === animal)
  .residents.every(animalAge => animalAge.age >= age);

const employeeByName = (employeeName) => {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(({ firstName, lastName }) =>
    employeeName === firstName || employeeName === lastName);
  // Solução encontrada após tirar dúvida no slack.
};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });
// Função createEmployee passou no code climate com ajuda do Isaac Batista no slack.

const isManager = id => data.employees.some(manager => manager.managers.includes(id));

const addEmployee =
  (id, firstName, lastName, managers = [], responsibleFor = []) =>
    data.employees.push({ id, firstName, lastName, managers, responsibleFor });

const animalCount = (species) => {
  if (species === undefined) {
    return data.animals.reduce((animal, { name, residents }) => {
      animal[name] = residents.length;
      return animal;
    }, {});
  }
  return data.animals.find(count => count.name === species).residents.length;
};

const entryCalculator = (entrants) => {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  return Object.entries(entrants).reduce((price, total) =>
    price + (data.prices[total[0]] * total[1]), 0);
};

function animalMap(options) {
  // seu código aqui
}

const schedule = (dayName) => {
  const days = {};
  Object.keys(data.hours).forEach((day) => {
    if (data.hours[day].open === data.hours[day].close) {
      days[day] = 'CLOSED';
    } else {
      days[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
    }
  });
  if (dayName !== undefined) {
    return { [dayName]: days[dayName] };
  }
  return days;
};

const oldestFromFirstSpecies = (id) => {
  const employee = data.employees.find(employeeId => employeeId.id === id).responsibleFor[0];
  const { residents } = data.animals.find(name => name.id === employee);

  const {
    name,
    sex,
    age,
  } = residents.reduce((accumulate, animal) => (accumulate.age > animal.age ? accumulate : animal));

  return [name, sex, age];
};

const increasePrices = (percentage) => {
  const currentPercentage = (percentage / 100) + 1;
  Object.entries(data.prices).forEach(([entrance, value]) => {
    data.prices[entrance] = Math.round(value * currentPercentage * 100) / 100;
  });
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
