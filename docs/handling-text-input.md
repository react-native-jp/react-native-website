---
id: handling-text-input
title: Text Inputのハンドリング
---

[`TextInput`](textinput#content)はユーザーにテキストを入力させる[Core Component](intro-react-native-components)です。TextInput はテキストを変更されるたびに呼び出される関数を渡せる `onChangeText` という prop を持っています。また、テキストがサブミットされた時に呼び出される `onSubmitEditing` という `prop` も持っています。

一例として、ユーザーが文字を入力したら、入力された文字を別の言語に翻訳する例をみてみましょう。この新しい言語では全ての 1 つ単語が 🍕 という記法で書かれます。そのため、 "Hello there Bob" は"🍕🍕🍕"として翻訳されます。

```SnackPlayer name=Handling%20Text%20Input
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const PizzaTranslator = () => {
  const [text, setText] = useState('');
  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text.split(' ').map((word) => word && '🍕').join(' ')}
      </Text>
    </View>
  );
}

export default PizzaTranslator;
```

この例では、`text` は時間と共に変化するため state に保存しています。

テキストインプットに対して、動作させたいことはもっとたくさんあります。例えば、ユーザーが入力している最中に、テキストをバリデーションしたいといったことです。より詳細な例をみたい場合は、[React docs on controlled components](https://reactjs.org/docs/forms.html#controlled-components) あるいは [reference docs for TextInput](textinput.md) を参考にしてください。

テキストインプットはアプリにおいて、ユーザーがインタラクションを起こす方法のうちの 1 つです。次に、別のタイプのインタラクションを起こす方法や [learn how to handle touches](handling-touches.md) をみてみましょう。
