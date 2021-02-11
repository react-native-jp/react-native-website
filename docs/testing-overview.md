---
id: testing-overview
title: Testing
author: Vojtech Novak
authorURL: 'https://twitter.com/vonovak'
description: このガイドはReact Native開発者に良いテストの書き方やどのようなテストを取り入れるべきかという、テストの背景にあるキーとなる概念を紹介します。
---

コードが大きくなるにつれて、予期しない小さなエラーやエッジケースが大きなエラーになだれ込むことがあります。バグは悪いユーザーエクスペリエンスとなり、究極的にはビジネス機会の損失になり得ます。脆弱なプログラムを防ぐ一つの方法はコードを野に放つ前にテストを行うことです。

このガイドでは、アプリケーションが様々かつ自動的な方法で、期待通りにアプリケーションが動いているかということを、静的に解析する事から End-to-End のテストの範囲で確かめます。

<img src="/docs/assets/diagram_testing.svg" alt="コードを直して、テストを行いテストがパスしてリリースするか失敗して最初のフローに戻るテストの一連の流れ" />

## なぜテストが必要か

私たちは人間で、人間は過ちをするのです。テストは重要です。なぜならばあなたのミスを明らかにし、コードが動いているか検証する事を助けるからです。おそらく更に重要な事には、新機能を追加しても、既存のコードをリファクタリングしても、あるいは、プロジェクトの重大な依存関係の更新を行っても、将来もコードが動き続ける事を保証してくれます。

テストにはあなたが思っている以上に価値があるでしょう。コードの中のバグを直す最もよい方法の一つは、バグによって失敗しているテストを書くことです。バグを直してテストを再度実行した時にテストがパスするということは、バグが直りそのバグが二度とコードに持ち込まれない事を意味します。

テストは新たにチームに入った人にドキュメントを提供する事にもなります。実際のコードを見た事がない人でもテストを読む事によってそれらがどのように動くか理解する事を手助けします。

最後になりますが大事なことに、テストが自動化されるにつれて、手動で<abbr title="Quality Assurance">QA</abbr>をテストするよりもかかる時間が少なくなり、貴重な時間が開放されます。

## 静的な解析

コード品質改善の最初の一歩として、静的解析ツールを使いましょう。静的解析はコードを書くとコードを全く動かすことなくエラーを調べてくれます。

- **Linters** コードを解析して、使われていないコードが存在するというような馴染みのある過ちや、スペースの代わりに tab を使ってはいけないという例(その逆もありえます。あなたの設定次第です。)のように、スタイルガイドが禁止している書き方について目印をつけます。
- **Type checking** 関数に渡しているデータ構造が、関数によってあらかじめ許容されているものと一致している事を保証します。例として、数値データが必要なカウントを行う関数に文字列データが入らないように保証します。

