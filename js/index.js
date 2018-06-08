function validateForm(form) {
	var elems = form.elements;
	var regexText = /'|"/;
	var regexEmail = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/igm;
	var regexDate = /(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/;
	var validationErrors = 0;

	for (var i = 0; i < elems.length; i++) {
		// Hide all validation advices
		if (elems[i].type != 'submit' && elems[i].type != 'fieldset') {
			hideError(elems[i].parentElement);
		}

		// Check if required fields aren't empty
		if (elems[i].className.match(/\bjs-required\b/) && !(elems[i].value || elems[i].checked || elems[i].selectedIndex)) {
			if (elems[i].type == 'text' || elems[i].type == 'password' || elems[i].type == 'email') {
				showError(elems[i].parentElement, elems[i].title + " is required");
				validationErrors++;
				continue;
			}
		} else {
			if (elems[i].className.match(/\bjs-datepicker\b/) && !regexDate.test(elems[i].value)) {
				showError(elems[i].parentElement, "Please select valid date");
				validationErrors++;
				elems[i].value = '';
				continue;
			}

			if (elems[i].type == "text" && regexText.test(elems[i].value)) {
				showError(elems[i].parentElement, "Symbols ' and \" are not allowed!");
				validationErrors++;
				continue;
			}

			if (elems[i].type == "email" && regexEmail.test(elems[i].value)) {
				showError(elems[i].parentElement, "Please enter a valid email");
				validationErrors++;
				continue;
			}
		}
	}

	if (validationErrors === 0) {
		showModal('You\'ve successfully sent a form', 'success', 'Success!');
		// form.submit();
	} else {
		return false;
	}
}

function showError(container, errorMessage) {
	var msgElem = document.createElement('span');
	container.className = 'js-error';
	msgElem.className = "error-message";
	msgElem.innerHTML = errorMessage;
	container.appendChild(msgElem);
}

function hideError(container) {
	container.classList.remove("js-error");
	if (container.lastChild.className == "error-message") {
		container.removeChild(container.lastChild);
	}
}

function showModal(text, type, title) {
	var dialogElem = document.createElement('div');
	dialogElem.innerHTML = text;
	dialogElem.className = type;
	dialogElem.setAttribute("title", title);
	document.body.appendChild(dialogElem);

	jQuery(dialogElem).dialog({
		modal: true,
		buttons: {
			Ok: function Ok() {
				jQuery(this).dialog("close");
			}
		}
	});
}

(function () {
	jQuery("#datepicker").datepicker();
})();