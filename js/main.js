let btn = document.querySelector('.btn')
let nameInput = document.querySelector('.name-input')
let imageInput = document.querySelector('.image-input')
let numberInput = document.querySelector('.number-input')
let list = document.querySelector('.task-list')

btn.addEventListener('click', () => {
	if (
		!nameInput.value.trim() ||
		!imageInput.value.trim() ||
		!numberInput.value.trim()
	) {
		alert('Заполните все поля!')
		return
	}

	let contact = {
		name: nameInput.value,
		image: imageInput.value,
		number: numberInput.value,
	}

	setItemToStorage(contact)
	createElement()
	nameInput.value = ''
	imageInput.value = ''
	numberInput.value = ''
})

function setItemToStorage(contact) {
	let data = getItemLC() || []
	data.push(contact)
	localStorage.setItem('contact-data', JSON.stringify(data))
}

function createElement() {
	if (!getItemLC()) {
		localStorage.setItem('contact-data', '[]')
	}
	let newData = getItemLC()
	list.innerHTML = ''
	newData.forEach((contact, index) => {
		let li = document.createElement('li')
		let btnDelete = document.createElement('button')
		let btnEdit = document.createElement('button')
		btnDelete.innerText = 'Удалить '
		btnEdit.innerText = 'Изменить'
		btnDelete.addEventListener('click', () => {
			deleteElement(index)
		})
		btnEdit.addEventListener('click', () => {
			editElement(index)
		})
		li.innerHTML = `
            <strong>Name:</strong> ${contact.name} <br>
            <strong>Image:</strong> <img src="${contact.image}" alt="${contact.name}'s Image" class="contact-image-preview"> <br>
            <strong>Number:</strong> ${contact.number}
        `
		li.appendChild(btnDelete)
		li.appendChild(btnEdit)
		list.appendChild(li)
	})
}

function deleteElement(index) {
	let data = getItemLC()
	data.splice(index, 1)
	localStorage.setItem('contact-data', JSON.stringify(data))
	createElement()
}

let mainModal = document.querySelector('.main-modal')
let inpEdit = document.querySelector('.inp-edit')
let imageEdit = document.querySelector('.image-edit')
let numberEdit = document.querySelector('.number-edit')
let btnClose = document.querySelector('.btn-close')

function editElement(index) {
	mainModal.style.display = 'block'
	let data = getItemLC()
	inpEdit.setAttribute('id', index)
	inpEdit.value = data[index].name
	imageEdit.value = data[index].image
	numberEdit.value = data[index].number
	document.querySelector('.contact-image-preview').src = data[index].image
}

let btnSave = document.querySelector('.btn-save')
btnSave.addEventListener('click', () => {
	let data = getItemLC()
	let index = inpEdit.id
	if (
		!inpEdit.value.trim() ||
		!imageEdit.value.trim() ||
		!numberEdit.value.trim()
	) {
		alert('Заполните все поля!')
		return
	}
	let editedContact = {
		name: inpEdit.value,
		image: imageEdit.value,
		number: numberEdit.value,
	}
	data.splice(index, 1, editedContact)
	localStorage.setItem('contact-data', JSON.stringify(data))
	mainModal.style.display = 'none'
	createElement()
})

btnClose.addEventListener('click', () => {
	mainModal.style.display = 'none'
})

function getItemLC() {
	return JSON.parse(localStorage.getItem('contact-data'))
}

createElement()
