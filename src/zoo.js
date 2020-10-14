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

// const { animals } = require('./data');
// const { employees } = require('./data');
const data = require('./data');

let test2 = { };

const obj2 = { };

let names = [];

function animallocation() {
  const aux = data.animals.sort(function (a, b) {
    if (a.location > b.location) {
      return 1;
    }
    if (a.location < b.location) {
      return -1;
    }
    return 0;
  });
  return aux;
}

function namess() {
  let nam;
  const search = animallocation();
  const obj = {};
  for (let i = 0; i < search.length; i += 1) {
    const loc = search[i].location;
    if (obj[loc] === undefined) {
      nam = [search[i].name];
    } else {
      nam.push(search[i].name);
    }
    obj[loc] = nam;
  }
  return obj;
}

function namessorted(options) {
  if (options.sorted) {
    names.sort();
  }
  return names;
}

function name23(j, k, options, aux) {
  const sexMale = (options.sex === 'male' && aux[j].residents[k].sex === 'male');
  const sexFemale = (options.sex === 'female' && aux[j].residents[k].sex === 'female');
  const sexTest = options.sex === undefined || sexMale || sexFemale;
  if (sexTest) {
    names.push(aux[j].residents[k].name);
  }
}

function name22(options, aux) {
  const vetoraux = [];
  for (let j = 0; j < aux.length; j += 1) {
    names = [];
    const objaux = {};
    for (let k = 0; k < aux[j].residents.length; k += 1) {
      name23(j, k, options, aux);
    }
    objaux[aux[j].name] = namessorted(options, names);
    vetoraux.push(objaux);
  }
  return vetoraux;
}

function namesss(options) {
  const locations = Object.keys(namess());
  for (let i = 0; i < locations.length; i += 1) {
    const aux = data.animals.filter(element => element.location === locations[i]);
    // const vetoraux = [];
    // for (let j = 0; j < aux.length; j += 1) {
    //   const names = [];
    //   const objaux = {};
    //   for (let k = 0; k < aux[j].residents.length; k += 1) {
    //     const sexMale = (options.sex === 'male' && aux[j].residents[k].sex === 'male');
    //     const sexFemale = (options.sex === 'female' && aux[j].residents[k].sex === 'female');
    //     const sexTest = options.sex === undefined || sexMale || sexFemale;
    //     if (sexTest) {
    //       names.push(aux[j].residents[k].name);
    //     }
    //   }
    //   if (options.sorted) {
    //     names.sort();
    //   }
    //   objaux[aux[j].name] = names;
    //   vetoraux.push(objaux);
    // }
    obj2[locations[i]] = name22(options, aux);
  }
  return obj2;
}

function animalsByIds(...ids) {
  const animalsId = [];
  if (ids.length === 0) {
    return [];
  }
  ids.forEach(id => animalsId.push(data.animals.find(element => element.id === id)));
  return animalsId;
}

function animalsOlderThan(animal, age) {
  return data.animals.find(an => an.name === animal).residents.every(ag => ag.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return { };
  }
  return data.employees.filter(e => e.firstName === employeeName || e.lastName === employeeName)[0];
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
  const managerList = [];

  for (let i = 0; i < data.employees.length; i += 1) {
    for (let k = 0; k < data.employees[i].managers.length; k += 1) {
      managerList.push(data.employees[i].managers[k]);
    }
  }

  return managerList.some(e => e === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const list = { };
    for (let i = 0; i < data.animals.length; i += 1) {
      list[data.animals[i].name] = data.animals[i].residents.length;
    }
    return list;
  }
  return data.animals.find(e => e.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === {} || entrants === undefined) {
    return 0;
  }

  if (entrants.Adult === undefined) {
    entrants.Adult = 0;
  }
  if (entrants.Child === undefined) {
    entrants.Child = 0;
  }
  if (entrants.Senior === undefined) {
    entrants.Senior = 0;
  }

  const { Adult } = entrants;
  const { Child } = entrants;
  const { Senior } = entrants;

  return (Adult * data.prices.Adult) + (Child * data.prices.Child) + (Senior * data.prices.Senior);
}

function animalMap(options) {
  if (options === undefined || (!options.includeNames && (options.sex === 'male' || options.sex === 'female'))) {
    return namess();
  }
  if (options.includeNames) {
    return namesss(options);
  }
  return namess();
}

animalMap({ includeNames: true });

function simple1(dayName) {
  test2 = { };
  const test = Object.entries(data.hours);
  const test3 = test.filter(element => element[0] === dayName);
  if (dayName !== 'Monday') {
    test2[test3[0][0]] = `Open from ${test[0][1].open}am until ${test[0][1].close - 12}pm`;
  } else {
    test2.Monday = 'CLOSED';
  }
}

function schedule(dayName) {
  const test = Object.entries(data.hours);

  if (dayName === undefined) {
    test2 = { };
    for (let i = 0; i < 6; i += 1) {
      test2[test[i][0]] = `Open from ${test[i][1].open}am until ${test[i][1].close - 12}pm`;
    }
    test2.Monday = 'CLOSED';
  } else {
    simple1(dayName);
  }
  return test2;
}

function oldestFromFirstSpecies(id) {
  const firstSpecies = data.employees.find(element => element.id === id).responsibleFor[0];
  let search = data.animals.filter(element2 => element2.id === firstSpecies)[0];
  search = Object.values(search.residents.sort(function (a, b) {
    if (a.age > b.age) {
      return -1;
    }
    if (a.age < b.age) {
      return 1;
    }
    return 0;
  })[0]);
  return search;
}

function arred(num) {
  if (((num * 100) - parseInt(num * 100, 10)) >= 0.5) {
    return ((parseInt(num * 100, 10) + 1) / 100);
  }
  return (parseInt(num * 100, 10) / 100);
}

function increasePrices(percentage) {
  data.prices.Adult = arred(data.prices.Adult * (1 + (percentage / 100)));
  data.prices.Child = arred(data.prices.Child * (1 + (percentage / 100)));
  data.prices.Senior = arred(data.prices.Senior * (1 + (percentage / 100)));
}

function employeeCoverage(idOrName) {
  const obj = { };
  const i = idOrName;
  const e3 = data.employees.filter(e => e.firstName === i || e.lastName === i || e.id === i);
  let key;
  let value;
  if (idOrName === undefined) {
    data.employees.forEach((element) => {
      key = `${element.firstName} ${element.lastName}`;
      value = [];
      element.responsibleFor.forEach((element2) => {
        value.push(animalsByIds(element2)[0].name);
      });
      obj[key] = value;
    });
    return obj;
  }
  key = `${e3[0].firstName} ${e3[0].lastName}`;
  value = [];
  e3[0].responsibleFor.forEach((element4) => {
    value.push(animalsByIds(element4)[0].name);
  });
  obj[key] = value;
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
