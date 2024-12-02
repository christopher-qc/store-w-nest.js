const myName = 'Chris';
const myAge = 31;
const suma = (a: number, b: number) => {
  return a + b;
};
suma(1, 2);

class Persona {
  constructor(private name: string, private age: number) {}

  getSummary() {
    return `${this.name} is ${this.age} years old`;
  }
}

const chris = new Persona(myName, myAge);
