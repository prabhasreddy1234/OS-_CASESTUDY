let processes = [];

function addProcess() {
  let name = document.getElementById('process-name').value;
  let arrivalTime = parseInt(document.getElementById('arrival-time').value);
  let burstTime = parseInt(document.getElementById('burst-time').value);
  let priority = parseInt(document.getElementById('priority').value);
  if (name && !isNaN(arrivalTime) && !isNaN(burstTime) && !isNaN(priority)) {
    processes.push({
    name: name,
    arrivalTime: arrivalTime,
    burstTime: burstTime,
    priority: priority,
    remainingTime: burstTime,
    completionTime: null,
    turnaroundTime: null,
    waitingTime: null
    });
    document.getElementById('process-name').value = '';
    document.getElementById('arrival-time').value = '';
    document.getElementById('burst-time').value = '';
    document.getElementById('priority').value = '';
    
    updateTable();
}
}

function updateTable() {
let table = document.getElementById('processes');
table.innerHTML = '';

for (let i = 0; i < processes.length; i++) {
let row = table.insertRow();
let nameCell = row.insertCell();
let arrivalTimeCell = row.insertCell();
let burstTimeCell = row.insertCell();
let priorityCell = row.insertCell();
let completionTimeCell = row.insertCell();
let turnaroundTimeCell = row.insertCell();
let waitingTimeCell = row.insertCell();
nameCell.innerText = processes[i].name;
arrivalTimeCell.innerText = processes[i].arrivalTime;
burstTimeCell.innerText = processes[i].burstTime;
priorityCell.innerText = processes[i].priority;

if (processes[i].completionTime !== null) {
  completionTimeCell.innerText = processes[i].completionTime;
  turnaroundTimeCell.innerText = processes[i].turnaroundTime;
  waitingTimeCell.innerText = processes[i].waitingTime;
}
}
}

function calculate() {
let currentTime = 0;
let completed = 0;

while (completed < processes.length) {
let highestPriorityProcess = null;
for (let i = 0; i < processes.length; i++) {
    if (processes[i].arrivalTime <= currentTime && processes[i].remainingTime > 0) {
      if (highestPriorityProcess === null || processes[i].priority < highestPriorityProcess.priority) {
        highestPriorityProcess = processes[i];
      }
    }
  }
  
  if (highestPriorityProcess === null) {
    currentTime++;
  } else {
    highestPriorityProcess.remainingTime--;
    currentTime++;
  
    if (highestPriorityProcess.remainingTime === 0) {
      completed++;
  
      highestPriorityProcess.completionTime = currentTime;
      highestPriorityProcess.turnaroundTime = highestPriorityProcess.completionTime - highestPriorityProcess.arrivalTime;
      highestPriorityProcess.waitingTime = highestPriorityProcess.turnaroundTime - highestPriorityProcess.burstTime;
    }
  }
}

updateTable();
}

document.getElementById('calculate').addEventListener('click', calculate);