---
id: typescript
title: TypeScript を利用する
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

[TypeScript][ts] は型定義を追加することで JavaScript を拡張する言語で、 [Flow][flow] によく似ています。 React Native は Flow で作られていますが、TypeScript と Flow の両方をデフォルトでサポートしています。

## TypeScript を始めよう

新しいプロジェクトを始める場合、いくつかの方法があります。

[TypeScript のテンプレート][ts-template] を使う方法があります。

```shell
npx react-native init MyApp --template react-native-template-typescript
```

> **注意：** 上記のコマンドが失敗する場合は、お使いのシステムにグローバルにインストールされている `react-native` または `react-native-cli` のバージョンが古い可能性があります。この問題を解決するには、 CLI をアンインストールしてみてください。
>
> - `npm uninstall -g react-native-cli` または `yarn global remove react-native-cli`
>
> そして再び `npx` コマンドを実行してみてください。

[Expo][expo] を使うこともできます。Expo には TypeScript のテンプレートが２つあります。

<Tabs groupId="package-manager" defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install -g expo-cli
expo init MyTSProject
```

</TabItem>
<TabItem value="yarn">

```shell
yarn global add expo-cli
expo init MyTSProject
```

</TabItem>
</Tabs>

また、 [Ignite][ignite] を使うこともできます。 Ignite にも TypeScript のテンプレートがあります。

<Tabs groupId="package-manager" defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install -g ignite-cli
ignite new MyTSProject
```

</TabItem>
<TabItem value="yarn">

```shell
yarn global add ignite-cli
ignite new MyTSProject
```

</TabItem>
</Tabs>

## 既存のプロジェクトにTypeScriptを追加する

1. TypeScript 、 React Native 用の型、 Jest 用の型をプロジェクトに追加します。

