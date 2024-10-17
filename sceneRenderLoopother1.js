//v3
function sceneRenderLoop(){
let delta = window.appState['timeDelta'];
window.scene.render();
//console.log(window.appState['tempSpeed']);

if(window.appUIState['allModelsLoaded']==true){




if(window.appState['playerFallAnimPlay'] == 1 && window.stateDeath == 1)
{


if(window.appState['playerFallDirection'] == 1) scene.getAnimationGroupByName("A_Dead_B").weight = Math.min(1, scene.getAnimationGroupByName("A_Dead_B").weight + 0.3);
if(window.appState['playerFallDirection'] == 2) scene.getAnimationGroupByName("A_Dead_F").weight = Math.min(1, scene.getAnimationGroupByName("A_Dead_F").weight + 0.3);

//  window.scene.getAnimationGroupByName("A_Dead_B").weight +=0.2;

scene.getAnimationGroupByName("A_Jump_Start_R").weight = Math.max(0, scene.getAnimationGroupByName("A_Jump_Start_R").weight - 0.3);
scene.getAnimationGroupByName("A_Jump_Start_L").weight = Math.max(0, scene.getAnimationGroupByName("A_Jump_Start_L").weight - 0.3);
scene.getAnimationGroupByName("A_Run_F").weight = Math.max(0, scene.getAnimationGroupByName("A_Run_F").weight - 0.3);
scene.getAnimationGroupByName("A_Run_L").weight = Math.max(0, scene.getAnimationGroupByName("A_Run_L").weight - 0.3);
scene.getAnimationGroupByName("A_Run_R").weight = Math.max(0, scene.getAnimationGroupByName("A_Run_R").weight - 0.3);
scene.getAnimationGroupByName("A_Slide_Idle").weight = Math.max(0, scene.getAnimationGroupByName("A_Slide_Idle").weight - 0.3);
scene.getAnimationGroupByName("A_Idle_L").weight = Math.max(0, scene.getAnimationGroupByName("A_Jump_Start_R").weight - 0.3);
scene.getAnimationGroupByName("A_Idle_R").weight = Math.max(0, scene.getAnimationGroupByName("A_Jump_Start_R").weight - 0.3);







}


if (window.appState['levelIntro'] == 1 && window.stateDeath == 1 && scene.getAnimationGroupByName("A_Start_Game").animatables.length > 0) {

if (window.appState['levelIntro'] == 1 && window.stateDeath == 1 && scene.getAnimationGroupByName("A_Start_Game").animatables[0].masterFrame >40)
{
window.appState['levelIntro'] = 2;
window.stateDeath = 0;
}

}


if (window.appState['levelIntro'] == 0 && window.stateDeath == 1 && window.appState['playerFallAnimPlay'] != 1)
{
scene.getAnimationGroupByName("A_Start_Game_Idle").play();
}



if(window.appState['superMode1'] == 1 && window.appState['superMode1TimeEnd'] < Date.now())
{
window.appState['superMode1'] = 0;
//window.gameSpeed = window.appState['minSpeed'];
window.gameSpeed = window.appState['tempSpeed'];

}

if(window.appState['superMode2'] == 1 && window.appState['superMode2TimeEnd'] < Date.now())
{
window.appState['superMode2'] = 0;
window.scene.getMeshByID('orbFX').setEnabled(false);
window.scene.getMeshByID('orbFX2').setEnabled(false);
//scene.getMaterialByID('material_4mat').emissiveColor = new BABYLON.Color3(0, 0, 0);
//scene.getMaterialByID('material_6mat').emissiveColor = new BABYLON.Color3(0, 0, 0);
}

if(window.appState['superMode3'] == 1 && window.appState['superMode3TimeEnd'] < Date.now())
{
window.appState['superMode3'] = 0;
}


///LIFE CYCLE

if (window.stateDeath == 0 && window.appState['pause'] == 0)
{


window.currentDistance = window.currentDistance + (window.appState['timeDelta'] * window.gameSpeed);


//let speedTemp = (window.appState['timeDelta'] * window.gameSpeed) ;
window.currentSlot = Math.floor(window.currentDistance);
window.smallDelta = window.currentDistance - window.currentSlot;

//console.log('distance: ' + window.currentDistance + ', slot: ' + window.currentSlot + ', array length:' + window.gameLevelSlot.length);


// NEXT LINE TRIGGER
if ( window.currentSlot > window.lastSlot )
{





if(window.gameLevelSlot.length < window.currentSlot + 50 && window.currentSlot < window.appState['levelBoss1Initial']-50 &&
window.appState['currentLevel'] != 'infinity' &&
window.appState['currentLevel'] !=1 &&
window.appState['currentLevel'] !=2 &&
window.appState['currentLevel'] !=3
) gameCreateNewSlot();


////////////// NEW RANDOM
if(window.gameLevelSlot.length < window.currentSlot + 50 + 18 && window.appState['infinityMode'] == 1)
{
let levelPattern = [];
//  gameCreateNewSlot();

if(window.currentSlot >= (window.appState['levelBoss1Initial'] - 100) && window.currentSlot <= window.appState['levelBoss1End'])
{
//boss  active
//level_pattern = Array(18).fill([0, 0, 0, 0, 0, 0]);

for(let it=0; it<18; it++)
{
window.gameLevelSlot.push([0, 0, 0, 0, 0, 0]);
}

//console.log('push blank, full lenght: ' +  window.gameLevelSlot.length);
}
else
{
  //boss not active

  if(window.appState['currentLevel'] == 1) levelPattern = generateLevel1Patern();
  if(window.appState['currentLevel'] == 2) levelPattern = generateLevel2Patern();
  if(window.appState['currentLevel'] == 3) levelPattern = generateLevel3Patern();
  window.gameLevelSlot.push(...levelPattern);
//  console.log('push generated, full lenght: ' +  window.gameLevelSlot.length);

}

//boss active
}

if(window.currentSlot >= window.appState['levelBoss1Initial']-50 && window.appState['infinityMode'] == 0 && window.appState['currentLevel'] !=1  && window.appState['currentLevel'] !=2
)
//if(window.currentSlot >= 500)
{
  newSlot = [0, 0, 0, 0, 0, 0];
  window.gameLevelSlot.push(newSlot);
}

//BOSS INIT LEVEL
if(window.currentSlot == window.appState['levelBoss1Initial'] && window.appState['infinityMode'] == 0)
{
//level1.hideObjects();
scene.getNodeByID('boss1Container').position.z = window.appState['levelBoss1Zinitial'];
scene.getNodeByID('levelAssetsContainer').setEnabled(false);

window.appState['cameraMode'] = -1;
//ROTATE CAMERA



// Create animation for camera position
let positionAnimation = new BABYLON.Animation("cameraPositionAnimation", "position", 30,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

///
let positionKeys = [];
positionKeys.push({ frame: 0, value: scene.activeCamera.position.clone() });
positionKeys.push({ frame: 100, value: new BABYLON.Vector3(0, window.appState['cameraDefaultY'], window.appState['cameraDefaultZ'] * -1 + window.appState['cameraDefaultBossDistance']) });

positionAnimation.setKeys(positionKeys);

// Create easing function for position animation
let easingFunctionPosition = new BABYLON.QuadraticEase();
easingFunctionPosition.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
positionAnimation.setEasingFunction(easingFunctionPosition);



// Create animation for camera rotation
let rotationAnimation = new BABYLON.Animation("cameraRotationAnimation", "rotation", 30,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);



let rotationKeys = [];
rotationKeys.push({ frame: 0, value: scene.activeCamera.rotation.clone() });
rotationKeys.push({ frame: 50, value: new BABYLON.Vector3(0.4636476090008061 * 3, 3.14/2, 0) });
rotationKeys.push({ frame: 100, value: new BABYLON.Vector3(0.4636476090008061, 3.14, 0) });

rotationAnimation.setKeys(rotationKeys);

// Create easing function for rotation animation
let easingFunctionRotation = new BABYLON.QuadraticEase();
easingFunctionRotation.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
rotationAnimation.setEasingFunction(easingFunctionRotation);

// Apply animations to the camera
scene.activeCamera.animations.push(positionAnimation);
scene.activeCamera.animations.push(rotationAnimation);

// Start the animation
scene.beginAnimation(scene.activeCamera, 0, 100, false);

//scene.beginDirectAnimation(scene.activeCamera, [animation], 0, 1000, false);







}

if(window.currentSlot == window.appState['levelBoss1Initial'] + 35 && window.appState['infinityMode'] == 0)
{
window.appState['levelBoss1Active'] = 1;
}



if(window.currentSlot == window.appState['levelBoss1Initial'] + 1) window.appState['cameraRotated'] = 0;
if(window.currentSlot == window.appState['levelBoss1End'] + 1) window.appState['cameraRotated'] = 0;


//BOSS INIT INFINITY
if(window.currentSlot == window.appState['levelBoss1Initial'] && window.appState['infinityMode'] == 1 && window.appState['cameraRotated'] == 0)
{

//level1.hideObjects();
window.appState['cameraRotated'] = 1;
scene.getNodeByID('levelAssetsContainer').setEnabled(false);
scene.getNodeByID('boss1Container').position.z = window.appState['levelBoss1Zinitial'];
scene.getNodeByID('boss1Container').position.x = 0;

//DISABLING ANIMATIONS
while (scene.activeCamera.animations.length > 0) {
   scene.activeCamera.animations.splice(0, 1);
}


window.appState['cameraMode'] = -1;
//ROTATE CAMERA



// Create animation for camera position
let positionAnimation = new BABYLON.Animation("cameraPositionAnimation", "position", 60,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

///
let positionKeys = [];
positionKeys.push({ frame: 0, value: scene.activeCamera.position.clone() });
positionKeys.push({ frame: 100, value: new BABYLON.Vector3(0, window.appState['cameraDefaultY'], window.appState['cameraDefaultZ'] * -1 + window.appState['cameraDefaultBossDistance']) });

positionAnimation.setKeys(positionKeys);

// Create easing function for position animation
let easingFunctionPosition = new BABYLON.QuadraticEase();
easingFunctionPosition.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
positionAnimation.setEasingFunction(easingFunctionPosition);



// Create animation for camera rotation
let rotationAnimation = new BABYLON.Animation("cameraRotationAnimation", "rotation", 60,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);



let rotationKeys = [];
rotationKeys.push({ frame: 0, value: scene.activeCamera.rotation.clone() });
rotationKeys.push({ frame: 50, value: new BABYLON.Vector3(0.4636476090008061 * 3, 3.14/2, 0) });
rotationKeys.push({ frame: 100, value: new BABYLON.Vector3(0.4636476090008061, 3.14, 0) });

rotationAnimation.setKeys(rotationKeys);

// Create easing function for rotation animation
let easingFunctionRotation = new BABYLON.QuadraticEase();
easingFunctionRotation.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
rotationAnimation.setEasingFunction(easingFunctionRotation);

// Apply animations to the camera
scene.activeCamera.animations.push(positionAnimation);
scene.activeCamera.animations.push(rotationAnimation);

// Start the animation
scene.beginAnimation(scene.activeCamera, 0, 100, false);

//scene.beginDirectAnimation(scene.activeCamera, [animation], 0, 1000, false);







}

if(window.currentSlot == window.appState['levelBoss1Initial'] + 35 && window.appState['infinityMode'] == 1)
{
window.appState['levelBoss1Active'] = 1;
}

if(window.currentSlot == window.appState['levelBoss1End'] + 25 && window.appState['infinityMode'] == 1) scene.getNodeByID('levelAssetsContainer').setEnabled(true);

if(window.currentSlot == window.appState['levelBoss1End'] + 10 && window.appState['infinityMode'] == 1)
{
  changeLocation();
}




if(window.currentSlot == window.appState['levelBoss1End'] + 1 && window.appState['infinityMode'] == 1 )
{
  window.appState['cameraRotated'] = 0;
}

if(window.currentSlot == window.appState['levelBoss1End'] && window.appState['infinityMode'] == 1 && window.appState['cameraRotated'] == 0)
{
//level1.hideObjects();
//scene.getNodeByID('levelAssetsContainer').setEnabled(true);
window.appState['cameraRotated'] = 1;
window.appState['levelBoss1Active'] = 0;

//DISABLING ANIMATIONS
while (scene.activeCamera.animations.length > 0) {
   scene.activeCamera.animations.splice(0, 1);
}

window.appState['cameraMode'] = 1;
//ROTATE CAMERA



// Create animation for camera position
let positionAnimation = new BABYLON.Animation("cameraPositionAnimation", "position", 30,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

///
let positionKeys = [];
positionKeys.push({ frame: 0, value: scene.activeCamera.position.clone() });
positionKeys.push({ frame: 100, value: new BABYLON.Vector3(0, window.appState['cameraDefaultY'], window.appState['cameraDefaultZ']) });

positionAnimation.setKeys(positionKeys);

// Create easing function for position animation
let easingFunctionPosition = new BABYLON.QuadraticEase();
easingFunctionPosition.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
positionAnimation.setEasingFunction(easingFunctionPosition);



// Create animation for camera rotation
let rotationAnimation = new BABYLON.Animation("cameraRotationAnimation", "rotation", 30,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);



let rotationKeys = [];
rotationKeys.push({ frame: 0, value: scene.activeCamera.rotation.clone() });
rotationKeys.push({ frame: 50, value: new BABYLON.Vector3(0.4636476090008061 * 3, 3.14/2, 0) });
rotationKeys.push({ frame: 100, value: new BABYLON.Vector3(0.4636476090008061, 0, 0) });

rotationAnimation.setKeys(rotationKeys);

// Create easing function for rotation animation
let easingFunctionRotation = new BABYLON.QuadraticEase();
easingFunctionRotation.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
rotationAnimation.setEasingFunction(easingFunctionRotation);

// Apply animations to the camera
scene.activeCamera.animations.push(positionAnimation);
scene.activeCamera.animations.push(rotationAnimation);

// Start the animation
scene.beginAnimation(scene.activeCamera, 0, 100, false);

//scene.beginDirectAnimation(scene.activeCamera, [animation], 0, 1000, false);







}





//END















// END LEVEL IN STORY MODE
if(window.currentSlot >= window.appState['levelBoss1End'] && window.appState['infinityMode'] == 0)
{

//ROTATE CAMERA
if (window.appState['currentLevel'] == 1) window.appState['level2Unloked'] = 1;
if (window.appState['currentLevel'] == 2) window.appState['level3Unloked'] = 1;

window.stateDeath = 1;
window.sounds['bg'].stop();
window.sounds['run'].stop();

if(window.appUIState['soundPlay'] == true){
   window.sounds['menu'].stop();
   window.sounds['menu'].play();
}
openLevels(1);

window.scene.getAnimationGroupByName("A_Run_F").speedRatio = 0.0;
window.scene.getAnimationGroupByName("A_Run_L").speedRatio = 0.0;
window.scene.getAnimationGroupByName("A_Run_R").speedRatio = 0.0;

}

//BOSS INFINITY MODE UPDATE
if(window.currentSlot >= window.appState['levelBoss1End'] + 100 && window.appState['infinityMode'] == 1)
{
  //window.appState['levelBoss1Initial'] = window.currentSlot + 200 + Math.floor(Math.random() * 200);
  window.appState['levelBoss1Initial'] = window.currentSlot + 300 + Math.floor(Math.random() * 400);
  window.appState['levelBoss1End'] = window.appState['levelBoss1Initial'] + 100 + Math.floor(Math.random() * 200);

//if  (window.appState['levelBossCounter'] <4)
//{
//window.appState['levelBossCounter']++;
//window.appState['tempSpeed'] = window.appState['minSpeed'] + (0.001 * window.appState['levelBossCounter']);
//window.gameSpeed = window.appState['tempSpeed'] + 0;
//}


}



//renderLine(window.currentSlot + 44);

//window.appState['savedDistance'] = 0;
window.appState['totalDistance'] = window.appState['savedDistance'] + window.lastSlot;
//old
//document.getElementById("distanceContainer").innerHTML =  metersToKilometers(window.lastSlot) + ' km';
document.getElementById("distanceContainer").innerHTML =  metersToKilometers(window.appState['totalDistance']) + ' km';

window.lastSlot = window.lastSlot + 1;

// GARBAGE COLLECTOR
//window.gameLevelSlot = window.gameLevelSlot.slice(0, window.currentSlot - 6);
//window.gameLevelSlot.shift();

//speed
if(window.appState['superMode1'] == 0)
{
let currentTempSpeedMarker = Math.floor(window.appState['totalDistance'] / 1000);
if (currentTempSpeedMarker >= 4) currentTempSpeedMarker = 4;
window.appState['tempSpeed'] = window.appState['minSpeed'] + (0.001 * currentTempSpeedMarker);

//window.appState['tempSpeed'] = window.appState['minSpeed'] + (0.001 * 5);
//console.log(currentTempSpeedMarker + ' ' + window.appState['tempSpeed']);
window.gameSpeed = window.appState['tempSpeed'] + 0;
}



//if(window.currentSlot < 500 )window.appState['barrierRandom'] = 0.1;
//if(window.currentSlot >= 500 )
window.appState['barrierRandom'] = Math.min(0.9, window.currentSlot/500);

}

gameLoopMovePlayer();

if (window.appState['currentLevel'] == 1) level1.move();
if (window.appState['currentLevel'] == 2) level2.move();
if (window.appState['currentLevel'] == 3) level3.move();



//gameLoopMoveCoins();
//gameLoopMoveEnemy();
if(window.currentSlot > window.appState['levelBoss1Initial'] && window.appState['infinityMode'] == 0) levelBoss1Update();
if(window.currentSlot > window.appState['levelBoss1Initial'] && window.appState['infinityMode'] == 1) levelBoss1Update();
//gameLoopMoveSuperCoinsHealth();
//gameLoopMoveSuperCoinsSpeed();


//gameLoopMoveGroup();


//scene.getNodeByID('group').position.z = scene.getNodeByID('group').position.z - (window.appState['timeDelta'] * window.gameSpeed);
//if(scene.getNodeByID('group').position.z < -5) scene.getNodeByID('group').position.z = 50 + Math.floor(Math.random()*100);





// MAIN CYCLE
for(i = 0;  i < 50; i++)
{

let currentI = i + window.currentSlot - 5;
let currentLevelSlot = window.gameLevelSlot[currentI];
if(window.gameLevelSlot[currentI] != undefined) {
//if(i == 0 ) console.log(currentI);


for(id = 0;  id < 6; id++)
{
//  if (currentLevelSlot[id] == 1) gameLoopMoveCoinsByID(currentI, id, i);
///
if (currentLevelSlot[id] == 1) gameLoopMoveCoinsByID(currentI ,id, i);

if(1==1)
{
if (currentLevelSlot[id] == 10 && id < 3) gameL1LoopMoveEnemy0ByID(currentI ,id, i);
if (currentLevelSlot[id] == 11 && id < 3) gameL1LoopMoveEnemy1ByID(currentI ,id, i);
if (currentLevelSlot[id] == 12 && id < 3) gameL1LoopMoveEnemy2ByID(currentI ,id, i);

if (currentLevelSlot[id] == 20 && id < 3) gameL2LoopMoveEnemy0ByID(currentI ,id, i);
if (currentLevelSlot[id] == 21 && id < 3) gameL2LoopMoveEnemy1ByID(currentI ,id, i);
if (currentLevelSlot[id] == 22 && id < 3) gameL2LoopMoveEnemy2ByID(currentI ,id, i);

if (currentLevelSlot[id] == 30 && id < 3) gameL3LoopMoveEnemy0ByID(currentI ,id, i);
if (currentLevelSlot[id] == 31 && id < 3) gameL3LoopMoveEnemy1ByID(currentI ,id, i);
if (currentLevelSlot[id] == 32 && id < 3) gameL3LoopMoveEnemy2ByID(currentI ,id, i);

if (currentLevelSlot[id] == 33 && id < 3) gameL3LoopMoveEnemy3ByID(currentI ,id, i);
if (currentLevelSlot[id] == 34 && id < 3) gameL3LoopMoveEnemy4ByID(currentI ,id, i);
if (currentLevelSlot[id] == 35 && id < 3) gameL3LoopMoveEnemy5ByID(currentI ,id, i);
if (currentLevelSlot[id] == 36 && id < 3) gameL3LoopMoveEnemy6ByID(currentI ,id, i);
if (currentLevelSlot[id] == 37 && id < 3) gameL3LoopMoveEnemy7ByID(currentI ,id, i);

//if(window.appState['currentLevel'] == 1) {
if (currentLevelSlot[id] == 3) gameLoopMoveSuperCoinsHealthByID(currentI ,id, i);
if (currentLevelSlot[id] == 4) gameLoopMoveSuperCoinsSpeedByID(currentI ,id, i);
if (currentLevelSlot[id] == 5) gameLoopMoveMagnetByID(currentI ,id, i);
//}

//if(window.appState['currentLevel'] == 2) {
//if (currentLevelSlot[id] == 3) gameL2LoopMoveSuperCoinsHealthByID(currentI ,id, i);
//if (currentLevelSlot[id] == 4) gameL2LoopMoveSuperCoinsSpeedByID(currentI ,id, i);
//if (currentLevelSlot[id] == 5) gameL2LoopMoveMagnetByID(currentI ,id, i);
//}

//if(window.appState['currentLevel'] == 3) {
//if (currentLevelSlot[id] == 3) gameL3LoopMoveSuperCoinsHealthByID(currentI ,id, i);
//if (currentLevelSlot[id] == 4) gameL3LoopMoveSuperCoinsSpeedByID(currentI ,id, i);
//if (currentLevelSlot[id] == 5) gameL3LoopMoveMagnetByID(currentI ,id, i);
//}

}

//  console.log(currentI);
}
}

}


//scene.getMaterialByID("roadMaterial").albedoTexture.vOffset = scene.getMaterialByID("roadMaterial").albedoTexture.vOffset + (window.appState['timeDelta'] * window.gameSpeed)/10 ;

//scene.environmentTexture.rotationY  = (window.currentDistance % 100)/100 * Math.PI * 2;

//scene.environmentTexture.setReflectionTextureMatrix(BABYLON.Matrix.RotationX((window.currentDistance % 200)/200 * Math.PI * 2));

//console.log(window.scene.getAnimationGroupByName("Run").animatables[0].masterFrame);

}




}



//window.scene.render();
window.appState['timeDelta'] = Date.now() - window.appState['timeLastTime'];
// LAG limitation
if(window.appState['timeDelta'] > 50) window.appState['timeDelta'] = 50;
window.appState['timeLastTime'] = Date.now();


//console.log(window.appState['timeDelta']);
}


































function gameCreateNewSlot()
{

// newSlot1_0

let randomSlot1_0 = Math.floor(Math.random() * 30);
let newSlot1_0 = 0;

let slotType = 0;
let newSlot = [0, 0, 0, 0, 0, 0]; // initialize with all zeros



if (Math.random() < window.appState['barrierRandom'] - 0.5 && window.currentSlot % 2 == 0 ) {
slotType = 777;
if (Math.random() <0.1)
newSlot = [2, 2, 2, 0, 0, 0];
else{
  let barrierIndex = Math.floor(Math.random() * 3);
  newSlot[barrierIndex] = 2;
}
}

if (Math.random() > 0.99 && slotType == 0) {
slotType = 5 + Math.floor(Math.random() * 6);
}

if(slotType == 1)
{
// check if last slot has a barrier, if so, skip barrier
if (
  window.gameLevelSlot.length > 0 && (
    window.gameLevelSlot[window.gameLevelSlot.length - 1][0] === 2 ||
    window.gameLevelSlot[window.gameLevelSlot.length - 1][1] === 2 ||
    window.gameLevelSlot[window.gameLevelSlot.length - 1][2] === 2 ||
    window.gameLevelSlot[window.gameLevelSlot.length - 2][0] === 2 ||
    window.gameLevelSlot[window.gameLevelSlot.length - 2][1] === 2 ||
    window.gameLevelSlot[window.gameLevelSlot.length - 2][2] === 2)

) {
  // no barrier this time
} else {
  // random possibility of barrier is 1 from 10
  if (Math.random() < window.appState['barrierRandom']) {
    // place barrier in one of the ground cells
    let barrierIndex = Math.floor(Math.random() * 3);
    newSlot[barrierIndex] = 2;
  }
}

// random possibility of coin is 1 from 3
if (Math.random() < 0.33) {
  // place coin in one of the cells
  let coinIndex;
  if (window.gameLevelSlot.length > 0) {
    let lastCoinIndex = window.gameLevelSlot[window.gameLevelSlot.length - 1].indexOf(1);
    if (lastCoinIndex!== -1) {
      // coin was in the previous slot, place next coin in line or change level
      if (lastCoinIndex < 3) {
        // coin was on the ground, place next coin in line or change level
        coinIndex = lastCoinIndex + 3;
      } else {
        // coin was in the air, place next coin in line or change level
        coinIndex = (lastCoinIndex + 1) % 3 + 3;
      }
      // check if barrier is not in the same cell
      if (newSlot[coinIndex - 3]!== 2) {
        newSlot[coinIndex] = 1;
      }
    } else {
      // no coin in previous slot, place coin anywhere
      coinIndex = Math.floor(Math.random() * 6);
      newSlot[coinIndex] = 1;
    }
  } else {
    // first slot, place coin anywhere
    coinIndex = Math.floor(Math.random() * 6);
    newSlot[coinIndex] = 1;
  }
}
}

if(slotType == 2)
{
let barrierWithCoin = 0;
  // check if last slot has a barrier, if so, skip barrier
  if (
    window.gameLevelSlot.length > 0 && (
      window.gameLevelSlot[window.gameLevelSlot.length - 1][0] === 2 ||
      window.gameLevelSlot[window.gameLevelSlot.length - 1][1] === 2 ||
      window.gameLevelSlot[window.gameLevelSlot.length - 1][2] === 2 ||
      window.gameLevelSlot[window.gameLevelSlot.length - 2][0] === 2 ||
      window.gameLevelSlot[window.gameLevelSlot.length - 2][1] === 2 ||
      window.gameLevelSlot[window.gameLevelSlot.length - 2][2] === 2)

  ) {
    // no barrier this time
  } else {
    // random possibility of barrier is 1 from 10
    if (Math.random() < 0.1) {
      // place barrier in one of the ground cells
      let barrierIndex = Math.floor(Math.random() * 3);
      newSlot[barrierIndex] = 2;

      // add coin over barrier with random 50/50
      if (Math.random() < 0.5) {
        newSlot[barrierIndex + 3] = 1;
        barrierWithCoin = 1;
      }
    }
  }

  // random possibility of coin is 1 from 3
  if (Math.random() < 0.33 && barrierWithCoin == 0) {
    // place coin in one of the cells
    let coinIndex;
    if (window.gameLevelSlot.length > 0) {
      let lastCoinIndex = window.gameLevelSlot[window.gameLevelSlot.length - 1].indexOf(1);
      if (lastCoinIndex!== -1) {
        // coin was in the previous slot
        if (lastCoinIndex < 3) {
          // coin was on the ground, place next coin in same element or on air
          coinIndex = lastCoinIndex;
          if (Math.random() < 0.5) {
            coinIndex += 3;
          }
        } else {
          // coin was in the air, place next coin in same element or on ground
          coinIndex = lastCoinIndex;
          if (Math.random() < 0.5) {
            coinIndex -= 3;
          }
        }
      } else {
        // no coin in previous slot, place coin only at 0 1 or 2
        coinIndex = Math.floor(Math.random() * 3);
      }
    } else {
      // first slot, place coin only at 0 1 or 2
      coinIndex = Math.floor(Math.random() * 3);
    }
    newSlot[coinIndex] = 1;
  }

}

if(slotType == 0)
{
  // check if last slot has a barrier, if so, skip barrier
  if (
    window.gameLevelSlot.length > 0 && (
      window.gameLevelSlot[window.gameLevelSlot.length - 1][0] === 2 ||
      window.gameLevelSlot[window.gameLevelSlot.length - 1][1] === 2 ||
      window.gameLevelSlot[window.gameLevelSlot.length - 1][2] === 2 ||
      window.gameLevelSlot[window.gameLevelSlot.length - 2][0] === 2 ||
      window.gameLevelSlot[window.gameLevelSlot.length - 2][1] === 2 ||
      window.gameLevelSlot[window.gameLevelSlot.length - 2][2] === 2)

  ) {
    // no barrier this time
  } else {
    // random possibility of barrier is 1 from 10
    if (Math.random() < 0.1) {
      // place barrier in one of the ground cells
      const barrierIndex = Math.floor(Math.random() * 3);
      newSlot[barrierIndex] = 2;

      // add coin over barrier with 50/50 probability
      if (Math.random() < 0.5) {
        newSlot[barrierIndex + 3] = 1;
      }
    }
  }

  // random possibility of coin is 1 from 3
  if (Math.random() < 0.33) {
    // place coin in one of the cells
    let coinIndex;
    if (window.gameLevelSlot.length > 0) {
      const lastCoinIndex = window.gameLevelSlot[window.gameLevelSlot.length - 1].indexOf(1);
      const lastBarrierIndex = window.gameLevelSlot[window.gameLevelSlot.length - 1].indexOf(2);
      if (lastCoinIndex!== -1) {
        // coin was in the previous slot
        if (lastCoinIndex < 3) {
          // coin was on the ground, place next coin in same element or over barrier
          if (lastBarrierIndex!== -1) {
            // barrier is present, place coin in same row on ground or air with 50/50 probability
            coinIndex = lastBarrierIndex + (Math.random() < 0.5? 0 : 3);
          } else {
            // no barrier, place coin in same element
            coinIndex = lastCoinIndex;
          }
        } else {
          // coin was in the air, place next coin on ground
          coinIndex = lastCoinIndex - 3;
        }
      } else if (lastBarrierIndex!== -1) {
        // no coin in previous slot, but barrier is present, place coin over barrier
        coinIndex = lastBarrierIndex + 3;
      } else {
        // no coin or barrier in previous slot, place coin only at 0 1 or 2
        coinIndex = Math.floor(Math.random() * 3);
      }
    } else {
      // first slot, place coin only at 0 1 or 2
      coinIndex = Math.floor(Math.random() * 3);
    }
    newSlot[coinIndex] = 1;
  }


}


// prise
if(slotType == 5)
{
 newSlot = [0, 0, 0, 0, 3, 0];
}

if(slotType == 6)
{
 newSlot = [0, 3, 0, 0, 0, 0];
}

if(slotType == 7)
{
 newSlot = [0, 0, 0, 0, 4, 0];
}

if(slotType == 8)
{
 newSlot = [0, 4, 0, 0, 0, 0];
}

if(slotType == 9)
{
 newSlot = [0, 0, 0, 0, 5, 0];
}

if(slotType == 10)
{
 newSlot = [0, 5, 0, 0, 0, 0];
}

if (newSlot[0] == 2 && newSlot[3] == 1) {newSlot = [20, 0, 0, 1, 0, 0];}
if (newSlot[1] == 2 && newSlot[4] == 1) {newSlot = [0, 20, 0, 0, 1, 0];}
if (newSlot[2] == 2 && newSlot[5] == 1) {newSlot = [0, 0, 20, 0, 0, 1];}

window.gameLevelSlot.push(newSlot);











}


function renderLine(id)
{
if (window.gameLevelSlot[id] !== undefined) {


  let currentSlot = window.gameLevelSlot[id];
//console.log(currentSlot);



  for (i=0; i<6; i++)
  {

  if(currentSlot[i] == 11 )
  {
  let currentCoinId = id;
  currentCoinId = (currentCoinId % 50);
  scene.getMeshByID('coin_' + i + '_' + currentCoinId).position.z = 45 - window.smallDelta;
  if(i < 3) scene.getMeshByID('coin_' + i + '_' + currentCoinId).position.y = window.appState['coinLineY_0'];
  if(i >= 3) scene.getMeshByID('coin_' + i + '_' + currentCoinId).position.y = window.appState['coinLineY_1'];

  scene.getMeshByID('coin_' + i + '_' + currentCoinId).collected = 0;

  }





  if(currentSlot[i] == 22 && i < 3)
  {
  let currentCoinId = id
  currentCoinId = (currentCoinId % 50);
  scene.getMeshByID('L1_Enemy2_' + i + '_' + currentCoinId).position.z = 45 - window.smallDelta;
  scene.getMeshByID('L1_Enemy2_' + i + '_' + currentCoinId).position.y = 0;
  }


  if(currentSlot[i] == 33 )
  {
//console.log(333);
  let currentCoinId = id;
  currentCoinId = (currentCoinId % 50);
  scene.getMeshByID('health_' + i + '_' + currentCoinId).position.z = 45 - window.smallDelta;
  if(i < 3) scene.getMeshByID('health_' + i + '_' + currentCoinId).position.y = window.appState['coinLineY_0'];
  if(i >= 3) scene.getMeshByID('health_' + i + '_' + currentCoinId).position.y = window.appState['coinLineY_1'];

  scene.getMeshByID('health_' + i + '_' + currentCoinId).collected = 0;

  }

  if(currentSlot[i] == 44 )
  {
//console.log(444);
  let currentCoinId = id;
  currentCoinId = (currentCoinId % 50);
  scene.getMeshByID('speed_' + i + '_' + currentCoinId).position.z = 45 - window.smallDelta;
  if(i < 3) scene.getMeshByID('speed_' + i + '_' + currentCoinId).position.y = window.appState['coinLineY_0'];
  if(i >= 3) scene.getMeshByID('speed_' + i + '_' + currentCoinId).position.y = window.appState['coinLineY_1'];

  scene.getMeshByID('speed_' + i + '_' + currentCoinId).collected = 0;

  }





  }




} else console.log(id + ' not exist' );

}



function gameOver()
{
console.log(window.appState['totalDistance']);
console.log(metersToKilometers(window.appState['totalDistance']) > 690);
if(metersToKilometers(window.appState['totalDistance']) > 690)
{
if (window.onPlayerDeath) window.onPlayerDeath();


scene.getNodeByID('bulletContainer').setEnabled(false);
  if(window.appUIState['soundPlay'] == true)
  {
window.sounds['bg'].stop();
window.sounds['run'].stop();
window.sounds['run'].stop();
}
//window.scene.getAnimationGroupByName("Run").stop();
window.scene.getAnimationGroupByName("A_Run_F").speedRatio = 0.0;
window.scene.getAnimationGroupByName("A_Run_L").speedRatio = 0.0;
window.scene.getAnimationGroupByName("A_Run_R").speedRatio = 0.0;
window.scene.getNodeByName("player").position.y = 0;

if(window.appState['playerFallDirection'] == 1)
{
scene.getAnimationGroupByName("A_Dead_B").goToFrame(0);
scene.getAnimationGroupByName("A_Dead_B").play();
scene.getAnimationGroupByName("A_Dead_B").speedRatio = 0.7;
scene.getAnimationGroupByName("A_Dead_B").loopAnimation = false;
}

if(window.appState['playerFallDirection'] == 2)
{
scene.getAnimationGroupByName("A_Dead_F").goToFrame(0);
scene.getAnimationGroupByName("A_Dead_F").play();
scene.getAnimationGroupByName("A_Dead_F").speedRatio = 0.9;
scene.getAnimationGroupByName("A_Dead_F").loopAnimation = false;
}


window.appState['playerFallAnimPlay'] = 1;
window.stateDeath = 1;

//document.getElementById('gameOverContainer').style.display='block';

//DISABLING ANIMATIONS
while (scene.activeCamera.animations.length > 0) {
   scene.activeCamera.animations.splice(0, 1);
}
// console.log(window.appState['playerFallDirection']);
if(window.appState['playerFallDirection'] != 0)
{
let positionAnimation = new BABYLON.Animation("cameraDeadAnimation", "position", 100, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
///
let positionKeys = [];
positionKeys.push({ frame: 0, value: scene.activeCamera.position.clone() });
if(window.appState['playerFallDirection'] == 1) positionKeys.push({ frame: 100, value: new BABYLON.Vector3(scene.activeCamera.position.x * 1.75, 2, scene.activeCamera.position.z - 0.5) });
if(window.appState['playerFallDirection'] == 2) positionKeys.push({ frame: 100, value: new BABYLON.Vector3(scene.activeCamera.position.x * 1.75, 2, scene.activeCamera.position.z + 2) });
positionAnimation.setKeys(positionKeys);
let easingFunctionPosition = new BABYLON.QuadraticEase();
easingFunctionPosition.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
positionAnimation.setEasingFunction(easingFunctionPosition);
scene.activeCamera.animations.push(positionAnimation);
scene.beginAnimation(scene.activeCamera, 0, 100, false);
//PARTICLES FX
window.particleSystem.emitter = scene.getNodeByName("player").position.clone();
window.particleSystem.start();
}

setTimeout(function(){


//openLevels(1);
appLevelEnd();


if(window.appUIState['soundPlay'] == true){
   window.sounds['menu'].stop();
   window.sounds['menu'].play();
}

//level1.disable();
//level2.disable();
//level3.disable();

}, 2000);


}
}


function metersToKilometers(meters) {
  return (meters / 1000).toFixed(2);
}

function lerp(value1, value2, mix) {
  return value1 + (value2 - value1) * mix;
}


function easeInOutQuad(t) {
  if (t < 0.5) {
    return 2 * t * t;
  } else {
    return 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
}






function gameLoopMoveCoins()
{

for(i=0;  i<50; i++)
{
  for(ii=0;  ii<3; ii++)
{
  if(scene.getMeshByID('coin_' + ii + '_' + i).position.z > window.appState['limitz'])
  {

//coun collected


scene.getMeshByID('coin_' + ii + '_' + i).position.z = scene.getMeshByID('coin_' + ii + '_' + i).position.z - (window.appState['timeDelta'] * window.gameSpeed);


if (
scene.getMeshByID('coin_' + ii + '_' + i).position.z > -0.3 &&
scene.getMeshByID('coin_' + ii + '_' + i).position.z < 0.3 &&
window.appState['playerJumpUndeadState'] == 0 &&
(Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('coin_' + ii + '_' + i).position.x) < 0.3)
)
{
if(scene.getMeshByID('coin_' + ii + '_' + i).collected == 0)
{
window.appState['coinBalance'] = window.appState['coinBalance'] + 1;

//play sound
if(window.appUIState['soundPlay'] == true)
{
window.sounds['coin'].play();
}



scene.getMeshByID('coin_' + ii + '_' + i).collected = 1;
window.appState['totalCoin'] = window.appState['coinBalance'] + window.appState['savedCoin'];
document.getElementById("coinsContainer").innerHTML =  window.appState['totalCoin'];
}

}



//  if (scene.getMeshByID('coin_' + ii + '_' + i).collected == 1) scene.getMeshByID('coin_' + ii + '_' + i).position.y = scene.getMeshByID('coin_' + ii + '_' + i).position.y + (window.appState['timeDelta'] * 0.01);
  if (scene.getMeshByID('coin_' + ii + '_' + i).collected == 1) scene.getMeshByID('coin_' + ii + '_' + i).position.y =   50;

}
}


for(ii=3;  ii<6; ii++)
{
  if(scene.getMeshByID('coin_' + ii + '_' + i).position.z > window.appState['limitz'])
  {

  scene.getMeshByID('coin_' + ii + '_' + i).position.z = scene.getMeshByID('coin_' + ii + '_' + i).position.z - (window.appState['timeDelta'] * window.gameSpeed);


  if (
  scene.getMeshByID('coin_' + ii + '_' + i).position.z > -0.3 &&
  scene.getMeshByID('coin_' + ii + '_' + i).position.z < 0.3 &&
  window.appState['playerJumpUndeadState'] == 1 &&
  (Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('coin_' + ii + '_' + i).position.x) < 0.3)
  )
  {
  if(scene.getMeshByID('coin_' + ii + '_' + i).collected == 0)
  {
    window.appState['coinBalance'] = window.appState['coinBalance'] + 1;
    //play sound
    if(window.appUIState['soundPlay'] == true)
    {
    window.sounds['coin'].play();
    }



  scene.getMeshByID('coin_' + ii + '_' + i).collected = 1;
//  document.getElementById("coinsContainer").innerHTML =  window.appState['coinBalance'];
window.appState['totalCoin'] = window.appState['coinBalance'] + window.appState['savedCoin'];
document.getElementById("coinsContainer").innerHTML =  window.appState['totalCoin'];


  }

  }



  //  if (scene.getMeshByID('coin_' + ii + '_' + i).collected == 1) scene.getMeshByID('coin_' + ii + '_' + i).position.y = scene.getMeshByID('coin_' + ii + '_' + i).position.y + (window.appState['timeDelta'] * 0.01);
    if (scene.getMeshByID('coin_' + ii + '_' + i).collected == 1) scene.getMeshByID('coin_' + ii + '_' + i).position.y  = 50;

}
}





}


}


function gameLoopMoveSuperCoinsHealth()
{

for(i=0;  i<50; i++)
{
  for(ii=0;  ii<3; ii++)
{
  if(scene.getMeshByID('health_' + ii + '_' + i).position.z > window.appState['limitz']){
//coun collected
scene.getMeshByID('health_' + ii + '_' + i).position.z = scene.getMeshByID('health_' + ii + '_' + i).position.z - (window.appState['timeDelta'] * window.gameSpeed);


if (
scene.getMeshByID('health_' + ii + '_' + i).position.z > -0.3 &&
scene.getMeshByID('health_' + ii + '_' + i).position.z < 0.3 &&
window.appState['playerJumpUndeadState'] == 0 &&
(Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('health_' + ii + '_' + i).position.x) < 0.3)
)
{
if(scene.getMeshByID('health_' + ii + '_' + i).collected == 0)
{
scene.getMeshByID('health_' + ii + '_' + i).collected = 1;

//play sound
if(window.appUIState['soundPlay'] == true)
{
window.sounds['coin'].play();
window.sounds['charge'].play();
}


if( window.appState['superMode2'] == 0) window.appState['superMode2TimeEnd'] = Date.now() + window.appState['superMode2TimeDuration'];
if( window.appState['superMode2'] == 1) window.appState['superMode2TimeEnd'] = window.appState['superMode2TimeEnd'] + window.appState['superMode2TimeDuration'];
window.appState['superMode2'] = 1;

//scene.getMaterialByID('material_4mat').emissiveColor = new BABYLON.Color3(0, 0.3, 0.3);
//scene.getMaterialByID('material_6mat').emissiveColor = new BABYLON.Color3(0, 0.3, 0.3);
}

}





  if (scene.getMeshByID('health_' + ii + '_' + i).collected == 1) scene.getMeshByID('health_' + ii + '_' + i).position.y = scene.getMeshByID('health_' + ii + '_' + i).position.y + (window.appState['timeDelta'] * 0.01);

}
}


for(ii=3;  ii<6; ii++)
{
    if(scene.getMeshByID('health_' + ii + '_' + i).position.z > window.appState['limitz']){
  scene.getMeshByID('health_' + ii + '_' + i).position.z = scene.getMeshByID('health_' + ii + '_' + i).position.z - (window.appState['timeDelta'] * window.gameSpeed);


  if (
  scene.getMeshByID('health_' + ii + '_' + i).position.z > -0.3 &&
  scene.getMeshByID('health_' + ii + '_' + i).position.z < 0.3 &&
  window.appState['playerJumpUndeadState'] == 1 &&
  (Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('health_' + ii + '_' + i).position.x) < 0.3)
  )
  {
  if(scene.getMeshByID('health_' + ii + '_' + i).collected == 0)
  {
    scene.getMeshByID('health_' + ii + '_' + i).collected = 1;

    //play sound
    if(window.appUIState['soundPlay'] == true)
    {
    window.sounds['coin'].play();
    window.sounds['charge'].play();
    }




    if( window.appState['superMode2'] == 0) window.appState['superMode2TimeEnd'] = Date.now() + window.appState['superMode2TimeDuration'];
    if( window.appState['superMode2'] == 1) window.appState['superMode2TimeEnd'] = window.appState['superMode2TimeEnd'] + window.appState['superMode2TimeDuration'];
    window.appState['superMode2'] = 1;


//scene.getMaterialByID('material_4mat').emissiveColor = new BABYLON.Color3(0, 0.3, 0.3);
//scene.getMaterialByID('material_6mat').emissiveColor = new BABYLON.Color3(0, 0.3, 0.3);


  }

  }



    if (scene.getMeshByID('health_' + ii + '_' + i).collected == 1) scene.getMeshByID('health_' + ii + '_' + i).position.y = scene.getMeshByID('health_' + ii + '_' + i).position.y + (window.appState['timeDelta'] * 0.01);

}
}





}


}

function gameLoopMoveSuperCoinsSpeed()
{

for(i=0;  i<50; i++)
{
  for(ii=0;  ii<3; ii++)
{
  if(scene.getMeshByID('speed_' + ii + '_' + i).position.z > window.appState['limitz'])
  {
//coun collected
scene.getMeshByID('speed_' + ii + '_' + i).position.z = scene.getMeshByID('speed_' + ii + '_' + i).position.z - (window.appState['timeDelta'] * window.gameSpeed);


if (
scene.getMeshByID('speed_' + ii + '_' + i).position.z > -0.3 &&
scene.getMeshByID('speed_' + ii + '_' + i).position.z < 0.3 &&
window.appState['playerJumpUndeadState'] == 0 &&
(Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('speed_' + ii + '_' + i).position.x) < 0.3)
)
{
if(scene.getMeshByID('speed_' + ii + '_' + i).collected == 0)
{
scene.getMeshByID('speed_' + ii + '_' + i).collected = 1;

if(window.appUIState['soundPlay'] == true)
{
window.sounds['coin'].play();
window.sounds['charge'].play();
}

if( window.appState['superMode1'] == 0) window.appState['superMode1TimeEnd'] = Date.now() + window.appState['superMode1TimeDuration'];
if( window.appState['superMode1'] == 1) window.appState['superMode1TimeEnd'] = window.appState['superMode1TimeEnd'] + window.appState['superMode1TimeDuration'];
window.gameSpeed = window.appState['maxSpeed'];
window.appState['superMode1'] = 1;
}

}



  if (scene.getMeshByID('speed_' + ii + '_' + i).collected == 1) scene.getMeshByID('speed_' + ii + '_' + i).position.y = scene.getMeshByID('speed_' + ii + '_' + i).position.y + (window.appState['timeDelta'] * 0.01);

}
}


for(ii=3;  ii<6; ii++)
{
  if(scene.getMeshByID('speed_' + ii + '_' + i).position.z > window.appState['limitz'])
  {
  scene.getMeshByID('speed_' + ii + '_' + i).position.z = scene.getMeshByID('speed_' + ii + '_' + i).position.z - (window.appState['timeDelta'] * window.gameSpeed);


  if (
  scene.getMeshByID('speed_' + ii + '_' + i).position.z > -0.3 &&
  scene.getMeshByID('speed_' + ii + '_' + i).position.z < 0.3 &&
window.appState['playerJumpUndeadState'] == 1 &&
  (Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('speed_' + ii + '_' + i).position.x) < 0.3)
  )
  {
  if(scene.getMeshByID('speed_' + ii + '_' + i).collected == 0)
  {
    {
    scene.getMeshByID('speed_' + ii + '_' + i).collected = 1;

    if(window.appUIState['soundPlay'] == true)
    {
    window.sounds['coin'].play();
    window.sounds['charge'].play();
    }


    if( window.appState['superMode1'] == 0) window.appState['superMode1TimeEnd'] = Date.now() + window.appState['superMode1TimeDuration'];
    if( window.appState['superMode1'] == 1) window.appState['superMode1TimeEnd'] = window.appState['superMode1TimeEnd'] + window.appState['superMode1TimeDuration'];

    window.appState['superMode1'] = 1;
    window.gameSpeed = window.appState['maxSpeed'];

    }

  }

  }



    if (scene.getMeshByID('speed_' + ii + '_' + i).collected == 1) scene.getMeshByID('speed_' + ii + '_' + i).position.y = scene.getMeshByID('speed_' + ii + '_' + i).position.y + (window.appState['timeDelta'] * 0.01);

}
}





}


}





