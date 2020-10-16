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
  return ids.map((id) => {
    const animalId = data.animals.find(animal => animal.id === id);
    return animalId;
  });
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalData = data.animals.find(item => item.name === animal);
  const ageOfAnimals = animalData.residents.every(item2 => item2.age >= age);
  return ageOfAnimals;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (typeof employeeName === 'undefined') {
    return {};
  }
  const findEmployees = data.employees.find(item =>
    item.firstName === employeeName || item.lastName === employeeName);
  return findEmployees;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newObj = { id,
    firstName,
    lastName,
    managers,
    responsibleFor };
  return newObj;
}

function isManager(id) {
  // seu código aqui
  /* const managerVerify = data.employees.some(item => item.managers.includes(id));
  return managerVerify; */
  const managerVerify = data.employees.some((item, index) => item.managers[index] === id);
  return managerVerify;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id,
    firstName,
    lastName,
    managers,
    responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  if (typeof species === 'undefined') {
    const newObj = data.animals.reduce((acc, current) => {
      acc[current.name] = current.residents.length;
      return acc;
    }, {});
    return newObj;
  }
  const specie = data.animals.find(animal => animal.name === species);
  return specie.residents.length;
}

function entryCalculator(...entrants) {
  // seu código aqui
  if (typeof entrants === 'undefined') {
    return 0;
  }
  if (Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult, Child, Senior } = data.prices;
  let totalValue = 0;
  return entrants.map((value) => {
    if (value.Adult) {
      totalValue += value.Adult * Adult;
    }
    if (value.Child) {
      totalValue += value.Child * Child;
    }
    if (value.Senior) {
      totalValue += value.Senior * Senior;
    }
    return totalValue;
  });
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const newObj = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  const newObj2 = {};
  if (typeof dayName === 'undefined') {
    return newObj;
  }
  function getDay() {
    newObj2[`${dayName}`] = `${newObj[dayName]}`;
    return newObj2;
  }
  return getDay(dayName);
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  //recebe o id de um funcionário e encontra o funcionário
  const idEmployee = data.employees.find(item => item.id === id);
  //Encontra a primeira espécie gerenciada (responsibleFor [0])
  const idAnimals = data.animals.find(animalId => animalId.id === idEmployee.responsibleFor[0]);
  //Ve qual animal mais velho
  const order = idAnimals.residents.sort((value1, value2) => value2.age - value1.age);
  //Retorna todas as informações do animal (nome, sexo e idade)
  const { age, name, sex } = order[0];
  return [ name, sex, age ];
}

function increasePrices(percentage) {
  // seu código aqui
  const { Adult, Senior, Child } = data.prices;
  const adultFinal = (Math.round((Adult + ((Adult * percentage) / 100)) * 100) / 100);
  const seniorFinal = (Math.round((Senior + ((Senior * percentage) / 100)) * 100) / 100);
  const childFinal = (Math.round((Child + ((Child * percentage) / 100)) * 100) / 100);
  data.prices.Adult = adultFinal;
  data.prices.Senior = seniorFinal;
  data.prices.Child = childFinal;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  /* if (typeof idOrName === 'undefined') {
    const newObj = {};
    const employeesAndAnimals = data.employees.forEach(person => {
      const findAnimal = data.animals.filter((id, index) => id.id === person.responsibleFor[index]);
      newObj[`${person.firstName} ${person.lastName}`] = findAnimal.name;
    });
    return newObj;
  } */
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
