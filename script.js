const toDoForm = document.querySelector(".js-toDoForm"),
	toDoInput = toDoForm.querySelector("input"),
	toDoList = document.querySelector(".js-toDoList"),
	finList = document.querySelector(".js-finishedList");

let idNumber = 1;
let toDos = [],
	fins = [];

const TODOS_LS = "toDos",
	FINS_LS = "fins";

function saveFins() {
	localStorage.setItem(FINS_LS, JSON.stringify(fins));
}

function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteFins(event) {
	const btn = event.target;
	const li = btn.parentNode;
	finList.removeChild(li);
	const cleanFins = fins.filter(function (done) {
		return done.id !== parseInt(li.id);
	});
	fins = cleanFins;
	saveFins();
}

function deleteToDo(event) {
	const btn = event.target;
	const li = btn.parentNode;
	toDoList.removeChild(li);
	const cleanToDos = toDos.filter(function (toDo) {
		return toDo.id !== parseInt(li.id);
	});
	toDos = cleanToDos;
	saveToDos();
}

function writeToDos(text) {
	const li = document.createElement("li");
	const span = document.createElement("span");
	const delBtn = document.createElement("button");
	const doneBtn = document.createElement("button");
	const newId = idNumber;
	idNumber += 1;
	delBtn.innerText = "❌";
	delBtn.addEventListener("click", deleteToDo);
	doneBtn.innerText = "✔";
	doneBtn.addEventListener("click", moveToFin);
	span.innerText = text;
	li.appendChild(span);
	li.appendChild(delBtn);
	li.appendChild(doneBtn);
	li.id = newId;
	toDoList.appendChild(li);
	const toDoObj = {
		id: newId,
		text: text,
	};
	toDos.push(toDoObj);
	saveToDos();
}

function rollBack(event) {
	const btn = event.target;
	const source = btn.parentNode;
	const text = source.querySelector("span").innerText;
	writeToDos(text);
	finList.removeChild(source);
	const cleanFins = fins.filter(function (done) {
		return done.id !== parseInt(source.id);
	});
	fins = cleanFins;
	saveFins();
}

function writeFins(text) {
	const li = document.createElement("li");
	const span = document.createElement("span");
	const delBtn = document.createElement("button");
	const rollBackBtn = document.createElement("button");
	const newId = idNumber;
	idNumber += 1;
	delBtn.innerText = "❌";
	delBtn.addEventListener("click", deleteFins);
	rollBackBtn.innerText = "⏪";
	rollBackBtn.addEventListener("click", rollBack);
	span.innerText = text;
	li.appendChild(span);
	li.appendChild(delBtn);
	li.appendChild(rollBackBtn);
	li.id = newId;
	finList.appendChild(li);
	const finObj = {
		id: newId,
		text: text,
	};
	fins.push(finObj);
	saveFins();
}

function moveToFin(event) {
	const btn = event.target;
	const source = btn.parentNode;
	const text = source.querySelector("span").innerText;
	writeFins(text);
	toDoList.removeChild(source);
	const cleanToDos = toDos.filter(function (toDo) {
		return toDo.id !== parseInt(source.id);
	});
	toDos = cleanToDos;
	saveToDos();
}

function loadFins() {
	const loadedFins = localStorage.getItem(FINS_LS);
	if (loadedFins !== null) {
		const parsedFins = JSON.parse(loadedFins);
		parsedFins.forEach(function (done) {
			writeFins(done.text);
		});
	}
}

function loadToDos() {
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if (loadedToDos !== null) {
		const parsedToDos = JSON.parse(loadedToDos);
		parsedToDos.forEach(function (toDo) {
			writeToDos(toDo.text);
		});
	}
}

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = toDoInput.value;
	writeToDos(currentValue);
	toDoInput.value = "";
}

function init() {
	loadToDos();
	loadFins();
	toDoForm.addEventListener("submit", handleSubmit);
}

init();

// to do : 코드 량 절반으로 줄여 보기