function gameLoopMoveCoinsByID(currentI ,id, i)
{
let currentSlotTemp = (currentI % 50);
let currentSlotTemp2 = (window.currentSlot % 50);
  //if(i != 0)  scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.z =  currentSlotTemp - currentSlotTemp2 - window.smallDelta;
if(i != 0)  scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.z =  i - 5 - window.smallDelta;

if(i == 0)
{
scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.z =   - 10;
scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).collected = 0;
scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).magneted = 0;

if (id < 3)  scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_0'];
if (id >= 3) scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_1'];

if (id == 0 || id == 3)  scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.x = -2;
if (id == 1 || id == 4)  scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.x = 0;
if (id == 2 || id == 5)  scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.x = 2;


}


//MAGNETING

//COLLECTING
if (i <= 6 && i >= 4)
{
  if (

(
  scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).magneted == 0 &&
  scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.z > -0.6 &&
  scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.z < 0.6 &&
  ((window.appState['playerJumpUndeadState'] == 0 && id < 3) ||
    (window.appState['playerJumpUndeadState'] == 1 && id >= 3)) &&
  (Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('coin_' + id + '_' + currentSlotTemp).position.x) < 0.5)
) ||
(
scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).magneted == 1 &&
scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.z > -0.6 &&
scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.z < 0.6
)

  )
  {
  if(scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).collected == 0)
  {
  window.appState['coinBalance'] = window.appState['coinBalance'] + 1;
  scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).collected = 1;

  //document.getElementById("coinsContainer").innerHTML =  window.appState['coinBalance'];
  window.appState['totalCoin'] = window.appState['coinBalance'] + window.appState['savedCoin'];
  document.getElementById("coinsContainer").innerHTML =  window.appState['totalCoin'];

  //play sound
  if(window.appUIState['soundPlay'] == true)
  {
  window.sounds['coin'].play();
  }




  }




  }







}

