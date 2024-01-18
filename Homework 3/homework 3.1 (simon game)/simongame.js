const topLeftPanel = document.querySelector('.top-left-panel');
const topRightPanel = document.querySelector('.top-right-panel');
const bottomLeftPanel = document.querySelector('.bottom-left-panel');
const bottomRightPanel = document.querySelector('.bottom-right-panel');
const panels = [topLeftPanel, topRightPanel, bottomLeftPanel, bottomRightPanel];

const getRandomPanel = () => {
    return panels[parseInt(Math.random() * panels.length)];
};

const playSound = (panel) => {
    const sound = document.getElementById('sound');
    sound.play();
};

const flash = (panel) => {
    return new Promise((resolve, reject) => {
        if (panel) {
            panel.classList.add('active');
            playSound(panel); // Play the sound for the panel
            setTimeout(() => {
                panel.classList.remove('active');
                setTimeout(() => {
                    resolve();
                }, 100);
            }, 500);
        } else {
            resolve();
        }
    });
};

let canClick = false;

let sequences = [getRandomPanel()];

let currentIndex = 0;

const panelClicked = (clickedPanel) => {
    if (!canClick) return;

    const expectedPanel = sequences[currentIndex];

    if (expectedPanel && clickedPanel.classList.contains(expectedPanel.className)) {
        currentIndex++;

        if (currentIndex === sequences.length) {
            // Player successfully completed the sequence, reset index and add a new random panel to the sequence
            currentIndex = 0;
            sequences.push(getRandomPanel());

            // Flash the clicked panel when it matches the expected panel
            flash(clickedPanel);

            // Wait for a second before starting the new sequence
            setTimeout(() => {
                startFlashing();
            }, 2000);
        } else {
            // Flash the clicked panel when it matches the expected panel
            flash(clickedPanel);
        }
    } else {
        alert('Game Over');
        // Reset the game when the player guesses the sequence wrong
        sequences = [getRandomPanel()];
        currentIndex = 0;
        setTimeout(startFlashing, 500);
    }
};

const startFlashing = async () => {
    canClick = false;
    const flashes = sequences.length; // Number of flashes for this round

    for (let i = 0; i < flashes; i++) {
        await flash(sequences[i]);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    canClick = true;
};

// Start the initial flash after a delay
setTimeout(startFlashing, 1000);