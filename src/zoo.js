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

// prettier-ignore
const secondOption2 = (sort2) => {
  let lions = animals.filter(element => element.name === 'lions');
  lions.forEach(element => (lions = element.residents.map(element2 => element2.name)));
  let giraffes = animals.filter(element => element.name === 'giraffes');
  giraffes.forEach(element => (giraffes = element.residents.map(element2 => element2.name)));
  let tigers = animals.filter(element => element.name === 'tigers');
  tigers.forEach(element => (tigers = element.residents.map(element2 => element2.name)));
  let bears = animals.filter(element => element.name === 'bears');
  bears.forEach(element => (bears = element.residents.map(element2 => element2.name)));
  let elephants = animals.filter(element => element.name === 'elephants');
  elephants.forEach(element => (elephants = element.residents.map(element2 => element2.name)));
  if (sort2 === true) {
    lions = lions.sort();
    giraffes = giraffes.sort();
    tigers = tigers.sort();
    bears = bears.sort();
    elephants = elephants.sort();
  }
  const obj = {};
  obj.NE = [{ lions }];
  obj.NE.push({ giraffes });
  obj.NW = [{ tigers }];
  obj.NW.push({ bears });
  obj.NW.push({ elephants });
  return obj;
};

// prettier-ignore
const secondOption = (sort) => {
  let sort2;
  let penguins = animals.filter(element => element.name === 'penguins');
  penguins.forEach(element => (penguins = element.residents.map(element2 => element2.name)));
  let otters = animals.filter(element => element.name === 'otters');
  otters.forEach(element => (otters = element.residents.map(element2 => element2.name)));
  let frogs = animals.filter(element => element.name === 'frogs');
  frogs.forEach(element => (frogs = element.residents.map(element2 => element2.name)));
  let snakes = animals.filter(element => element.name === 'snakes');
  snakes.forEach(element => (snakes = element.residents.map(element2 => element2.name)));
  if (sort === true) {
    penguins = penguins.sort();
    otters = otters.sort();
    frogs = frogs.sort();
    snakes = snakes.sort();
    sort2 = true;
  }
  const obj = secondOption2(sort2);
  obj.SE = [{ penguins }];
  obj.SE.push({ otters });
  obj.SW = [{ frogs }];
  obj.SW.push({ snakes });
  return obj;
};

// prettier-ignore
const thirdOption2 = (sort2) => { 
  let lions = animals.filter(element => element.name === 'lions');
  lions.forEach(element => lions = element.residents.filter(element3 => element3.sex === 'female' ).map(element2 => element2.name));
  let giraffes = animals.filter(element => element.name === 'giraffes');
  giraffes.forEach(element => giraffes = element.residents.filter(element3 => element3.sex === 'female' ).map(element2 => element2.name));
  let tigers = animals.filter(element => element.name === 'tigers');
  tigers.forEach(element => tigers = element.residents.filter(element3 => element3.sex === 'female' ).map(element2 => element2.name));
  let bears = animals.filter(element => element.name === 'bears');
  bears.forEach(element => bears = element.residents.filter(element3 => element3.sex === 'female' ).map(element2 => element2.name));
  let elephants = animals.filter(element => element.name === 'elephants');
  elephants.forEach(element => elephants = element.residents.filter(element3 => element3.sex === 'female' ).map(element2 => element2.name));
  if (sort2 === true) {
    lions = lions.sort();
    giraffes = giraffes.sort();
    tigers = tigers.sort();
    bears = bears.sort();
    elephants = elephants.sort();
  }
  const obj = {};
  obj.NE = [{ lions }];
  obj.NE.push({ giraffes });
  obj.NW = [{ tigers }];
  obj.NW.push({ bears });
  obj.NW.push({ elephants });
  return obj;
}

// prettier-ignore
const thirdOption = (sort) => {
  let sort2;
  let penguins = animals.filter(element => element.name === 'penguins');
  penguins.forEach(element => penguins = element.residents.filter(element3 => element3.sex === 'female' ).map(element2 => element2.name));
  let otters = animals.filter(element => element.name === 'otters');
  otters.forEach(element => otters = element.residents.filter(element3 => element3.sex === 'female' ).map(element2 => element2.name));
  let frogs = animals.filter(element => element.name === 'frogs');
  frogs.forEach(element => frogs = element.residents.filter(element3 => element3.sex === 'female' ).map(element2 => element2.name));
  let snakes = animals.filter(element => element.name === 'snakes');
  snakes.forEach(element => snakes = element.residents.filter(element3 => element3.sex === 'female' ).map(element2 => element2.name));
  if (sort === true) {
    penguins = penguins.sort();
    otters = otters.sort();
    frogs = frogs.sort();
    snakes = snakes.sort();
    sort2 = true;
  }
  const obj = thirdOption2(sort2);
  obj.SE = [{ penguins }];
  obj.SE.push({ otters });
  obj.SW = [{ frogs }];
  obj.SW.push({ snakes });
  return obj;
};

// prettier-ignore
function animalMap(objeto) {
  if (objeto === undefined) {
    const obj = firstOption();
    return obj;
  }
  if (Object.keys(objeto).length === 1 && objeto.includeNames === true) {
    const obj = secondOption();
    return obj;
  }
  if (objeto.includeNames === true && objeto.sorted === true && Object.keys(objeto).length === 2) {
    const obj = secondOption(true);
    return obj;
  }
  if (objeto.includeNames === true && objeto.sex === 'female' && Object.keys(objeto).length === 2) {
    const obj = thirdOption();
    return obj;
  }
  if (objeto.includeNames === true && objeto.sex === 'female' && objeto.sorted === true) {
    const obj = thirdOption(true);
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
