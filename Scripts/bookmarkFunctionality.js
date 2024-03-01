// selecting list and header
const bookmarkList = document.querySelector("#bookmark__list");
const bookmarkHeader = document.querySelector("#bookmark__header");

/**run function to display no bookmakes on window load if the bookmark list is empty*/ 
window.onload = bookmarkListOnLoad;

function bookmarkListOnLoad() {
  const onLoadBookmarkText = document.createElement("p");
  onLoadBookmarkText.setAttribute("id", "onLoadBookmarkText");
  onLoadBookmarkText.innerHTML = "No Bookmarked Documents Yet";

  //display the message after the bookmark header
  bookmarkHeader.insertAdjacentElement("afterend", onLoadBookmarkText);
}

//function to bookmark a document
function bookmarkDocument(bookmarkButton, bookmarkDocumentTitle) {
  const parentElement = bookmarkButton.parentElement;
  const currDocumentTitle = parentElement.querySelector(".document__title").value;

  //creating a new bookmark list item
  const bookmarkListItem = document.createElement("li");
  bookmarkListItem.setAttribute("class", "bookmark__item");
  bookmarkListItem.innerHTML = currDocumentTitle;

  //appending buttons to the bookmark list item
  bookmarkListItem.append(
    appendGoToDocumentButton(parentElement.querySelector(".document__title")),
    appendDeleteButton()
  );

  //inserting the bookmark list item into the bookmark list
  bookmarkList.insertAdjacentElement("beforeend", bookmarkListItem);

  //removing the no bookmarked documents yet message
  const noBookmarkText = document.querySelector("#onLoadBookmarkText");
  noBookmarkText.innerHTML = "";
}

//function to focus on the document title when go to document button is clicked
function goToDocument(currGoToDocumentTitle) {
  currGoToDocumentTitle.focus();
}

//function to create and append the go to document button
function appendGoToDocumentButton(currGoToDocumentTitle) {
  const goToDocumentButton = document.createElement("button");
  goToDocumentButton.setAttribute("class", "go__to__document");
  goToDocumentButton.innerHTML = "&#43;";

  //adding click event listener to the go to document button
  goToDocumentButton.addEventListener("click", () => {
    goToDocument(currGoToDocumentTitle);
  });

  return goToDocumentButton;
}

//function to create and append the delete button
function appendDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "bookmark__delete__btn");
  deleteButton.innerHTML = "&#10005;";

  //adding click event listener to the delete button
  deleteButton.addEventListener("click", (event) => {
    deleteBookmarkItem(event.target.parentElement);
  });

  return deleteButton;
}

//function to delete a bookmark list item
function deleteBookmarkItem(currBookmarkItem) {
  currBookmarkItem.remove();

  //display "no bookmarked documents yet" message if the bookmark list is empty
  if (!bookmarkList.children.length) {
    const noBookmarkText = document.querySelector("#onLoadBookmarkText");
    noBookmarkText.innerHTML = "No Bookmarked Documents Yet";
  }
}
