const topLeftPanel = document.querySelector('.top-left-panel');
const topRightPanel = document.querySelector('.top-right-panel');
const bottomLeftPanel = document.querySelector('.bottom-left-panel');
const bottomRightPanel = document.querySelector('.bottom-right-panel');
const panels = [topLeftPanel, topRightPanel, bottomLeftPanel, bottomRightPanel];

const getRandomPanel = () => {
    return panels[parseInt(Math.random() * panels.length)];
};

const playSound = (panel) => {
    let soundId;

    switch (panel) {
        case topLeftPanel:
            soundId = 'soundTopLeft';
            break;
        case topRightPanel:
            soundId = 'soundTopRight';
            break;
        case bottomLeftPanel:
            soundId = 'soundBottomLeft';
            break;
        case bottomRightPanel:
            soundId = 'soundBottomRight';
            break;
        default:
            soundId = 'sound';
            break;
    }
    const sound = document.getElementById(soundId);
    sound.play();
};

const flash = (panel) => {
    return new Promise((resolve, reject) => {
        if (panel) {
            panel.classList.add('active');
            playSound(panel);
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
            currentIndex = 0;
            sequences.push(getRandomPanel());
            
            flash(clickedPanel);
            
            setTimeout(() => {
                startFlashing();
            }, 2000);
        } else {
            flash(clickedPanel);
        }
    } else {
        playSoundFail();
        alert('Game Over');
        sequences = [getRandomPanel()];
        currentIndex = 0;
        setTimeout(startFlashing, 500);
    }
};
const playSoundFail = () => {
    const soundFail = document.getElementById('soundFail');
    soundFail.play();
};

const startFlashing = async () => {
    canClick = false;
    const flashes = sequences.length;
    
    for (let i = 0; i < flashes; i++) {
        await flash(sequences[i]);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    canClick = true;
};

setTimeout(startFlashing, 1000);