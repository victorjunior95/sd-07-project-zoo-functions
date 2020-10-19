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

function animalsOlderThan(animal, age) {
  const animals = data.animals.find(({ name }) => name === animal);
  return animals.residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(
    employee =>
      employeeName.includes(employee.firstName) ||
      employeeName.includes(employee.lastName),
  );
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const animalsAndQuatities = {};
    data.animals.forEach((animal) => {
      animalsAndQuatities[animal.name] = animal.residents.length;
    });
    return animalsAndQuatities;
  }
  const givenSpecies = data.animals.find(animal =>
    animal.name.includes(species),
  );
  return givenSpecies.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants.length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adultPrice = data.prices.Adult * Adult;
  const childPrice = data.prices.Child * Child;
  const seniorPrice = data.prices.Senior * Senior;
  const total = adultPrice + childPrice + seniorPrice;
  return total;
}

function animalsByLocation() {
  const obj = {};
  const northeastAnimalNames = data.animals.filter((animal) => animal.location === 'NE').map((animal) => animal.name);
  const northwestAnimalNames = data.animals.filter((animal) => animal.location === 'NW').map((animal) => animal.name);
  const southeastAnimalNames = data.animals.filter((animal) => animal.location === 'SE').map((animal) => animal.name);
  const southwestAnimalNames = data.animals.filter((animal) => animal.location === 'SW').map((animal) => animal.name);
  obj['NE'] = northeastAnimalNames;
  obj['NW'] = northwestAnimalNames;
  obj['SE'] = southeastAnimalNames;
  obj['SW'] = southwestAnimalNames;
  return obj;
}

function animalsNamesBySpecies(specifiedSpecies) {
  const obj = {};
  const array = [];
  const residents = data.animals.find((animal) => animal.name === specifiedSpecies).residents;
  residents.forEach((resident) => array.push(resident.name));
  obj[specifiedSpecies] = array;
  return obj;
}

function animalsNamesBySpeciesSorted(specifiedSpecies) {
  const obj = {};
  const array = [];
  const residents = data.animals.find((animal) => animal.name === specifiedSpecies).residents;
  residents.forEach((resident) => array.push(resident.name));
  array.sort();
  obj[specifiedSpecies] = array;
  return obj;
}

function animalsNamesByLocation() {
  const obj = {};
  const northeastAnimalNames = data.animals.filter((animal) => animal.location === 'NE').map((animal) => animal.name);
  const northwestAnimalNames = data.animals.filter((animal) => animal.location === 'NW').map((animal) => animal.name);
  const southeastAnimalNames = data.animals.filter((animal) => animal.location === 'SE').map((animal) => animal.name);
  const southwestAnimalNames = data.animals.filter((animal) => animal.location === 'SW').map((animal) => animal.name);
  const neArray = [];
  const nwArray = [];
  const seArray = [];
  const swArray = [];
  northeastAnimalNames.forEach((animal) => neArray.push(animalsNamesBySpecies(animal)));
  northwestAnimalNames.forEach((animal) => nwArray.push(animalsNamesBySpecies(animal)));
  southeastAnimalNames.forEach((animal) => seArray.push(animalsNamesBySpecies(animal)));
  southwestAnimalNames.forEach((animal) => swArray.push(animalsNamesBySpecies(animal)));
  obj['NE'] = neArray;
  obj['NW'] = nwArray;
  obj['SE'] = seArray;
  obj['SW'] = swArray;
  console.log(obj);
  return obj;
}

function animalsNamesByLocationSorted() {
  const obj = {};
  const northeastAnimalNames = data.animals.filter((animal) => animal.location === 'NE').map((animal) => animal.name);
  const northwestAnimalNames = data.animals.filter((animal) => animal.location === 'NW').map((animal) => animal.name);
  const southeastAnimalNames = data.animals.filter((animal) => animal.location === 'SE').map((animal) => animal.name);
  const southwestAnimalNames = data.animals.filter((animal) => animal.location === 'SW').map((animal) => animal.name);
  const neArray = [];
  const nwArray = [];
  const seArray = [];
  const swArray = [];
  northeastAnimalNames.forEach((animal) => neArray.push(animalsNamesBySpeciesSorted(animal)));
  northwestAnimalNames.forEach((animal) => nwArray.push(animalsNamesBySpeciesSorted(animal)));
  southeastAnimalNames.forEach((animal) => seArray.push(animalsNamesBySpeciesSorted(animal)));
  southwestAnimalNames.forEach((animal) => swArray.push(animalsNamesBySpeciesSorted(animal)));
  neArray.sort();
  nwArray.sort();
  seArray.sort();
  swArray.sort();
  obj['NE'] = neArray;
  obj['NW'] = nwArray;
  obj['SE'] = seArray;
  obj['SW'] = swArray;
  return obj;
}

animalsNamesByLocation();

function animalMap(options) {
  let obj = {};
  if (options === undefined) {
    obj = animalsByLocation();
  }
  else if (options.includeNames === true) {
    if (options.sorted === true) {
      obj = animalsNamesByLocationSorted();
    }
    else {
      obj = animalsNamesByLocation();
    }
  }
  // else if (options.sex === female || options.sex === male) {
  //   obj = 'caso em que sex é female ou male';
  // }
  // else if (options.sex === female || options.sex === male && options.sort === true) {
  //   obj = 'caso em que sex é female ou male e sort é true';
  // }
  return obj;
}

function userReadableSchedule(dayName) {
  if (dayName === 'Monday') {
    return 'CLOSED';
  }
  return `Open from ${data.hours[dayName].open}am until ${
    data.hours[dayName].close - 12
  }pm`;
}

function schedule(dayName) {
  const userSchedule = {};
  if (dayName === undefined) {
    Object.keys(data.hours).forEach((key) => {
      userSchedule[key] = userReadableSchedule(key);
    });
  } else {
    userSchedule[dayName] = userReadableSchedule(dayName);
  }
  return userSchedule;
}

function getOldest(id) {
  const animals = data.animals.find(animal => animal.id === id);
  const residents = animals.residents;
  const oldest = residents.reduce((a, b) => (b.age > a.age ? b : a));
  return oldest;
}

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find(e => e.id === id);
  const species = employee.responsibleFor[0];
  const oldest = getOldest(species);
  return [oldest.name, oldest.sex, oldest.age];
}

function increasePrices(percentage) {
  const priceTypes = Object.keys(data.prices);
  priceTypes.forEach((type) => {
    const newPrice = data.prices[type] * (1 + (percentage / 100));
    data.prices[type] = Math.round(newPrice * 100) / 100;
  });
}

function animalNamesForWhichEmployeeIsResponsible(employee) {
  const animalNames = employee.responsibleFor.map(
    animalId => data.animals.find(animal => animal.id === animalId).name);
  return animalNames;
}

function employeeCoverage(idOrName) {
  const obj = {};
  if (idOrName === undefined) {
    data.employees.forEach((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      obj[fullName] = animalNamesForWhichEmployeeIsResponsible(employee);
    });
    return obj;
  }
  const employee = data.employees.find(e => e.id === idOrName) ||
    data.employees.find(e => e.firstName === idOrName) ||
    data.employees.find(e => e.lastName === idOrName);
  const fullName = `${employee.firstName} ${employee.lastName}`;
  obj[fullName] = animalNamesForWhichEmployeeIsResponsible(employee);
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
