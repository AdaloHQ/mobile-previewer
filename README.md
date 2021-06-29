# mobile-previewer
Mobile app for previewing / managing applications

Testing
=======

Not only is it important that you write your component to be cross-platform, you must also test your component on all platforms.

*   Web
*   iOS
*   Android

Android[#](#android "Direct link to heading")
---------------------------------------------

Testing Adalo apps on mobile is a little more involved than testing on the web.

### Prerequisites[#](#prerequisites-1 "Direct link to heading")

If you haven't already, you will need to install several programs before continuing:

*   [Android Studio](https://developer.android.com/studio)
*   [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall) (For react native)
*   [Node](https://nodejs.org/en/) (>10)

### Set up mobile-previewer[#](#set-up-mobile-previewer-1 "Direct link to heading")

Clone [@Adalo/mobile-previewer](https://github.com/AdaloHQ/mobile-previewer) from Github. Run `yarn` to install dependencies.

### Android[#](#android-1 "Direct link to heading")

To set up mobile-previewer for Android, you must first create a new emulator.

*   Follow the instructions on the [Android docs](https://developer.android.com/studio/run/managing-avds#createavd).
*   You can access the AVD manager by clicking the gear icon in the bottom right corner of the welcome screen as well.

##### important

Make sure you are using API level 28 (Pie).

Next, build the app.

*   Navigate to `mobile-previewer` in your shell. Run `yarn start`.
*   Create another tab, and navigate to `mobile previewer` again. Run `npx react-native run-android`.
*   It will now build the `mobile-previewer` app and install it on the emulator.

You should be all set to go with Android!

### Testing local libraries[#](#testing-local-libraries-1 "Direct link to heading")

For now, you must manually install your library into `mobile-previewer`. To do so, follow these steps:

*   Open `mobile-previewer/package.json`, and add your package in the list of dependencies.
*   Instead of specifying a version, put the relative path to your package. For example, if I were trying to add my stopwatch component, I would add the line: `"stopwatch": "../stopwatch",` under dependencies.
*   Run `yarn` inside of `mobile-previewer`. Your package should be installed now.
*   If you're an Adalo developer working on an Adalo package, simply replace the version number with the relative path to the package locally.
*   If you're working on a custom component, and your library includes a package that has native code, you **must** add that package as a direct dependency. For example, when testing my `audio-player` component I must also add `react-native-track-player` as a direct dependency because that library has native code in it. This must be done for linking purposes.
    
    ##### important
    
    Important: When Adalo builds your library from the component marketplace, we will automatically check to see if your library has dependencies that have native code, and will add them for you.
    

Next, you must modify `mobile-previewer/libraries.js` so that Adalo will recognize your package as an Adalo library:

*   Open `mobile-previewer/libraries.js`
*   Add a line under imports like this: `import * as lib<X> from '<library-name>'`, where <X> is the next number, i.e. lib3, and <library-name> is the name of your library.
*   Add a line under `export default` like this: `<library-name>: lib<X>,` where <library-name> is the name of your library, and <X> is the same number you used above.

After completing those steps, you should be good to go!

If you modify any code in your library, your changes **will not** be automatically reflected in the code. In order to refresh `mobile-previewer`, you must reinstall the dependencies using `yarn --force`. Alternatively, you can use [wml](https://github.com/wix/wml), a tool that uses watchman to make concrete symlinks. If you use wml, changes will be automatically reflected and hot-reloaded. This saves a lot of time.

If your component requires custom configuration, you can instruct the Adalo build system to make these changes using install scripts. See ["Install Scripts"](/docs/workflow/testing/install-scripts) or the [tutorial video](https://youtu.be/6VAdoYKaNgc) to learn how.

### Troubleshooting[#](#troubleshooting-1 "Direct link to heading")

This section will organically grow over time as developers run into more build issues...

#### Common build issues and how to fix them:[#](#common-build-issues-and-how-to-fix-them-1 "Direct link to heading")

*   If you run into an error that looks like: `java.lang.NoClassDefFoundError: Could not initialize class org.codehaus.groovy.vmplugin.v7.Java7`
    *   Update gradle. To do so, open `mobile-previewer/android/gradle/wrapper/gradle-wrapper.properties`. Change `distributionUrl` to be: `distributionUrl=https\://services.gradle.org/distributions/gradle-6.3-all.zip`.
*   If you run into an error that looks like "Missing SDK path".
    *   Add a new file `mobile-previewer/android/local.properties`, which will only have one line: `sdk.dir=/path/to/android/sdk/locally`. On mac, this path will look like `/Users/username/Library/Android/sdk`, where `username` is your username.

_Last updated on 08/02/2021_
