---
id: switch
title: Switch
---

真偽値のインプットを描画します。

This is a controlled component that requires an `onValueChange` callback that updates the `value` prop in order for the component to reflect user actions. If the `value` prop is not updated, the component will continue to render the supplied `value` prop instead of the expected result of any user actions.

ユーザーの操作を反映させるためには props の `value` を更新する必要があるため、`onValueChange`にコールバック関数を与えて `value` を更新させる必要があります。もし `value` が更新されない場合は、コンポーネントはユーザーの操作の結果期待される値の代わりに、渡された `value` を使い描画し続けてしまいます。

## Example

```SnackPlayer name=Switch&supportedPlatforms=android,ios
import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
```

---

# Reference

## Props

### [View Props](view.md#props)

[View Props](view.md#props)を継承しています。

---

### `disabled`

true の場合、ユーザーは switch の値を変更できません。

| 型 | デフォルト値 |
| ---- | ------- |
| bool | `false` |

---

### `ios_backgroundColor` <div class="label ios">iOS</div>

iOS 用の、カスタムバックグラウンドカラーです。このバックグラウンドカラーは、switch の value が false あるいは switch の disabled が true の時（switch は半透明になります）に反映されます。


| 型               |
| ------------------ |
| [color](colors.md) |

---

### `onChange`

ユーザーが switch の値を変更しようとした時に呼び出されます。引数として change event を受け取る事ができます。もしも、変更後の値のみを受け取りたい場合は、代わりに `onValueChange` を使用してください。

| 型     |
| -------- |
| function |

---

### `onValueChange`

Invoked when the user tries to change the value of the switch. Receives the new value as an argument. If you want to instead receive an event, use `onChange`.
ユーザーが switch の値を変更しようとした時に呼び出されます。引数として変更後の値を受け取ります。もしも、値の代わりに event を受け取りたい場合は `onChange` を使用してください。

| 型     |
| -------- |
| function |

---

### `thumbColor`

switch のつまみの部分の色です。もし iOS でこのプロパティを設定した場合、つまみの drop shadow は消えます。

| 型               |
| ------------------ |
| [color](colors.md) |

---

### `trackColor`

switch の可動域の色です。

_iOS_: When the switch value is `false`, the track shrinks into the border. If you want to change the color of the background exposed by the shrunken track, use [`ios_backgroundColor`](switch.md#ios_backgroundColor).

_iOS_: switch の value が false の時は可動域の色は境界の中まで縮小されてしまいます。もし、縮小してる状態の背景色を変更したい場合は[`ios_backgroundColor`](switch.md#ios_backgroundColor)を使用してください。

| 型                                                            |
| --------------------------------------------------------------- |
| object: { false: [color](colors.md), true: [color](colors.md) } |

---

### `value`

The value of the switch. If true the switch will be turned on. Default value is false.
switch の値です。もし true であれば switch はオンになります。デフォルト値は false です。

| 型 |
| ---- |
| bool |
