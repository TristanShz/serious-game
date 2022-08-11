export function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

export function guid() {
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}

export function replaceWithStars(text: string) {
    let replacedString = "";
    for (let i = 0; i < text.length; i++) {
        replacedString += "*";
    }
    return replacedString;
}
