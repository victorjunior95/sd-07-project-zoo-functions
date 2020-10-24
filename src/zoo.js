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

const animalsByIds = (...ids) => {
  let arrReturned = [];
  arrReturned = ids.map(id => data.animals.find(animal => animal.id === id));
  return arrReturned;
};

const animalsOlderThan = (animal, age) => {
  const animalsResidents = data.animals.find(element => element.name === animal).residents;
  return animalsResidents.every(resident => resident.age >= age);
};

const employeeByName = (employeeName) => {
  let obj = {};
  if (typeof employeeName === 'string') {
    const { employees: arr } = data;
    obj = arr.find(({ firstName: a, lastName: b }) => a === employeeName || b === employeeName);
  }
  return obj;
};

const createEmployee = (personalInfo, associatedWith) => {
  const obj = { ...personalInfo, ...associatedWith };
  return obj;
};

function isManager(id) {
  // seu código aqui
}

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  return data.employees.push(newEmployee);
};

const animalCount = (species) => {
  if (species === undefined) {
    const obj = {};
    data.animals.forEach((animal) => { obj[animal.name] = animal.residents.length; });
    return obj;
  }

  const residents = data.animals.find(animal => animal.name === species).residents.length;
  return residents;
};

const entryCalculator = (entrants) => {
  let sum = 0;

  if (typeof entrants === 'object') {
    const tCategory = Object.keys(entrants);
    const numberOfTickets = Object.values(entrants);

    tCategory.map((category, i) => {
      sum += data.prices[category] * numberOfTickets[i];
      return sum;
    });
  }

  return sum;
};

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

const objectWithEmployeesNamesAndAnimals = () => {
  const listAnimals = {};
  const listEmployees = {};
  const { animals, employees } = data;

  animals.forEach(({ name, id }) => {
    listAnimals[name] = id;
  });

  employees.forEach(({ firstName, lastName, responsibleFor }) => {
    const employee = `${firstName} ${lastName}`;
    listEmployees[employee] = responsibleFor;
  });

  const entriesAnimals = Object.entries(listAnimals);
  const entriesEmployees = Object.entries(listEmployees);

  const requisito1 = entriesEmployees.reduce((acc, curr) => {
    const animalsForEmployee = [];
    curr[1].forEach((element) => {
      entriesAnimals.forEach((arrAnimal) => {
        if (arrAnimal[1] === element) {
          animalsForEmployee.push(arrAnimal[0]);
        }
      });
    });
    acc[curr[0]] = animalsForEmployee;

    return acc;
  }, {});

  return requisito1;
};

const employeeCoverage = (idOrName) => {
  const finalObject = objectWithEmployeesNamesAndAnimals();
  if (idOrName !== undefined) {
    const a = idOrName;
    const employee = data.employees
      .find(({ id, firstName, lastName }) => id === a || firstName === a || lastName === a);
    const { firstName, lastName } = employee;
    const keyAndValue = `${firstName} ${lastName}`;
    const employeeFound = { [keyAndValue]: finalObject[keyAndValue] };

    return employeeFound;
  }

  return finalObject;
};

// console.log(employeeCoverage('Nigel'))

// Agradeço a ajuda de @loren-gt, @danwhat, @isaacbatst e @mhamaji que deram muitas dicas e
// mostraram soluções diferentes fazendo com que conseguisse desenvolver a lógica
// da função employeeCoverage

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
