---
id: getting-started
title: イントロダクション
description: このガイドは、React Native の学習やこのドキュメントの使い方、環境セットアップを行うための前提条件を提示します。
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<div className="content-banner">
  <p>
    React Nativeの最初の一歩へようこそ！環境構築手順を探している場合は、この<a href="environment-setup">ページ</a>へどうぞ。
    このページにはドキュメント、ネイティブコンポーネント、React などの紹介がありますので、読み進めてみてください。
  </p>
  <img className="content-banner-img" src="/docs/assets/p_android-ios-devices.svg" alt=" " />
</div>

多くの人が使う React Native : 熟練 iOS エンジニアから React 初心者、プログラミングを始めたての人まで、様々な人が React Native を使っています。このドキュメントは、経験レベルやバックグラウンドに関係なく、すべての学習者のために書かれています。

## ドキュメントの使い方

このページから始めて、ドキュメント全体を本のように読み進めることができます。もしすでに React に慣れているのであれば、[React の紹介](intro-react)はスキップしても良いですし、軽く復習するために読んでも良いです。

## 前提条件

React Native を使うためには、JavaScript の基礎を理解している必要があります。JavaScript が初めての方や再学習が必要な方は、Mozilla Developer Network の [JavaScript](https://developer.mozilla.org/ja/docs/Web/JavaScript) や [JavaScript 「再」入門](https://developer.mozilla.org/ja/docs/Web/JavaScript/A_re-introduction_to_JavaScript)などを参照してください。

> React, Android, iOS 開発の予備知識がないことを前提にしていますが、React Native 開発者を目指す方にとっては貴重な勉強になるトピックです。必要に応じて、より深く掘り下げたリソースや記事にリンクしています。

## インタラクティブな例

この紹介ページでは、下のようなインタラクティブな例を使って、すぐにブラウザからコードを触り始めることができるようにしています。

```SnackPlayer name=Hello%20World
import React from 'react';
import { Text, View } from 'react-native';

const YourApp = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Try editing me! 🎉
      </Text>
    </View>
  );
}

export default YourApp;
```

上記は Snack Player です。これは Expo が作成した、React Native プロジェクトを埋め込んで実行し、Android や iOS などのプラットフォームでどのようにレンダリングされるかを共有するための便利なツールです。コードはライブで反映されるので、ブラウザで直接修正することができます。試しに、上の "Try editing me!" と書かれているテキストを "Hello, world!" に変更してみてください。

> 必要に応じて、ローカルの開発環境を設定したい場合は、[ローカルマシン上での環境設定ガイド](environment-setup)を参照して、`App.js` ファイルにコード例を貼り付けてください。(あなたがウェブ開発者であれば、すでにモバイルブラウザのテスト用にローカル環境を設定しているかもしれません。)

## 関数コンポーネントとクラスコンポーネント

React では、クラスか関数のどちらかを使ってコンポーネントを作ることができます。元々、ステートを持てるのはクラスコンポーネントだけでした。しかし、React のフック API が導入されてからは、関数コンポーネントにステートなどを追加することができるようになりました。

[フックは React Native 0.59 で導入され](/blog/2019/03/12/releasing-react-native-059)、また未来を見据えた React コンポーネントの書き方なので、この紹介文は関数コンポーネントの例を使って書いています。リンクを切り換えることで、クラスコンポーネントでの書き方を見ることもできます。

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Hello%20World%20Function%20Component
import React from 'react';
import { Text, View } from 'react-native';

const HelloWorldApp = () => {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
}

export default HelloWorldApp;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Hello%20World%20Class%20Component
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}

export default HelloWorldApp;
```

</TabItem>
</Tabs>

クラスコンポーネントの例をもっと見たい場合は[過去バージョンのドキュメント](/versions)を参照してください。

## 開発者ノート

様々な開発背景を持つ人が React Native を学んでいます。Web、Android、iOS など、様々な技術を経験している方もいるかもしれません。私たちは、あらゆるバックグラウンドを持つ開発者のために書くようにしています。時には、このように 1 つのプラットフォームに特化した説明を、それぞれ以下のように提供することもあります。

<Tabs groupId="guide" defaultValue="web" values={constants.getDevNotesTabs(["android", "ios", "web"])}>

<TabItem value="web">

> Web 開発者にはおなじみのコンセプト

</TabItem>
<TabItem value="android">

> Android 開発者にはおなじみのコンセプト

</TabItem>
<TabItem value="ios">

> iOS 開発者にはおなじみのコンセプト

</TabItem>
</Tabs>

## フォーマット

メニューパスは太字で書かれており、サブメニューをナビゲートするためにキャレットを使用します。例: **Android Studio > Preferences**

---

このガイドの読み方について紹介したところで、次は React Native の基礎である、[ネイティブコンポーネント](intro-react-native-components.md)について学びましょう。