//MAGNETING
//if (i > 5 && i < 6 + window.appState['superMode3Distance'] && window.appState['superMode3'] == 1 && scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).magneted == 0)
//{
//scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).magneted = 1;
//}

scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).magneted = 1;

//
if (scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).magneted == 1 && i>5 && i< 6 + window.appState['superMode3Distance'] && scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).collected == 0)
{
  let tempCoinX = 0;
  let tempCoinY = 0;

  if (id == 0 || id == 3)  tempCoinX = -2;
  if (id == 1 || id == 4)  tempCoinX = 0;
  if (id == 2 || id == 5)  tempCoinX = 2;

  if (id < 3)  tempCoinY = window.appState['coinLineY_0'];
  if (id >= 3) tempCoinY = window.appState['coinLineY_1'];

let mix = scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.z / window.appState['superMode3Distance'];
// count distance player or z
mix = Math.min(1, mix)

scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.x = lerp(scene.getNodeByName("player").position.x, tempCoinX, mix);
scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.y = lerp(scene.getNodeByName("player").position.y + window.appState['coinLineY_0'], tempCoinY, mix);

}


//if (scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).collected == 1) scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.y = scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.y + (window.appState['timeDelta'] * 0.02);
if (scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).collected == 1)
scene.getMeshByID('coin_' + id + '_' + currentSlotTemp).position.y = 50;

}




