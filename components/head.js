import Head from 'next/head'

const Headd = ({ headData }) => {
  if ( !headData ) {
    return (
      <Head>
          <title>Error occurred</title>
        <meta name='author' content='Jonathan Bittner'/>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
      </Head>
    )
  }
  try {
  return (
    <Head>
        <title>{headData.metaTitle}</title>
        <meta name='keywords' content={headData.keywords}/>
        <meta name='author' content='Jonathan Bittner'/>
        <meta name='description' content={headData.metaDescription}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
  )
  } catch ( error ) {
    console.log(error)
    return (
 <Head>
     <title>Error occurred</title>
        <meta name='author' content='Jonathan Bittner'/>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
      </Head>
    )
  }
}
 export default Headd
