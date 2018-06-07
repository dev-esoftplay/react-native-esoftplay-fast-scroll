# react-native-esoftplay-fast-scroll
for heavy scrollView


## INSTALATION
```
npm install --save react-native-esoftplay-fast-scroll
```

> Please spread children of FastScroll as spreaded as you can, if you wrapping into single children item you will lose the performance optimization


## USAGE
### Using ScrollView
```
import { ScrollView } from 'react-native'

<ScrollView>
  //scrollable item
  //scrollable item
  //scrollable item
  //scrollable item
</ScrollView>
```
### Using FastScroll
```
import FastScroll from 'react-native-esoftplay-fast-scroll'

<FastScroll>
  //scrollable item
  //scrollable item
  //scrollable item
  //scrollable item
</FastScroll>
```
