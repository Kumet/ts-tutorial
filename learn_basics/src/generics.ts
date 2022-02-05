function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'max', hobbies: ['Sports']}, {age: 32})
console.log(mergedObj.age)


interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = '値はありません';
    if (element.length > 0) {
        descriptionText = '値は' + element.length + '個です'
    }
    return [element, descriptionText]
}

console.log(countAndDescribe('お疲れ様です'));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value:' + obj[key]
}

extractAndConvert({name: 'Max'}, 'name');


class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        return [...this.data]
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Data1');
textStorage.addItem('Data2');
textStorage.removeItem('Data1');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(2);
console.log(numberStorage.getItems());

// const objStorage = new DataStorage<object>();
// objStorage.addItem({name: 'Max'});
// objStorage.addItem({name: 'Jack'});
// objStorage.removeItem({name: 'Max'});
// console.log(objStorage.getItems());

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Max', 'Jack'];
// names.push('Anna');
// names.pop()
