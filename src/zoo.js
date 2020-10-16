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

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  const resp = [];
  ids.forEach(currentid =>
    resp.push(animals.find(({ id }) => id === currentid)),
  );
  return resp;
}

function animalsOlderThan(animal, age) {
  const choosedAnimal = animals.find(({ name }) => name === animal);
  return choosedAnimal.residents.every(
    ({ age: residentAge }) => residentAge > age,
  );
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(
    ({ firstName, lastName }) =>
      firstName === employeeName || lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  let animalsAmount = {};
  animals.forEach(({ name, residents }) => {
    if (species === undefined) {
      animalsAmount[name] = residents.length;
    }
    if (species === name) {
      animalsAmount = residents.length;
    }
  });

  return animalsAmount;
}
function entryCalculator(entrants = 0) {
  const { Adult = false, Child = false, Senior = false } = entrants;
  const a = Adult * prices.Adult;
  const c = Child * prices.Child;
  const s = Senior * prices.Senior;
  return Adult || Child || Senior ? a + c + s : 0;
}
//-------------------------------------------------------------------------------------
const filterAnimals = (region = 'default') =>
  animals.filter(({ location }) => location === region);

const animalByRegion = (region = 'default') =>
  filterAnimals(region).map(({ name }) => name);

function animalNameByRegion(region, isSort = false, sex) {
  const animalsByRegion = filterAnimals(region);
  const resp = [];

  animalsByRegion.forEach(({ name, residents }) => {
    if (sex !== undefined) {
      residents = residents.filter(resident => resident.sex === sex);
    }
    resp.push({
      [name]: isSort
        ? residents.map(({ name: residName }) => residName).sort()
        : residents.map(({ name: residName }) => residName),
    });
  });
  return resp;
}

function animalMap(settings = 'No Paramaters') {
  const { includeNames, sorted, sex } = settings;
  let RESPONSE = {};
  console.log(includeNames, sorted, sex);
  if (settings === 'No Paramaters' || includeNames === undefined) {
    RESPONSE = {
      NE: animalByRegion('NE'),
      NW: animalByRegion('NW'),
      SE: animalByRegion('SE'),
      SW: animalByRegion('SW'),
    };
  } else {
    RESPONSE = {
      NE: animalNameByRegion('NE', sorted, sex),
      NW: animalNameByRegion('NW', sorted, sex),
      SE: animalNameByRegion('SE', sorted, sex),
      SW: animalNameByRegion('SW', sorted, sex),
    };
  }

  return RESPONSE;
}

//----------------------------------------------------------------------------
const convertHour = (hour = 0) => (hour > 12 ? `${hour - 12}pm` : `${hour}am`);

function modifier(hr) {
  if (hr[1].open === 0 && hr[1].close === 0) {
    hours[hr[0]] = 'CLOSED';
  } else {
    hours[hr[0]] = `Open from ${convertHour(hr[1].open)} until ${convertHour(
      hr[1].close,
    )}`;
  }
}

function schedule(dayName) {
  if (dayName === undefined) {
    const arrHours = Object.entries(hours);
    arrHours.forEach(modifier);
    return hours;
  }
  return { [dayName]: hours[dayName] };
}
//----------------------------------------------------------------------------

function oldestFromFirstSpecies(id) {
  const choosed = employees.find(({ id: empId }) => empId === id);
  const animalChoosed = animals.find(
    ({ id: animId }) => animId === choosed.responsibleFor[0],
  );
  animalChoosed.residents.sort((a, b) => b.age - a.age);
  return Object.values(animalChoosed.residents[0]);
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = prices;
  const multiplier = (percentage + 100.001) / 100;
  prices.Adult = (Adult * multiplier).toFixed(2);
  prices.Senior = (Senior * multiplier).toFixed(2);
  prices.Child = (Child * multiplier).toFixed(2);
  return true;
}

const ARR_EMPLOYEES_RESP = {};
const emplo = ({ firstName, lastName, responsibleFor }) => {
  ARR_EMPLOYEES_RESP[`${firstName} ${lastName}`] = responsibleFor.map(
    id => animals.find(({ id: animalId }) => animalId === id).name,
  );
};
function employeeCoverage(idOrName = null) {
  employees.forEach(emplo);
  const arrEmployeesResp = Object.entries(ARR_EMPLOYEES_RESP);
  if (idOrName === null) {
    return ARR_EMPLOYEES_RESP;
  }
  if (idOrName.length < 10) {
    const arr = arrEmployeesResp.find(lol => lol[0].includes(idOrName));
    return {
      [arr[0]]: arr[1],
    };
  }
  const empName = employees.find(({ id }) => id === idOrName);
  console.log(arrEmployeesResp);
  const arr = arrEmployeesResp.find(lol => lol[0].includes(empName.firstName));
  return {
    [arr[0]]: arr[1],
  };
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
