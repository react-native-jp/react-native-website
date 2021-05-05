---
id: hermes
title: Hermes を使う
---

<a href="https://hermesengine.dev">
<img width={300} height={300} style={{float: 'right', margin: '-30px 4px 0'}} src="/docs/assets/HermesLogo.svg" />
</a>

[Hermes](https://hermesengine.dev) は、 React Native に最適化されたオープンソースの JavaScript エンジンです。多くのアプリでは、 Hermes を有効にすることで、起動時間が短縮されたり、メモリ使用量が削減されたり、アプリサイズが縮小されたりします。現時点では、 Hermes は React Native のデフォルト機能ではなく、このガイドでは Hermes を有効にする方法を説明します。

まず、React Nativeのバージョン0.60.4以上を使用していることを確認します。

0.60.4より前のバージョンのアプリの場合は、まず React Native をアップグレードする必要があります。アップグレードの方法については、 [Upgrading to new React Native Versions](/docs/upgrading) をご覧ください。 [React Native のアップグレードのヘルプページ](https://react-native-community.github.io/upgrade-helper/?from=0.59.0) で詳しく説明しているように、 `android/app/build.gradle` へのすべての変更が適用されていることを入念に確認してください。アプリをアップグレードした後、 Hermes に切り替える前にすべて正常に動作することを確認してください。

> ## RN の互換性に関する注意事項
>
> Hermes の各リリースは、特定の RN バージョンに向けられています。[Hermes releases](https://github.com/facebook/hermes/releases) には常に厳密に従うことをおすすめします。バージョンの不一致は、最悪の場合、アプリのクラッシュにつながります。

> ## Windows ユーザーへの注意事項
>
> Hermes には [Microsoft Visual C++ 2015 Redistributable](https://www.microsoft.com/en-us/download/details.aspx?id=48145) が必要です。

`android/app/build.gradle` ファイルを以下のように編集してください。

```diff
  project.ext.react = [
      entryFile: "index.js",
-     enableHermes: false  // clean and rebuild if changing
+     enableHermes: true  // clean and rebuild if changing
  ]
```

また、ProGuard を使用している場合は、 `proguard-rules.pro` に以下のルールを追加する必要があります。

```
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
```

次に、すでに一度でもアプリをビルドしたことがある場合は、ビルドをクリーンアップします。

```shell
$ cd android && ./gradlew clean
```

これで完成です。通常通り、アプリの開発とデプロイができるようになります。

```shell
$ npx react-native run-android
```

> ## Android App Bundle についての注意事項
>
> Android App Bundle は、react-native 0.62.0以降でサポートされています。

## Hermes が使われていることを確認する

最近、アプリを一から作成した場合、最初の画面に Hermes が有効になっているかどうかの表示があるはずです。

![Where to find JS engine status in AwesomeProject](/docs/assets/HermesApp.jpg)

HermesInternal というグローバル変数が JavaScriptで有効になります。この変数を以下のように使うことで Hermes が使われているか確認できます。

```jsx
const isHermes = () => !!global.HermesInternal;
```

Hermes のメリットを確認するために、リリースビルドやリリースデプロイをして比較してみましょう。例えば、次のコマンドを実行します。

```shell
$ npx react-native run-android --variant release
```

すると、ビルド時に Javascript がバイトコードにコンパイルされます。これによってデバイスでのアプリの起動時間が短縮されます。

## Google Chrome の開発者ツールで Hermes をデバッグする

Hermes は Chrome インスペクタプロトコルを実装することで、 Chrome のデバックをサポートしています。つまり、 Chrome のツールを使って、Hermes 上、エミュレータ上、または実際の物理的なデバイス上で動作する JavaScript を直接デバッグすることができます。

> これはアプリの開発者ツールに元々備わっている 『リモート JS デバック』 とは全く異なるということに注意してください。リモート JS デバックは、開発マシン（ラップトップやデスクトップ）上の Chrome の V8 上で実際に JS のコードを実行します。詳しくは[デバック](debugging#debugging-using-a-custom-javascript-debugger)セクションに書いてあります。

Chrome は Metro 経由でデバイス上で動いている Hermes に接続するので、Metro がどのアドレスで待機しているかを知る必要があります。一般的には`localhost:8081`ですが、[設定可能です][configurable](https://facebook.github.io/metro/docs/configuration)。`yarn start` を実行すると、起動時にアドレスが標準出力されます。

Metro サーバーがどのアドレスで待機しているか分かったら、以下の手順で Chrome と接続します。

1. Chrome で `chrome://inspect` にアクセスします。

2. `Configure...` ボタンを押して Metro サーバーのアドレスを入力します (上記の通り、一般的には `localhost:8081` です)。

![Configure button in Chrome DevTools devices page](/docs/assets/HermesDebugChromeConfig.png)

![Dialog for adding Chrome DevTools network targets](/docs/assets/HermesDebugChromeMetroAddress.png)


3. Target に "Hermes React Native" が表示され、デバッガを起動するための "inspect" リンクがあるはずです。もし "inspect" リンクが見つからなかったら、 Metro サーバーが起動していることを確認してください。 ![Target inspect link](/docs/assets/HermesDebugChromeInspect.png)

4. Chrome のデバッグツールが使えるようになりました。たとえば、JavaScript が実行されたときにブレークポイントを設定するには、一時停止ボタンをクリックして、アプリ内でJavaScript を実行させるアクションを起こします。 ![Pause button in debug tools](/docs/assets/HermesDebugChromePause.png)
