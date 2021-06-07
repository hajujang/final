  
  //  Get a reference to the "get coin" button
  let getCoinButton = document.querySelector(`.get-coin`)

  // When the "get weather" button is clicked:
  getCoinButton.addEventListener(`click`, async function(event){
  
  // - Ignore the default behavior of the button
  event.preventDefault() 
  
  // Get a reference to the element containing the user-entered country and xxx
  let coinInput = document.querySelector(`#coin`)

  // Get the user-entered location and days from the element's value
  let coin = coinInput.value.toLowerCase()
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
  let globalToKorea = globalPrice*exRateBuy
  let KoreaToGlobalYield = `${(koreaToGlobal-globalPrice)/globalPrice*100}%` 
  // console.log(globalPrice)
  // console.log(koreaPrice)
  // console.log(exRateBuy)
  // console.log(koreaToGlobal) 
  // console.log(koreaToGlobal-globalPrice) 
  // console.log(KoreaToGlobalYield)
  // console.log(globalToKorea)

  // Store a reference to the "displayPrice element"
  let displayPriceElement = document.querySelector(`.display-price`)

  //Converting all curencies into 2 decimals
  let korea2dec = koreaToGlobal.toFixed(2)
  let gloabal2dec = globalPrice.toFixed(2)
  let arbit = korea2dec-gloabal2dec
  let arbit2dec = arbit.toFixed(2)
  let coinUpper = coin.toUpperCase()

  // Fill the global element with the price
  // displayPriceElement.insertAdjacentHTML(`beforeend`,`
  // <div class="font-semibold text-gray-300"> On 1 ${coinUpper} arbitrage transaction, you can earn:
  // <div class="text-6xl font-extrabold text-center align-middle">
  //     <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-900"><a href="index.html">US$ ${arbit2dec}</a></span>
  //    </div>
  // <div class="font-semibold text-gray-300"> Current price of 1 ${coinUpper} in the Korean exchange: US$ ${korea2dec}
  // <div class="font-semibold text-gray-300"> Current price of 1 ${coinUpper} in the US exchange: US$ ${gloabal2dec}
  // </div>`
  // )

  document.querySelector(`.display-price`).innerHTML = `
  <div class="font-semibold text-gray-300"> On 1 ${coinUpper} arbitrage transaction, you can earn:
  <div class="text-6xl font-extrabold text-center align-middle">
      <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-900"><a href="index.html">US$ ${arbit2dec}</a></span>
     </div>
  <div class="font-semibold text-gray-300"> Current price of 1 ${coinUpper} in the Korean exchange: US$ ${korea2dec}
  <div class="font-semibold text-gray-300"> Current price of 1 ${coinUpper} in the US exchange: US$ ${gloabal2dec}
  </div>`
  
  })

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

}  


else {
  // Signed out
  console.log('signed out')

  // Initializes FirebaseUI Auth
  let ui = new firebaseui.auth.AuthUI(firebase.auth())

  // FirebaseUI configuration
  let authUIConfig = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: 'index2.html'
  }

  // Starts FirebaseUI Auth
  ui.start('.sign-in-or-sign-out', authUIConfig)
}
})
