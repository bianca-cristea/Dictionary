const url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
const inputBtn = document.getElementById('inp-button');
const result = document.querySelector('.result');
const sound = document.querySelector('#sound');

inputBtn.addEventListener('click', () => {
  let word = document.getElementById('input').value;
  fetch(`${url}${word}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
<div class="details">
  <h4 id="word">${word}</h4>
  <button onclick="playSound()">
    <i class="fa fa-volume-up" aria-hidden="true"></i>
  </button>
</div>
<p id="first-explanation">${data[0].meanings[0].partOfSpeech} /${
        data[0].phonetic
      }/</p>
<p id="second-explanation">${data[0].meanings[0].definitions[0].definition}</p>
<p id="example">${data[0].meanings[1].definitions[0].example || ''}</p>
 `;
      sound.setAttribute('src', `${data[0].phonetics[1].audio}`);
    })
    .catch(() => {
      result.innerHTML = `<h3>Couldn't find the word.</h3>`;
    });
});
function playSound() {
  sound.play();
}
