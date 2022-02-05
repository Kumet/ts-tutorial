abstract class Department {
    static fiscalYear = 2022;

    protected employees: string[] = [];

    static createEmployee(name: string) {
        return {name: name}
    }

    protected constructor(protected readonly id: string, public name: string) {
        console.log(name)
    }

    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee)
    }

    printEmployeeInformation() {
        console.log(this.employees.length)
        console.log(this.employees)
    }
}

class ITDepartment extends Department {
    constructor(id: string, private admins: string[]) {
        super(id, 'IT');
    }

    describe() {
        console.log('IT:', this.id, this.admins);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('Reports not find');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('invalid value');
        }
        this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance
    }

    describe() {
        console.log('Accounting - ID:', this.id);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    addEmployee(name: string) {
        if (name == 'Max') {
            return
        }
        this.employees.push(name)
    }
}


const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear)

const it = new ITDepartment('d1', ['max']);
it.addEmployee('Max');
it.addEmployee('Manu');
it.describe();
it.printEmployeeInformation();

const accounting = AccountingDepartment.getInstance();
accounting.mostRecentReport = 'new report';
console.log(accounting.mostRecentReport);

accounting.printReports();
accounting.addEmployee('Max')
accounting.addEmployee('Manu')
accounting.printEmployeeInformation()