//MAGNET
function gameLoopMoveMagnetByID(currentI ,id, i)
{

let currentSlotTemp = (currentI % 50);
let currentSlotTemp2 = (window.currentSlot % 50);
  //if(i != 0)  scene.getMeshByID('magnet_' + id + '_' + currentSlotTemp).position.z =  currentSlotTemp - currentSlotTemp2 - window.smallDelta;
if(i != 0)  scene.getMeshByID('magnet_' + id + '_' + currentSlotTemp).position.z =  i - 5 - window.smallDelta;

if(i == 0)
{
scene.getMeshByID('magnet_' + id + '_' + currentSlotTemp).position.z =   - 10;
scene.getMeshByID('magnet_' + id + '_' + currentSlotTemp).collected = 0;
if (id < 3)  scene.getMeshByID('magnet_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_0'];
if (id >= 3) scene.getMeshByID('magnet_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_1'];

}


//COLLECTING
if (i <= 6 && i >= 4)
{
  if (
  scene.getMeshByID('magnet_' + id + '_' + currentSlotTemp).position.z > -0.6 &&
  scene.getMeshByID('magnet_' + id + '_' + currentSlotTemp).position.z < 0.6 &&
  ((window.appState['playerJumpUndeadState'] == 0 && id < 3) ||
    (window.appState['playerJumpUndeadState'] == 1 && id >= 3)) &&
  (Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('magnet_' + id + '_' + currentSlotTemp).position.x) < 0.5)
  )
  {
  if(scene.getMeshByID('magnet_' + id + '_' + currentSlotTemp).collected == 0)
  {
  scene.getMeshByID('magnet_' + id + '_' + currentSlotTemp).collected = 1;
  if( window.appState['superMode3'] == 0) window.appState['superMode3TimeEnd'] = Date.now() + window.appState['superMode3TimeDuration'];
  if( window.appState['superMode3'] == 1) window.appState['superMode3TimeEnd'] = window.appState['superMode3TimeEnd'] + window.appState['superMode3TimeDuration'];
  window.appState['superMode3'] = 1;

  //play sound
  if(window.appUIState['soundPlay'] == true)
  {
  window.sounds['coin'].play();
  }




  }




  }







}


