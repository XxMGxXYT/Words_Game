// Error[1]: What if the same question appers => (Solved)
// Error[2]: How we will make more than question in the same test (Solved)
// Error[3]: Fix the changeQ function on line (49) to change the answer lines like the question = > (Solved)
// Error[4]: num doesn't return to be zero when the question changes => (Solved)
// Error[5]: arr in line 135, doesn't return to be empty when the question changes => (Solved)
// Error[6]: Bug in correct words, exaclty in the last word in the answer, line 160 => (Solved)
// Error[7]: num has to be used in indexing only => (Solved)
// [1] if user wrong answers = correct answers => (Not Finished)
// [2] if user wrong answers = correct answers => (Not Finished)

let sec = document.getElementById("sec")
let cube = document.querySelectorAll(".cube")
let Q = document.querySelector(".question h1")
let lines = document.querySelector(".lines")
let msg = document.getElementById("msg")
let game_over = document.getElementById("gameOver")
let duration = document.querySelector(".timer span")
let durationTime = 60
duration.innerHTML = durationTime



let questions = ["ما هي عاصمة مصر؟",
"ما هو اقرب كوكب الى الشمس؟", "ما هو اطول برج في العالم؟",
"ما هي لغة البرمجة المستخدمة في اللعبة؟", "اين تقع اليابان؟", "ما هو اسم مبرمج هذه اللعبة؟",
"ما هي عاصمة فلسطين؟", "ما اسم الرسول صلى الله عليه و سلم؟", "ما هو اسرع حيوان في العالم؟", "من مكتشف التيار المتردد؟",
"ما ترتيب كوكب اورانوس بين كواكب المجموعة الشمسية؟"]
let answers = ["القاهرة", "عطارد", "خليفة", "جافاسكريبت", "اسيا", "محمد", "القدس", "محمد", "الفهد", "تيسلا", "السابع"]

// let questions = ["ما اسم مبرمج اللعبة؟", "ما هي بلد مبرمج اللعبة؟", "ما هي وظيفة مبرمج اللعبة؟"]
// let answers = ["محمد", "مصر", "مبرمج"]





// Returns a shuffled array
let newArray = []
for(let i = 0; i < questions.length; i++){
    newArray.push(i)
}
function shufflingArray(){
    for(let i = questions.length - 1; i > 0; i--){
        n = Math.floor(Math.random() * (i + 1))
        let snum = newArray[i]
        newArray[i] = newArray[n]
        newArray[n] = snum
    }
    return newArray
}
shufflingArray() //Call back the function to get the shuffled array





// Generator function to get every number in newArray
function* gen(){
    for(let i = 0; i < newArray.length; i++){
        yield newArray[i]
    }
}
let generator = gen() 
let Q_A_num = generator.next().value


Q.innerHTML = questions[Q_A_num]
// Creating lines for the length of every answer
for(let i = 0; i < answers[Q_A_num].length; i++){
    let div = document.createElement("div")
    div.classList.add("line")
    lines.append(div)
}


// Counters
let num = 0
let num2 = 0
let numOfCorrectAnswers = 0
let numOfWrongAnswers = 0
let cou = 1
// Empty arrays
var arr = []
var arr2 = []
let line = document.querySelectorAll(".lines .line")
// Change question and answer function
function changeQ(){
    // Make all arrays empty
    arr = []
    arr2 = []
    // create div, and save it in "lines2" variable
    let lines2 = document.createElement("div")
    // Change Question with Its Answer
    Q_A_num = generator.next().value
    Q.innerHTML = questions[Q_A_num]
    // Create lines and add it to "lines2" div.
    for(let i = 0; i < answers[Q_A_num].length; i++){
        let div = document.createElement("div")
        div.classList.add("line")
        arr.push(div)
        lines2.append(div)
    }
    // Increase counter of the every question number 
    cou += 1
    // Add class "lines" to the new div => "lines2", and replace the old one with this new div. 
    lines2.classList.add("lines")
    document.querySelector(".test").replaceChildren(lines2)
    // Print the number of the right question
    console.log(`The number of quetions: ${cou}`)
    // Make all counters empty
    num = 0
    num2 = 0
    // Add one second to the duration to fix the bug
    duration.innerHTML = durationTime + 1
    // Make the color of duration span black, after it was red in the condition of "Timer" function
    duration.style.color = "black"
    // Make every word of the right answer in empty array, so we can compare it with user word's array 
    for(let i = 0; i < answers[Q_A_num].length; i++){
        arr2.push(answers[Q_A_num][i])
    }
    // If cou = number of questions, deacress one second of the duration, and call back "TimerOneTime" function
    if(cou === questions.length){
        durationTime -= 1
        TimerOneTime()
        return false
    } 
    // If cou not = number of questions, Call back "Timer" function
    else{
        Timer()
    }
}
Timer()



// Disappering function
function Disappering(id){
    // Adding "Visibility" to the element => visibility: hidden;
    id.classList.add("hide")
    // Adding "none" to the element => display: none;
    setTimeout(() => {
        id.classList.add("none")
    }, 1000)
}



// Appering function
function Appering(id){
    // Removing "none" from the element => display: none;
    id.classList.remove("none")
    // Removing "Visibility" from the element => visibility: hidden;
    setTimeout(() => {
        id.classList.remove("hide")
    }, 1500)
}

