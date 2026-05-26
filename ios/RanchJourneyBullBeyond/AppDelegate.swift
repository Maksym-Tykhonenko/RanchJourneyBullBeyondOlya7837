import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: RCTAppDelegate {
  #if DEBUG
  private func developmentBundleURL() -> URL? {
    var host = "localhost:8081"
    if let ipPath = Bundle.main.path(forResource: "ip", ofType: "txt"),
       let bundledHost = try? String(contentsOfFile: ipPath, encoding: .utf8) {
      let trimmedHost = bundledHost.trimmingCharacters(in: .whitespacesAndNewlines)
      if !trimmedHost.isEmpty {
        host = trimmedHost
      }
    }

    return RCTBundleURLProvider.jsBundleURL(
      forBundleRoot: "index",
      packagerHost: host,
      packagerScheme: "http",
      enableDev: true,
      enableMinification: false,
      inlineSourceMap: false,
      modulesOnly: false,
      runModule: true
    )
  }
  #endif

  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "RanchJourneyBullBeyond"
    self.dependencyProvider = RCTAppDependencyProvider()

    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    return self.bundleURL()
  }

  @objc(loadSourceForBridge:onProgress:onComplete:)
  override func loadSource(
    for bridge: RCTBridge,
    onProgress: @escaping RCTSourceLoadProgressBlock,
    onComplete loadCallback: @escaping RCTSourceLoadBlock
  ) {
    guard let bundleURL = self.bundleURL() else {
      let error = NSError(
        domain: RCTJavaScriptLoaderErrorDomain,
        code: RCTJavaScriptLoaderErrorNoScriptURL,
        userInfo: [NSLocalizedDescriptionKey: "No JavaScript bundle URL available"]
      )
      loadCallback(error, nil)
      return
    }

    RCTJavaScriptLoader.loadBundle(
      at: bundleURL,
      onProgress: onProgress,
      onComplete: loadCallback
    )
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return developmentBundleURL()
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
