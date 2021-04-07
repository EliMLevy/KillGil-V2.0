const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');

const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

canvas1.width = window.innerWidth * 0.5;
canvas1.height = window.innerHeight;

canvas2.width = window.innerWidth * 0.5;
canvas2.height = window.innerHeight;

function animate() {
    ctx1.fillStyle = 'red';
    ctx1.fillRect(100,100,20,90);

    ctx2.fillStyle = 'blue';
    ctx2.fillRect(100,100,20,90);


    requestAnimationFrame(animate);
}

animate();