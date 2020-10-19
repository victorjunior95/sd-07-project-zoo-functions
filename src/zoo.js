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

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  let bool = true;
  const resp = animals.find(animalElement => animalElement.name === animal);
  resp.residents.forEach((element) => {
    if (element.age < age) {
      bool = false;
    }
  });
  return bool;
}

function employeeByName(employeeName) {
  if (!employeeName) {
    const emptyObj = {};
    return emptyObj;
  }
  return data.employees.find(e => e.firstName === employeeName || e.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

function isManager(id) {
  return employees.some(employee =>
    employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newObject = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newObject);
}

function animalCount(species = '') {
  const objectAnimal = {};
  if (species !== '') {
    return animals.find(animal => animal.name === species).residents.length;
  }
  animals.forEach(animal => (objectAnimal[animal.name] = animal.residents.length));
  return objectAnimal;
}

function entryCalculator(...entrants) { // Rest Parameter
  let acc = 0;
  entrants.map((type) => {
    if (type.Adult) {
      acc += type.Adult * prices.Adult;
    } if (type.Senior) {
      acc += type.Senior * prices.Senior;
    } if (type.Child) {
      acc += type.Child * prices.Child;
    }
    return acc;
  });
  return acc;
}

//  Lógica "If e Else" extraída de: https://github.com/tryber/sd-07-project-zoo-functions/pull/126/commits/cf21a6980049d60316081f5dca352d1e04a14fee
function animalMap(options) {
  const animalsLocation = { NE: [], NW: [], SE: [], SW: [] };
  if (options === undefined || options.includeNames === undefined) {
    animals.forEach(animal => animalsLocation[animal.location].push(animal.name));
    return animalsLocation;
  }
  if (options.sex !== undefined) {
    animals.forEach(({ name, location, residents }) => animalsLocation[location]
      .push({
        [name]: residents.filter(resident => resident.sex === options.sex)
          .map(resident => resident.name),
      }),
    );
  } else {
    animals.forEach(({ name, location, residents }) =>
      animalsLocation[location]
        .push({ [name]: residents.map(resident => resident.name) }),
    );
  } if (options.sorted) {
    Object.keys(animalsLocation).forEach(animal =>
      animalsLocation[animal].forEach(element => element[Object.keys(element)]
        .sort()),
    );
  }
  return animalsLocation;
}

function schedule(dayName) {
  const newObject = {};
  const randomObject = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };

  if (!dayName) return randomObject;
  newObject[dayName] = randomObject[dayName];
  return newObject;
}

function oldestFromFirstSpecies(id) {
  const firstAnimal = employees.filter(employee => employee.id === id)[0].responsibleFor[0];
  return Object.values(animals.filter(animal => animal.id === firstAnimal)[0].residents
    .sort(function (a, b) { return b.age - a.age; })
    .find(animal => animal.age !== ''));
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;
  data.prices.Adult = Math.round(Adult * (1 + (percentage / 100)) * 100) / 100;
  data.prices.Senior = Math.round(Senior * (1 + (percentage / 100)) * 100) / 100;
  data.prices.Child = Math.round(Child * (1 + (percentage / 100)) * 100) / 100;
  return data.prices;
}

function employeeCoverage(idOrName) {
  const newObject = {};

  if (!idOrName) {
    employees.forEach(
      employee =>
        (newObject[
          `${employee.firstName} ${employee.lastName}`
        ] = employee.responsibleFor.map(
          responsibleFor => animals.find(animal => animal.id === responsibleFor).name,
        )),
    );
    return newObject;
  }

  const completeName = employees.filter(x =>
    !(x.lastName !== idOrName) || !(x.id !== idOrName) || !(x.firstName !== idOrName))
    .map(e => `${e.firstName} ${e.lastName}`)[0];

  const employeeListOfAnimal = employees.filter(e =>
    e.id === idOrName || e.firstName === idOrName || e.lastName === idOrName)[0].responsibleFor;

  const animalsCoverageByEmployee = animals.filter(animal => employeeListOfAnimal
    .includes(animal.id))
    .map(animal => animal.name);

  newObject[completeName] = animalsCoverageByEmployee;

  return newObject;
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