if (scene.getMeshByID('magnet_' + id + '_' + currentSlotTemp).collected == 1) scene.getMeshByID('magnet_' + id + '_' + currentSlotTemp).position.y = scene.getMeshByID('magnet_' + id + '_' + currentSlotTemp).position.y + (window.appState['timeDelta'] * 0.02);


}

function gameL2LoopMoveMagnetByID(currentI ,id, i)
{

let currentSlotTemp = (currentI % 50);
let currentSlotTemp2 = (window.currentSlot % 50);
  //if(i != 0)  scene.getMeshByID('L2magnet_' + id + '_' + currentSlotTemp).position.z =  currentSlotTemp - currentSlotTemp2 - window.smallDelta;
if(i != 0)  scene.getMeshByID('L2magnet_' + id + '_' + currentSlotTemp).position.z =  i - 5 - window.smallDelta;

if(i == 0)
{
scene.getMeshByID('L2magnet_' + id + '_' + currentSlotTemp).position.z =   - 10;
scene.getMeshByID('L2magnet_' + id + '_' + currentSlotTemp).collected = 0;
if (id < 3)  scene.getMeshByID('L2magnet_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_0'];
if (id >= 3) scene.getMeshByID('L2magnet_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_1'];

}


//COLLECTING
if (i <= 6 && i >= 4)
{
  if (
  scene.getMeshByID('L2magnet_' + id + '_' + currentSlotTemp).position.z > -0.6 &&
  scene.getMeshByID('L2magnet_' + id + '_' + currentSlotTemp).position.z < 0.6 &&
  ((window.appState['playerJumpUndeadState'] == 0 && id < 3) ||
    (window.appState['playerJumpUndeadState'] == 1 && id >= 3)) &&
  (Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('L2magnet_' + id + '_' + currentSlotTemp).position.x) < 0.5)
  )
  {
  if(scene.getMeshByID('L2magnet_' + id + '_' + currentSlotTemp).collected == 0)
  {
  scene.getMeshByID('L2magnet_' + id + '_' + currentSlotTemp).collected = 1;
  if( window.appState['superMode3'] == 0) window.appState['superMode3TimeEnd'] = Date.now() + window.appState['superMode3TimeDuration'];
  if( window.appState['superMode3'] == 1) window.appState['superMode3TimeEnd'] = window.appState['superMode3TimeEnd'] + window.appState['superMode3TimeDuration'];
  window.appState['superMode3'] = 1;

  //play sound
  if(window.appUIState['soundPlay'] == true)
  {
  window.sounds['coin'].play();
  }




  }




  }







}


