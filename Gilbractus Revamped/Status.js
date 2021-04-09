//TODO 
/*
<h1>Statistics</h1>
<ul id="player-stats">
<li>
    <h3>Kills:</h3>
</li>
<li>
    <h3>Deaths:</h3>
</li>
<li>
    <h3>Kill/Death ratio:</h3>
</li>
<li>
    <h3>Shots Fires:</h3>
</li>
<li>
    <h3>Shots landed:</h3>
</li>
<li>
    <h3>Accuracy:</h3>
</li>
<li>
    <h3>Damage done:</h3>
</li>
</ul> */

function drawStatusBar(scl, player) {
    PSctx.fillStyle = 'aquamarine';
    PSctx.fillRect(0,0,PScanvas.width,PScanvas.height)

    PSctx.fillStyle = 'black';
    PSctx.font = `${scl / 2.5}px Arial`;
    PSctx.fillText("Player Status", 10, scl / 2.3);

    PSctx.font = `${scl / 4.2}px Arial`;
    PSctx.fillText(`>Health: ${Math.floor(player.health)}`, 10, scl * 0.9);
    PSctx.fillText(`>Ammo: ${Math.floor(player.weapon.ammoCount)}`, 10, scl * 1.15);
    PSctx.fillText(`>Armor: ${player.armor * 100}%`, 10, scl * 1.4);
    PSctx.fillText(`>Fire Rate: ${player.weapon.BPS}`, 10, scl * 1.65);
    PSctx.fillText(`>Walk Speed: ${Math.floor(player.speed/scl * 100)}`, 10, scl * 1.9);
}