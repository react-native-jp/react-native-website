---
id: using-a-scrollview
title: ScrollViewを使う
---

[ScrollView](scrollview.md) は汎用のスクロールするコンテナで、 複数のコンポーネントやビューを含むことができます。
スクロールさせるアイテムは同種である必要がなく、垂直にも水平(`horizontal`props を設定することで)にもスクロールできます。

こちらの例では画像とテキストが混ざった垂直方向の `ScrollView` を作成しています。

```SnackPlayer name=Using%20ScrollView
import React from 'react';
import { Image, ScrollView, Text } from 'react-native';

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};

const App = () => (
  <ScrollView>
    <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{ fontSize: 96 }}>If you like</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{ fontSize: 96 }}>Scrolling down</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{ fontSize: 96 }}>What's the best</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{ fontSize: 96 }}>Framework around?</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{ fontSize: 80 }}>React Native</Text>
  </ScrollView>
);

export default App;
```

ScrollView は `pagingEnabled` という props を使うことで、スワイプによるページングができます。 Android での水平方向のビュー間のページングは [ViewPager](https://github.com/react-native-community/react-native-viewpager)を用いて実装できます。

iOS で ScrollView が 1 つだけのアイテムを持つ場合はズームが可能です。`maximumZoomScale` と `minimumZoomScale`を設定すると、ピンチイン・アウトでズームイン・アウトができます。

ScrollView は少数の限られたサイズのアイテムをスクロールさせるときには上手く動きます。`ScrollView`内の全ての要素やビューは、画面に表示されていなくてもレンダーされてしまいます。もし画面に収まりきらないような長いリストを表示する場合は、代わりに `FlatList` を使うべきです。次は[learn about list views](using-a-listview.md) も学んでみましょう。