if (scene.getMeshByID('L2magnet_' + id + '_' + currentSlotTemp).collected == 1) scene.getMeshByID('L2magnet_' + id + '_' + currentSlotTemp).position.y = scene.getMeshByID('L2magnet_' + id + '_' + currentSlotTemp).position.y + (window.appState['timeDelta'] * 0.02);


}

function gameL3LoopMoveMagnetByID(currentI ,id, i)
{

let currentSlotTemp = (currentI % 50);
let currentSlotTemp2 = (window.currentSlot % 50);
  //if(i != 0)  scene.getMeshByID('L3magnet_' + id + '_' + currentSlotTemp).position.z =  currentSlotTemp - currentSlotTemp2 - window.smallDelta;
if(i != 0)  scene.getMeshByID('L3magnet_' + id + '_' + currentSlotTemp).position.z =  i - 5 - window.smallDelta;

if(i == 0)
{
scene.getMeshByID('L3magnet_' + id + '_' + currentSlotTemp).position.z =   - 10;
scene.getMeshByID('L3magnet_' + id + '_' + currentSlotTemp).collected = 0;
if (id < 3)  scene.getMeshByID('L3magnet_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_0'];
if (id >= 3) scene.getMeshByID('L3magnet_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_1'];

}


//COLLECTING
if (i <= 6 && i >= 4)
{
  if (
  scene.getMeshByID('L3magnet_' + id + '_' + currentSlotTemp).position.z > -0.6 &&
  scene.getMeshByID('L3magnet_' + id + '_' + currentSlotTemp).position.z < 0.6 &&
  ((window.appState['playerJumpUndeadState'] == 0 && id < 3) ||
    (window.appState['playerJumpUndeadState'] == 1 && id >= 3)) &&
  (Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('L3magnet_' + id + '_' + currentSlotTemp).position.x) < 0.5)
  )
  {
  if(scene.getMeshByID('L3magnet_' + id + '_' + currentSlotTemp).collected == 0)
  {
  scene.getMeshByID('L3magnet_' + id + '_' + currentSlotTemp).collected = 1;
  if( window.appState['superMode3'] == 0) window.appState['superMode3TimeEnd'] = Date.now() + window.appState['superMode3TimeDuration'];
  if( window.appState['superMode3'] == 1) window.appState['superMode3TimeEnd'] = window.appState['superMode3TimeEnd'] + window.appState['superMode3TimeDuration'];
  window.appState['superMode3'] = 1;

  //play sound
  if(window.appUIState['soundPlay'] == true)
  {
  window.sounds['coin'].play();
  }




  }




  }







}


if (scene.getMeshByID('L3magnet_' + id + '_' + currentSlotTemp).collected == 1) scene.getMeshByID('L3magnet_' + id + '_' + currentSlotTemp).position.y = scene.getMeshByID('L3magnet_' + id + '_' + currentSlotTemp).position.y + (window.appState['timeDelta'] * 0.02);


}










//HEALTH
function gameLoopMoveSuperCoinsHealthByID(currentI ,id, i)
{

  let currentSlotTemp = (currentI % 50);
  let currentSlotTemp2 = (window.currentSlot % 50);
    //if(i != 0)  scene.getMeshByID('health_' + id + '_' + currentSlotTemp).position.z =  currentSlotTemp - currentSlotTemp2 - window.smallDelta;
  if(i != 0)  scene.getMeshByID('health_' + id + '_' + currentSlotTemp).position.z =  i - 5 - window.smallDelta;

  if(i == 0)
  {
  scene.getMeshByID('health_' + id + '_' + currentSlotTemp).position.z =   - 10;
  scene.getMeshByID('health_' + id + '_' + currentSlotTemp).collected = 0;
  if (id < 3)  scene.getMeshByID('health_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_0'];
  if (id >= 3) scene.getMeshByID('health_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_1'];

  }


  //COLLECTING
  if (i <= 6 && i >= 4)
  {
    if (
    scene.getMeshByID('health_' + id + '_' + currentSlotTemp).position.z > -0.6 &&
    scene.getMeshByID('health_' + id + '_' + currentSlotTemp).position.z < 0.6 &&
    ((window.appState['playerJumpUndeadState'] == 0 && id < 3) ||
      (window.appState['playerJumpUndeadState'] == 1 && id >= 3)) &&
    (Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('health_' + id + '_' + currentSlotTemp).position.x) < 0.5)
    )
    {
    if(scene.getMeshByID('health_' + id + '_' + currentSlotTemp).collected == 0)
    {
      scene.getMeshByID('health_' + id + '_' + currentSlotTemp).collected = 1;

      //play sound
      if(window.appUIState['soundPlay'] == true)
      {
      window.sounds['coin'].play();
      window.sounds['charge'].play();
      }


      if( window.appState['superMode2'] == 0) window.appState['superMode2TimeEnd'] = Date.now() + window.appState['superMode2TimeDuration'];
      if( window.appState['superMode2'] == 1) window.appState['superMode2TimeEnd'] = window.appState['superMode2TimeEnd'] + window.appState['superMode2TimeDuration'];
      window.appState['superMode2'] = 1;
window.scene.getMeshByID('orbFX').setEnabled(true);
window.scene.getMeshByID('orbFX2').setEnabled(true);



    //  scene.getMaterialByID('material_4mat').emissiveColor = new BABYLON.Color3(0, 0.3, 0.3);
    //  scene.getMaterialByID('material_6mat').emissiveColor = new BABYLON.Color3(0, 0.3, 0.3);




    }




    }

    }


    if (scene.getMeshByID('health_' + id + '_' + currentSlotTemp).collected == 1) scene.getMeshByID('health_' + id + '_' + currentSlotTemp).position.y = scene.getMeshByID('health_' + id + '_' + currentSlotTemp).position.y + (window.appState['timeDelta'] * 0.02);


}

