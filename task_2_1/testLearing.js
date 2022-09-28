function truncate(str, maxlength = 20) {
    str = prompt('Введите предложение: ')
    return (str.length >= maxlength) ? console.log(str.slice(0, maxlength-1) + '...') : console.log(str)
    
}
truncate()