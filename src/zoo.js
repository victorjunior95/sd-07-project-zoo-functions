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

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  const resp = [];
  ids.forEach((currentid) => {
    resp.push(animals.find(({ id }) => id === currentid));
  });
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
// const filterAnimals = (region) =>
//   animals.filter((animal) => animal.location === region);

// const defaultInput = (region) =>
//   filterAnimals(region).map((animal) => animal.name);

// function residentsInput(region) {
//   const fn = filterAnimals(region);
//   const resp = [];
//   fn.forEach((animal) => {
//     resp.push({ [animal.name]: animal.residents.map(({ name }) => name) });
//   });
//   return resp;
// }

// function residentsSortInput(region) {
//   const fn = filterAnimals(region);
//   const resp = [];
//   fn.forEach((animal) => {
//     const arr = animal.residents.map(({ name }) => name);
//     resp.push({ [animal.name]: arr.sort() });
//   });
//   return resp;
// }

function animalMap({ includeNames = false, sorted = false }) {
  // let objResp = {
  //   NE: defaultInput('NE'),
  //   NW: defaultInput('NW'),
  //   SE: defaultInput('SE'),
  //   SW: defaultInput('SW'),
  // };
  // if (includeNames) {
  //   objResp = {
  //     NE: residentsInput('NE'),
  //     NW: residentsInput('NW'),
  //     SE: residentsInput('SE'),
  //     SW: residentsInput('SW'),
  //   };
  // }
  // if (sorted) {
  //   objResp = {
  //     NE: residentsSortInput('NE'),
  //     NW: residentsSortInput('NW'),
  //     SE: residentsSortInput('SE'),
  //     SW: residentsSortInput('SW'),
  //   };
  // }
  // return objResp;
}
//----------------------------------------------------------------------------
const convertHour = (hour = 0) => (hour > 12 ? `${hour - 12}pm` : `${hour}am`);

const modifier = (hr) => {
  if (hr[1].open === 0 && hr[1].close === 0) {
    hours[hr[0]] = 'CLOSED';
  } else {
    hours[hr[0]] = `Open from ${convertHour(hr[1].open)} until ${convertHour(
      hr[1].close,
    )}`;
  }
};

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
