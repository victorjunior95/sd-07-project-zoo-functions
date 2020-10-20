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
  if (ids === undefined) {
    return [];
  }
  const animalById = data.animals.filter(animals => ids.includes(animals.id));
  return animalById;
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
    ...associatedWith,
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
    responsibleFor,
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
        [animal.name]: animal.residents.length,
      });
      return amountAni;
    });
  }
  return amountAni;
}

function entryCalculator(entrants) {
  let count;
  // converti o parametro num array para poder usar o length
  if (typeof entrants === 'object') {
    count = Object.entries(entrants).length;
  }

  if (entrants === undefined || count === 0) {
    return 0;
  }
  // desestrutura o obj para trabalhar com os atributos isolados
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;

  let total = 0;
  total = Adult * data.prices.Adult;
  total += Senior * data.prices.Senior;
  total += Child * data.prices.Child;

  return total;
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


const employeeObj = (idEmployee) => {
  const getEmployee = data.employees.filter(emplpoyee => emplpoyee.id === idEmployee);
  const buildAnimalResponse = getEmployee.find(element => element).responsibleFor;
  return buildAnimalResponse;
};

const getBigger = (acc, curr) => {
  if (acc < curr) {
    acc = curr;
  }
  return acc;
};

function oldestFromFirstSpecies(id) {
  let finalResult;
  const arrayIds = employeeObj(id);
  const firstIdAnimal = arrayIds[0];
  const arrayObjAnimals = data.animals.filter(inimalId => inimalId.id === firstIdAnimal)
  .find(element => element).residents;
  const arrayOfAges = arrayObjAnimals.map(item => item.age);
  const bigger = arrayOfAges.reduce(getBigger);
  const arrayObjResult = arrayObjAnimals.filter(bicho => (bicho.age === bigger));
  arrayObjResult.forEach((element) => {
    finalResult = Object.values(element);
  });
  return finalResult;
}

function increasePrices(percentage) {
  // seu código aqui
}

const everyBody = () => {
  const getNamePersonAndAnimals = {};
  const animals = data.animals;
  const employees = data.employees;
  employees.forEach((personId) => {
    getNamePersonAndAnimals[`${personId.firstName} ${personId.lastName}`] = personId
      .responsibleFor.map(animalId => animals.find(element => element.id === animalId).name);
  });
  return getNamePersonAndAnimals;
};

const onlyOne = (idOrName) => {
  const addNamePersonAndAnimals = {};
  data.employees.forEach((employee) => {
    if (employee.id === idOrName || employee
      .firstName === idOrName || employee
      .lastName === idOrName) {
      addNamePersonAndAnimals[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor
        .map(animalId => data.animals.find(theAnimal => theAnimal.id === animalId).name);
    }
  });
  return addNamePersonAndAnimals;
};

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return everyBody();
  }
  return onlyOne(idOrName);
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
