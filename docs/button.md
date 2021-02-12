---
id: button
title: Button
---

どのプラットフォームでも動くであろう基本的なボタンコンポーネント。最低限のカスタムしかサポートしていません。

もしこのボタンに満足できないなら、[TouchableOpacity](touchableopacity) or [TouchableWithoutFeedback](touchablewithoutfeedback) を使用してオリジナルを作ってみましょう。インスピレーションを得るために [`Button` コンポーネントのソスコード](https://github.com/facebook/react-native/blob/master/Libraries/Components/Button.js)を覗いてみるのもいいかもしれません。 もしくは [コミュニティー有志によるボタン](https://js.coach/?menu%5Bcollections%5D=React%20Native&page=1&query=button) もチェックしてみましょう。

```jsx
<Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
```

## 例

```SnackPlayer name=Button%20Example
import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);

const App = () => (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
        The title and onPress handler are required. It is recommended to set accessibilityLabel to help make your app usable by everyone.
      </Text>
      <Button
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
        Adjust the color in a way that looks standard on each platform. On  iOS, the color prop controls the color of the text. On Android, the color adjusts the background color of the button.
      </Text>
      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      />
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
        All interaction for the component are disabled.
      </Text>
      <Button
        title="Press me"
        disabled
        onPress={() => Alert.alert('Cannot press this one')}
      />
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
        This layout strategy lets the title define the width of the button.
      </Text>
      <View style={styles.fixToText}>
        <Button
          title="Left button"
          onPress={() => Alert.alert('Left button pressed')}
        />
        <Button
          title="Right button"
          onPress={() => Alert.alert('Right button pressed')}
        />
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
```

---

# レファレンス

## Props

### <div class="label required basic">Required</div>**`onPress`**

ユーザーがボタンをタップしたときに呼び出されるハンドラ。

| Type                               |
| ---------------------------------- |
| function([PressEvent](pressevent)) |

---

### <div class="label required basic">Required</div>**`title`**

ボタンの内側に表示するテキスト。Android ではタイトルは大文字に変換されます。
| Type   |
| ------ |
| string |

---

### `accessibilityLabel`

ブラインドアクセシビリティ機能のために表示するテキスト。

| Type   |
| ------ |
| string |

---

### `color`

内側のテキストの色 (iOS)、ないしはボタンのバックグラウンドカラー (Android).

| Type            | Default                                                                                                                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [color](colors) | <ins style={{background: '#2196F3'}} className="color-box" /> `'#2196F3'` <div className="label android">Android</div><hr/><ins style={{background: '#007AFF'}} className="color-box" /> `'#007AFF'` <div className="label ios">iOS</div> |

---

### `disabled`

`true` の場合、全てのインタラクション無効化します。

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `hasTVPreferredFocus` <div class="label tv">TV</div>

TV に合った焦点。

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `nextFocusDown` <div class="label android">Android</div><div class="label tv">TV</div>

ユーザーが下に移動したときにフォーカスを受ける次のビューを指定します。[Androidドキュメント](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusDown)を参照してください。

| Type   |
| ------ |
| number |

---

### `nextFocusForward` <div class="label android">Android</div><div class="label tv">TV</div>

ユーザーが前方に移動したときにフォーカスを受ける次のビューを指定します。[Androidドキュメント](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusForward)を参照してください。

| Type   |
| ------ |
| number |

---

### `nextFocusLeft` <div class="label android">Android</div><div class="label tv">TV</div>

ユーザーが左に移動したときにフォーカスを受ける次のビューを指定します。[Androidドキュメント](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusLeft)を参照してください。

| Type   |
| ------ |
| number |

---

### `nextFocusRight` <div class="label android">Android</div><div class="label tv">TV</div>

ユーザーが右に移動したときにフォーカスを受ける次のビューを指定します。[Androidドキュメント](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusRight)を参照してください。

| Type   |
| ------ |
| number |

---

### `nextFocusUp` <div class="label android">Android</div><div class="label tv">TV</div>

ユーザーが上に移動したときにフォーカスを受ける次のビューを指定します。[Androidドキュメント](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusUp)を参照してください。

| Type   |
| ------ |
| number |

---

### `testID`

エンドツーエンドテスト用の ID。

| Type   |
| ------ |
| string |

---

### `touchSoundDisabled` <div class="label android">Android</div>

`true` の場合、クリックサウンドを再生しません。

| Type    | Default |
| ------- | ------- |
| boolean | `false` |
