// for(let p = 0; p < 10; p++){
//     localStorage.setItem("user" + p, "-0")
// }
var ground = document.getElementById("canv").getContext("2d");
ground.canvas.width = 2000;
ground.canvas.height = 2000;
var mc = document.createElement("img");
frame = 0;
frame1 = 0;
mc.src = "mc.png";
var end = document.createElement("img");
end.src = "end.png";
var MC = {};
var End = {};
let lvl = 9;
let endpoint = [];
let blocks =  Mazemaker(lvl);
let deadline = 0;
let dstart = 0;

var start = mc.addEventListener('load', function(){
    dstart = new Date()
    deadline = new Date();
    deadline.setTime(deadline.getTime() + 180*1000);
    blocks =  Mazemaker(lvl);
    resetProp();
    resetEnd();
    console.log(End.x)
    drawGround();
    drawEnd();
    drawMC();
   
})
start;

function arr(n, m){
    var blk = [];
    for(let i = 0; i < m; i++){
        var repeated = [].concat(... new Array(n).fill([1]));
        blk.push(repeated)
    }

    return blk;
}

function Maze(xx = 1, yy =1){
    let x1 = xx;
    let y1 = yy;
    cells[y1][x1] = 0;
    let all_directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for(let i = 0; i < all_directions.length; i++){
        let ik = Math.floor(Math.random() * all_directions.length);
        let tmp = all_directions[ik];
        all_directions.splice(ik, 1);
        all_directions.push(tmp);
    }
    while(all_directions.length > 0){
        direction_to_try = all_directions.pop();
        node_x = x1 + (direction_to_try[0] * 2);
        node_y = y1 + (direction_to_try[1] * 2);

        let find = 0;
        if((0 <= node_x) && (node_x < width) && (0 <= node_y) && (node_y < height)){
            find = cells[node_y][node_x];
        }
        else{
            find = 0;
        }
        if(find === 1){
            link_cell_x = x1 + direction_to_try[0];
            link_cell_y = y1 + direction_to_try[1];
            cells[link_cell_y][link_cell_x] = 0;
            Maze(node_x, node_y);
        }
    }
    return undefined;
}

function Mazemaker(diff = 3){
    endpoint = []
    width = 2 * diff -1;
    height = 2 * diff - 1;
    cells = arr(width, height);
    Maze();
    randvari = 0;
    randvarj = 0;
   while(cells[randvari][randvarj] != 0){
       randvari = (width - 4) + Math.floor(Math.random()*3);
       randvarj = 1 + Math.floor(Math.random()*(height-1));
    }
    endpoint.push(randvari, randvarj);
    return cells;
}

console.log(endpoint);

document.addEventListener('keydown', animate);
function animate(){
    clearMC();
    setProp();
    drawEnd();
    drawMC();

}
document.addEventListener('keydown', get_to_end);

function drawGround(){
    var blockW = MC.width;
    var blockH = MC.height;
    ground.fillStyle = "#101A37";
    ground.fillRect(0, 0, ground.canvas.width, ground.canvas.height);
    for(let i = 0; i < blocks.length; i++){
        for(let j = 0; j < blocks[0].length; j++){
            if(blocks[i][j] == 1){
                ground.fillStyle = "#CB1019";
                ground.fillRect(j*blockW, i*blockH, blockW +blockW*0.1, blockH + blockH*0.1);
                ground.fillStyle = "#E95020";
                ground.fillRect(j*blockW, i*blockH, blockW, blockH);
                ground.fillStyle = "#F4AE76";
                ground.fillRect(j*blockW + blockW/4, i*blockH + blockH/4 , blockW/2, blockH/2);
            }
        }
    }
}

function resetProp(){
    MC.x = 1;
    MC.y = 1;
    MC.width = ground.canvas.width/blocks[0].length;
    MC.height = ground.canvas.height/blocks.length;
}

function resetEnd(){
    End.x = endpoint[1];
    End.y = endpoint[0];
    End.width = ground.canvas.width/blocks[0].length;
    End.height = ground.canvas.height/blocks.length;
}
console.log(End.x)

function drawEnd(){
    ground.drawImage(end, 0, frame1*320, 320, 320, End.x*End.width + End.width/4, End.y*End.height + End.height/4, End.width/2, End.height/2);
    frame1++;
    if(frame1 > 1){
        frame1 = 0;
    }
}