function gameL2LoopMoveSuperCoinsHealthByID(currentI ,id, i)
{

  let currentSlotTemp = (currentI % 50);
  let currentSlotTemp2 = (window.currentSlot % 50);
    //if(i != 0)  scene.getMeshByID('L2health_' + id + '_' + currentSlotTemp).position.z =  currentSlotTemp - currentSlotTemp2 - window.smallDelta;
  if(i != 0)  scene.getMeshByID('L2health_' + id + '_' + currentSlotTemp).position.z =  i - 5 - window.smallDelta;

  if(i == 0)
  {
  scene.getMeshByID('L2health_' + id + '_' + currentSlotTemp).position.z =   - 10;
  scene.getMeshByID('L2health_' + id + '_' + currentSlotTemp).collected = 0;
  if (id < 3)  scene.getMeshByID('L2health_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_0'];
  if (id >= 3) scene.getMeshByID('L2health_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_1'];

  }


  //COLLECTING
  if (i <= 6 && i >= 4)
  {
    if (
    scene.getMeshByID('L2health_' + id + '_' + currentSlotTemp).position.z > -0.6 &&
    scene.getMeshByID('L2health_' + id + '_' + currentSlotTemp).position.z < 0.6 &&
    ((window.appState['playerJumpUndeadState'] == 0 && id < 3) ||
      (window.appState['playerJumpUndeadState'] == 1 && id >= 3)) &&
    (Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('L2health_' + id + '_' + currentSlotTemp).position.x) < 0.5)
    )
    {
    if(scene.getMeshByID('L2health_' + id + '_' + currentSlotTemp).collected == 0)
    {
      scene.getMeshByID('L2health_' + id + '_' + currentSlotTemp).collected = 1;

      //play sound
      if(window.appUIState['soundPlay'] == true)
      {
      window.sounds['coin'].play();
      window.sounds['charge'].play();
      }


      if( window.appState['superMode2'] == 0) window.appState['superMode2TimeEnd'] = Date.now() + window.appState['superMode2TimeDuration'];
      if( window.appState['superMode2'] == 1) window.appState['superMode2TimeEnd'] = window.appState['superMode2TimeEnd'] + window.appState['superMode2TimeDuration'];
      window.appState['superMode2'] = 1;

    //  scene.getMaterialByID('material_4mat').emissiveColor = new BABYLON.Color3(0, 0.3, 0.3);
    //  scene.getMaterialByID('material_6mat').emissiveColor = new BABYLON.Color3(0, 0.3, 0.3);




    }




    }

    }


    if (scene.getMeshByID('L2health_' + id + '_' + currentSlotTemp).collected == 1) scene.getMeshByID('L2health_' + id + '_' + currentSlotTemp).position.y = scene.getMeshByID('L2health_' + id + '_' + currentSlotTemp).position.y + (window.appState['timeDelta'] * 0.02);


}

function gameL3LoopMoveSuperCoinsHealthByID(currentI ,id, i)
{

  let currentSlotTemp = (currentI % 50);
  let currentSlotTemp2 = (window.currentSlot % 50);
    //if(i != 0)  scene.getMeshByID('L3health_' + id + '_' + currentSlotTemp).position.z =  currentSlotTemp - currentSlotTemp2 - window.smallDelta;
  if(i != 0)  scene.getMeshByID('L3health_' + id + '_' + currentSlotTemp).position.z =  i - 5 - window.smallDelta;

  if(i == 0)
  {
  scene.getMeshByID('L3health_' + id + '_' + currentSlotTemp).position.z =   - 10;
  scene.getMeshByID('L3health_' + id + '_' + currentSlotTemp).collected = 0;
  if (id < 3)  scene.getMeshByID('L3health_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_0'];
  if (id >= 3) scene.getMeshByID('L3health_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_1'];

  }


  //COLLECTING
  if (i <= 6 && i >= 4)
  {
    if (
    scene.getMeshByID('L3health_' + id + '_' + currentSlotTemp).position.z > -0.6 &&
    scene.getMeshByID('L3health_' + id + '_' + currentSlotTemp).position.z < 0.6 &&
    ((window.appState['playerJumpUndeadState'] == 0 && id < 3) ||
      (window.appState['playerJumpUndeadState'] == 1 && id >= 3)) &&
    (Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('L3health_' + id + '_' + currentSlotTemp).position.x) < 0.5)
    )
    {
    if(scene.getMeshByID('L3health_' + id + '_' + currentSlotTemp).collected == 0)
    {
      scene.getMeshByID('L3health_' + id + '_' + currentSlotTemp).collected = 1;

      //play sound
      if(window.appUIState['soundPlay'] == true)
      {
      window.sounds['coin'].play();
      window.sounds['charge'].play();
      }


      if( window.appState['superMode2'] == 0) window.appState['superMode2TimeEnd'] = Date.now() + window.appState['superMode2TimeDuration'];
      if( window.appState['superMode2'] == 1) window.appState['superMode2TimeEnd'] = window.appState['superMode2TimeEnd'] + window.appState['superMode2TimeDuration'];
      window.appState['superMode2'] = 1;

    //  scene.getMaterialByID('material_4mat').emissiveColor = new BABYLON.Color3(0, 0.3, 0.3);
    //  scene.getMaterialByID('material_6mat').emissiveColor = new BABYLON.Color3(0, 0.3, 0.3);




    }




    }

    }


    if (scene.getMeshByID('L3health_' + id + '_' + currentSlotTemp).collected == 1) scene.getMeshByID('L3health_' + id + '_' + currentSlotTemp).position.y = scene.getMeshByID('L3health_' + id + '_' + currentSlotTemp).position.y + (window.appState['timeDelta'] * 0.02);


}

//SPEED
//L1
function gameLoopMoveSuperCoinsSpeedByID(currentI ,id, i)
{

  let currentSlotTemp = (currentI % 50);
  let currentSlotTemp2 = (window.currentSlot % 50);
    //if(i != 0)  scene.getMeshByID('speed_' + id + '_' + currentSlotTemp).position.z =  currentSlotTemp - currentSlotTemp2 - window.smallDelta;
  if(i != 0)  scene.getMeshByID('speed_' + id + '_' + currentSlotTemp).position.z =  i - 5 - window.smallDelta;

  if(i == 0)
  {
  scene.getMeshByID('speed_' + id + '_' + currentSlotTemp).position.z =   - 10;
  scene.getMeshByID('speed_' + id + '_' + currentSlotTemp).collected = 0;
  if (id < 3)  scene.getMeshByID('speed_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_0'];
  if (id >= 3) scene.getMeshByID('speed_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_1'];

  }


  //COLLECTING
  if (i <= 6 && i >= 4)
  {
    if (
    scene.getMeshByID('speed_' + id + '_' + currentSlotTemp).position.z > -0.6 &&
    scene.getMeshByID('speed_' + id + '_' + currentSlotTemp).position.z < 0.6 &&
    ((window.appState['playerJumpUndeadState'] == 0 && id < 3) ||
      (window.appState['playerJumpUndeadState'] == 1 && id >= 3)) &&
    (Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('speed_' + id + '_' + currentSlotTemp).position.x) < 0.5)
    )
    {
    if(scene.getMeshByID('speed_' + id + '_' + currentSlotTemp).collected == 0)
    {
      scene.getMeshByID('speed_' + id + '_' + currentSlotTemp).collected = 1;

      //play sound
      if(window.appUIState['soundPlay'] == true)
      {
      window.sounds['coin'].play();
      window.sounds['charge'].play();
      }


      if( window.appState['superMode1'] == 0) window.appState['superMode1TimeEnd'] = Date.now() + window.appState['superMode1TimeDuration'];
      if( window.appState['superMode1'] == 1) window.appState['superMode1TimeEnd'] = window.appState['superMode1TimeEnd'] + window.appState['superMode1TimeDuration'];
      window.appState['superMode1'] = 1;
      window.gameSpeed = window.appState['maxSpeed'];



    }




    }

    }


    if (scene.getMeshByID('speed_' + id + '_' + currentSlotTemp).collected == 1) scene.getMeshByID('speed_' + id + '_' + currentSlotTemp).position.y = scene.getMeshByID('speed_' + id + '_' + currentSlotTemp).position.y + (window.appState['timeDelta'] * 0.02);


}

//L2
function gameL2LoopMoveSuperCoinsSpeedByID(currentI ,id, i)
{

  let currentSlotTemp = (currentI % 50);
  let currentSlotTemp2 = (window.currentSlot % 50);
    //if(i != 0)  scene.getMeshByID('L2speed_' + id + '_' + currentSlotTemp).position.z =  currentSlotTemp - currentSlotTemp2 - window.smallDelta;
  if(i != 0)  scene.getMeshByID('L2speed_' + id + '_' + currentSlotTemp).position.z =  i - 5 - window.smallDelta;

  if(i == 0)
  {
  scene.getMeshByID('L2speed_' + id + '_' + currentSlotTemp).position.z =   - 10;
  scene.getMeshByID('L2speed_' + id + '_' + currentSlotTemp).collected = 0;
  if (id < 3)  scene.getMeshByID('L2speed_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_0'];
  if (id >= 3) scene.getMeshByID('L2speed_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_1'];

  }


  //COLLECTING
  if (i <= 6 && i >= 4)
  {
    if (
    scene.getMeshByID('L2speed_' + id + '_' + currentSlotTemp).position.z > -0.6 &&
    scene.getMeshByID('L2speed_' + id + '_' + currentSlotTemp).position.z < 0.6 &&
    ((window.appState['playerJumpUndeadState'] == 0 && id < 3) ||
      (window.appState['playerJumpUndeadState'] == 1 && id >= 3)) &&
    (Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('speed_' + id + '_' + currentSlotTemp).position.x) < 0.5)
    )
    {
    if(scene.getMeshByID('L2speed_' + id + '_' + currentSlotTemp).collected == 0)
    {
      scene.getMeshByID('L2speed_' + id + '_' + currentSlotTemp).collected = 1;

      //play sound
      if(window.appUIState['soundPlay'] == true)
      {
      window.sounds['coin'].play();
      window.sounds['charge'].play();
      }


      if( window.appState['superMode1'] == 0) window.appState['superMode1TimeEnd'] = Date.now() + window.appState['superMode1TimeDuration'];
      if( window.appState['superMode1'] == 1) window.appState['superMode1TimeEnd'] = window.appState['superMode1TimeEnd'] + window.appState['superMode1TimeDuration'];
      window.appState['superMode1'] = 1;
      window.gameSpeed = window.appState['maxSpeed'];



    }




    }

    }


    if (scene.getMeshByID('L2speed_' + id + '_' + currentSlotTemp).collected == 1) scene.getMeshByID('L2speed_' + id + '_' + currentSlotTemp).position.y = scene.getMeshByID('L2speed_' + id + '_' + currentSlotTemp).position.y + (window.appState['timeDelta'] * 0.02);


}

