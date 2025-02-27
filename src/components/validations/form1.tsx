const form = document.forms["Nombredelformulario"];
const userName = form["nombre"] as HTMLInputElement;
const birthdate = form["fecha_nacimiento"] as HTMLInputElement;
const email = form["email"] as HTMLInputElement;
const genre = form["sexo"] as HTMLInputElement;
const preferences = form["preferencias"] as HTMLInputElement;

form.addEventListener("submit", nameValidation);
form.addEventListener("submit", birthdateValidation);
form.addEventListener("submit", emailValidation);
form.addEventListener("submit", genreValidation);
form.addEventListener("submit", preferencesValidation);

function nameValidation(event: Event) {
    if (userName.value.length < 3 || userName.value.length > 50) {
        event.preventDefault();
        userName.setCustomValidity("El nombre debe tener entre 3 y 50 caracteres.");
    } else {
        userName.setCustomValidity("");
    }
    userName.reportValidity();
}

function birthdateValidation(event: Event) {
    const date = new Date(birthdate.value);
    const today = new Date();
    if (date > today) {
        event.preventDefault();
        birthdate.setCustomValidity("La fecha de nacimiento no puede ser mayor a la fecha actual.");
    } else {
        birthdate.setCustomValidity("");
    }
    birthdate.reportValidity();
}

function emailValidation(event: Event) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email.value)) {
        event.preventDefault();
        email.setCustomValidity("El correo electrónico no es válido.");
    } else {
        email.setCustomValidity("");
    }
    email.reportValidity();
}

function genreValidation(event: Event) {
    if (genre.value === "") {
        event.preventDefault();
        genre.setCustomValidity("Debe seleccionar un género.");
    } else {
        genre.setCustomValidity("");
    }
    genre.reportValidity();
}

function preferencesValidation(event: Event) {
    if (preferences.value === "") {
        event.preventDefault();
        preferences.setCustomValidity("Debe seleccionar al menos una preferencia.");
    } else {
        preferences.setCustomValidity("");
    }
    preferences.reportValidity();
}