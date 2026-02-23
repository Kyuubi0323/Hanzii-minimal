let writers = [];

async function translateText(text) {
  const box = document.getElementById('translation-box');
  const el = document.getElementById('translation-text');
  box.style.display = 'block';
  el.textContent = 'Translating…';
  el.className = 'translation-text loading';
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=zh|en`;
    const res = await fetch(url);
    const data = await res.json();
    const result = data?.responseData?.translatedText;
    if (result) {
      el.textContent = result;
    } else {
      el.textContent = 'Translation not available.';
    }
  } catch (e) {
    el.textContent = 'Translation failed. Check your connection.';
  }
  el.className = 'translation-text';
}

function drawCharacter() {
  const input = document.getElementById('charInput').value.trim();
  // hide translation when re-drawing
  document.getElementById('translation-box').style.display = 'none';
  originalDraw();
  translateText(input);
}

function originalDraw() {
  const input = document.getElementById('charInput').value.trim();
  if (!input) {
    alert('Please enter Chinese characters!');
    return;
  }

  // clear previous characters
  const writerContainer = document.getElementById('writer');
  writerContainer.innerHTML = '';
  writers = [];

  // create a box for each character
  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    const charWrapper = document.createElement('div');
    charWrapper.className = 'char-wrapper';
    writerContainer.appendChild(charWrapper);

    const charBox = document.createElement('div');
    charBox.className = 'char-box';
    charBox.id = 'char-' + i;
    charWrapper.appendChild(charBox);

    const pinyinLabel = document.createElement('div');
    pinyinLabel.className = 'char-pinyin';
    const py = pinyinPro.pinyin(char, { toneType: 'symbol', type: 'string' });
    pinyinLabel.textContent = py || char;
    charWrapper.appendChild(pinyinLabel);

    const writer = HanziWriter.create('char-' + i, char, {
      width: 200,
      height: 200,
      padding: 10,
      showOutline: true,
      showCharacter: false,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 200,
      delayBetweenLoops: 1000,
    });

    writers.push(writer);

    setTimeout(() => {
      writer.loopCharacterAnimation();
    }, i * 200);
  }
}

document.getElementById('drawBtn').onclick = drawCharacter;

// Allow Enter key to draw
document.getElementById('charInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    drawCharacter();
  }
});
