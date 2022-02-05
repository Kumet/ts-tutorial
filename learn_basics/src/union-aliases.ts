type Combinable = number | string
type ConversionDescriptor = 'as-number' | 'as-text'

function combine(
    input1: Combinable,
    input2: Combinable,
    resultConversion: ConversionDescriptor,
) {
    let result;
    if (
        (typeof input1 === 'number' && typeof input2 === 'number') ||
        resultConversion === 'as-number'
    ) {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString;
    }
    return result
}

console.log(combine(3, 3, 'as-number'))