<Tabs groupId="package-manager" defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer
```

</TabItem>
<TabItem value="yarn">

```shell
yarn add -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer
```

</TabItem>
</Tabs>

2. TypeScript の設定ファイルを追加します。 `tsconfig.json` ファイルをプロジェクトのルートに作成してください。

```json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react",
    "lib": ["es6"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "target": "esnext"
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

3. Jest に TypeScript を使用することを認識させるために `jest.config.js` ファイルを作成してください。

```js
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
```

4. JavaScript のファイル名を `*.tsx` に変更してください。

> エントリポイントファイルである `./index.js` はそのままにしておいてください。そうしないと、本番ビルドのバンドルの際に問題が発生する可能性があります。

5. `yarn tsc`を実行して、新しい TypeScript ファイルの型チェックを行ってください。

## TypeScript と React Native の仕組み

TypeScript のファイルを JavaScript に変換する際、TypeScript を使用してない React Native のプロジェクトと同じ [Babel の基盤][babel] を介しています。 TypeScript コンパイラーは型チェックにのみ使用することをお勧めします。既存の TypeScript コードを React Native に移植している場合、 TypeScript の代わりに Babel を使用するための[いくつかの注意点][babel-7-caveats]があります。

## React Native + TypeScript のコードはどのような感じか


React Component の [Props](props) と [State](state) のための interface は `React.Component<Props, State>` を介して渡すことができます。JSX でそのコンポーネントを使用する際、 `React.Component<Props, State>` によって型チェックと自動補完をしてくれます。

```tsx title="components/Hello.tsx"
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

const Hello: React.FC<Props> = (props) => {
  const [enthusiasmLevel, setEnthusiasmLevel] = React.useState(
    props.enthusiasmLevel
  );

  const onIncrement = () =>
    setEnthusiasmLevel((enthusiasmLevel || 0) + 1);
  const onDecrement = () =>
    setEnthusiasmLevel((enthusiasmLevel || 0) - 1);

  const getExclamationMarks = (numChars: number) =>
    Array(numChars + 1).join('!');
  return (
    <View style={styles.root}>
      <Text style={styles.greeting}>
        Hello{' '}
        {props.name + getExclamationMarks(enthusiasmLevel || 0)}
      </Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title="-"
            onPress={onDecrement}
            accessibilityLabel="decrement"
            color="red"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="+"
            onPress={onIncrement}
            accessibilityLabel="increment"
            color="blue"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    borderWidth: 5
  },
  button: {
    flex: 1,
    paddingVertical: 0
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold'
  }
});

export default Hello;
```

[TypeScript playground][tsplay] で、この構文をより詳しく知ることができます。

## 有益なアドバイスが載っている場所

- [TypeScript ハンドブック][ts-handbook]
- [React の TypeScript に関するドキュメント][react-ts]
- [React + TypeScript チートシート][cheat] には、 TypeScript で React を使用する方法の概要が載っています。

## TypeScript によるカスタムパスエイリアスの使用

カスタムパスエイリアスを TypeScript で使用するには、 Babel と TypeScript の両方から動作するように設定する必要があります。その方法は以下の通りです。

1. `tsconfig.json` を編集して、カスタムパスマッピングを作成します。以下の例では、`src` のルートにあるファイルは、前にパス参照をつけなくても利用できるようになります。また、どのテストファイルも `tests/File.tsx` を使ってアクセスできるようになります。

```diff {2-7}
    "target": "esnext",
+     "baseUrl": ".",
+     "paths": {
+       "*": ["src/*"],
+       "tests": ["tests/*"],
+       "@components/*": ["src/components/*"],
+     },
    }
```

2. [`babel-plugin-module-resolver`][bpmr]を開発パッケージとしてプロジェクトに追加します。

<Tabs groupId="package-manager" defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install --save-dev babel-plugin-module-resolver
```

</TabItem>
<TabItem value="yarn">

```shell
yarn add --dev babel-plugin-module-resolver
```

</TabItem>
</Tabs>

3. 最後に、 `babel.config.js` の設定をします。(`babel.config.js` の構文は `tsconfig.json` とは異なるので注意してください。)

```diff {3-13}
{
  plugins: [
+    [
+       'module-resolver',
+       {
+         root: ['./src'],
+         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
+         alias: {
+           "tests": ["./tests/"],
+           "@components": "./src/components",
+         }
+       }
+     ]
  ]
}
```

[react-ts]: https://reactjs.org/docs/static-type-checking.html#typescript
[ts]: https://www.typescriptlang.org/
[flow]: https://flow.org
[ts-template]: https://github.com/react-native-community/react-native-template-typescript
[babel]: /docs/javascript-environment#javascript-syntax-transformers
[babel-7-caveats]: https://babeljs.io/docs/en/next/babel-plugin-transform-typescript
[cheat]: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets
[ts-handbook]: https://www.typescriptlang.org/docs/handbook/intro.html
[path-map]: https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
[bpmr]: https://github.com/tleunen/babel-plugin-module-resolver
[expo]: https://expo.io
[ignite]: https://github.com/infinitered/ignite
[tsplay]: https://www.typescriptlang.org/play/?strictNullChecks=false&esModuleInterop=true&jsx=3#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4BYAKFEljgG8AhAVxhggDsAaOAZRgCeAGyS8AFkiQweAFSQAPaXABqwJAHcAvnGy4CRdDAC0HFDGAA3JGSpUFteMA4wkUTOiRwACjjABnBio4YLhTECQALjg-GCgnAHMKShC4JGcxZj9gFD8QABkkKyEAfiiOZhAAI1ckzVtKNE4YuAAJJCEhCCjkQwA6ADEAYQAeHwh-AD44AF44AAowXz8AShmp+iCQxo5mgG00mAysnPzC9p4-KQBRdMzs3IKigF0ZxGIYXszRGDMkBaXegcjvdTkVlklNsFts1OABJDhoIjhZyvOaraZTS4wG6HO4nR7tOZzIF4h5nIRwAA+lLgAAZVgBqOAARnBkLg0PgnAAIkhEUhkfBZmi1tFrrdjmSikSSZLQe0qTT6XAjCy2ZR2Zy4PFrvI0EIUCAzMBOABZFBQADWAWF5RAgzEFr8ZQq1Sg6KmAEEoFAUAI5naHU64EzWb0AFYQJxzfAAQnw6pSRBgzCgHHm7JSw1UGmighE03oMWESD8vRwEBgmgmmZCwzkijzJcLxZEZfiRCkCWrtZSwTaHQg9HwBDqyT7E-oi3GZbCniZOuxeoNRvMZot1uJEpBBIp1LpyzHE+CwwA9A2YDWNeOJ9m1OomwWi-nS71Kqx2Dsezfjyecw-WyQFsXzLd82E4b9fyzFhwI4XsoPMGACwAIiMZD4N-TgfFLPxCx5PkkQOI8oIndA0Bw4BKmAIRgEEPIUGqIRpmQgATAiBQOdCfxIqEIE6KBmKIFiuJ4uBTyvUSz3-K8MLrf9HyA58S1Aj8IIknjhhgz9ZInRCUIZETRJCLCiD8XD6DhBFCOcYijLgMiKKomi6IY9pmKcflBUMuzGn45jKiEZgkG8qDxJ0uApPvdTb1PaT4MijRorgRMQjHMcqFPU8FL8KgtUAm0+BfcRJA+flfjmDYfwrGAokq38UBo+IOFhFwQGdAhyOcVx8C4eCGuAJreHaTAonwTqXCgHr2U0XqfzAz92rqidMBEeRuWAIgMBNDhRpwdQpu4kIQCcNoBrEGq4AAdlpWb6sa5rWva-AYmTNAxAOu6Bo4IahBGjqDm627j0qaA2KgAB1YAWMOKIAFYgeCGb2XmzhavglaFCiZkEb7MAUBYliEmUVxzDQBqohu6acY7EqEjRw7eP40aAGIAE52Y+49ME4GBwaQM6LvwEGhBYznEdmzRwSAA
