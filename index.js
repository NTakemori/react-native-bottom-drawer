import React, { useState, useRef } from "react";
import { Animated, View, PanResponder, Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

function BottomDrawer(props) {
  const DOWN_DISPLAY = props.downDisplay || props.containerHeight / 1.5;
  const UP_POSITION = SCREEN_HEIGHT - props.containerHeight + props.offset;
  const DOWN_POSITION = UP_POSITION + DOWN_DISPLAY;
  const [curPosition, setCurPosition] = useState(props.startUp ? "up" : "down");
  const TOGGLE_THRESHOLD = props.containerHeight / 11;

  const handleTransition = (pos, callback) => {
    Animated.spring(pan, {
      toValue: pos,
      useNativeDriver: false,
    }).start();
    callback();
  };

  const resetPos = () => {
    Animated.spring(pan, {
      toValue: curPosition == "up" ? UP_POSITION : DOWN_POSITION,
      useNativeDriver: false,
    }).start();
  };

  const handlePanResponderRelease = (e, gestureState) => {
    pan.flattenOffset();
    if (gestureState.dy > TOGGLE_THRESHOLD && curPosition == "up") {
      handleTransition(DOWN_POSITION, props.onCollapsed);
      setCurPosition("down");
    } else if (gestureState.dy < -TOGGLE_THRESHOLD && curPosition == "down") {
      handleTransition(UP_POSITION, props.onExpanded);
      setCurPosition("up");
    } else {
      resetPos();
    }
  };

  const pan = useRef(
    new Animated.Value(props.startUp ? UP_POSITION : DOWN_POSITION)
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset(pan._value);
      },
      onPanResponderMove: Animated.event([null, { dy: pan }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: handlePanResponderRelease,
    })
  ).current;

  return (
    <Animated.View
      style={{
        height: props.containerHeight + Math.sqrt(SCREEN_HEIGHT),
        borderTopLeftRadius: props.borderRadius,
        borderTopRightRadius: props.borderRadius,
        transform: [{ translateY: pan }],
        width: SCREEN_WIDTH,
        position: "absolute"
      }}
      {...panResponder.panHandlers}
    >
      {props.children}
    </Animated.View>
  );
}

BottomDrawer.defaultProps = {
  onExpanded: () => {},
  onCollapsed: () => {},
};
export default BottomDrawer;

