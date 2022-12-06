const fs = require('fs');
const http = require('http');
const path = require('path');
const { json } = require('stream/consumers');
const url = require('url');
// const input = fs.readFile(`starter/txt/start.txt`, 'utf-8', (err, data) => {
//     console.log(data);
//     fs.readFile(`starter/txt/${data}.txt`, 'utf-8', (err, after) => {
//         console.log(after);
//     })
// });
// console.log("Reading file...");
const replaceTemplate = (template, emp) =>{
    var output = template.replace(/{%Name%}/g, emp.name);
    output = output.replace(/{%Job%}/g, emp.job);
    output = output.replace(/{%id%}/g, emp.id);
    return output;
}

const convert_string = (s) =>{
    const arr = s.split('&');
    for (var i=0; i<arr.length; i++){
        arr[i] = arr[i].substring(arr[i].indexOf('=')+1);
    }
    return arr;
}

const table = fs.readFileSync('job.html', 'utf-8')
const card = fs.readFileSync('em_card.html', 'utf-8')
const data = fs.readFileSync('data.json','utf-8')
const list = JSON.parse(data)
const server = http.createServer((req, res) => {
    //console.log(req.url);
    
    const empHTML = list.map(ele=>replaceTemplate(card, ele)).join('');
    const outPage = table.replace('{%Employee%}', empHTML)
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(outPage);
    const {search} = url.parse(req.url, true);//extract query and pathname from url
    //console.log(search);
    if (search != null){
        const retrieved = convert_string(search);
        for (var i = 0; i < list.length; i++) {
            list[i].job = retrieved[2*i];
            list[i].shift = retrieved[2*i+1];
            //console.log(list[i]);
        }
    }
});
server.listen(8000, '192.168.0.115', () => {
    console.log("Server started on port 8000");
}
);
