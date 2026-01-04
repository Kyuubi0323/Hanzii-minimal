let writers = [];

function drawCharacter() {
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
    
    // create container div for this character
    const charBox = document.createElement('div');
    charBox.className = 'char-box';
    charBox.id = 'char-' + i;
    writerContainer.appendChild(charBox);

    // create HanziWriter instance
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
    
    // animate with slight delay for each character, then loop
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