React Native はすぐに使える設定済みの二種類のツールがあります。: [ESLint](https://eslint.org/) `lint`のためのツールです。[Flow](https://flow.org/en/docs/) または、 [TypeScript](typescript)(Javascript にトランスパイル可能な型付き言語)、`Type checking`のためのツールです。

## テストのしやすいコードを書くこと

テストを始めるにあたって、まず最初に必要なことはテストのしやすいコードを書くことです。航空機を作るプロセスを考えてみてください。 - いかなるモデルの機体でも複雑なシステムが全て正しく動いている事を示すためにまず飛ばしてみる前に、個々のパーツが安全であり正しく機能している事を保証するためにテストされます。例えば、翼は著しく重い負荷によって曲がるかをテストし、エンジンのパーツは耐久性をテストし、フロントガラスはバードインパクトをシミュレートしたテストがされます。

ソフトウェアも似ています。全体のプログラムをたくさんの行のコードを巨大な一つのファイルに書く代わりに、組み立てられたコード全体をテストする事よりも徹底的にテストが可能な小さな複数のモジュールにコードを書きます。この意味で、テストのしやすいコードは簡潔かつモジュラーに組み合わされています。

アプリケーションをよりテストしやすくするには、React のコンポーネントのビューをロジックとステートから切り離すことから始めましょう(Redux, MobX その他どのようなソリューションを用いるとしてもです)。このようにして、ビジネスロジックに関するテストを、主にアプリケーションの UI 描画が責務となる React コンポーネントそれ自身と独立に保つことができます。

理論的には、全てのロジックとデータの取得をコンポーネントから移動させることができるはずです。こうすれば、コンポーネントは単独でレンダリングに注力されます。ステートは全体的にコンポーネントから独立するでしょう。アプリケーションのロジックはコンポーネントが一切存在しなくても動くはずです！

> 他の学習資料についてもテスタブルなコードについての話題をより深く調べてみることもお勧めします。

## テストを書く

テストを描きやすいコードを書いた次に、実際にいくつかテストを書いてみましょう! React Native の初期状態のテンプレートは[Jest](https://jestjs.io)テストフレームワークを搭載しています。テンプレートは、モックや設定をひねらなくてもストレートな道筋であなたを生産的にするように、事前に環境が仕立てられたプリセットを含んでいます-[モックをより詳しく](#mocking)。このガイド上のあらゆる種類の機能テストは Jest を使います。

> テスト駆動開発をするなら、テストを最初に書きます！そうすれば、テスタビリティがコードに与えられます。

## テストを構成する

あなたのテストは短く理想的には一つのことをテストするべきです。Jest で書かれたテストを例にとって始めましょう。

```js
it('given a date in the past, colorForDueDate() returns red', () => {
  expect(colorForDueDate('2000-10-20')).toBe('red');
});
```

このテストは[`it`](https://jestjs.io/docs/en/api#testname-fn-timeout)関数に渡す文字列で表現されます。これが何をテストするものなのか明確になるように気をつけて記述をしてください。以下のことを網羅することにベストを尽くしましょう。

1. **Given** - いくつかの前提となる条件
2. **When** - テスト対象の関数によって実行されるいくつかの挙動
3. **Then** - 予期される結果

これらはまた AAA(Arrange, Act, Assert)としても知られています。

Jest はテストを構成するのを助ける [`describe`](https://jestjs.io/docs/en/api#describename-fn) 関数を提供します。一つの機能性に属する全てのテストをグループにまとめるのに`describe`を使用してください。describe 関数は必要であればネストして構いません。その他の関数でよく使われるものには[`beforeEach`](https://jestjs.io/docs/en/api#beforeeachfn-timeout) や [`beforeAll`](https://jestjs.io/docs/en/api#beforeallfn-timeout) があり、あなたがテストしたいオブジェクトの設定をするために使えます。より詳しくは[Jest api reference](https://jestjs.io/docs/en/api)を読んでください。

もしテストが多くのステップ、多くの結果をテストする時に、もっと小さくそれらを分けたくなるかもしれません。そのようであれば、あなたのテストケースは他の機能から完全に独立することを保証してください。テストスイートの中のそれぞれのテストは他のテストケースが走り始めなくても、単体で実行できるようにしなければなりません。逆の見方をすると、全てのテストを一度に行う場合は、最初のテストが次のテストの結果に影響を与えてはいけません。

最後に、開発者として私たちはグレイトにコードが動いてクラッシュしないことを好みます。テストには、よく反対のことが起きます。テストが失敗することを _良いこと_ だと考えましょう！テストが失敗する時、多くの場合何かが間違っていることを意味します。それはユーザーに影響を与える前に問題を直す機会を与えてくれているのです。

## 単体テスト

単体テストは分離された関数やクラスのようにコードの最も小さな単位をカバーします。

テストされたオブジェクトが何かに依存する時、詳細は次のパラグラフで説明しますが、よくそれらをモックにする必要がでてきます。

単体テストの偉大な点は早く書けて早く実行できることです。ゆえに、作業の最中でもすぐにテストが通るかどうかについて知ることができます。Jest は編集中のコードに連動して継続的にテストを走らせるオプションを持っています。: [Watch mode](https://jestjs.io/docs/en/cli#watch)

<img src="/docs/assets/p_tests-unit.svg" alt=" " />

### モッキング

ときどき、テストをするオブジェクトは外部のコードに依存を持っていて、あなたはそれらをモックにしたいと思うでしょう。モッキングはコードの外部への依存部分を任意の実装で置き換えることです。

> 一般的にテストにはモックを使うよりも実際のオブジェクトが使われることがことが好ましいですが、それが不可能なことがあります。例えば、あなたの JS のユニットテストが Java や Objective-C で書かれているネイティブモジュールに依存している場合など。

天気の情報を提供している外部のサービスやその他の依存コードを使って現在の街の天気を表示するアプリケーションを書くことを想像してみましょう。もしサービスが雨だと教えてくれるとき、雨雲の画像を表示したいとします。あなたはテストの中でそれらのサービスを呼び出したくないはずです。なぜならば、

- テストが遅くなり不安定になりえるから(ネットワークリクエストに巻き込まれて)
- サービスがテストのたびに違うデータを返してくるかもしれない
- サードパーティのサービスに繋がらない時でもテストを動かす必要があるから

それゆえに、あなたは何千行ものコードとインターネットに繋がれた温度計を効果的に置き換える、サービス実装のモックを注入しえるのです！

> Jest は[モックに関するサポート](https://jestjs.io/docs/en/mock-functions#mocking-modules)をあらゆる実装の関数レベルからモジュールレベルまで実現しています。

## 統合テスト

大きなソフトウェアシステムを書く時、個々のプログラムが相互にやりとりする必要があります。単体テストでは、あるプログラムが他のプログラムに依存していても、結局、たびたび、それらをフェイクに置き換えて依存をモックにするでしょう。

統合テストでは、実際の個々のユニットを組み合わせて(実際のアプリケーションと同じように)それらが期待通りに協調して動くことを保証するためのテストをまとめて行います。だからと言って、モッキングが必要でなくなるわけではありません。あなたはまだモック(例えば、天気情報の通信のモック)を必要とするかもしれませんが、単体テストの時より必要とする機会はずっと少ないでしょう。

> 統合テストに関する用語の意味は必ずしも一貫性があるものではないことに注意してください。また、単体テストと統合テストの境界はいつでも明確とは限りません。このガイドにとってあなたのテストが統合テストを意味する時はテストが以下のような時です。

> - 述べてきたようにアプリケーションが複数のモジュールの組み合わせになっている時
> - 外部のシステムを使っている時
> - (天気サービスの API のような)他のアプリケーションをネットワークから呼び出している時
> - ファイルやデータベースの<abbr title="Input/Output">I/O</abbr>を行う時

<img src="/docs/assets/p_tests-integration.svg" alt=" " />

## コンポーネントテスト

React コンポーネントは描画に関する責務があり、ユーザーは直接それらのアウトプットと相互にやりとりするでしょう。例えあなたのビジネスロジックのテストカバレッジが高く正しいとしても、コンポーネントのテストなしではユーザーに壊れた UI を提供してしまうかもしれません。コンポーネントテストは単体テストあるいは統合テストに行き着きますが、React Native においては重要な部分なので、それらとは分けて見ていきましょう。

React コンポーネントをテストするというのも、二つのことをテストしたいからです。

- インタラクション: ユーザーからの要求にコンポーネントの正しい振る舞いを保証する(例: ボタンを押した時の挙動)
- レンダリング: React によってコンポーネントが結果を正しく表示していることを保証する(例: UI におけるボタンの見た目や位置)

例えば、ボタンが`onPress`リスナーを持っている時、コンポーネントによってボタンの見た目とボタンがタップされたときに正しく動くか、そのどちらもテストしたいとします。

これらのテストを助けるいくつかのライブラリがあります。

- React の[Test Renderer](https://reactjs.org/docs/test-renderer.html)、 React のコアと一緒に開発されていて、DOM やネイティブモバイル環境がなくても React のコンポーネントをピュアな Javascript のオブジェクトに書き出せるレンダラーを提供します。
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)は React の`Test Renderer`にビルドされ、次のパラグラフで述べるような`fireEvent`や`query`API を追加します。

> コンポーネントテストは Node.js 環境での Javasdcript のみのテストです。それらは React Native のコンポーネントから渡されるいかなる iOS、Android、その他のプラットフォームのコードも _考慮しません_ 。このことは、それらが 100%の信頼を持ってユーザーに全てが動くことを保証するわけではないということです。もし、iOS や Android のコードにバグがあれば、それらは見つからないでしょう。

<img src="/docs/assets/p_tests-component.svg" alt=" " />

### ユーザーインタラクションのテスト

UI を描画する以外にも、コンポーネントは`TextInput`の`onChangeText`、`Button`の`onPress`というようなイベントの操作をします。それらはイベントのコールバックやその他の関数を含むかもしれません。
次の例を考えましょう。

```jsx
function GroceryShoppingList() {
  const [groceryItem, setGroceryItem] = useState('');
  const [items, setItems] = useState([]);

  const addNewItemToShoppingList = useCallback(() => {
    setItems([groceryItem, ...items]);
    setGroceryItem('');
  }, [groceryItem, items]);

  return (
    <>
      <TextInput
        value={groceryItem}
        placeholder="Enter grocery item"
        onChangeText={(text) => setGroceryItem(text)}
      />
      <Button
        title="Add the item to list"
        onPress={addNewItemToShoppingList}
      />
      {items.map((item) => (
        <Text key={item}>{item}</Text>
      ))}
    </>
  );
}
```

ユーザーインタラクションをテストするとき、ユーザーの視点からページに何があるのか、操作によって何が起きるかをテストしてください。

経験則として、ユーザーが見ることができるもの、聞くことができるものを使う事が好ましいです。

- 書かれている文字や[accessibility helpers](https://reactnative.dev/docs/accessibility#accessibility-properties)にアサーションを行う

逆に避けるべき事:

- コンポーネントの props やステートにアサーションを行う事
- testID のクエリ

テストを通すことは出来るとしても props やステートの実装の細かい部分をテストすることは避けてください。それらはリファクタリング(例えば、あなたが、それらのいくつかをリネームしたい時やクラスコンポーネントを hooks で書き直したい時)によって壊れがちになり、コンポーネントをユーザーがどう操作出来るかについて使う事には向いていません。

> React のクラスコンポーネントは特にインターナルなステートや props、イベントハンドラのような実装の細かい部分をテストしがちです。実装の細かい部分をテストするのは避け、コンポーネントの内部に依存する事を _難しくする_ Hooks を用いた関数コンポーネントを用いるのが好ましいです。

[React Native Testing Library](https://callstack.github.io/react-native-testing-library/)のようなコンポーネントをテストするライブラリは、API の適切な選択によってユーザーセントリックなテストを取り仕切ります。次の例では、`changeText`と`press`メソッドを持ち、ユーザーのコンポーネントに対する操作をシミュレートする`fireEvent`と、レンダリングされた`Text`ノードからマッチするものを探す`getAllByText`クエリファンクションを用いています。

```jsx
test('given empty GroceryShoppingList, user can add an item to it', () => {
  const { getByPlaceholder, getByText, getAllByText } = render(
    <GroceryShoppingList />
  );

  fireEvent.changeText(
    getByPlaceholder('Enter grocery item'),
    'banana'
  );
  fireEvent.press(getByText('Add the item to list'));

  const bananaElements = getAllByText('banana');
  expect(bananaElements).toHaveLength(1); // 'banana' がリスト上に存在するはず
});
```

この例では、関数を呼び出した時にどうステートが変化するかという事はテストしていません。ユーザーが`TextInput`のテキストを変更して`Button`が押されると何が起こるのかをテストしています！

### 描画結果のテスト

[Snapshot testing](https://jestjs.io/docs/en/snapshot-testing)は、Jest による発展的なテストを可能にするものです。とても強力で低レベルなツールであり、使うと特別な注意を促してくれます。

コンポーネントのスナップショットは Jest に組み込まれているカスタムされた React のシリアライザによって作られる JSX のような文字列です。このシリアライザは Jest に React のコンポーネントツリーを人間が読めるような文字列に翻訳させます。言い換えるとコンポーネントのスナップショットはテストを走らせる間に _生成された_ 結果を描画したコンポーネントをテキストで再表現したものです。それは以下のような見た目になっています。

```jsx
<Text
  style={
    Object {
      "fontSize": 20,
      "textAlign": "center",
    }
  }>
  Welcome to React Native!
</Text>
```

スナップショットのテストを用いるとき、典型的には最初にコンポーネントを実装して、その後にスナップショットテストを実行します。スナップショットテストはあなたのレポジトリやファイルに参照用のスナップショットとしてスナップショットを作成し保存します。 **そのファイルはコミットし、コードレビューの合間にチェックします**。コンポーネントの描画の出力結果に関するいかなる変更もスナップショットを変化させ、テストを失敗させます。そうした時、あなたはテストをパスさせるために保存されている参照用のスナップショットを修正する必要があります。それらの変更をもう一度コミットし、レビューする必要があります。

スナップショットにはいくつか弱点があります。

- あなたのようなデベロッパーやレビュアーにとって、意図された変更なのか、はたまた、バグの証拠なのかを区別するのが難しいのです。特に、大きなスナップショットはすぐに理解が難しくなり、それらを導入する価値が低くなります。
- スナップショットが作られた時点では、出力結果が実際には間違っているケースでも正しいものと同様に扱われてしまうこと。
- スナップショットが失敗した時に、その変更が意図通りのものなのかを適切に検証をせずに Jest の`--updateSnapshot`オプションを利用して更新したい誘惑に駆られます。ある程度開発者としての自制心が必要です。

スナップショットそれ自体はロジックが正しいかを保証しません。それらはただ単に、予期しないような変更が発生することへの予防に役に立ち、テスト中の React ツリーのコンポーネントが期待通りに props(styles などの props)を受け取っているかをチェックするためのものです。

わたしたちは、小さなスナップショットだけを用いる事を推奨します。(詳しくは[`no-large-snapshots` rule](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-large-snapshots.md)) もし、あなたが二つの React のコンポーネントのステート間の _変更_ をテストしたいなら、[`snapshot-diff`](https://github.com/jest-community/snapshot-diff)を使ってください。疑わしい時は、前のパラグラフで述べたような明示的に期待する検証を好みましょう。

<img src="/docs/assets/p_tests-snapshot.svg" alt=" " />

## End-to-End Tests

In end-to-end (E2E) tests, you verify your app is working as expected on a device (or a simulator / emulator) from the user perspective.

This is done by building your app in the release configuration and running the tests against it. In E2E tests, you no longer think about React components, React Native APIs, Redux stores or any business logic. That is not the purpose of E2E tests and those are not even accessible to you during E2E testing.

Instead, E2E testing libraries allow you to find and control elements in the screen of your app: for example, you can _actually_ tap buttons or insert text into `TextInputs` the same way a real user would. Then you can make assertions about whether or not a certain element exists in the app’s screen, whether or not it’s visible, what text it contains, and so on.

E2E tests give you the highest possible confidence that part of your app is working. The tradeoffs include:

- writing them is more time consuming compared to the other types of tests
- they are slower to run
- they are more prone to flakiness (a "flaky" test is a test which randomly passes and fails without any change to code)

Try to cover the vital parts of your app with E2E tests: authentication flow, core functionalities, payments, etc. Use faster JS tests for the non-vital parts of your app. The more tests you add, the higher your confidence, but also, the more time you'll spend maintaining and running them. Consider the tradeoffs and decide what's best for you.

There are several E2E testing tools available: in the React Native community, [Detox](https://github.com/wix/detox/) is a popular framework because it’s tailored for React Native apps. Another popular library in the space of iOS and Android apps is [Appium](http://appium.io/).

<img src="/docs/assets/p_tests-e2e.svg" alt=" " />

## Summary

We hope you enjoyed reading and learned something from this guide. There are many ways you can test your apps. It may be hard to decide what to use at first. However, we believe it all will make sense once you start adding tests to your awesome React Native app. So what are you waiting for? Get your coverage up!

### Links

- [React testing overview](https://reactjs.org/docs/testing.html)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Jest docs](https://jestjs.io/docs/en/tutorial-react-native)
- [Detox](https://github.com/wix/detox/)
- [Appium](http://appium.io/)

---

_This guide originally authored and contributed in full by [Vojtech Novak](https://twitter.com/vonovak)._
