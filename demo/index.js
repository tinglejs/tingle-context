var Tingle = require('../src/Context');
console.log(Tingle);
for (var i = 0; i < 10; i++) {
    var div = document.createElement('div');
    div.style.float = 'left';
    div.style.width = '1rem';
    div.style.height = '1rem';
    div.style.background = 'rgba(0, 0, 0, ' + ((i + 1) / 10) + ')';
    document.body.appendChild(div);
}