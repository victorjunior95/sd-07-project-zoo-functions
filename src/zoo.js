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

const { animals, employees, prices } = require('./data');
const data = require('./data');

//-------------------------------------------------------------------------------------

function animalsByIds(...ids) {
  const array = [];
  ids.forEach(id => array.push(animals.find(element => element.id === id)));
  return array;
}

//-------------------------------------------------------------------------------------

function animalsOlderThan(animal, age) {
  const array = animals.find(element => element.name === animal);
  return array.residents.every(element => element.age > age);
}

//-------------------------------------------------------------------------------------

function employeeByName(employeeName) {
  let obj = {};
  if (employeeName !== undefined) {
    obj = employees.find(
      element =>
        element.firstName === employeeName || element.lastName === employeeName,
    );
  }
  return obj;
}

//-------------------------------------------------------------------------------------

function createEmployee(
  { id, firstName, lastName },
  { managers, responsibleFor },
) {
  const obj = {};
  obj.id = id;
  obj.firstName = firstName;
  obj.lastName = lastName;
  obj.managers = managers;
  obj.responsibleFor = responsibleFor;
  return obj;
}

//-------------------------------------------------------------------------------------

function isManager(id) {
  const array = [];
  employees.map(element =>
    element.managers.forEach(element2 => array.push(element2)),
  );

  return array.some(element => element === id);
}

//-------------------------------------------------------------------------------------

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const obj = {};
  obj.id = id;
  obj.firstName = firstName;
  obj.lastName = lastName;
  obj.managers = managers;
  obj.responsibleFor = responsibleFor;
  employees.push(obj);
}

//-------------------------------------------------------------------------------------

function animalCount(species) {
  if (species === undefined) {
    const obj = {};
    animals.forEach(element => (obj[element.name] = element.residents.length));
    return obj;
  }
  let obj = {};
  obj = animals.find(element => element.name === species);
  return obj.residents.length;
}

//-------------------------------------------------------------------------------------

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  let price = 0;
  price = Adult * prices.Adult;
  price += Senior * prices.Senior;
  price += Child * prices.Child;
  return price;
}

//-------------------------------------------------------------------------------------

const firstOption = () => {
  const ne = animals
    .filter(element => element.location === 'NE')
    .map(element => element.name);
  const nw = animals
    .filter(element => element.location === 'NW')
    .map(element => element.name);
  const se = animals
    .filter(element => element.location === 'SE')
    .map(element => element.name);
  const sw = animals
    .filter(element => element.location === 'SW')
    .map(element => element.name);
  const obj = {};
  obj.NE = ne;
  obj.NW = nw;
  obj.SE = se;
  obj.SW = sw;
  return obj;
};

const secondOption = () => {
  let lions = animals.filter(element => element.name === 'lions');
  lions.forEach(element => (lions = element.residents.map(element => element.name)));
  let giraffes = animals.filter(element => element.name === 'giraffes');
  giraffes.forEach(element => (giraffes = element.residents.map(element => element.name)));
  let tigers = animals.filter(element => element.name === 'tigers');
  tigers.forEach(element => (tigers = element.residents.map(element => element.name)));
  let bears = animals.filter(element => element.name === 'bears');
  bears.forEach(element => (bears = element.residents.map(element => element.name)));
  let elephants = animals.filter(element => element.name === 'elephants');
  elephants.forEach(element => (elephants = element.residents.map(element => element.name)));
  let penguins = animals.filter(element => element.name === 'penguins');
  penguins.forEach(element => (penguins = element.residents.map(element => element.name)));
  let otters = animals.filter(element => element.name === 'otters');
  otters.forEach(element => (otters = element.residents.map(element => element.name)));
  let frogs = animals.filter(element => element.name === 'frogs');
  frogs.forEach(element => (frogs = element.residents.map(element => element.name)));
  let snakes = animals.filter(element => element.name === 'snakes');
  snakes.forEach(element => (snakes = element.residents.map(element => element.name)));
  const obj = {};
  obj.NE = [{ lions: lions }];
  obj.NE.push({ giraffes: giraffes });
  obj.NW = [{ tigers: tigers }];
  obj.NW.push({ bears: bears });
  obj.NW.push({ elephants: elephants });
  obj.SE = [{ penguins: penguins }];
  obj.SE.push({ otters: otters });
  obj.SW = [{ frogs: frogs }];
  obj.SW.push({ snakes: snakes });
  return obj;
};

function animalMap(objeto) {
  if (objeto === undefined) {
    const obj = firstOption();
    return obj;
  }
  if (Object.keys(objeto).length === 1 && objeto.includeNames === true) {
    const obj = secondOption();
    return obj;
  }
  return 0;
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
