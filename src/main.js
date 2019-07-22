import { createNewCarousel } from "./carousel";
import $ from "jQuery";

$(".document").ready(() => {

  createNewCarousel({
    moveAmount: 500,
    childClassName: "sub-block",
    numberOfIndicators: 0
  });
});





let X_position;
let Y_position;

//touchstart, touchmove, touchend, touchcancel



function handleTouchMove(e) {
//   X_position = e.targetTouches[0].screenX;
//   Y_position = e.targetTouches[0].screenY;
  //console.log(`X: ${X_position}, Y: ${Y_position}`)
}


