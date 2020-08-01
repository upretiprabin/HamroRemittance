export const getRandomColor = () => {
    var letters = '0123456789'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        var j = letters[Math.round(Math.random() * 10)];
        if (j == null) {
            i--;
        } else {
            color += j
        }
    }
    return color;
}