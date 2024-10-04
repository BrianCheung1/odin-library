const container = document.querySelector("#container")
const tableContainer = document.querySelector("#table-container")
const addBookButton = document.createElement("button")

const showBtn = document.getElementById("show-dialog")
const dialog = document.getElementById("dialog")
const outputBox = document.querySelector("output")
const confirmBtn = document.getElementById("confirmBtn")
const bookName = document.getElementById("name")
const authorName = document.getElementById("author")
const pages = document.getElementById("pages")
const finished = document.getElementById("finished")
const form = document.getElementById("myForm")

showBtn.addEventListener("click", () => {
  dialog.showModal()
})

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault()

  if (
    bookName.checkValidity() &&
    authorName.checkValidity() &&
    pages.checkValidity()
  ) {
    const newBook = new Book(
      bookName.value,
      authorName.value,
      pages.value,
      finished.checked ? "Finished Reading" : "Not Finished Reading"
    )
    const myLibrary = new Library()
    myLibrary.addBookToLibrary(newBook)
    dialog.close()
    form.reset()
  } else {
    bookName.reportValidity()
    authorName.reportValidity()
    pages.reportValidity()
  }
})

container.appendChild(tableContainer)

class Book {
  constructor(name, author, pages, finished) {
    this.name = name
    this.author = author
    this.pages = pages
    this.finished = finished
  }
  status() {
    this.finished =
      this.finished === "Finished Reading"
        ? "Not Finished Reading"
        : "Finished Reading"
  }
}

class Library {
  library = []
  get library() {
    this.library
  }
  addBookToLibrary(book) {
    this.library.push(book)
    this.addToBookTable(book)
  }
  removeBookFromLibrary(book) {
    this.library.splice(this.library.indexOf(book), 1)
    this.clearTable()
    this.library.map((book) => {
      this.addToBookTable(book)
    })
  }
  addToBookTable(book) {
    const tableRow = document.createElement("tr")
    for (let key in book) {
      if (key === "status") {
        continue
      }
      const tableCell = document.createElement("td")
      tableCell.textContent = book[key]
      tableRow.appendChild(tableCell)
    }
    const removeButton = document.createElement("button")
    removeButton.textContent = "Remove"
    removeButton.addEventListener("click", () => {
      this.removeBookFromLibrary(book)
    })

    const status = document.createElement("button")
    status.textContent = "Changed Status"
    status.addEventListener("click", () => {
      book.status()
      this.updateTableRow(tableRow, book)
    })
    // Add the remove button to the last cell
    const tableCell = document.createElement("td")
    tableCell.classList.add("button-cell")
    tableCell.appendChild(removeButton)
    tableCell.appendChild(status)
    tableRow.appendChild(tableCell)

    // Append the row to the table
    tableContainer.appendChild(tableRow)
  }

  updateTableRow(tableRow, book) {
    // Remove existing table cells (except for the buttons)
    while (tableRow.firstChild) {
      tableRow.removeChild(tableRow.firstChild)
    }

    // Recreate the table cells with updated values
    for (let key in book) {
      if (key === "status") {
        continue
      }
      const tableCell = document.createElement("td")
      tableCell.textContent = book[key]
      tableRow.appendChild(tableCell)
    }

    // Add buttons back to the updated row
    const removeButton = document.createElement("button")
    removeButton.textContent = "Remove"
    removeButton.addEventListener("click", () => {
      this.removeBookFromLibrary(book)
    })

    const statusButton = document.createElement("button")
    statusButton.textContent = "Change Status"
    statusButton.addEventListener("click", () => {
      book.status()
      this.updateTableRow(tableRow, book)
    })

    const buttonCell = document.createElement("td")
    buttonCell.classList.add("button-cell")
    buttonCell.appendChild(removeButton)
    buttonCell.appendChild(statusButton)
    tableRow.appendChild(buttonCell)
  }
  clearTable() {
    var rowCount = tableContainer.rows.length
    for (let i = 1; i < rowCount; i++) {
      tableContainer.deleteRow(1)
    }
  }
}
