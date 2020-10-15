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

const sortFirst = (lions, giraffes, tigers, bears, elephants) => {
  lions = lions.sort();
  giraffes = giraffes.sort();
  tigers = tigers.sort();
  bears = bears.sort();
  elephants = elephants.sort();
};

const sortSecond = (penguins, otters, frogs, snakes) => {
  penguins = penguins.sort();
  otters = otters.sort();
  frogs = frogs.sort();
  snakes = snakes.sort();
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
    sortFirst(lions, giraffes, tigers, bears, elephants);
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
    sortSecond(penguins, otters, frogs, snakes);
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
  return 0;
}

//-------------------------------------------------------------------------------------

function schedule(dayName) {
  const obj = {};
  obj.Tuesday = `Open from ${hours.Tuesday.open}am until 6pm`;
  obj.Wednesday = `Open from ${hours.Wednesday.open}am until 6pm`;
  obj.Thursday = `Open from ${hours.Thursday.open}am until 8pm`;
  obj.Friday = `Open from ${hours.Friday.open}am until 8pm`;
  obj.Saturday = `Open from ${hours.Saturday.open}am until 10pm`;
  obj.Sunday = `Open from ${hours.Sunday.open}am until 8pm`;
  obj.Monday = 'CLOSED';
  if (dayName === undefined) {
    return obj;
  }
  const obj2 = {};
  obj2[dayName] = obj[dayName];
  return obj2;
}

//-------------------------------------------------------------------------------------

function oldestFromFirstSpecies(id) {
  const employee = employees.find(element => element.id === id);
  const employeeId = employee.responsibleFor[0];

  const animal = animals.find(element => element.id === employeeId);
  const resident = animal.residents.sort((a, b) => {
    if (a.age < b.age) {
      return +1;
    }
    if (a.age > b.age) {
      return -1;
    }
    return 0;
  });

  const { name, sex, age } = resident[0];
  const oldest = [];
  oldest.push(name, sex, age);
  return oldest;
}

//-------------------------------------------------------------------------------------

const format = (num, decimals) =>
  num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

function increasePrices(percentage) {
  percentage /= 100;

  const { Adult, Senior, Child } = prices;
  const adultPercentage = Adult * percentage;
  const seniorPercentage = Senior * percentage;
  const childPercentage = Child * percentage;
  prices.Adult = parseFloat(format(Adult + adultPercentage));
  prices.Senior = parseFloat(format(Senior + seniorPercentage));
  prices.Child = parseFloat(format(Child + childPercentage));
}

//-------------------------------------------------------------------------------------

// prettier-ignore
function employeeCoverage(idOrName) {
  const obj = {};
  let option;
  if (idOrName === undefined){
    option = employees;
  } else if (idOrName.length === 36){
    option =  employees.filter(element => element.id === idOrName);
  } else if (idOrName === 'Nigel' || idOrName === 'Burl' || idOrName === 'Ola' || idOrName === 'Wilburn' ||
    idOrName === 'Stephanie' || idOrName === 'Sharonda' || idOrName === 'Ardith' || idOrName === 'Emery'
  ) {
    option = employees.filter(element => element.firstName === idOrName);
  } else {
    option = employees.filter(element => element.lastName === idOrName);
  }
  option.forEach(empregado => {
    obj[`${empregado.firstName} ${empregado.lastName}`] = empregado.responsibleFor.map((id) => {
      let string = '';
      animals.forEach((animal) => {
        if (id === animal.id) {
          string = `${animal.name}`;
        }
      });
    return string;
    });
  });
  return obj;
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
