// Error[1]: What if the same question appers?
// Error[2]: How we will make more than question in the same test

let sec = document.getElementById("sec")
let cube = document.querySelectorAll(".cube")
let Q = document.querySelector(".question h1")
let lines = document.querySelector(".lines")
let msg = document.getElementById("msg")




let questions = ["ما هي عاصمة مصر؟",
"ما هو اقرب كوكب الى الشمس؟", "ما هو اطول برج في العالم؟",
"ما هو الكوكب الاشد حرارة في المجموعة الشمسية؟", "اين تقع اليابان؟", "ما هو اسم مبرمج هذه اللعبة؟",
"ما هي عاصمة فلسطين؟"]
let answers = ["القاهرة", "عطارد", "خليفة", "الزهرة", "اسيا", "محمد", "غزة"]
let Q_A_num = Math.floor(Math.random() * questions.length)

Q.innerHTML = questions[Q_A_num]

for(let i = 0; i < answers[Q_A_num].length; i++){
    let div = document.createElement("div")
    div.classList.add("line")
    lines.append(div)
}

let line = document.querySelectorAll(".lines .line")


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

// Counter
let num = 0

// Right cube choosen
cube.forEach(function(e){
    // Adding click event for each cube
    e.addEventListener("click", () =>{
        // If answer's words clicked
        if(answers[Q_A_num].includes(e.innerHTML)){
            // Winning
            if(num === answers[Q_A_num].length - 1){
                document.getElementById("win").play()
                setTimeout(() =>{
                    Disappering(sec)
                }, 1000)
                setTimeout(() =>{
                    Appering(msg)
                }, 2000)
            }
            // Empty array for save lines
            let arr = []
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
                // Add the word to the line div
                arr[num].innerHTML = e.innerHTML
                // Check if the word in it's right position
            if(arr[num].innerHTML === answers[Q_A_num][num]){
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
                return false
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