const colors = [Color.valueOf("48bbe8"), Color.valueOf("78e6ff"), Color.valueOf("c2eeff")];
const tscales = [2, 1.5, 1, 0.825];
const lenscales = [1, 1.25, 1.4, 1.45];
const length = 560;
const starbeam = extend(BasicBulletType,{
    range(){
        return length;
    },
    update(b){
        if (b.time()<0.001) {
            Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), length);
        }
        print(b.time())
    },
    draw(b){
        const f = Mathf.curve(b.fin(), 0, 0.05);
        const baseLen = length * f;
        Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
        for(var s = 0; s < 3; s++){
            Draw.color(colors[s]);
            for(var i = 0; i < tscales.length; i++){
                Lines.stroke(5 * b.fout() * (s == 0 ? 1.5 : s == 1 ? 1 : 0.25) * tscales[i]);
                Lines.lineAngle(b.x, b.y, b.rot(), baseLen * lenscales[i]);
            }
        }
        Draw.reset();
    }
})
starbeam.damage = 800;
starbeam.speed = 0.0001;
starbeam.hitEffect = newEffect(50, e => {
    Draw.color(Color.valueOf("#ce62f5"),Color.valueOf("#c2eeff"),e.fin());
    const d = new Floatc2({get(x, y){
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 8 + 5);
    }}) 
    Angles.randLenVectors(e.id, 5, 1 + 30 * e.fout(), e.rotation, 360,d);
    const c = new Floatc2({get(x, y){
        Fill.circle(e.x + x, e.y + y, e.fout() * 6);
    }}) 
    Angles.randLenVectors(e.id, 5, 1 + 40 * e.fin(), e.rotation, 360,c);
});
starbeam.despawnEffect = Fx.none;
starbeam.hitSize = 200;
starbeam.drawSize = 250;
starbeam.bulletWidth = 60;
starbeam.lifetime = 60;
starbeam.pierce = true;
starbeam.shootEffect = newEffect(90, e => {
    Draw.color(Color.valueOf("#7b68ee"));
    Fill.circle(e.x, e.y, e.fout() * 11);
    Draw.color(Color.valueOf("#e4ebff"),Color.valueOf("#ffffff"),e.fin());
    Fill.circle(e.x, e.y, e.fout() * 13);
	Draw.color(Color.valueOf("#ffffff"),Color.valueOf("#78e6ff"),e.fin());
	Drawf.tri(e.x, e.y, 240 * e.fout(), 5, e.rotation + 180);
});
starbeam.smokeEffect = newEffect(120, e => {
    Draw.color(Color.valueOf("#ffffff"));
    Fill.circle(e.x, e.y, e.fout() * 11);
});

const starslayer = extendContent(ChargeTurret,"starslayer",{})
starslayer.shootType = starbeam

starslayer.chargeBeginEffect = newEffect(180, e => {
    Draw.color(Color.valueOf("#48bbe8"));
    Fill.circle(e.x, e.y, e.fin() * 7);
    Draw.color(Color.valueOf("#48bbe8"),Color.valueOf("#ffffff"),e.fin());
    Fill.circle(e.x, e.y, e.fin() * 4.25);
});

starslayer.chargeEffect = newEffect(120, e => {
    Draw.color(Color.valueOf("#48bbe8"),Color.valueOf("#ffffff"),e.fin());
    Lines.stroke(e.fin() * 4);
    Lines.circle(e.x, e.y, e.fout() * 60);
    Lines.stroke(e.fin() * 2);
    Lines.circle(e.x, e.y, 12);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }}) 
    Angles.randLenVectors(e.id, 25, 1 + 240 * e.fout(), e.rotation, 200,d);
});