function validateEmail(value, state) {
    // eslint-disable-next-line
    const re = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!re.test(value)) return false;
    else return true;
}

function validateName(name) {
    if (!name && (name.length === 0 || name.length > 50)) return false;
    name = name.trim()
    name = name.replace(/\s+/g, ' ');
    name = name.replace(/(.)\1{2,}/g, '$1');
    const nameRegex = /^[A-Za-z\s.'-]+$/;
    return nameRegex.test(name)

}

function validatePassword(password) {
    if (password.length === 0) return false
    if (password.length >= 8 && password.length <= 20) return true
    else return false
}
module.exports = { validateEmail, validateName, validatePassword }