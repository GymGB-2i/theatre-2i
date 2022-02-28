import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <div>
        <title>theater 2i</title>
    <link rel="stylesheet" href="https://use.typekit.net/zqd1glp.css"/>
    <link rel="manifest" href="../public/manifest.json" />
    <Component {...pageProps} />
      </div>
  )
}

export default MyApp
