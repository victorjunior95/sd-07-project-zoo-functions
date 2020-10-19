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

const data = require("./data");

function animalsByIds(...ids) {
  const { animals } = data;
  return animals.filter((animal, index) => animal.id === ids[index]);
}
// console.log(animalsByIds())

function animalsOlderThan(animal, age) {
  const { animals } = data;
  const myAnimal = animals.find((animalName) => animalName.name === animal);
  const compareResult = myAnimal.residents.every(
    (animalGroup) => animalGroup.age > age
  );
  return compareResult;
}
// console.log(animalsOlderThan('otters', 7));

function employeeByName(employeeName) {
  const { employees } = data;
  let object = {};
  if (employeeName) {
    object = employees.filter(
      (objectEmployer) =>
        objectEmployer.firstName === employeeName ||
        objectEmployer.lastName === employeeName
    )[0];
  }
  return object;
}
// console.log(employeeByName());

const personalInfo = {
  id: "7ed1c9bb-8570-44f6-b718-0666b869573a",
  firstName: "John",
  lastName: "Doe",
};

const associatedWith = {
  managers: [
    "c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1",
    "9e7d4524-363c-416a-8759-8aa7e50c0992",
  ],
  responsibleFor: [
    "0938aa23-f153-4937-9f88-4858b24d6bce",
    "89be95b3-47e4-4c5b-b687-1fabf2afa274",
    "bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5",
  ],
};

function createEmployee(personalInfo, associatedWith) {
  // let object = {};
  // for(i in personalInfo) {
  //   object[i] = personalInfo[i];
  // }
  // for(i in associatedWith) {
  //   object[i] = associatedWith[i];
  // }
  // return object;
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}
// console.log(createEmployee(personalInfo, associatedWith));

function isManager(id) {
  const { employees } = data;
  return employees.some((employer, index) => employer.managers[index] === id);
}
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'))

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []
) {
  const { employees } = data;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
  return employees;
}
// console.log(addEmployee('4141da1c-a6ed-4cf7-90c4-99c657ba4ef3', 'Jane', 'Doe'));
// console.log(data.employees.length);

function animalCount(species) {
  const { animals } = data;
  let object = {};
  animals.forEach((animal) => (object[animal.name] = animal.residents.length));
  return species === undefined ? object : object[species];
}
// console.log(animalCount("lions"));

function entryCalculator(entrants) {
  const { prices } = data;
  let value = 0;
  for (i in entrants) {
    // console.log(i)
    // console.log(entrants[i])
    value += entrants[i] * prices[i];
  }
  return value;
}
// console.log(entryCalculator({}));
// console.log(entryCalculator({ 'Child': 1, 'Senior': 1 }));

const { animals } = data;
const namesResidentsLocation = (name, sex) => {
  let array = [];
  let arrayAll = [];

  animals
    .find((animal) => animal.name === name)
    .residents.forEach((info) => {
      arrayAll.push(info.name);
      if (info.sex === sex) {
        array.push(info.name);
      }
    });
  if (sex) {
    return array;
  } else {
    return arrayAll;
  }
};
// console.log(namesResidentsLocation('lions'));

const nameAnimals = (region, sort = false, sex) => {
  let array = [];
  let object;

  animals
    .filter((animal) => animal.location === region)
    .forEach((animal) => {
      object = {};
      object[animal.name] = namesResidentsLocation(animal.name, sex);
      if (sort) {
        object[animal.name] = namesResidentsLocation(animal.name, sex).sort();
      }
      array.push(object);
    });

  return array;
};
// console.log(nameAnimals("NE"));

function animalMap(options) {
  const location = ["NE", "NW", "SE", "SW"];
  let object = {};

  location.forEach(
    (local) =>
      (object[local] = animals
        .filter((animal) => animal.location === local)
        .map((objectAnimal) => objectAnimal.name))
  );

  if (options !== undefined && options.includeNames !== undefined) {
    location.forEach(
      (local) =>
        (object[local] = nameAnimals(local, options.sorted, options.sex))
    );
  }
  return object;
}
// console.log(animalMap());
// console.log(animalMap({ includeNames: true }).NE);
// console.log(animalMap({ includeNames: true, sorted: true }).NE);
// console.log(animalMap({ includeNames: true, sex: 'female', sorted: false}).NE);
// console.log(animalMap({ sex: 'female' }).NE[0]);

function schedule(dayName) {
  const { hours } = data;
  let result = hours;
  // return Object.values(hours.Tuesday);
  for (i in result) {
    result[i] = `Open from ${Object.values(result[i])[0]}am until ${
      Object.values(result[i])[1] - 12
    }pm`;

    if (i === "Monday") {
      result[i] = `CLOSED`;
    }
  }

  if (dayName !== undefined) {
    for (i in result) {
      if (i === dayName) {
        result = { [i]: result[i] };
      }
    }
  }
  return result;
}
// console.log(schedule());
// console.log(schedule("Tuesday"));

function oldestFromFirstSpecies(id) {
  const { employees } = data;
  const { animals } = data;

  let arrayIdAnimals;
  let arrayAnimal;
  let highestAge = 0;
  let result;

  arrayIdAnimals = employees.filter((employe) => employe.id === id)[0].responsibleFor;
  arrayAnimal = animals.filter((animal) => animal.id === arrayIdAnimals[0]);
  
  arrayAnimal[0].residents.forEach((info) => {
    if (info.age > highestAge) {
      highestAge = info.age;
    }
  });

  result = arrayAnimal[0].residents.filter((info) => info.age === highestAge);

  return Object.values(result[0]);
}
// console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));
console.log(oldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

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
