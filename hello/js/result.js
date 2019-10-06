
window.onload = () => {

  const greetingHeader = document.getElementById("main-title");
  const countryCodeInput = document.getElementById("zip-enter");
  const countryCodeSubmit = document.getElementById("zip-submit");

  const ipInfo = document.getElementById("ip");
  const country = document.getElementById("country");
  const region = document.getElementById("region");
  const city = document.getElementById("city");
  const zipCode = document.getElementById("zip-code");
  const timeZone = document.getElementById("time-zone");

  countryCodeSubmit.addEventListener("click", () => {
    let countryCode = countryCodeInput.value;
    setManualGreetingText(countryCode);
  })

  setGreetingText();

  showIPData();



  async function setManualGreetingText(countryCode) {
    const greeting = await getManualGreeting(countryCode);
    greetingHeader.innerHTML = `${greeting}, user!`;
  }

  async function setGreetingText() {
    const greeting = await getGreeting();
    greetingHeader.innerHTML = `${greeting}, user!`;
  }

  async function getManualGreeting(countryCode) {
    let countryGreeting = await fetch(`https://fourtonfish.com/hellosalut/?cc=${countryCode}`);
    console.log(`https://fourtonfish.com/hellosalut/?cc=${countryCode}`);
    let greetingJson = await countryGreeting.json();
    if (greetingJson == undefined) {
      return "Hello";
    }
    return greetingJson.hello;
  }

  async function getGreeting() {
    let ipData = await getDataFromIP();
    let countryGreeting = await fetch(`https://fourtonfish.com/hellosalut/?cc=${ipData.countryCode}`);
    let greetingJson = await countryGreeting.json();
    if (greetingJson == undefined) {
      return "Hello";
    }
    return greetingJson.hello;
  }

  async function showIPData() {
    let ipData = await getDataFromIP();
    console.log(ipData);
    ip.innerHTML = `IP: ${ipData.query}`;
    country.innerHTML = `Country: ${ipData.country}`;
    region.innerHTML = `Region: ${ipData.region}`;
    city.innerHTML = `City: ${ipData.city}`;
    zipCode.innerHTML = `Zip code: ${ipData.zip}`;
    timeZone.innerHTML = `Time zone: ${ipData.timezone}`;
  }

  async function getDataFromIP() {
    let ip = await getIP();
    let ipData = await fetch(`http://ip-api.com/json/${ip}`);
    let ipJson = await ipData.json();
    return ipJson;
  }

  async function getIP() {
    let data = await fetch("https://ipapi.co/json/");
    let json = await data.json();
    return json.ip;
  }
}
