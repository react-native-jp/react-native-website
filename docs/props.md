---
id: props
title: Props
---

ほとんどのコンポーネントは作成時に様々なパラメータによってカスタマイズできます。これらのパラメータのことを、`props` (プロップス・ `properties` の略) と呼びます。

例えば、React Native における基本的なタグの一つ・ `Image` は、 `source` という props を使って内容を表現します。

```SnackPlayer name=Props
import React from 'react';
import { Image } from 'react-native';

const Bananas = () => {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={pic} style={{width: 193, height: 110, marginTop:50}}/>
    );
}

export default Bananas;
```

`{pic}` についている波括弧は、 変数 `pic` を JSX に埋め込む働きがあります。平たく言うと、波括弧を使うことで JavaScript を JSX の中に埋め込むことができます。

オリジナルのコンポーネントでも `props` を使うことができます。つまり、一つのコンポーネントを `props` でカスタマイズすることでアプリの色々な場所に、そこに合った形で使うことが出来るようになるわけです。例を見てみましょう。

```SnackPlayer name=Props
import React from 'react';
import { Text, View } from 'react-native';

const Greeting = (props) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Hello {props.name}!</Text>
      </View>
    );
}

export default LotsOfGreetings = () => {
    return (
      <View style={{alignItems: 'center', top: 50}}>
        <Greeting name='Rexxar' />
        <Greeting name='Jaina' />
        <Greeting name='Valeera' />
      </View>
    );
}
```

`name` を `props` として使うことで、`Greeting` コンポーネントをカスタマイズすることができるので、挨拶のたびに再利用することができます。この便利さが React の人気の秘密です。もし、既存の UI プリミティブ (`div`、`span`, `form` 等) だと物足りないと感じたら、あなたが作ってみてはどうでしょう？

ここで一つ新しい要素のご紹介。 [`View`](view.md) コンポーネントは他のコンポーネントのコンテナとして、レイアウトやスタイリングをするのに便利です。`div` と似た働きをします。

`props` と [`Text`](text.md)、[`Image`](image.md) や、[`View`](view.md) 等の基本的なコンポーネントを使うことで、さまざまな静的な画面を作ることができます。もしそれらを動かしたいなら、[`State` について学びましょう](state.md)。
