# react-native-bottom-drawer
Updated version of github.com/jacklein/rn-bottom-drawer
Credit to jacklein for the logic

install: ```npm i @ntakemori/rn-bottom-drawer```

required: 

containerHeight - integer - height of the drawer

borderRadius    - integer - borderRadius of top left/right of drawer

startUp         - boolean - starts up or down position

downDisplay     - integer - height of drawer when in down position

offset          - integer - offset of drawer


functions (non mandatory): 

onExpand()   - called on expand

onCollapse() - called on collapse 


To use TouchableOpacity in your child: 
```
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

<AnimatedTouchable onPress={this.foo}>
 
  <Text>Foo</Text>
  
</AnimatedTouchable>
```
