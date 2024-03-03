
        class WordGame {
            constructor(word) {
                this.word = word.toUpperCase();
                this.displayElement = document.querySelector(".grid");
                this.keyboardElement = document.querySelector(".grid_2");
                this.formattedWord = "";
                this.row = 1;
                this.currentIdx = 0;
                this.cloneArr = [0, 0, 0, 0];
                this.flag = true;
                this.stack = [];
                this.max_score = 10;
                this.keyboardLayout = [
                    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                    ['Z', "ENT", 'X', 'C', 'V', 'B', 'N', 'M'],
                    ["DEL"]
                ];
            }

            createBoard(element, className, flag) {
                for (let i = 0; i < this.keyboardLayout.length; i++) {
                    for (let j = 0; j < this.keyboardLayout[i].length; j++) {
                        let divElement = document.createElement('div');
                        if (flag) {
                            divElement.textContent = `${this.keyboardLayout[i][j]}`
                            this.addEvent(divElement)
                        }
                        if (flag && (this.keyboardLayout[i][j] == 'ENT' || this.keyboardLayout[i][j] == 'DEL')) {
                            divElement.classList.add('ENTER');
                        }
                        divElement.classList.add(className);
                        divElement.classList.add(className + '-' + (i + 1)); // Add row class
                        divElement.classList.add(className + '-' + (j + 1)); // Add column class
                        element.appendChild(divElement);
                    }
                }
            }

            addEvent(divElement) {
                divElement.addEventListener("click", (e) => {
                    if (e.target.innerText != 'ENT' && e.target.innerText != "DEL") {
                        if (this.currentIdx < 4) {
                            this.fillCharacter(e.target.innerHTML)
                            this.stack.push(this.currentIdx);
                            this.currentIdx = this.currentIdx + 1;
                            this.flag = true;
                        }
                    } else {
                        if (e.target.innerText == 'ENT') {
                            let checkWord = this.formattedWord;
                            console.log(this.formattedWord);
                            this.flag = false;
                            let words = this.checkDictionary(checkWord);
                            this.max_score = this.max_score - 2;
                        }
                        if (e.target.innerText == 'DEL') {
                            let d = this.stack.pop();
                            if (d >= 0 && this.flag == true) {
                                this.currentIdx = d;
                            }
                            this.unfill();
                        }
                    }
                })
            }

            checkDictionary(checkWord) {
                if (checkWord.length < 4) {
                    return;
                }
                if (this.word == checkWord) {
                    this.cloneArr.fill(1);
                    this.freeze(this.cloneArr);
                    this.row++;
                    this.currentIdx = 0;
                    this.formattedWord = '';
                    alert("your score is" + `${this.max_score}`)
                } else {
                    this.currentIdx = 0;
                    let count = 0;
                    let targetCharacters = this.word.split('');
                    let usedCharacters = checkWord.split('');
                    this.cloneArr.fill(0);
                    let pointer = 0;
                    while (pointer <= 3) {
                        if (targetCharacters[pointer] === usedCharacters[pointer]) {
                            this.cloneArr[pointer] = 1;
                        }
                        pointer++;
                    }
                    for (let char of usedCharacters) {
                        if (targetCharacters.includes(char) && this.cloneArr[count] != 1) {
                            this.cloneArr[count] = 2;
                        }
                        count++;
                    }
                    this.freeze(this.cloneArr);
                    this.row++;
                    this.formattedWord = '';
                }
            }

            freeze(cloneArr) {
                let elements = document.querySelectorAll('.val');
                let startIndex = 4 * (this.row - 1) + 1;
                if (this.row == 1) {
                    startIndex = 1;
                }

                setTimeout(() => {
                    var arrayCount = 0;
                    console.log(cloneArr);
                    while (arrayCount <= 3) {
                        console.log("yes")
                        console.log(arrayCount);
                        if (cloneArr[arrayCount] == '1') {
                            elements[startIndex + arrayCount - 1].classList.add("green");
                        }
                        if (cloneArr[arrayCount] == '2') {
                            elements[startIndex + arrayCount - 1].classList.add("yellow")
                        }
                        if (cloneArr[arrayCount] == '0') {
                            elements[startIndex + arrayCount - 1].classList.add("gray");
                        }
                        arrayCount++;
                    }
                })
            }

            fillCharacter(character) {
                let elements = document.querySelectorAll('.val');
                let startIndex = 4 * (this.row - 1) + 1;
                if (this.row == 1) {
                    startIndex = 1;
                }
                startIndex = startIndex + this.currentIdx - 1;
                elements[startIndex].innerHTML = character;
                this.formattedWord += character;
            }

            unfill() {
                let elements = document.querySelectorAll('.val');
                let startIndex = 4 * (this.row - 1) + 1;
                console.log(this.currentIdx);
                startIndex = startIndex + this.currentIdx - 1;
                elements[startIndex].innerHTML = '';

                this.formattedWord = this.formattedWord.slice(0, -1);

                console.log(this.formattedWord)
            }

            initialize() {
                this.createBoard(this.displayElement, "val", false);
                this.createBoard(this.keyboardElement, "key", true);
            }
        }

        // Usage
        let wordGame = new WordGame("MANG");
        wordGame.initialize();
   
