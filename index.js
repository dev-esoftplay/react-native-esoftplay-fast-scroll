import React, { Component } from 'react'
import { RecyclerListView, LayoutProvider, DataProvider, ContextProvider } from 'recyclerlistview';
import { Dimensions, View } from '../../node_modules/react-native/Libraries/react-native/react-native-implementation.js';
const { width } = Dimensions.get('window');

export class ContextHelper extends ContextProvider {
  constructor(uniqueKey) {
    super();
    this._contextStore = {};
    this._uniqueKey = uniqueKey;
  }

  getUniqueKey() {
    return this._uniqueKey;
  };

  save(key, value) {
    this._contextStore[key] = value;
  }

  get(key) {
    return this._contextStore[key];
  }

  remove(key) {
    delete this._contextStore[key];
  }
}

export default class FastScroll extends Component {
  constructor(props) {
    super(props);
    this.layoutProvider = new LayoutProvider(
      index => 0,
      (type, dim) => {
        dim.width = width / (props.numColumns || 1);
        dim.height = props.defaultHeight || 100;
      }
    )
    this.contextProvider = new ContextHelper('parent')
    this.rowRenderer = this.rowRenderer.bind(this)
    this.dataProvider = new DataProvider((a, b) => a !== b)
    this.state = { data: this.dataProvider.cloneWithRows(props.children), width: width }
  }

  rowRenderer(type, data, width) {
    return <View style={[{ width: width }]} >{data}</View>
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.children !== this.props.children)
      this.setState({ data: this.dataProvider.cloneWithRows(this.props.children) })
  };

  render() {
    const w = this.state.width / (this.props.numColumns || 1)
    return (
      <View onLayout={e => this.state.width = e.nativeEvent.layout.width} style={[{ flex: 1, },]} >
        <RecyclerListView
          layoutProvider={this.layoutProvider}
          dataProvider={this.state.data}
          forceNonDeterministicRendering={true}
          contextProvider={this.contextProvider}
          rowRenderer={(type, data) => this.rowRenderer(type, data, w)}
          {...this.props}
        />
      </View>
    )
  }
}