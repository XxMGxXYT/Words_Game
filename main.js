// Error[1]: What if the same question appers => (Solved)
// Error[2]: How we will make more than question in the same test (Solved)
// Error[3]: Fix the changeQ function on line (49) to change the answer lines like the question = > (Solved)
// Error[4]: num doesn't return to be zero when the question changes => (Solved)
// Error[5]: arr in line 135, doesn't return to be empty when the question changes => (Solved)
// Error[6]: Bug in correct words, exaclty in the last word in the answer, line 160 => (Solved)
// Error[7]: num has to be used in indexing only => (Solved)

let sec = document.getElementById("sec")
let cube = document.querySelectorAll(".cube")
let Q = document.querySelector(".question h1")
let lines = document.querySelector(".lines")
let msg = document.getElementById("msg")
let game_over = document.getElementById("gameOver")
let duration = document.querySelector(".timer span")
duration.innerHTML = 30



let questions = ["ما هي عاصمة مصر؟",
"ما هو اقرب كوكب الى الشمس؟", "ما هو اطول برج في العالم؟",
"ما هو الكوكب الاشد حرارة في المجموعة الشمسية؟", "اين تقع اليابان؟", "ما هو اسم مبرمج هذه اللعبة؟",
"ما هي عاصمة فلسطين؟"]
let answers = ["القاهرة", "عطارد", "خليفة", "الزهرة", "اسيا", "محمد", "القدس"]

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



// Counter
let num = 0
let num2 = 0
var arr = []
var arr2 = []
let line = document.querySelectorAll(".lines .line")
// Change question and answer function
let cou = 1
function changeQ(){
    arr = []
    arr2 = []
    let lines2 = document.createElement("div")
    Q_A_num = generator.next().value
    Q.innerHTML = questions[Q_A_num]
    for(let i = 0; i < answers[Q_A_num].length; i++){
        let div = document.createElement("div")
        div.classList.add("line")
        arr.push(div)
        lines2.append(div)
    }
    cou += 1
    lines2.classList.add("lines")
    document.querySelector(".test").replaceChildren(lines2)
    console.log(cou)
    num = 0
    num2 = 0
    for(let i = 0; i < answers[Q_A_num].length; i++){
        arr2.push(answers[Q_A_num][i])
    }
}




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
// let count = setInterval(timer, 1000)

// Right cube choosen
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
            document.getElementById("boo").play()
        }
    })
})


// Timer
function timer(){
    duration.innerHTML -= 1 
    if(duration.innerHTML === "10"){
        document.querySelector(".timer").style.color = "red"
    }
    if(num === answers[Q_A_num].length){
        clearInterval(count)
    }
    if(duration.innerHTML === "0"){
        clearInterval(count)
        document.getElementById("boo").play()
        setTimeout(() =>{
            Disappering(sec)
        }, 1000)
        setTimeout(() =>{
            Appering(game_over)
        }, 1500)
    }
}

