export const isPasswordStrong = (password) => {
    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

    if (strongPassword.test(password)) {
        return true;
    }

    return false
}