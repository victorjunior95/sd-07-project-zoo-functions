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
  /* Code Climate não aceitou a primeira solução
  return data.animals.filter((zoo, index) => ids === [] ? [] : zoo.id === ids[index]); */
  if (ids === []) {
    return [];
  }
  return data.animals.filter((zoo, index) => zoo.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return data.animals.some(zoo => zoo.name === animal &&
  zoo.residents.every(res => res.age >= age));
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(employ => employ.firstName === employeeName
  || employ.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(manger => manger.id === id && manger.managers.length === 1);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const nameAnimals = data.animals.map(({ name }) => name);
  const countAnimals = data.animals.map(({ residents }) => residents.length);
  const obj = {};
  if (species === undefined) {
    for (let index = 0; index < nameAnimals.length; index += 1) {
      obj[nameAnimals[index]] = countAnimals[index];
    }
    return obj;
  }
  return data.animals.filter(({ name }) => name === species).map(reside => reside.residents.length)
  .reduce((acc, arr) => acc + arr, 0);
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants).reduce((acc, arr) => acc + (data.prices[arr[0]] * arr[1]), 0);
}

/* function animalMapEmpty() {
  let arr = [];
  data.animals.forEach(loc => arr.push(loc.location));
  let animal = [];
  const objLocation = {};
  arr = arr.filter((array, index) => arr.indexOf(array) === index);
  for (let index = 0; index < arr.length; index += 1) {
    animal = [];
    data.animals.forEach((loc) => {
      if (arr[index] === loc.location) {
        animal.push(loc.name);
        objLocation[arr[index]] = animal;
      }
    });
  }
  return objLocation;
} */

/* function animalMapSortedSex(orderName, sorted, sexParameter) {
  if (sorted === true) {
    return orderName.sort();
  }
  return orderName;
} */

/* function animalMapIncludeSorted(sorted, sexParameter) {
  const obj1 = {};
  let obj2 = {};
  const keys = Object.keys(animalMapEmpty());
  const values = Object.values(animalMapEmpty());
  for (let index = 0; index < keys.length; index += 1) {
    obj2 = {};
    values[index].forEach((val) => {
      data.animals.map(({ name, residents }) => {
        if (val === name) {
          obj2[val] = animalMapSortedSex(residents.map(({ name }) => name), sorted, sexParameter);
          obj1[keys[index]] = [obj2];
        }
      });
    });
  }
  return obj1;
} */

function animalMap(options) {
/*   if (options === undefined) {
    return animalMapEmpty();
  }
  const obj = options;
  if (obj.includeNames === true) {
    console.log(animalMapIncludeSorted(obj.sorted, obj.sex));
    return animalMapIncludeSorted(obj.sorted, obj.sex);
  }
  return animalMapEmpty(); */
}

function scheduleClean() {
  const obj = {};
  Object.entries(data.hours).forEach((time) => {
    if (time[0] === 'Monday') {
      obj[time[0]] = 'CLOSED';
    } else {
      obj[time[0]] = `Open from ${time[1].open}am until ${time[1].close - 12}pm`;
    }
  });
  return obj;
}

function schedule(dayName) {
  if (dayName === undefined) {
    return scheduleClean();
  }
  const obj1 = {};
  Object.entries(scheduleClean()).forEach((week) => {
    if (week[0] === dayName) {
      obj1[week[0]] = week[1];
    }
  });
  return obj1;
}

function oldestFromFirstSpecies(id) {
  let arrayId;
  let arrayId2;
  let ageAnimal = 0;
  data.employees.forEach(({ id: employ, responsibleFor }) => {
    if (id === employ) {
      arrayId = responsibleFor.find(resp => resp);
    }
    return data.animals.map(({ id: animal, residents }) => {
      if (arrayId === animal) {
        residents.filter(({ age }) => {
          if (ageAnimal < age) {
            ageAnimal = age;
          }
          return ageAnimal;
        });
        arrayId2 = residents.filter(({ age }) => age === ageAnimal);
      }
      return arrayId2;
    });
  });
  return Object.values(...arrayId2);
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
