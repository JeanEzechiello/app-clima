let cidade = document.getElementById('town')
let busca = document.getElementById('search')
let city = document.getElementById('cidade')
let icone = document.getElementById('icone')
let temp = document.getElementById('temperatura')
let desc = document.getElementById('descricao')
let res = document.getElementById('res')
let chuvaContainer = document.getElementById('chuva')
let estrelaContainer = document.getElementById('estrelas')

async function buscarClima() {
    let nomeCidade = cidade.value
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=d2a55e77bcb934ef7a6b6cb963a593c1&units=metric&lang=pt_br`

    let resposta = await fetch(url)
    let dados = await resposta.json()

    if(dados.cod !== 200) {
        city.textContent = "Ops! Não encontramos essa cidade no céu 🌥️"
        temp.textContent = ''
        desc.textContent = ''
    } else {
        city.textContent = dados.name
        icone.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`

        temp.textContent = dados.main.temp
        desc.textContent = dados.weather[0].description

        let periodo = dados.weather[0].icon.charAt(dados.weather[0].icon.length - 1)

        chuvaContainer.innerHTML = ''
        estrelaContainer.innerHTML = ''

        if (dados.weather[0].main === "Clear") {
            if(periodo === "d") {
                document.body.style.background = "linear-gradient(135deg, #4a90e2, #f5d76e)"
            } else {
                gerarEstrelas()
                document.body.style.background = "linear-gradient(135deg, #0f2447, #2c3e70)"
            }
            
        } else if (dados.weather[0].main === "Clouds") {
            if(periodo === "d") {
                document.body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)"
            } else {
                gerarEstrelas()
                document.body.style.background = "linear-gradient(135deg, #2c3444, #4a5468)"
            }

        } else if (dados.weather[0].main === "Rain") {
                gerarChuva()
            if(periodo === "d") {
                document.body.style.background = "linear-gradient(135deg, #3a4a5c, #2c3e50)"
            } else {
                gerarEstrelas()
                document.body.style.background = "linear-gradient(135deg, #16222a, #3a6073)"
            }

            
        } else {
            document.body.style.background = "linear-gradient(135deg, #1e3c72, #4a7fc9)"
}
    }  
}

busca.addEventListener('click', buscarClima)

cidade.addEventListener('keydown', function(event){
    if(event.key === "Enter") {
        buscarClima()
    }
});

function gerarChuva() {
    for(let i = 0; i < 200; i++) {
        let gota = document.createElement('div')
        let posicao = Math.floor(Math.random() * 100)
        gota.style.left = posicao + '%'
        gota.classList.add('gota')
        chuvaContainer.appendChild(gota)
        gota.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's'
    }
}

function gerarEstrelas() {
    for(let i = 0; i < 100; i++) {
        let star = document.createElement('div')
        let posicaoY = Math.floor(Math.random() * 100)
        let posicaoX = Math.floor(Math.random() * 100)
        star.style.left = posicaoX + '%'
        star.style.top = posicaoY + '%'
        star.classList.add('star')
        estrelaContainer.appendChild(star)
    }

}