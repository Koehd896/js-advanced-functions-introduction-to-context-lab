function createEmployeeRecord(info) {
    const employeeRecord = {};
    employeeRecord['firstName'] = info[0];
    employeeRecord['familyName'] = info[1];
    employeeRecord['title'] = info[2];
    employeeRecord['payPerHour'] = info[3];
    employeeRecord['timeInEvents'] = [];
    employeeRecord['timeOutEvents'] = [];
    return employeeRecord;
}

function createEmployeeRecords(info) {
    return info.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(record, date) {
    const event = {};
    event['type'] = "TimeIn"
    event['hour'] = parseInt(date.split(" ")[1], 10);
    event['date'] = date.split(" ")[0];
    record['timeInEvents'].push(event);
    return record;
}

function createTimeOutEvent(record, date) {
    const event = {};
    event['type'] = "TimeOut"
    event['hour'] = parseInt(date.split(" ")[1], 10);
    event['date'] = date.split(" ")[0];
    record['timeOutEvents'].push(event);
    return record;
}

function hoursWorkedOnDate(record, date) {
    const clockIn = record['timeInEvents'].find(event => event.date === date).hour;
    const clockOut = record['timeOutEvents'].find(event => event.date === date).hour;
    return Math.floor(clockOut - clockIn) / 100;
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
    const dates = record['timeInEvents'].map(event => event.date);
    const hours = dates.map(date => wagesEarnedOnDate(record, date));
    return hours.reduce((previous, current) => previous + current);
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(records) {
    const wages = records.map(record => allWagesFor(record));
    return wages.reduce((previous, current) => previous + current );
}