//L3
function gameL3LoopMoveSuperCoinsSpeedByID(currentI ,id, i)
{

  let currentSlotTemp = (currentI % 50);
  let currentSlotTemp2 = (window.currentSlot % 50);
    //if(i != 0)  scene.getMeshByID('L3speed_' + id + '_' + currentSlotTemp).position.z =  currentSlotTemp - currentSlotTemp2 - window.smallDelta;
  if(i != 0)  scene.getMeshByID('L3speed_' + id + '_' + currentSlotTemp).position.z =  i - 5 - window.smallDelta;

  if(i == 0)
  {
  scene.getMeshByID('L3speed_' + id + '_' + currentSlotTemp).position.z =   - 10;
  scene.getMeshByID('L3speed_' + id + '_' + currentSlotTemp).collected = 0;
  if (id < 3)  scene.getMeshByID('L3speed_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_0'];
  if (id >= 3) scene.getMeshByID('L3speed_' + id + '_' + currentSlotTemp).position.y = window.appState['coinLineY_1'];

  }


  //COLLECTING
  if (i <= 6 && i >= 4)
  {
    if (
    scene.getMeshByID('L3speed_' + id + '_' + currentSlotTemp).position.z > -0.6 &&
    scene.getMeshByID('L3speed_' + id + '_' + currentSlotTemp).position.z < 0.6 &&
    ((window.appState['playerJumpUndeadState'] == 0 && id < 3) ||
      (window.appState['playerJumpUndeadState'] == 1 && id >= 3)) &&
    (Math.abs(scene.getNodeByName("player").position.x - scene.getNodeByName('speed_' + id + '_' + currentSlotTemp).position.x) < 0.5)
    )
    {
    if(scene.getMeshByID('L3speed_' + id + '_' + currentSlotTemp).collected == 0)
    {
      scene.getMeshByID('L3speed_' + id + '_' + currentSlotTemp).collected = 1;

      //play sound
      if(window.appUIState['soundPlay'] == true)
      {
      window.sounds['coin'].play();
      window.sounds['charge'].play();
      }


      if( window.appState['superMode1'] == 0) window.appState['superMode1TimeEnd'] = Date.now() + window.appState['superMode1TimeDuration'];
      if( window.appState['superMode1'] == 1) window.appState['superMode1TimeEnd'] = window.appState['superMode1TimeEnd'] + window.appState['superMode1TimeDuration'];
      window.appState['superMode1'] = 1;
      window.gameSpeed = window.appState['maxSpeed'];



    }




    }

    }


    if (scene.getMeshByID('L3speed_' + id + '_' + currentSlotTemp).collected == 1) scene.getMeshByID('L3speed_' + id + '_' + currentSlotTemp).position.y = scene.getMeshByID('L3speed_' + id + '_' + currentSlotTemp).position.y + (window.appState['timeDelta'] * 0.02);


}

// hot location change
function changeLocation() {
  let currentLevel = window.appState['currentLevel'];
  let possibleLevels = [1, 2, 3].filter(level => level !== currentLevel);
  let randomIndex = Math.floor(Math.random() * possibleLevels.length);
  window.appState['currentLevel'] = possibleLevels[randomIndex];
  console.log('Level changed to ' + window.appState['currentLevel']);

if(window.appState['currentLevel'] == 1)
{
scene.getNodeByID('level1_container').setEnabled(true);
scene.getMeshByID('level1Background').setEnabled(true);

scene.getNodeByID('level2_container').setEnabled(false);
scene.getNodeByID('level3_container').setEnabled(false);


scene.getMeshByID('SKM_B_01_Bureaucrat').setEnabled(true);
scene.getMeshByID('SKM_B_03_Policeman').setEnabled(false);
scene.getMeshByID('SKM_B_02_Hacker').setEnabled(false);
}

if(window.appState['currentLevel'] == 1)
{
scene.getNodeByID('level1_container').setEnabled(true);
scene.getMeshByID('level1Background').setEnabled(true);

scene.getNodeByID('level2_container').setEnabled(false);
scene.getNodeByID('level3_container').setEnabled(false);


scene.getMeshByID('SKM_B_01_Bureaucrat').setEnabled(true);
scene.getMeshByID('SKM_B_02_Hacker').setEnabled(false);
scene.getMeshByID('SKM_B_03_Policeman').setEnabled(false);


scene.clearColor = new BABYLON.Color3.FromHexString('#e1ac96');
scene.fogColor = new BABYLON.Color3.FromHexString('#e1ac96');


}


if(window.appState['currentLevel'] == 2)
{
scene.getNodeByID('level1_container').setEnabled(false);
scene.getMeshByID('level1Background').setEnabled(false);

scene.getNodeByID('level2_container').setEnabled(true);
scene.getNodeByID('level3_container').setEnabled(false);



scene.getMeshByID('SKM_B_01_Bureaucrat').setEnabled(false);
scene.getMeshByID('SKM_B_02_Hacker').setEnabled(true);
scene.getMeshByID('SKM_B_03_Policeman').setEnabled(false);

scene.clearColor = new BABYLON.Color3.FromHexString('#fffcfa');
scene.fogColor = new BABYLON.Color3.FromHexString('#fffcfa');

}


if(window.appState['currentLevel'] == 3)
{
scene.getNodeByID('level1_container').setEnabled(false);
scene.getMeshByID('level1Background').setEnabled(false);

scene.getNodeByID('level2_container').setEnabled(false);
scene.getNodeByID('level3_container').setEnabled(true);



scene.getMeshByID('SKM_B_01_Bureaucrat').setEnabled(false);
scene.getMeshByID('SKM_B_02_Hacker').setEnabled(false);
scene.getMeshByID('SKM_B_03_Policeman').setEnabled(true);

scene.clearColor = new BABYLON.Color3.FromHexString('#552200');
scene.fogColor = new BABYLON.Color3.FromHexString('#552200');

}




// BOS CHANGES


scene.getAnimationGroupByName("A_Run_F_Boss1").speed = 0.00000001;
scene.getAnimationGroupByName("A_Run_F_Boss").speed = 0.00000001;
scene.getAnimationGroupByName("A_Attack_Boss1").speed = 0.00000001;
scene.getAnimationGroupByName("A_Attack_Boss").speed = 0.00000001;

scene.getAnimationGroupByName("A_Attack_Boss").loopAnimation = false;

console.log('bos init level ' + window.appState['currentLevel'])

if(window.appState['currentLevel'] == 1)
{
  scene.getAnimationGroupByName("A_Run_F_Boss1").play();
  scene.getAnimationGroupByName("A_Attack_Boss1").play();

  scene.getAnimationGroupByName("A_Run_F_Boss").stop();
  scene.getAnimationGroupByName("A_Attack_Boss").stop();
}
else
{
scene.getAnimationGroupByName("A_Run_F_Boss1").stop();
scene.getAnimationGroupByName("A_Attack_Boss1").stop();

scene.getAnimationGroupByName("A_Run_F_Boss").play();
scene.getAnimationGroupByName("A_Attack_Boss").play();
}

//DISABLE
scene.getAnimationGroupByName("A_Run_L_Boss").stop();
scene.getAnimationGroupByName("A_Run_R_Boss").stop();
scene.getAnimationGroupByName("A_Run_L_Boss1").stop();
scene.getAnimationGroupByName("A_Run_R_Boss1").stop();
scene.getAnimationGroupByName("T_Pose_Boss").stop();
scene.getAnimationGroupByName("A_Run_L_Boss").weight = 0;
scene.getAnimationGroupByName("A_Run_R_Boss").weight = 0;
scene.getAnimationGroupByName("A_Run_L_Boss1").weight = 0;
scene.getAnimationGroupByName("A_Run_R_Boss1").weight = 0;
scene.getAnimationGroupByName("T_Pose_Boss").weight = 0;


//window.scene.getMeshByID('paper0').setParent(bulletContainer);
//window.scene.getMeshByID('SM_Gun_CD_Low').setParent(bulletContainer);
//window.scene.getMeshByID('SM_Gun_Stick_Low').setParent(bulletContainer);

if(window.appState['currentLevel'] == 1) {
  window.scene.getMeshByID('paper0').setEnabled(true);
  window.scene.getMeshByID('SM_Gun_Stick_Low').setEnabled(false);
  window.scene.getMeshByID('SM_Gun_CD_Low').setEnabled(false);

  scene.getAnimationGroupByName("A_Run_F_Boss1").weight = 1;
  scene.getAnimationGroupByName("A_Run_F_Boss").weight = 0;

  scene.getAnimationGroupByName("A_Attack_Boss1").weight = 0;
  scene.getAnimationGroupByName("A_Attack_Boss").weight = 0;

}

if(window.appState['currentLevel'] == 2) {
  window.scene.getMeshByID('paper0').setEnabled(false);
  window.scene.getMeshByID('SM_Gun_CD_Low').setEnabled(true);
  window.scene.getMeshByID('SM_Gun_Stick_Low').setEnabled(false);
  scene.getAnimationGroupByName("A_Run_F_Boss1").weight = 0;
  scene.getAnimationGroupByName("A_Run_F_Boss").weight = 1;

  scene.getAnimationGroupByName("A_Attack_Boss1").weight = 0;
  scene.getAnimationGroupByName("A_Attack_Boss").weight = 0;

}

if(window.appState['currentLevel'] == 3) {
  window.scene.getMeshByID('paper0').setEnabled(false);
  window.scene.getMeshByID('SM_Gun_CD_Low').setEnabled(false);
  window.scene.getMeshByID('SM_Gun_Stick_Low').setEnabled(true);

  scene.getAnimationGroupByName("A_Run_F_Boss1").weight = 0;
  scene.getAnimationGroupByName("A_Run_F_Boss").weight = 1;

  scene.getAnimationGroupByName("A_Attack_Boss1").weight = 0;
  scene.getAnimationGroupByName("A_Attack_Boss").weight = 0;

}





window.appState['currentRandomLevel'] = window.appState['currentLevel'];


// GARBAGE COLLECTOR


 window.gameLevelSlot = window.gameLevelSlot.filter((element, index) => {
   return index <= window.currentSlot + 50;
 }).slice(0);

 // window.gameLevelSlot = window.gameLevelSlot.filter((element, index) => {
 //   return (index <= window.currentSlot + 50 && index >= window.currentSlot - 5);
 // }).slice(0);
 //
 //
 // for(let it=0; it<18; it++)
 // {
 // window.gameLevelSlot.push([0, 0, 0, 0, 0, 0]);
 // }



}
