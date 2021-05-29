firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log(user)
    
    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-pink-500 underline sign-out">Sign Out</button>
    `
    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()
    
      // redirect to the home page
      document.location.href = `index.html`
    })
     
    //  Get a reference to the "get coin" button
    let getCoinButton = document.querySelector(`.get-coin`)

    // When the "get weather" button is clicked:
    getCoinButton.addEventListener(`click`, async function(event){
    
    // - Ignore the default behavior of the button
    event.preventDefault() 
    
    // Get a reference to the element containing the user-entered country and xxx
    let coinInput = document.querySelector(`#coin`)

    // Get the user-entered location and days from the element's value
    let coin = coinInput.value
    let urlGlobal = `https://api.huobi.pro/market/detail?symbol=${coin}usdt`
    let urlKorea = `https://api.bithumb.com/public/ticker/${coin}_krw`
    let urlExRate = `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD`

    // Fetch the url, wait for a response, store the response in memory
    let responseGlobal = await fetch(urlGlobal)
    let responseKorea = await fetch(urlKorea)
    let responseExRate = await fetch(urlExRate)

    // Ask for the json-formatted data from the response, wait for the data, store it in memory
    let jsonGlobal = await responseGlobal.json()
    console.log(jsonGlobal)
    let jsonKorea = await responseKorea.json()
    console.log(jsonKorea)
    let jsonExRate = await responseExRate.json()
    console.log(jsonExRate)
    
    // Store the closing price in Global, closing price in Korea, and the exchange rate
    let globalPrice = jsonGlobal.tick.close
    let koreaPrice = jsonKorea.data.closing_price
    let exRateBuy = jsonExRate[0].cashBuyingPrice
    
    // Store the KIMCHI PREMIUM and Arbitrage Yield
    let koreaToGlobal = koreaPrice/exRateBuy
    let KoreaToGlobalYield = `${(koreaToGlobal-globalPrice)/globalPrice}%` 
    // console.log(globalPrice)
    // console.log(koreaPrice)
    // console.log(exRateBuy)
    // console.log(koreaToGlobal) 
    console.log(koreaToGlobal-globalPrice) 
    console.log(KoreaToGlobalYield)

    // Store a reference to the "global-price element"
    let globalElement = document.querySelector(`.global-price`)

    // Fill the global element with the price
    globalElement.insertAdjacentHTML(`beforeend`,`
    <div class="font-bold text-3xl">Current ${globalPrice} price in the global</div>`)
  })

    // Store a reference to the "global-price element"
    let globalElement = document.querySelector(`.global-price`)

    // Fill the global element with the price
    globalElement.insertAdjacentHTML(`beforeend`,`
    <div class="font-bold text-3xl">Current ${globalPrice} price in the global</div>`)
  })




    // // Build the URL for our posts API
    // let url = `/.netlify/functions/posts`

    // // Fetch the url, wait for a response, store the response in memory
    // let response = await fetch(url)

    // // Ask for the json-formatted data from the response, wait for the data, store it in memory
    // let json = await response.json()

    // // Write the json-formatted data to the console in Chrome
    // console.log(json)

  } else {
    // Signed out
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
