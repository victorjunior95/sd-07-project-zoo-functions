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

const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals
    .filter(animal => ids
    .some(id => id === animal.id,
  ));
}

function animalsOlderThan(animal, age) {
  return data.animals.some(specie => specie.name === animal &&
    specie.residents.every(resident => resident.age >= age,
  ));
}

function employeeByName(employeeName) {
  return employeeName === undefined ? {} :
  data.employees.find(employee =>
    employee.firstName === employeeName ||
    employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return data.employees.some(employee =>
    employee.managers.find(manager => manager === id,
  ));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function getAllAnimalNamesAndQuantity() {
  return data.animals.reduce((acc, current) => {
    acc[current.name] = current.residents.length;
    return acc;
  }, {});
}

function animalCount(species) {
  if (species === undefined) {
    return getAllAnimalNamesAndQuantity();
  }
  return data.animals.find(animal =>
    animal.name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  const price = Object.keys(entrants)
  .map(lifestage => data.prices[lifestage]);
  const parametersValues = Object.values(entrants);

  return price.reduce((acc, currentValue, index) => {
    acc += currentValue * parametersValues[index];
    return acc;
  }, 0);
}

function animalMap(options) {

}

function schedule(dayName) {
  const openingHours = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };

  const openingDay = {};

  if (dayName === undefined) {
    return openingHours;
  }

  openingDay[dayName] = openingHours[dayName];
  return openingDay;
}

const findEmployeeAnimal = id => data.employees
  .find(employee => employee.id === id)
  .responsibleFor.find(element => element);

const getEmployeeAnimal = id => animals
  .find(animal => animal.id === findEmployeeAnimal(id));

function oldestFromFirstSpecies(id) {
  return Object.values(getEmployeeAnimal(id).residents
    .reduce((acc, currentValue) => {
      acc = currentValue.age > acc.age ? currentValue : acc;
      return acc;
    }),
  );
}

function increasePrices(percentage) {
  const keys = Object.keys(data.prices);
  const newValues = Object.values(data.prices)
    .map(price => ((price * 100) + Math.round(price * percentage)) / 100);

  data.prices = keys.reduce((acc, currentValue, index) => {
    acc[currentValue] = newValues[index];
    return acc;
  }, {});
}

function getEmployeesAnimalsNames(teste) {
  return teste.responsibleFor.map(id =>
    data.animals
    .find(animal => animal.id === id).name,
  );
}

function createObjectEmployeesResponsibleFor() {
  return data.employees.reduce((acc, currentValue) => {
    acc[`${currentValue.firstName} ${currentValue.lastName}`] =
      getEmployeesAnimalsNames(currentValue);
    return acc;
  }, {});
}

function createObjectEmployeeResponsibleFor(idOrName) {
  const employeeById = data.employees.find(employee =>
    employee.id === idOrName ||
    employee.firstName === idOrName ||
    employee.lastName === idOrName,
  );
  const employeeFullName = `${employeeById.firstName} ${employeeById.lastName}`;

  return { [employeeFullName]: getEmployeesAnimalsNames(employeeById) };
}


function employeeCoverage(idOrName) {
  if (!idOrName) {
    return createObjectEmployeesResponsibleFor();
  }
  return createObjectEmployeeResponsibleFor(idOrName);
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
