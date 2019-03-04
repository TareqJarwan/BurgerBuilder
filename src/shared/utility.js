export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
};

export const checkErrors = (error) => {
    if (error === 'EMAIL_NOT_FOUND') {
        return 'There is no user record corresponding to this identifier. The user may have been deleted.';
    } else if (error === 'INVALID_PASSWORD') {
        return 'The password is invalid or the user does not have a password.';
    } else if (error === 'USER_DISABLED') {
        return 'The user account has been disabled by an administrator.';
    } else if (error === 'EMAIL_EXISTS') {
        return 'The email address is already in use by another account.';
    } else if (error === 'OPERATION_NOT_ALLOWED') {
        return 'Password sign-in is disabled for this project.';
    } else if (error === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        return 'We have blocked all requests from this device due to unusual activity. Try again later.';
    }
};