
window.onload = () => {
  
  let input = document.getElementById("input");
  let submitButton = document.getElementById("submit");
  let outputContainer = document.getElementById("output-container");
  let output = document.getElementById("output");
  
  submitButton.addEventListener("click", () => {
    if (!outputContainer.classList.contains("block")) {
      outputContainer.classList.remove("hidden");
      outputContainer.classList.add("block");
    }
    let translatedText = translateText(input.value);
    output.innerHTML = translatedText;
  });
  
  function translateText(text) {
    let words = text.split(" ");
    let translatedText = "";
    words.forEach(word => {
      translatedText += ` ${getWordTranslation(word)}`;
    })
    return translatedText;
  }
  
  function getWordTranslation(word) {
    if (word == "happy") {
      return "😀";
    } else if (word.substring(0, 4) == "love") {
      return "😍";
    } else if (word.substring(0, 4) == "kiss") {
      return "😘";
    } else if (word.substring(0, 4) == "blush") {
      return String.fromCodePoint(0x1F60A);
    } else if (word == "silly") {
      return "😛";
    } else if (word == "crazy") {
      return "😝";
    } else if (word == "rich") {
      return "🤑";
    } else if (word == "silent" || word == "secret") {
      return "🤐";
    } else if (word == "skeptical") {
      return "🤨";
    } else if (word == "lying" || word == "liar") {
      return "🤥";
    } else if (word == "tired" || word == "sleepy") {
      return "😴";
    } else if (word == "sick") {
      return "🤧";
    } else if (word == "amazed") {
      return "🤯";
    } else if (word == "cool" || word == "stylish") {
      return "😎";
    } else if (word == "nerd" || word == "nerdy" || word == "geek" || word == "geeky") {
      return "🤓";
    } else if (word == "worried") {
      return "😟";
    } else if (word == "embarrassed") {
      return "😳";
    } else if (word == "angry" || word == "mad") {
      return "😤";
    } else if (word == "sad" || word == "sadness") {
      return "😭";
    } else if (word == "yawn" || word == "yawned" || word == "yawning") {
      return "🥱";
    } else if (word == "ghost" || word == "spirit") {
      return "👻";
    } else if (word == "clown") {
      return "🤡";
    } else if (word == "alien") {
      return "👽";
    } else if (word == "heart") {
      return "💗";
    } else if (word == "100" || word == "hundred" || word == "hundreds") {
      return "💯";
    } else if (word == "bomb" || word == "explosive" || word == "explosives" || word == "bombs") {
      return "💣";
    } else if (word == "waving" || word == "waved") {
      return "👋"
    } else if (word == "ok") {
      return "👌";
    } else if (word == "left") {
      return "👈";
    } else if (word == "up") {
      return "👆";
    } else if (word == "down") {
      return "👇";
    } else if (word.substring(0, 4) == "clap") {
      return "👏";
    } else if (word.substring(0, 4) == "pray") {
      return "🙏";
    } else if (word == "handshake" || word == "handshakes") {
      return "🤝";
    } else if (word == "write" || word == "wrote" || word == "writing" || word == "written") {
      return "✍";
    } else if (word.substring(0, 4) == "flex") {
      return "💪";
    } else if (word == "leg" || word == "legs") {
      return "🦵";
    } else if (word == "foot" || word == "feet") {
      return "🦶";
    } else if (word == "ear" || word == "ears") {
      return "👂";
    } else if (word == "nose" || word == "noses") {
      return "👃";
    } else if (word == "hot") {
      return "🥵";
    } else if (word == "cold") {
      return "🥶";
    } else if (word == "dead" || word == "death" || word.substring(0, 3) == "die") {
      return String.fromCodePoint(0x2620);
    } else if (word == "tooth" || word == "teeth") {
      return "🦷";
    } else if (word.substring(0, 4) == "bone") {
      return "🦴";
    } else if (word.substring(0, 6) == "tongue") {
      return "👅";
    } else if (word.substring(0, 5) == "mouth") {
      return "👄";
    } else if (word == "baby" || word == "babies") {
      return "👶";
    } else if (word.substring(0, 6) == "flower") {
      return "🌹";
    } else if (word.substring(0, 5) == "honey") {
      return "🍯";
    } else if (word == "bee" || word == "bees") {
      return "🐝";
    } else if (word == "no" || word == "not") {
      return "🚫";
    } else {
      return word;
    }
  }
  
}