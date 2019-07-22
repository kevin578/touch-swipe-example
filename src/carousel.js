import $ from "jquery";

export function createNewCarousel({
    moveAmount,
    childClassName,
    animationTime,
    lowerMovementBound,
    upperMovementBound,
    numberOfIndicators,
    indicatorDiameter,
    indicatorPosition,
    indicatorBackground,
    activeIndicatorBackground,
    indicatorMarginTop,
    indicatorMarginBottom
  }) {
    //for testing purposes only. remove when touch events are working
  
    let currentPosition = 0;
    let currentOffset = 0;
    const parentDiv = $(`.${childClassName}`).parent();
  
  
    //defaults
    if (!animationTime) animationTime = "1s";
    if (!indicatorDiameter) indicatorDiameter = "20px";
    if (!indicatorPosition) indicatorPosition = "top";
    if (!indicatorBackground) indicatorBackground = "#e0e0e0";
    if (!activeIndicatorBackground) activeIndicatorBackground = "#00A7DF";
    if (!indicatorMarginTop) indicatorMarginTop = "0px";
    if (!indicatorMarginBottom) indicatorMarginBottom = "40px"
    if (!upperMovementBound) upperMovementBound = 2;
    if (!lowerMovementBound) lowerMovementBound = 0

    initializeCSS();
    intializeIndicators();
    initializeTouch();

    function initializeTouch() {
      //$(parentDiv).on("touchmove", handleTouchMove);
      $(parentDiv).on("touchstart", handleTouchStart);
      $(parentDiv).on('touchend', handleTouchEnd);

      let X_position_start;
      let Y_position_start;

      function handleTouchStart(e) {
        X_position_start = e.targetTouches[0].screenX;
        Y_position_start = e.targetTouches[0].screenY;
      } 

      function handleTouchMove(e) {
        const X_diff =  e.targetTouches[0].screenX - X_position_start;
        $(`.${childClassName}`).css("transform", `translateX(${X_diff * 2}px)`);
      }

      function handleTouchEnd(e) {
        console.log(e)
        let X_position_end = e.changedTouches[0].screenX; 
        let Y_position_end = e.changedTouches[0].screenY; 
    
        const X_diff = X_position_start - X_position_end;
        const Y_diff = Y_position_start - Y_position_end; 

        if (X_diff > 80 && Math.abs(Y_diff) < 60) {
            move('right')
        }
        else if (X_diff < 80 && Math.abs(Y_diff) < 60) {
            move('left')
        }
    }

    }

    function initializeCSS() {
      $(parentDiv).css("overflow", "hidden");
      $(`.${childClassName}`).css("flex", "1 0 auto");
    }
  
    function intializeIndicators() {
      if (numberOfIndicators === 0) return;
      const parentDiv = $(`.${childClassName}`).parent();
      if (indicatorPosition == "top") {
        $(parentDiv).before(`<div class = "${childClassName}__indicators"></div>`);
      }
      else {
        $(parentDiv).after(`<div class = "${childClassName}__indicators"></div>`);
      }
  
      $(`.${childClassName}__indicators`).append(
        `<div class = "${childClassName}__indicator ${childClassName}__indicator0 ${childClassName}__indicator--active"></div>`
      );
      for (let i = 1; i < numberOfIndicators; i++) {
        $(`.${childClassName}__indicators`).append(`<div class = "${childClassName}__indicator ${childClassName}__indicator${i}"></div>`);
      }
      $(`.${childClassName}__indicators`).css({
        display: "flex",
        "justify-content": "center",
        width: "100%",
        "margin-top": indicatorMarginTop,
        "margin-bottom": indicatorMarginBottom
      });
      $(`.${childClassName}__indicator`).css({
        width: indicatorDiameter,
        height: indicatorDiameter,
        background: indicatorBackground,
        "border-radius": "30px",
        margin: "10px",
        transition: animationTime
      });
      $(`.${childClassName}__indicator--active`).css({
        background: activeIndicatorBackground
      });
    }
  
    function move(direction) {
      if (direction == "left" && currentPosition >= lowerMovementBound) {
        currentPosition--;
        currentOffset = currentOffset + moveAmount;
        $(`.${childClassName}__indicator${currentPosition}`).css("background", activeIndicatorBackground);
        $(`.${childClassName}__indicator${currentPosition + 1}`).css("background", indicatorBackground);
      }
      if (direction == "right" && currentPosition <= upperMovementBound) {
        currentOffset = currentOffset - moveAmount;
        currentPosition++;
        $(`.${childClassName}__indicator${currentPosition}`).css("background", activeIndicatorBackground);
        $(`.${childClassName}__indicator${currentPosition - 1}`).css("background", indicatorBackground);
      }
  
      $(`.${childClassName}`).css("transition", animationTime);
      $(`.${childClassName}`).css("transform", `translateX(${currentOffset}px)`);
    }
  }