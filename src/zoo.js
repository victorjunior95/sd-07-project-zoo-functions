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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animalName, ageAnimal) {
  return data.animals
    .find(animal => animal.name === animalName).residents.every(animal => animal.age > ageAnimal);
}

function employeeByName(...employeeName) {
  if (employeeName.length === 0) {
    return {};
  }
  return data.employees.find(employee =>
    employeeName.includes(employee.firstName) || employeeName.includes(employee.lastName));
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith
  };
}

function isManager(id) {
  const checkIdManager = data.employees.map(manager => manager.managers).toString();
  return checkIdManager.includes(id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  };
  data.employees.push(newEmployee);
  return newEmployee;
}

function animalCount(species) {
  let amountAni = null;
  if (species !== undefined) {
    amountAni = data.animals.find(animal => animal.name === species).residents.length;
  } else {
    amountAni = {};
    data.animals.forEach((animal) => {
      amountAni = Object.assign(amountAni, {
        [animal.name]: animal.residents.length
      });
      return amountAni;
    });
  }
  return amountAni;
}

function entryCalculator(entrants) {

}

function animalMap(options) {
  // seu código aqui
}

function schedule(...dayName) {
  if (dayName.length === 0) {
    dayName = Object.keys(data.hours);
  }
  return dayName.reduce((accumulator, current) => {
    accumulator[current] = `Open from ${data.hours[current].open}am until ${data.hours[current].close - 12}pm`;
    if (current === 'Monday') {
      accumulator[current] = 'CLOSED';
    }
    return accumulator;
  }, {});
}


const getIdEmployees = (idEmployee) => {
  const id = data.employees.filter(emplpoyee => emplpoyee.id === idEmployee).find(element => element).responsibleFor;
  return id;
}

const getAnimalsArray = (animalId) => {
  return data.animals.filter(inimalId => inimalId.id === animalId).find(element => element).residents;
}

const getBigger = (bigger, number) => (bigger > number) ? bigger : number;


function oldestFromFirstSpecies(id) {
  let finalResult;
  const arrayIds = getIdEmployees(id);
  const firstIdAnimal = arrayIds[0];
  const arrayObjAnimals = getAnimalsArray(firstIdAnimal);
  const arrayOfAges = arrayObjAnimals.map(item => item.age);
  const bigger = arrayOfAges.reduce(getBigger, 0);
  const arrayObjResult = arrayObjAnimals.filter(bicho => (bicho.age === bigger));
  arrayObjResult.forEach((element) => {
    finalResult = Object.values(element);
  });

  return finalResult;
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
