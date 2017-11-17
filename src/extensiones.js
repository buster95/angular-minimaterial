Boolean.Convert = function (value) {
    if (typeof (value) === 'string') {
        value = value.toLocaleLowerCase();
    }
    switch (value) {
        case '1':
        case 1:
        case 'true':
        case true:
        case 'on':
        case 'yes':
            return true;
        default:
            return false;
    }
}