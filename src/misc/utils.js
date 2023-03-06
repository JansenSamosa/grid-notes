export const convertVhToPx = (vh) => {
    return window.innerHeight / 100 * vh;
}

export const convertVwToPx = (vw) => {
    return window.innerWidth / 100 * vw;
}

export const summationArrayValue = (arr, i) => {
    arr.slice(0, i).reduce((a, b) => a + b, 0);
}

export const round5 = x => {
    return Math.ceil(x / 5) * 5
}
export const round2 = x => {
    return Math.ceil(x / 2) * 2
}

export const roundXToY= (x, y) => {
    return Math.ceil(x / y) * y
}

//Returns true if 2 arrays are equal in all its values
export const areEqual = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false
    }

    return true
}