function clearEnd(){
    ground.fillStyle = "#101A37";
    ground.fillRect(End.x*End.width + End.width/4, End.y*End.height + End.height/4, End.width/2, End.height/2)
}

function setProp(){
    switch(event.keyCode){
        case 68: MC.x++; if(Collision()){MC.x--}; break; //d
        case 65: MC.x--;if(Collision()){MC.x++}; break; //a
        case 87: MC.y--;if(Collision()){MC.y++}; break; //w
        case 83: MC.y++;if(Collision()){MC.y--}; break; //s
    }
}

function drawMC(){
    ground.drawImage(mc, 0, frame*90, 96, 90, MC.x*MC.width + MC.width/4, MC.y*MC.height + MC.height/4, MC.width/2, MC.height/2);
    frame++;
    if(frame > 6){
        frame = 0;
    }
}

function clearMC(){
    ground.fillStyle = "#F0E7AD";
    ground.fillRect(MC.x*MC.width + MC.width/4, MC.y*MC.height + MC.height/4, MC.width/2, MC.height/2)
  
}
// get_to_end();

function Collision(){
    if(MC.x < 0 || MC.x > blocks[0].length - 1 || MC.y < 0 || MC.y > blocks.length - 1 || blocks[MC.y][MC.x] === 1){
        return true;
    }
    else{
        return false;
    }
}
function get_to_end(){
    if(MC.x === End.x && MC.y === End.y){
        console.log(deadline)
        console.log(new Date())
        console.log(MC.x === End.x && MC.y === End.y)
        console.log([MC.x, MC.y, End.x, End.y])
        lvl = lvl + 1;
        dstart = new Date()
        deadline = new Date();
        deadline.setTime(deadline.getTime() + (180 - (Math.floor(((lvl-6)*(lvl-6))/15))*10)*1000);
        blocks = Mazemaker(lvl);
        resetProp();
        resetEnd();
        drawGround();
        drawEnd();
        drawMC();

    }
}

function record_message(new_score){
    let user_array = []
    for(let p = 0; p < 10; p++){
        user_array.push(localStorage.getItem("user" + p))
    }
    for(let p = 0; p < 10; p++){
        var emul = user_array[p]
        var score = "";
        for(let p0 = 0; p0 < emul.length; p0++){
            if(emul[p0] === "-"){
                for(let p1 = p0 + 1; p1 < emul.length; p1++){
                    score = score + emul[p1];
                }
                break;
            }
        }
        score = Number(score);
        if(score === null){
            break;
        }
        if(score < new_score){
            var pl = p + 1;
            let result = prompt("Новый рекорд!", "Player: ");
            alert(result);
            user_array.splice(p, 0, result + "-" + new_score);
            user_array.splice(user_array.length - 1, 1);
            break;
        }
    }

    for(let p = 0; p < 10; p++){
        localStorage.setItem("user" + p, user_array[p])
    }
}

for(let p = 0; p < 10; p++){
    console.log(localStorage.getItem("user" + p))
}
console.log(localStorage.length);

document.addEventListener('DOMContentLoaded', function() {
    let timerId = null;
    function declensionNum(num, words) {
      return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    function countdownTimer() {
        // console.log(deadline);
        // console.log(new Date());
      const diff1 = deadline - new Date();
      const $minutes = document.querySelector('.timer__minutes');
      const $seconds = document.querySelector('.timer__seconds');
      if (diff1 <= 0) {
        clearInterval(timerId);
        if(lvl > 9){
        record_message(lvl);
        // budet
        }
      }
      const minutes = diff1 > 0 ? Math.floor(diff1 / 1000 / 60) % 60 : 0;
      const seconds = diff1 > 0 ? Math.floor(diff1 / 1000) % 60 : 0;
      $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
      $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
      $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }
  
    countdownTimer();
    timerId = setInterval(countdownTimer, 1000);
    
  });

let user_array1 = []
for(let p = 0; p < 10; p++){
      user_array1.push(localStorage.getItem("user" + p))
  }

let list = document.getElementById("blockrate");
var wrd = "";
for(let p0 = 0; p0 < 10; p0++){
    wrd = wrd + user_array1[p0] + "\n";
    let xi = user_array1[p0];
    list.innerHTML += `<p class="par"> ${xi}</p>`;
}
console.log(wrd);
