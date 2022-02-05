type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date(),
}

type Numeric = number | boolean;
type Universal = Combinable & Numeric;

function addCombinable(a: number, b: number): number;
function addCombinable(a: string, b: string): string;
function addCombinable(a: string, b: number): string;
function addCombinable(a: number, b: string): string;
function addCombinable(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString()
    }
    return a + b;
}

const result = addCombinable('hi', 'ok');
result.split(' ');

const fetchedUserData = {
    id: 'u1',
    name: 'user1',
    job: {
        title: 'Developer',
        description: 'TypeScript',
    }
}

console.log(fetchedUserData.job.title);
console.log(fetchedUserData?.job?.title)

const userInput = null;
const storedData = userInput || 'DEFAULT';

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log(emp.name);
    if ('privileges' in emp) {
        console.log("privileges:", emp.privileges);
    }
    if ('startDate' in emp) {
        console.log("Start Date:", emp.startDate);
    }
}

printEmployeeInformation(e1);


class Car {
    drive() {
        console.log('I\'m driving...');
    }
}

class Truck {
    drive() {
        console.log('I\'m driving a truck...');
    }

    loadCargo(amount: number) {
        console.log('I\'m carrying a package...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(3);
    }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log(speed);
}

moveAnimal({type: 'horse', runningSpeed: 3})

// const userInputElement = <HTMLInputElement>document.getElementById("user-input");
const userInputElement = document.getElementById("user-input") as HTMLInputElement;
userInputElement.value = 'hi'

interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'invalid email',
    username: 'User names cannot contain symbols.'
}