// One time using functions
let one = true
function once(){
    if(one){
        for(let i = 0; i < answers[Q_A_num].length; i++){
            arr2.push(answers[Q_A_num][i])
        }
        return one = false
    }
}
once()
// Not Used yet
let two = true
function twice(){
    if(two){
        changeQ()
        return one = false
    }
}

// Cubes
cube.forEach(function(e){
    // Adding click event for each cube
    e.addEventListener("click", () =>{
        // If answer's words clicked
        if(answers[Q_A_num].includes(e.innerHTML)){
            // check index (num) in arr2 = index (num) in the answer, and index (num) in arr2 = user cube choise
            if(arr2[num] === answers[Q_A_num][num] && arr2[num] === e.innerHTML){
                num2 += 1
            }
            // Winning
            if(num2 === answers[Q_A_num].length){
                // Increass correct answers, and print it
                numOfCorrectAnswers += 1
                console.log(`Correct answers = ${numOfCorrectAnswers}`)
                document.getElementById("win").play()
                // Check if all questions finished
                if(cou === questions.length){
                    setTimeout(() =>{
                        Disappering(sec)
                    }, 1000)
                    setTimeout(() =>{
                        Appering(msg)
                    }, 2000)
                // Check if all questions not finished
                } else{
                    setTimeout(() => changeQ(), 1000)
                }
            }
            // If words = answer length
            if(num === answers[Q_A_num].length){
                document.getElementById("win").play()
                // Return nothing
                return false
            // If words not equal answer length
            } else{
                line.forEach((l) =>{
                    arr.push(l)
                })
                // check index (num) in arr2 = index (num) in the answer, and index (num) in arr2 = user cube choise
                if(arr2[num] === answers[Q_A_num][num] && arr2[num] === e.innerHTML){
                    // Add the word to the line div
                    arr[num].innerHTML = e.innerHTML
                    num += 1
                    // Adding green color to the cube
                    e.classList.add("greenShadow")
                    // Removing green color of the cube after 700 mill Seconds
                    setTimeout(() =>{
                        e.classList.remove("greenShadow")
                    }, 700) //none_click
                    // Adding none_click event to the cube
                    e.classList.add("none_click")
                    // Removing none_click of the cube after 700 mill Seconds
                    setTimeout(() =>{
                        e.classList.remove("none_click")
                    }, 700)
                    document.getElementById("correct").play()
                    return false
                }else{
                    // Adding red color to the cube
                    e.classList.add("redShadow")
                    // Removing red color of the cube after 700 mill Seconds
                    setTimeout(() =>{
                        e.classList.remove("redShadow")
                    }, 700)
                    // Adding none_click event to the cube
                    e.classList.add("none_click")
                    // Removing none_click of the cube after 700 mill Seconds
                    setTimeout(() =>{
                        e.classList.remove("none_click")
                    }, 700)
                    document.getElementById("boo").play()
                }
            }
        } else{
            // Adding red color to the cube
            e.classList.add("redShadow")
            // Removing red color of the cube after 700 mill Seconds
            setTimeout(() =>{
                e.classList.remove("redShadow")
            }, 700)
            // Adding none_click event to the cube
            e.classList.add("none_click")
            // Removing none_click of the cube after 700 mill Seconds
            setTimeout(() =>{
                e.classList.remove("none_click")
            }, 700)
            document.getElementById("boo").play()
        }
    })
})

// Timer function
function Timer(){
    // Decrease duration time
    duration.innerHTML -= 1
    // if duration time = 0, and player not answerd the question
    if(duration.innerHTML > "0" && num2 !== answers[Q_A_num].length){
        setTimeout(() => Timer(), 1000)
    } 
    // if player answerd the question
    else if(num2 === answers[Q_A_num].length){
        return false
    } 
    // if duration time finished and = 0
    else if(duration.innerHTML === "0" && num2 !== answers[Q_A_num].length){
        // Increass wrong answers, and print it
        numOfWrongAnswers += 1
        console.log(`Wrong answers = ${numOfWrongAnswers}`)
        if(cou !== questions.length){
            document.getElementById("boo").play()
            setTimeout(() => changeQ(), 1000)
        }
        return false
    }
    if(duration.innerHTML <= "10"){
        duration.style.color = "red"
    }
}

// Last timer function, only one time using for the last question
function TimerOneTime(){
    // Decrease duration time
    duration.innerHTML -= 1
    // if duration time > 0, and player not answerd the question
    if(duration.innerHTML > "0"){
        setTimeout(() => TimerOneTime(), 1000)
    }
    // if duration time finished and = 0
    else if(duration.innerHTML === "0"){
        // Increass wrong answers, and print it
        numOfWrongAnswers += 1
        console.log(`Wrong answers = ${numOfWrongAnswers}`)
        // If wrong answers more than correct answers
        if(numOfWrongAnswers > numOfCorrectAnswers){
            document.getElementById("boo").play()
            setTimeout(() =>{
                Disappering(sec)
            }, 1000)
            setTimeout(() =>{
                Appering(game_over)
            }, 2000)
        } 
        // If correct answers more than wrong answers
        else if (numOfCorrectAnswers > numOfWrongAnswers){
            setTimeout(() =>{
                Disappering(sec)
            }, 1000)
            setTimeout(() =>{
                Appering(msg)
            }, 2000)
        }
        // If correct and wrong answers equal each other
        else {
            alert("Draw")
        }
        return false
    }
}