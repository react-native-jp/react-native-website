---
id: upgrading
title: Upgrading to new versions
---

新しいバージョンの React Native へアップグレードするとより多くの、API、view、developer tools といった役立つものが利用可能になります。アップグレードは少し労力が必要になりますが、我々はそれを簡単にできるよう努めています。

## Expo projects

Expo プロジェクトを新しいバージョンの React Native にアップグレードするためには、`package.json`の `react-native` , `react`, `expo`のアップデートが必要になります。どのバージョンがサポートされているかを調べるためにはこちらの[this list](https://docs.expo.io/versions/latest/sdk/#sdk-version)を 3 章してください。`app.json`に正しい `sdkVersion` を設定する必要もあります。

アップグレードに関する最新の情報はこちら[Upgrading Expo SDK Walkthrough](https://docs.expo.io/versions/latest/workflow/upgrading-expo-sdk-walkthrough) を確認してください。

## React Native projects

基本的な React Native のプロジェクトは、Android project, iOS project, JavaScrip で構成されているので、アップグレードはかなりやりにくいことがあります。React Native アップグレードの方法はふたつあり：　[React Native CLI](https://github.com/react-native-community/cli) を用いる方法と、[Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) を使い手動で行う方法です。

### React Native CLI

[React Native CLI](https://github.com/react-native-community/cli) には `upgrade` コマンドがあります。このコマンドは[rn-diff-purge](https://github.com/react-native-community/rn-diff-purge) project を使いどのファイルに作成、削除、あるいは修正が必要なのかを特定できるので、これを使うことによってワンステップでソースファイルのアップグレードを最小限のコンフリクトで行えます。


#### 1. `upgrade` コマンドの実行

> `upgrade` コマンドは `git apply` で 3-way mergeを行うためGit上で動作します。したがって動作させるためにはGitが必要になります。もしGitを使いたくないがこのソリューションを使いたい場合は[Troubleshooting](#i-want-to-upgrade-with-react-native-cli-but-i-don-t-use-git) を確認してください。

最新バージョンへのアップグレードプロセスを開始するためには下記のコマンドを実行してください。

```shell
npx react-native upgrade
```

引数を渡すことで React Native バージョンの指定もできます（`0.61.0-rc.0` にアップグレードする例です）。

```shell
npx react-native upgrade 0.61.0-rc.0
```

3-way merge　を利用する `git apply`　を使用してプロジェクトのアップグレードが行われるので、コマンド終了後に少量のコンフリクトを修正する必要がある場合もあります。

#### 2. コンフリクトを解決する

コンフリクトしたファイルには、どこから変更がきたのか明白にする区切り文字が含まれます。例えば。

```
13B07F951A680F5B00A75B9A /* Release */ = {
  isa = XCBuildConfiguration;
  buildSettings = {
    ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
<<<<<<< ours
    CODE_SIGN_IDENTITY = "iPhone Developer";
    FRAMEWORK_SEARCH_PATHS = (
      "$(inherited)",
      "$(PROJECT_DIR)/HockeySDK.embeddedframework",
      "$(PROJECT_DIR)/HockeySDK-iOS/HockeySDK.embeddedframework",
    );
=======
    CURRENT_PROJECT_VERSION = 1;
>>>>>>> theirs
    HEADER_SEARCH_PATHS = (
      "$(inherited)",
      /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include,
      "$(SRCROOT)/../node_modules/react-native/React/**",
      "$(SRCROOT)/../node_modules/react-native-code-push/ios/CodePush/**",
    );
```

"ours" は "こちらのチーム"、"theirs"　は "React　Native 開発チーム"　と考えることができます。

### Upgrade Helper

[Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) は、ある２つのバージョン間のフルセットの差分を提供することにより、アップグレードをしやすくするのツールです。このツールは特定のファイルのコメントも表示するので、なぜ変更が必要なのかを理解しやすくなります。

#### 1. バージョンの選択

まず最初にどのバージョンからどのバージョンにアップグレードしたいのかを選択する必要があります。デフォルトでは最新のメジャーバージョンが指定されています。選択したのちに "Show me how to upgrade" ボタンを押下します。

💡 メジャーアップデートでは、アップデートをしやすくするために　"useful content" をリンクとともに表示します。

#### 2. 依存関係のアップデート

最初に表示されているファイルは `package.json` でそこに表示されている依存関係をアップデートすることをお勧めします。例えば、`react-native` と `react` が変更されていると表示された場合、 `yarn add` を実行することでそれらをインストールできます。

```shell
# {{VERSION}} と {{REACT_VERSION}} は変更差分として表示されているリリースバージョンです。
yarn add react-native@{{VERSION}}
yarn add react@{{REACT_VERSION}}
```

#### 3. プロジェクトファイルのアップグレード

新しいリリースには `npx react-native init` を実行した時に生成されるファイルに対する変更が、含まれることがあります。これらのファイルは Upgrade Helper ページで `package.json` の後に表示されます。もしもこれらの変更がない場合はプロジェクトをリビルトするだけですみます。

これらの変更がある場合は、ページ上の変更点からコピーペーストをして手動でアップデートを行うか、下記のコマンドを実行して React Native CLI を使ったアップデートを行うかのどちらかをすることになります。

```shell
npx react-native upgrade
```

このコマンドでは、最新のテンプレートとプロジェクトのファイルを照合し以下のことを行います。

- テンプレートに新しいファイルがある場合、それを生成する
- プロジェクトにあるファイルとテンプレートのあるファイルが同一である場合、それをスキップする
- プロジェクトのファイルとテンプレートのファイルが異なる場合、プロンプトが表示されます; ファイルを維持するか上書きするかを選ぶことができます。

> Some upgrades won't be done automatically with the React Native CLI and require manual work, e.g. `0.28` to `0.29`, or `0.56` to `0.57`. Make sure to check the [release notes](https://github.com/facebook/react-native/releases) when upgrading so that you can identify any manual changes your particular project may require.

> `0.28` から `0.29`, あるいは `0.56` から `0.57` といった一部のアップデートではReact Native CLIによる自動アップデートを行うことができず手動で行う必要があります。今のプロジェクトに手動でのアップデートが必要になるかを特定するために、アップグレードの際には [release notes](https://github.com/facebook/react-native/releases) を必ず確認してください。

### トラブルシューティング

#### React Native CLIでのアップグレードを行いたいがGitは使用していない
プロジェクトを Git で管理する必要はありませんが(Mercurial や SVN　あるいは何も使用しないなど)、`npx react-native upgrade` を使用するためにはシステム上に[install Git](https://git-scm.com/downloads) が必要です。Git もまた `PATH` 　で利用できることが必要になります。もしも Git を使用していない場合は初期化しコミットをしてください。

```shell
git init # Gitリポジトリを初期化します
git add . # 現在のファイル全てをステージにあげる
git commit -m "Upgrade react-native" # コミットとしてファイルをセーブする
```

アップグレード完了後は、 `.git`ディレクトリを削除しても構いません。

#### アップグレードしたはずだが、まだアプリケーションは古いバージョンを使い続けている
キャッシュ関係によりこれらの類のエラーが多々発生するので、プロジェクトのキャッシュを削除するために[react-native-clean-project](https://github.com/pmadruga/react-native-clean-project) をインストールしアプリケーションを再起動することを勧めます。
